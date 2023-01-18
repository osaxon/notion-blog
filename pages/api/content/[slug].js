import { getSessionId } from "@/lib/helper.server";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const sessionId = getSessionId(req);
  try {
    if (req.method === "GET") {
      const { slug } = req.query;
      const response = await prisma.contentMeta.findFirst({
        where: {
          slug: slug,
        },
        include: {
          _count: {
            select: {
              views: true,
              likes: true,
            },
          },
        },
      });
      console.log(response);
      return res.status(200).json({
        views: response !== null ? response?._count.views : 0,
        likes: response !== null ? response?._count.likes : 0,
      });
    } else if (req.method === "POST") {
      const response = await prisma.contentMeta.upsert({
        where: {
          slug: slug,
        },
        create: {
          slug,
          views: {
            create: {
              sessionId,
            },
          },
        },
        update: {
          views: {
            create: {
              sessionId,
            },
          },
        },
        include: {
          _count: {
            select: {
              views: true,
              likes: true,
            },
          },
        },
      });
      console.log(response);
      return res.status(200).json({
        views: response !== null ? response?._count.views : 0,
        likes: response !== null ? response?._count.likes : 0,
      });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: error.message ?? "Internal Server Error" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

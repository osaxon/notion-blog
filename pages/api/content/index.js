import { getSessionId } from "@/lib/helper.server";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { slug } = req.query;
      const response = await prisma.contentMeta.findMany({
        include: {
          _count: {
            select: {
              views: true,
              likes: true,
            },
          },
        },
      });

      const content = response.map((meta) => {
        return {
          slug: meta.slug,
          views: meta._count.views,
          likes: meta._count.likes,
        };
      });

      return res.status(200).json(content);
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

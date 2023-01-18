import { prisma } from "@/lib/prisma";
import { getSessionId } from "@/lib/helper.server";

export default async function handler(req, res) {
  const { slug } = req.query;
  const sessionId = getSessionId(req);
  try {
    const response = await prisma.contentMeta.upsert({
      where: {
        slug: slug,
      },
      create: {
        slug,
        likes: {
          create: {
            sessionId,
          },
        },
      },
      update: {
        likes: {
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
    return res.status(201).json({
      views: response?._count.views ?? 0,
      likes: response?._count.likes ?? 0,
    });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: error.message ?? "Internal Server Error" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

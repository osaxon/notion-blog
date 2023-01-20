import { prisma } from "@/lib/prisma";
import { getSessionId } from "@/lib/helper.server";
import { getUserLikes } from "@/lib/getUserLikes";

export default async function handler(req, res) {
    const { slug } = req.query;
    const sessionId = getSessionId(req);

    if (req.method !== "POST") {
        res.status(405).json({ message: `${req.method} prohibtied.` });
    }

    try {
        const userLikes = getUserLikes({ sessionId, slug });

        if (userLikes >= 5) throw new Error("Max like count is 5");

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
            userLikes: userLikes + 1,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message ?? "Internal Server Error",
            });
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

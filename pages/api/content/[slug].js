import { getSessionId } from "@/lib/helper.server";
import { prisma } from "@/lib/prisma";
import { getUserLikes } from "@/lib/getUserLikes";

export default async function handler(req, res) {
    const sessionId = getSessionId(req);
    const { slug } = req.query;
    const userLikes = await getUserLikes({ sessionId, slug });
    try {
        if (req.method === "GET") {
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
            return res.status(200).json({
                views: response !== null ? response?._count.views : 0,
                likes: response !== null ? response?._count.likes : 0,
                userLikes: userLikes,
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
            const userLikes = await getUserLikes({ sessionId, slug });
            console.log(slug);
            return res.status(201).json({
                views: response !== null ? response?._count.views : 0,
                likes: response !== null ? response?._count.likes : 0,
                userLikes: 0,
            });
        } else {
            res.status(405).json({ message: "Method not allowed" });
        }
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(500).json({
                message: error.message ?? "Internal Server Error",
            });
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

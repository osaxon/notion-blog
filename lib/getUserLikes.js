import { prisma } from "./prisma";

export const getUserLikes = async ({ sessionId, slug }) =>
    await prisma.like.count({
        where: {
            sessionId,
            ContentMeta: {
                slug,
            },
        },
    });

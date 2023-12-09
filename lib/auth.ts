
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export function withSiteAuth(action: any) {
    return async (
        formData: FormData | null,
        siteId: string,
        key: string | null,
    ) => {
        const session = auth();
        if (!session.userId) {
            return {
                error: "Not authenticated",
            };
        }
        const site = await prisma.site.findUnique({
            where: {
                id: siteId,
            },
        });
        if (!site || site.userId !== session.userId) {
            return {
                error: "Not authorized",
            };
        }

        return action(formData, site, key);
    };
}


export function withBlogAuth(action: any) {
    return async (
        formData: FormData | null,
        postId: string,
        key: string | null,
    ) => {
        const session = auth();
        if (!session.userId) {
            return {
                error: "Not authenticated",
            };
        }
        const post = await prisma.blog.findUnique({
            where: {
                id: postId,
            },
            include: {
                site: true,
            },
        });
        if (!post || post.userId !== session.userId) {
            return {
                error: "Post not found",
            };
        }

        return action(formData, post, key);
    };
}
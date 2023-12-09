"use server";

import prisma from "@/lib/db";
import { Blog, Site } from "@prisma/client";
import { nanoid } from "nanoid";
import { revalidateTag } from "next/cache";

import {
    addDomainToVercel,
    // getApexDomain,
    removeDomainFromVercelProject,
    // removeDomainFromVercelTeam,
    validDomainRegex,
} from "@/lib/domains";
import { getBlurDataURL } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { put } from '@vercel/blob';
import { withBlogAuth, withSiteAuth } from "./auth";




export const createSite = async (formData: FormData) => {
    const session = auth();
    if (!session.userId) {
        return {
            error: "Not authenticated",
        };
    }
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const subdomain = formData.get("subdomain") as string;

    try {
        const response = await prisma.site.create({
            data: {
                name,
                description,
                subdomain,
                user: {
                    connect: {
                        id: session.userId,
                    },
                },
            },
        });
        await revalidateTag(
            `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
        );
        return response;
    } catch (error: any) {
        if (error.code === "P2002") {
            return {
                error: `This subdomain is already taken`,
            };
        } else {
            return {
                error: error.message,
            };
        }
    }
};

export const updateSite = withSiteAuth(
    async (formData: FormData, site: Site, key: string) => {
        const value = formData.get(key) as string;

        try {
            let response;

            if (key === "customDomain") {
                if (value.includes("vercel.pub")) {
                    return {
                        error: "Cannot use vercel.pub subdomain as your custom domain",
                    };

                    // if the custom domain is valid, we need to add it to Vercel
                } else if (validDomainRegex.test(value)) {
                    response = await prisma.site.update({
                        where: {
                            id: site.id,
                        },
                        data: {
                            customDomain: value,
                        },
                    });
                    await Promise.all([
                        addDomainToVercel(value),
                        // Optional: add www subdomain as well and redirect to apex domain
                        // addDomainToVercel(`www.${value}`),
                    ]);

                    // empty value means the user wants to remove the custom domain
                } else if (value === "") {
                    response = await prisma.site.update({
                        where: {
                            id: site.id,
                        },
                        data: {
                            customDomain: null,
                        },
                    });
                }

                // if the site had a different customDomain before, we need to remove it from Vercel
                if (site.customDomain && site.customDomain !== value) {
                    response = await removeDomainFromVercelProject(site.customDomain);

                    /* Optional: remove domain from Vercel team 
          
                    // first, we need to check if the apex domain is being used by other sites
                    const apexDomain = getApexDomain(`https://${site.customDomain}`);
                    const domainCount = await prisma.site.count({
                      where: {
                        OR: [
                          {
                            customDomain: apexDomain,
                          },
                          {
                            customDomain: {
                              endsWith: `.${apexDomain}`,
                            },
                          },
                        ],
                      },
                    });
          
                    // if the apex domain is being used by other sites
                    // we should only remove it from our Vercel project
                    if (domainCount >= 1) {
                      await removeDomainFromVercelProject(site.customDomain);
                    } else {
                      // this is the only site using this apex domain
                      // so we can remove it entirely from our Vercel team
                      await removeDomainFromVercelTeam(
                        site.customDomain
                      );
                    }
                    
                    */
                }
            } else if (key === "image" || key === "logo") {
                if (!process.env.BLOB_READ_WRITE_TOKEN) {
                    return {
                        error:
                            "Missing BLOB_READ_WRITE_TOKEN token. Note: Vercel Blob is currently in beta – please fill out this form for access: https://tally.so/r/nPDMNd",
                    };
                }

                const file = formData.get(key) as File;
                const filename = `${nanoid()}.${file.type.split("/")[1]}`;

                const { url } = await put(filename, file, {
                    access: "public",
                });

                const blurhash = key === "image" ? await getBlurDataURL(url) : null;

                response = await prisma.site.update({
                    where: {
                        id: site.id,
                    },
                    data: {
                        [key]: url,
                        ...(blurhash && { imageBlurhash: blurhash }),
                    },
                });
            } else {
                response = await prisma.site.update({
                    where: {
                        id: site.id,
                    },
                    data: {
                        [key]: value,
                    },
                });
            }
            console.log(
                "Updated site data! Revalidating tags: ",
                `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
                `${site.customDomain}-metadata`,
            );
            await revalidateTag(
                `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
            );
            site.customDomain &&
                (await revalidateTag(`${site.customDomain}-metadata`));

            return response;
        } catch (error: any) {
            if (error.code === "P2002") {
                return {
                    error: `This ${key} is already taken`,
                };
            } else {
                return {
                    error: error.message,
                };
            }
        }
    },
);

export const deleteSite = withSiteAuth(async (_: FormData, site: Site) => {
    try {
        const response = await prisma.site.delete({
            where: {
                id: site.id,
            },
        });
        await revalidateTag(
            `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
        );
        response.customDomain &&
            (await revalidateTag(`${site.customDomain}-metadata`));
        return response;
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
});

export const getSiteFromPostId = async (postId: string) => {
    const post = await prisma.blog.findUnique({
        where: {
            id: postId,
        },
        select: {
            siteId: true,
        },
    });
    return post?.siteId;
};

export const createPost = withSiteAuth(async (_: FormData, site: Site) => {
    const UserId = auth();
    if (!UserId?.userId) {
        return {
            error: "Not authenticated",
        };
    }
    const response = await prisma.blog.create({
        data: {
            siteId: site.id,
            userId: UserId?.userId,
        },
    });

    await revalidateTag(
        `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
    );
    site.customDomain && (await revalidateTag(`${site.customDomain}-posts`));

    return response;
});

// creating a separate function for this because we're not using FormData
export const updatePost = async (data: Blog) => {
    const UserId = auth();
    if (!UserId?.userId) {
        return {
            error: "Not authenticated",
        };
    }
    const post = await prisma.blog.findUnique({
        where: {
            id: data.id,
        },
        include: {
            site: true,
        },
    });
    if (!post || post.userId !== UserId.userId) {
        return {
            error: "Post not found",
        };
    }
    try {
        const response = await prisma.blog.update({
            where: {
                id: data.id,
            },
            data: {
                title: data.title,
                description: data.description,
                content: data.content,
            },
        });

        await revalidateTag(
            `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
        );
        await revalidateTag(
            `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
        );

        // if the site has a custom domain, we need to revalidate those tags too
        post.site?.customDomain &&
            (await revalidateTag(`${post.site?.customDomain}-posts`),
                await revalidateTag(`${post.site?.customDomain}-${post.slug}`));

        return response;
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
};

export const updatePostMetadata = withBlogAuth(
    async (
        formData: FormData,
        blog: Blog & {
            site: Site;
        },
        key: string,
    ) => {
        const value = formData.get(key) as string;

        try {
            let response;
            if (key === "image") {
                const file = formData.get("image") as File;
                const filename = `${nanoid(7)}.${file.type.split("/")[1]}`;

                const { url } = await put(filename, file, {
                    access: "public",
                });

                const blurhash = await getBlurDataURL(url);

                response = await prisma.blog.update({
                    where: {
                        id: blog.id,
                    },
                    data: {
                        image: url,
                        imageBlurhash: blurhash,
                    },
                });
            } else {
                response = await prisma.blog.update({
                    where: {
                        id: blog.id,
                    },
                    data: {
                        [key]: key === "published" ? value === "true" : value,
                    },
                });
            }

            await revalidateTag(
                `${blog.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
            );
            await revalidateTag(
                `${blog.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${blog.slug}`,
            );

            // if the site has a custom domain, we need to revalidate those tags too
            blog.site?.customDomain &&
                (await revalidateTag(`${blog.site?.customDomain}-posts`),
                    await revalidateTag(`${blog.site?.customDomain}-${blog.slug}`));

            return response;
        } catch (error: any) {
            if (error.code === "P2002") {
                return {
                    error: `This slug is already in use`,
                };
            } else {
                return {
                    error: error.message,
                };
            }
        }
    },
);

export const deletePost = withBlogAuth(async (_: FormData, blog: Blog) => {
    try {
        const response = await prisma.blog.delete({
            where: {
                id: blog.id,
            },
            select: {
                siteId: true,
            },
        });
        return response;
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
});

export const editUser = async (
    formData: FormData,
    _id: unknown,
    key: string,
) => {
    const UserId = auth();
    if (!UserId?.userId) {
        return {
            error: "Not authenticated",
        };
    }
    const value = formData.get(key) as string;

    try {
        let response;

        if (key === "avatar") {
            if (!process.env.BLOB_READ_WRITE_TOKEN) {
                return {
                    error:
                        "Missing BLOB_READ_WRITE_TOKEN token. Note: Vercel Blob is currently in beta – please fill out this form for access: https://tally.so/r/nPDMNd",
                };
            }
            const file = formData.get(key) as File;
            const filename = `${nanoid(7)}.${file.type.split("/")[1]}`;

            const { url } = await put(filename, file, {
                access: "public",
            });

            // const blurhash = await getBlurDataURL(url);

            response = await prisma.user.update({
                where: {
                    id: UserId.userId,
                },
                data: {
                    avatar: url,
                },
            });
        } else {
            response = await prisma.user.update({
                where: {
                    id: UserId.userId,
                },
                data: {
                    [key]: value,
                },
            });
        }
        return response;
    } catch (error: any) {
        if (error.code === "P2002") {
            return {
                error: `This ${key} is already in use`,
            };
        } else {
            return {
                error: error.message,
            };
        }
    }
};



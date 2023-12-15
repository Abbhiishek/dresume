import BlurImage from "@/components/blur-image";
import BlogCard from "@/components/domain/blog-card";
import MDX from "@/components/mdx";
import prisma from "@/lib/db";
import { getBlogData, getSiteData } from "@/lib/fetchers";
import { placeholderBlurhash, toDateString } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";


export const dynamic = 'force-dynamic'


export async function generateMetadata({
    params,
}: {
    params: { domain: string; slug: string };
}) {
    const domain = decodeURIComponent(params.domain);
    const slug = decodeURIComponent(params.slug);

    const [data, siteData] = await Promise.all([
        getBlogData(domain, slug),
        getSiteData(domain),
    ]);
    if (!data || !siteData) {
        return null;
    }
    const { title, description } = data;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            creator: "@vercel",
        },
        // Optional: Set canonical URL to custom domain if it exists
        // ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
        //   siteData.customDomain && {
        //     alternates: {
        //       canonical: `https://${siteData.customDomain}/${params.slug}`,
        //     },
        //   }),
    };
}

export async function generateStaticParams() {
    const allPosts = await prisma.blog.findMany({
        select: {
            slug: true,
            site: {
                select: {
                    subdomain: true,
                    customDomain: true,
                },
            },
        },
        // feel free to remove this filter if you want to generate paths for all posts
        where: {
            site: {
                subdomain: "demo",
            },
        },
    });

    const allPaths = allPosts
        .flatMap(({ site, slug }) => [
            site?.subdomain && {
                domain: `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
                slug,
            },
            site?.customDomain && {
                domain: site.customDomain,
                slug,
            },
        ])
        .filter(Boolean);

    return allPaths;
}

export default async function SitePostPage({
    params,
}: {
    params: { domain: string; slug: string };
}) {
    const domain = decodeURIComponent(params.domain);
    const slug = decodeURIComponent(params.slug);
    const data = await getBlogData(domain, slug);

    if (!data) {
        notFound();
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center mb-10">
                <div className="relative m-auto mb-10 h-96 w-full max-w-screen-lg overflow-hidden md:mb-20 md:h-150 md:w-5/6 md:rounded-2xl lg:w-2/3">
                    <BlurImage
                        alt={data.title ?? "Post image"}
                        width={1200}
                        height={630}
                        className="h-full w-full object-cover border-3"
                        placeholder="blur"
                        blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
                        src={data.image ?? "/placeholder.png"}
                    />
                </div>
                <div className="m-auto w-full text-center md:w-7/12">
                    <h1 className="mb-10 font-title text-3xl font-bold text-stone-800 dark:text-white md:text-6xl">
                        {data.title}
                    </h1>
                    <p className="m-auto my-5 w-10/12 text-sm font-light text-stone-500 dark:text-stone-400 md:text-base">
                        {toDateString(data.createdAt)}
                    </p>
                    <p className="text-md m-auto w-10/12 text-stone-600 dark:text-stone-400 md:text-lg ">
                        {data.description}
                    </p>
                </div>
                <Link
                    // if you are using Github OAuth, you can get rid of the Twitter option
                    href={
                        data.site?.githubid ? data.site?.githubid : data.site?.linkedinid ? data.site?.linkedinid : data.site?.instagramid || ""
                    }
                    rel="noreferrer"
                    target="_blank"
                >
                    <div className="">
                        <div className="text-md ml-3 inline-block align-middle dark:text-white md:text-lg">
                            <span className="font-semibold">{data.site?.user?.firstname} {" "} {data.site?.user?.lastname}</span>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="flex justify-center items-center">
                <MDX source={data.mdxSource} />
            </div>
            {data.adjacentPosts.length > 0 && (
                <div className="relative mb-20 mt-10 sm:mt-20">
                    <div
                        className="absolute inset-0 flex items-center"
                        aria-hidden="true"
                    >
                        <div className="w-full border-t border-stone-300 dark:border-stone-700" />
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white px-2 text-sm text-stone-500 dark:bg-black dark:text-stone-400">
                            Continue Reading
                        </span>
                    </div>
                </div>
            )}
            {data.adjacentPosts && (
                <div className="mx-5 mb-20 grid max-w-screen-xl grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 xl:mx-auto xl:grid-cols-3">
                    {data.adjacentPosts.map((data: any, index: number) => (
                        <BlogCard key={index} data={data} />
                    ))}
                </div>
            )}
        </>
    );
}

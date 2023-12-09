// import BlogCard from "@/components/blog-card";
// import BlurImage from "@/components/blur-image";
import { TypographyLarge } from "@/components/common/Typography";
import prisma from "@/lib/db";
import { getPostsForSite, getSiteData } from "@/lib/fetchers";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const allSites = await prisma.site.findMany({
        select: {
            subdomain: true,
            customDomain: true,
        },
        // feel free to remove this filter if you want to generate paths for all sites
        where: {
            subdomain: "demo",
        },
    });

    const allPaths = allSites
        .flatMap(({ subdomain, customDomain }) => [
            subdomain && {
                domain: `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
            },
            customDomain && {
                domain: customDomain,
            },
        ])
        .filter(Boolean);

    return allPaths;
}

export default async function SiteHomePage({
    params,
}: {
    params: { domain: string };
}) {
    const domain = decodeURIComponent(params.domain);
    const [data, posts] = await Promise.all([
        getSiteData(domain),
        getPostsForSite(domain),
    ]);

    if (!data) {
        notFound();
    }

    return (
        <main className="container text-center flex flex-col justify-center items-center ">
            <TypographyLarge>Welcome to {data.user?.username} portfolio</TypographyLarge>
            <Image
                src={data.user?.avatar!}
                width={500}
                height={500}
                className="rounded-full"
                alt={data.user?.firstname!}
            />
        </main>
    );
}

import { ReactNode } from "react";
// import CTA from "@/components/cta";
// import ReportAbuse from "@/components/report-abuse";
import { TypographyH1 } from "@/components/common/Typography";
import { getSiteData } from "@/lib/fetchers";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({
    params,
}: {
    params: { domain: string };
}): Promise<Metadata | null> {
    const domain = decodeURIComponent(params.domain);
    const data = await getSiteData(domain);
    if (!data) {
        return null;
    }
    const {
        name: title,
        description,
        image,
        logo,
    } = data as {
        name: string;
        description: string;
        image: string;
        logo: string;
    };

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [image],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            creator: "@vercel",
        },
        icons: [logo],
        metadataBase: new URL(`https://${domain}`),
        // Optional: Set canonical URL to custom domain if it exists
        // ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
        //   data.customDomain && {
        //     alternates: {
        //       canonical: `https://${data.customDomain}`,
        //     },
        //   }),
    };
}

export default async function HostedPortfolioLayout({
    params,
    children,
}: {
    params: { domain: string };
    children: ReactNode;
}) {
    const domain = decodeURIComponent(params.domain);
    const data = await getSiteData(domain);

    // console.log("data from layout.tsx", data)

    if (!data) {
        notFound();
    }

    // Optional: Redirect to custom domain if it exists
    if (
        domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
        data.customDomain &&
        process.env.REDIRECT_TO_CUSTOM_DOMAIN_IF_EXISTS === "true"
    ) {
        return redirect(`https://${data.customDomain}`);
    }

    return (
        <main className="text-center lg:container py-10 h-screen">
            <TypographyH1>Domain page</TypographyH1>
            {children}
        </main>
    );
}
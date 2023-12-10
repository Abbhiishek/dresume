import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";
import SiteSettingsNav from "./PortfolioSettingNav";



export default async function SiteAnalyticsLayout({
    params,
    children,
}: {
    params: { slug: string };
    children: ReactNode;
}) {
    const session = auth();
    if (!session.userId) {
        redirect("/");
    }
    const data = await prisma.site.findUnique({
        where: {
            id: decodeURIComponent(params.slug),
        },
    });

    if (!data || data.userId !== session.userId) {
        notFound();
    }
    return (
        <main className="lg:container ">
            <SiteSettingsNav />
            {children}
        </main>
    );
}

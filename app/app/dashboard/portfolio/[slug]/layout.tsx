
import { TypographyH4 } from "@/components/common/Typography";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";


export default async function SiteLayout({ children, params }:
    { children: ReactNode, params: { slug: string } }) {

    const session = auth();
    if (!session) {
        redirect("/login");
    }
    const data = await prisma.site.findUnique({
        where: {
            id: decodeURIComponent(params.slug),
        },
    });

    if (!data || data.userId !== session.userId) {
        notFound();
    }

    const url = `${data.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;


    return (
        <div className="flex max-w-screen-xl flex-col space-y-12">
            <div className="flex flex-col space-y-6">
                <Link
                    href={
                        process.env.NEXT_PUBLIC_VERCEL_ENV
                            ? `https://${url}`
                            : `http://${data.subdomain}.localhost:3000`
                    }
                    target="_blank"
                    passHref
                    legacyBehavior
                    className="rounded-3xl border-3 border-primary"
                >
                    <Button
                        variant="flat"
                        color="primary"
                    >
                        <TypographyH4>🔗{"  "}{url}{" "} 🎉</TypographyH4>
                    </Button>
                </Link>
                {children}
            </div>
        </div>
    );
}

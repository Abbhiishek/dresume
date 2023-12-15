import { TypographyH1, TypographyH4 } from "@/components/common/Typography";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
async function SinglePortfolioPage({
    params,
}: {
    params: { slug: string };
}) {

    const session = auth();
    if (!session) {
        redirect("/sign-in");
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
        <div>
            <Link
                href={
                    process.env.NEXT_PUBLIC_VERCEL_ENV
                        ? `https://${url}`
                        : `http://${data.subdomain}.localhost:3000`
                }
                target="_blank"
            >
                <Button
                    variant="bordered"
                    color="primary"
                >
                    <TypographyH4>🔗{"  "}{url}{" "} 🎉</TypographyH4>
                </Button>
            </Link>
            <TypographyH1>Here will come all the cool stuff about your portfolio 😎🌱</TypographyH1>
        </div>
    )
}

export default SinglePortfolioPage
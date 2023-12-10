import prisma from "@/lib/db";


export default async function PortfolioSettingsIndex({
    params,
}: {
    params: { slug: string };
}) {

    const data = await prisma.site.findUnique({
        where: {
            id: decodeURIComponent(params?.slug),
        },
    });

    return (
        <main className="container text-center">
            <h1>Portfolio settings page</h1>
            <p>in progress.....</p>
        </main>
    )
}

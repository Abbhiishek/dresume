import prisma from "@/lib/db";




export default async function AppearanceSection({ siteId }: { siteId: string }) {

    const data = await prisma.site.findUnique({
        where: {
            id: decodeURIComponent(siteId),
        },
        select: {
            workexperience: true,
        }
    });



    return (
        <main>
            <h1>Coming Soon</h1>
        </main>
    )


}
import { TypographyH3 } from "@/components/common/Typography";
import AllPortfolioLayout from "@/components/dashboard/portfolio/AllPortfolio";
import CreatePortfolio from "@/components/dashboard/portfolio/CreatePortfolio";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function PortfolioPage() {

    const session = auth();
    if (!session.userId) {
        redirect("/")
    }

    return (
        <main className="lg:container">
            <div className="flex justify-between items-center mb-10">
                <TypographyH3>All Portfolio</TypographyH3>
                <CreatePortfolio />
            </div>
            <AllPortfolioLayout userid={session.userId} />
        </main>
    )
}

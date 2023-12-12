import { TypographyH3 } from "@/components/common/Typography";
import AllPortfolioLayout from "@/components/dashboard/portfolio/AllPortfolio";
import CreatePortfolio from "@/components/dashboard/portfolio/CreatePortfolio";

export default async function PortfolioPage({ params }: { params: { id: string } }) {
    return (
        <main className="lg:container">
            <div className="flex justify-between items-center mb-10">
                <TypographyH3>All Portfolio</TypographyH3>
                <CreatePortfolio />
            </div>
            {/* @ts-expect-error Server Component */}
            <AllPortfolioLayout siteId={decodeURIComponent(params.id)} />
        </main>
    )
}

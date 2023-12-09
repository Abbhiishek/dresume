import { TypographyH3 } from "@/components/common/Typography";
import { Button } from "@nextui-org/react";

export default async function PortfolioPage() {
    return (
        <main>
            <div className="flex justify-between items-center">
                <TypographyH3>All Portfolio</TypographyH3>
                <Button
                    variant="bordered"
                    color="primary"
                >
                    Create Portfolio
                </Button>
            </div>
        </main>
    )
}

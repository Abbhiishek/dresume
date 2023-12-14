import { TypographyH1 } from "@/components/common/Typography";


async function SinglePortfolioPage({
    params,
}: {
    params: { slug: string };
}) {


    return (
        <div>
            <TypographyH1>Here will come all the cool stuff about your portfolio 😎🌱</TypographyH1>
        </div>
    )
}

export default SinglePortfolioPage
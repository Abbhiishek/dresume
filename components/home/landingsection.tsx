
import { APP_DASHBOARD_LINK, APP_DESC, APP_GITHUB_REPO_LINK, APP_NAME } from "@/lib/contants";
import { Button } from "@nextui-org/react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { TypographyH1 } from "../common/Typography";


function LandingSection() {
    return (
        <div className="lg:container py-32 mx-auto sm:py-48 min-h-screen">
            <div className="text-center">
                <TypographyH1 className="text-4xl font-bold font-cal  sm:text-9xl text-primary">
                    {APP_NAME}
                </TypographyH1>
                <p className="mt-6 text-lg leading-8 font-cal">
                    {APP_DESC}
                </p>
                <div className="mt-10 flex flex-row justify-center items-center gap-10 ">
                    <Link
                        href={APP_DASHBOARD_LINK}
                        passHref
                    >
                        <Button
                            size="lg"
                            color="success"
                            variant="shadow"
                            className="bg-gradient-to-tr from-green-300 to-green-600 text-white shadow-2xl"
                        >
                            Get Started
                        </Button>
                    </Link>
                    <Link
                        href={APP_GITHUB_REPO_LINK}
                        passHref
                    >
                        <Button
                            size="lg"
                            radius="full"
                            color="success"
                            variant="ghost"
                            startContent={<GitHubLogoIcon className="w-5 h-5" />}
                        >
                            Github
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default LandingSection
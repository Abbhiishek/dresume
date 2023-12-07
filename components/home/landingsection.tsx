
import { APP_DESC, APP_NAME } from "@/lib/contants";
import { Button } from "@nextui-org/button";
import Link from "next/link";
function LandingSection() {
    return (
        <div className="max-w-2xl py-32 mx-auto sm:py-48 ">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                    <span className="block xl:inline">{APP_NAME}</span>
                </h1>
                <p className="mt-6 text-lg leading-8 ">
                    {APP_DESC}
                </p>
                <div className="flex items-center justify-center mt-10">
                    <Link
                        href="/sign-in"
                    >
                        <Button color="primary" variant="bordered">
                            Join Waitlist 🥳
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LandingSection
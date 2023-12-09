import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <main className="container mx-auto w-full flex justify-center lg:py-10">
            <SignIn
                afterSignInUrl={'/dashboard'}
                afterSignUpUrl={'/dashboard'}
            />
        </main>
    )
}
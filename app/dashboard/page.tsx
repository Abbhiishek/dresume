import { RocketIcon } from "@radix-ui/react-icons"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export default function Page() {
    return (
        <main className="h-screen flex justify-center items-center relative">
            <div className='absolute -inset-0 max-w-xl  mt-4 -z-10 blur-md animate-color-border bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500' />
            <Alert className="max-w-xl animate-color-border ">
                <RocketIcon className="h-4 w-4" />
                <AlertTitle>You are in 🚀</AlertTitle>
                <AlertDescription>
                    Thanks for joining waitlist!
                </AlertDescription>
            </Alert>
        </main>
    )
}

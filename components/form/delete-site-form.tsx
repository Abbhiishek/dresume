"use client";

import { deleteSite } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Input } from "@nextui-org/react";
import va from "@vercel/analytics";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { useToast } from "../ui/use-toast";


export default function DeleteSiteForm({ siteName }: { siteName: string }) {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const { toast } = useToast()
    return (
        <form
            action={async (data: FormData) =>
                window.confirm("Are you sure you want to delete your site?") &&
                deleteSite(data, id, "delete")
                    .then(async (res) => {
                        if (res.error) {
                            toast({
                                title: "An error occurred.",
                                description: res.error,
                                variant: "destructive",
                            });
                        } else {
                            va.track("Deleted Site");
                            router.refresh();
                            router.push("/sites");
                            toast({
                                title: "🌱",
                                description: `Successfully deleted site!`,
                            });
                        }
                    })
                    .catch((err: Error) => {
                        toast({
                            title: "An error occurred.",
                            description: err.message,
                            variant: "destructive",
                        });
                    })}
            className="rounded-lg border border-red-600 bg-white dark:bg-black"
        >
            <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
                <h2 className="font-title text-xl dark:text-white">Delete Site</h2>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                    Deletes your site and all posts associated with it. Type in the name
                    of your site <b>{siteName}</b> to confirm.
                </p>

                <Input
                    name="confirm"
                    type="text"
                    required
                    pattern={siteName}
                    placeholder={siteName}
                    className="w-full max-w-md rounded-md  border-red-600 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700 active:border-red-500"
                />
            </div>

            <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
                <p className="text-center text-sm text-stone-500 dark:text-stone-400">
                    This action is irreversible. Please proceed with caution.
                </p>
                <div className="w-32">
                    <FormButton />
                </div>
            </div>
        </form>
    );
}

function FormButton() {
    const { pending } = useFormStatus();
    return (
        <button
            className={cn(
                "flex h-8 w-32 items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-10",
                pending
                    ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
                    : "border-red-600 bg-red-600 text-white hover:bg-white hover:text-red-600 dark:hover:bg-transparent",
            )}
            disabled={pending}
        >
            {pending ? <Loader2 className="animate-spin w-4 h-4" /> : <p>Confirm Delete</p>}
        </button>
    );
}

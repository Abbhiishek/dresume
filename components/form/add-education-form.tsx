"use client";

import { useToast } from "@/components/ui/use-toast";
import { addEducation } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Input } from "@nextui-org/react";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { z } from "zod";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const CreateEducationSchema = z.object({
    school_name: z.string({
    }).min(5, {
        message: "Name must be at least 5 characters long"
    }),
    school_location: z.string({
        description: "Location is required",
        required_error: "Location is required",
        invalid_type_error: "Location is must be string",
    }).min(10, {
        message: "Location must be at least 10 characters long"
    }),
    school_degree: z.string(),
    school_major: z.string(),
    school_start_date: z.date({
        description: "Start Date is required",
    }),
    school_end_date: z.date({
        description: "End Date is required",
    }),
    education_note: z.string({
        description: "Note is required",
    }).max(225, {
        message: "Note must be at most 225 characters long"
    })
})


export default function AddEducationForm() {
    const { slug } = useParams() as { slug: string };
    const router = useRouter();
    const { toast } = useToast()
    const [formerror, setFormerror] = useState("")
    const [loading, setLoading] = useState(false)


    const [data, setData] = useState({
        school_name: "",
        school_location: "",
        school_degree: "",
        school_major: "",
        school_start_date: new Date(),
        school_end_date: new Date(),
        education_note: "",
    })


    return (
        <form
            action={async () => {


                const result = CreateEducationSchema.safeParse({
                    school_name: data.school_name,
                    school_location: data.school_location,
                    school_degree: data.school_degree,
                    school_major: data.school_major,
                    school_start_date: data.school_start_date,
                    school_end_date: data.school_end_date,
                    education_note: data.education_note,
                })


                if (!result.success) {
                    setFormerror(result.error.errors[0].message)
                    setLoading(false)
                } else {
                    setFormerror("")
                    const formData = new FormData();
                    formData.append("school_name", data.school_name);
                    formData.append("school_location", data.school_location);
                    formData.append("school_degree", data.school_degree);
                    formData.append("school_major", data.school_major);
                    formData.append("school_start_date", data.school_start_date.toISOString());
                    formData.append("school_end_date", data.school_end_date.toISOString());
                    formData.append("education_note", data.education_note);

                    addEducation(formData, "profile", slug).then(async (res: any) => {
                        if (res.error) {
                            // toast.error(res.error);
                            console.log(res.error)
                            toast({
                                title: "An error occurred.",
                                description: res.error,
                                variant: "destructive",
                            });
                        } else {
                            if (slug) {
                                router.refresh();
                            } else {
                                router.refresh();
                            }
                            toast({
                                title: "🌱",
                                description: `Successfully updated Education!`,
                            });
                        }
                    });
                }
            }}
            className="rounded-lg border border-stone-200 bg-white dark:border-stone-700 dark:bg-black"
        >
            <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
                <h2 className="font-title text-xl dark:text-white">Add Education</h2>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                    This will be visible in your Portfolio.
                </p>
                <div className="flex flex-row justify-between gap-4">
                    <div className="mb-4 w-full">
                        <Label htmlFor="name">Degree Name</Label>
                        <Input
                            type="text"
                            value={data.school_degree}
                            id="school_degree"
                            required={true}
                            onChange={(e) => setData({ ...data, school_degree: e.target.value })}
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <Label htmlFor="school_major">Degree Major</Label>
                        <Input
                            value={data.school_major}
                            id="school_major"
                            onChange={(e) => setData({ ...data, school_major: e.target.value })}
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between gap-4">
                    <div className="mb-4 w-full">
                        <Label htmlFor="school_name">School/ College Name</Label>
                        <Input

                            placeholder=""
                            type="text"
                            value={data.school_name}
                            id="school_name"
                            onChange={(e) => setData({ ...data, school_name: e.target.value })}
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <Label htmlFor="school_location">Insitution Location</Label>
                        <Input

                            placeholder=""
                            type="text"
                            value={data.school_location}
                            id="school_location"
                            onChange={(e) => setData({ ...data, school_location: e.target.value })}
                        />
                    </div>
                </div>
                <div className="flex flex-row justify-between gap-4">
                    <div className="mb-4 w-full">
                        <Label htmlFor="school_start_date">Start Date</Label>
                        <Input
                            placeholder=""
                            type="date"
                            value={data.school_start_date.toISOString().split('T')[0]}
                            id="school_start_date"
                            onChange={(e) => {
                                const date = new Date(e.target.value);
                                setData({ ...data, school_start_date: date })
                            }}
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <Label htmlFor="school_end_date">End Date</Label>
                        <Input
                            placeholder=""
                            type="date"
                            value={data.school_end_date.toISOString().split('T')[0]}
                            id="school_end_date"
                            onChange={(e) => {
                                const date = new Date(e.target.value);
                                setData({ ...data, school_end_date: date })
                            }}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <Label htmlFor="education_note">Description</Label>
                    <Textarea
                        placeholder=""
                        value={data.education_note}
                        id="education_note"
                        onChange={(e) => {
                            setData({ ...data, education_note: e.target.value })
                        }}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
                <p className="text-sm text-red-900 dark:text-red-500">{formerror}</p>
                <FormButton />
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
                    : "border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800",
            )}
            disabled={pending}
        >
            {pending ? <Loader2 className="animate-spin w-4 h-4" /> : <p>Save Changes</p>}
        </button>
    );
}

"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { addEducation, updateEducation } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserEducation } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Editor as NovelEditor } from "novel";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const CreateEducationSchema = z.object({
    school_name: z.string({
        description: "Name is required",
        required_error: "Name is required",
        invalid_type_error: "Name is must be string",
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



export default function AddEducationForm({
    title,
    method,
    education
}: {
    title: string;
    method: 'add' | 'edit';
} & (
        | { method: 'add'; education?: never }
        | {
            method: 'edit';
            education: UserEducation;
        }
    )) {

    const [open, setOpen] = useState(false);
    const { slug } = useParams() as { slug: string };
    const router = useRouter();

    const form = useForm<z.infer<typeof CreateEducationSchema>>({
        resolver: zodResolver(CreateEducationSchema),
        defaultValues: education ? {
            school_name: education.school_name,
            school_location: education.school_location || "",
            school_degree: education.school_degree || "",
            school_major: education.school_major || "",
            school_start_date: new Date(education.school_start_date!) || new Date(),
            school_end_date: new Date(education.school_end_date!) || new Date(),
            education_note: education.education_note || "",
        } : {
            school_start_date: new Date(),
            school_end_date: new Date(),
        },
    })


    function onSubmit(values: z.infer<typeof CreateEducationSchema>) {
        if (form.formState.isValid) {
            try {
                const formData = new FormData();
                formData.append("school_name", values.school_name);
                formData.append("school_location", values.school_location);
                formData.append("school_degree", values.school_degree);
                formData.append("school_major", values.school_major);
                formData.append("school_start_date", values.school_start_date.toISOString());
                formData.append("school_end_date", values.school_end_date.toISOString());
                formData.append("education_note", values.education_note);

                if (method === "add") {
                    addEducation(formData, "profile", slug).then(async (res: any) => {
                        if (res.error) {
                            // toast.error(res.error);
                            console.log(res.error)
                            toast("An error occurred.");
                        } else {
                            if (slug) {
                                setOpen(false)
                                router.refresh();
                            } else {
                                setOpen(false)
                                router.refresh();
                            }
                            toast("🌱 Successfully added Education!");
                        }
                    });
                } else if (method === "edit") {
                    console.log(education.id)
                    updateEducation(
                        education.id,
                        "null",
                        formData
                    ).then(async (res: any) => {
                        if (res.error) {
                            // toast.error(res.error);
                            console.log(res.error)
                            toast("An error occurred.");
                        } else {
                            if (slug) {
                                setOpen(false)
                                router.refresh();
                            } else {
                                setOpen(false)
                                router.refresh();
                            }
                            toast("🌱 Successfully updated Education!");
                        }
                    }
                    );
                } else {
                    toast("method not allowed");
                }
            } catch (error) {
                console.log(error)
                toast("An error occurred.");
            }
        } else {
            toast("Kindly fill the form correctly.");
        }
    }



    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <Button className="rounded-full !bg-green-600 w-full">{
                        method === "add" ? "Add Education" : "Edit"
                    }</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will be visible in your Portfolio.
                        </AlertDialogDescription>
                        <ScrollArea className="h-[350px] px-2">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                                    <FormField
                                        control={form.control}
                                        name="school_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Institute name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your Institute name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex flex-row w-full items-center gap-4">
                                        <FormField
                                            control={form.control}
                                            name="school_start_date"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>From</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            value={field.value.toISOString().split('T')[0]}
                                                            type="date"
                                                            onChange={(e) => {
                                                                field.onChange(new Date(e.target.value))
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="school_end_date"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>To</FormLabel>
                                                    <FormControl>
                                                        <Input value={field.value.toISOString().split('T')[0]}
                                                            type="date"
                                                            onChange={(e) => {
                                                                field.onChange(new Date(e.target.value))
                                                            }} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="school_degree"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Degree</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Your Degree"
                                                        {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="school_major"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Field of Study</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="ex. Computer Science"
                                                        {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="school_location"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Institute Location</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Patna, Bihar, India"
                                                        {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="education_note"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Note</FormLabel>
                                                <FormControl>
                                                    <NovelEditor
                                                        className="w-full  !px-0 border-2 border-green-700 dark:border-green-200 rounded-md "
                                                        disableLocalStorage={true}
                                                        defaultValue={field.value || "Activities you performed ...."}

                                                        onUpdate={(editor) => {
                                                            field.onChange(editor?.storage.markdown.getMarkdown())
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </form>
                            </Form>
                        </ScrollArea>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async (e) => {
                                e.preventDefault();
                                onSubmit(form.getValues())
                            }} >
                            <Button type="submit" variant={"secondary"} className="w-full">Submit</Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>



        </>
    );
}

function FormButton() {
    const { pending } = useFormStatus();
    return (
        <Button
            variant={"secondary"}
            className={cn(
                "flex h-8 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-10",
                pending
                    ? "cursor-not-allowed "
                    : "",
            )}
            disabled={pending}
        >
            {pending ? <Loader2 className="animate-spin w-4 h-4" /> : <p>Save Changes</p>}
        </Button>
    );
}

'use client';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { addEducation } from "@/lib/actions";
import va from "@vercel/analytics";
import { Loader2, PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";


const CreatePortfolioSchema = z.object({
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


export default function AddEducationToProfile() {

    const router = useRouter();
    const [formerror, setFormerror] = useState("")
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        school_name: "",
        school_location: "",
        school_degree: "",
        school_major: "",
        school_start_date: new Date(),
        school_end_date: new Date(),
        education_note: "",
    })


    const handlesubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)


        const result = CreatePortfolioSchema.safeParse({
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

            await addEducation(formData).then((res: any) => {
                if (res.error) {
                    toast({
                        title: "Error",
                        description: res.error,
                        variant: "destructive"
                    })
                    setLoading(false)
                } else {
                    va.track("Created education");
                    router.refresh();
                    toast({
                        title: "Successfully added to your profile!",
                    })
                    setLoading(false)
                    setOpen(false);
                }
            })
        }

    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button
                    className="text-xs ">
                    <PlusCircleIcon className="w-6 h-6 " />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <span className="">
                            Add Education
                        </span>
                    </DialogTitle>
                    <DialogDescription>
                        <p className="inline text-red-500">{formerror}</p>
                        <ScrollArea
                            className="px-3 py-2 h-80"
                        >
                            <div>
                                <form onSubmit={handlesubmit}>
                                    <div className="mb-4">
                                        <Label htmlFor="name">Degree Name</Label>
                                        <Input
                                            type="text"
                                            placeholder="name"
                                            value={data.school_degree}
                                            id="school_degree"
                                            required={true}
                                            onChange={(e) => setData({ ...data, school_degree: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="school_major">Degree Major</Label>
                                        <Input
                                            placeholder="school_major"
                                            value={data.school_major}
                                            id="school_major"
                                            onChange={(e) => setData({ ...data, school_major: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="school_name">School/ College Name</Label>
                                        <Input

                                            placeholder=""
                                            type="text"
                                            value={data.school_name}
                                            id="school_name"
                                            onChange={(e) => setData({ ...data, school_name: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="school_location">Insitution Location</Label>
                                        <Input

                                            placeholder=""
                                            type="text"
                                            value={data.school_location}
                                            id="school_location"
                                            onChange={(e) => setData({ ...data, school_location: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="school_start_date">Start Date</Label>
                                        <Input
                                            placeholder=""
                                            type="date"
                                            value={data.school_start_date.toISOString().split('T')[0]}
                                            id="school_start_date"
                                            onChange={(e) => {
                                                // setData({ ...data, school_start_date: new Date(e.target.value) })

                                                // convert e.target.value to date
                                                const date = new Date(e.target.value);


                                                setData({ ...data, school_start_date: date })
                                            }}
                                        />
                                    </div>
                                    <div className="mb-4">
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
                                </form>
                            </div>
                        </ScrollArea>
                        <Separator className="my-4" />
                        <div className="flex flex-row items-center justify-center gap-5">
                            <Button
                                type="submit"
                                className="w-full"
                                onClick={handlesubmit}
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : "Create Project"}
                            </Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )

}
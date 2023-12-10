"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { UserEducation } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { deleteEducation } from "@/lib/actions";
import { toDateString } from "@/lib/utils";
import va from "@vercel/analytics";
import { useRouter } from "next/navigation";

function EducationCard({ data }: { data: UserEducation }) {

    const router = useRouter();

    return (
        <Card>
            <CardHeader>
                <CardTitle>{data.school_degree}</CardTitle>
                <CardDescription>
                    {data.school_major} - {data.school_name}
                    <br />
                    {data.school_location}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {data.education_note}
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2">
                {toDateString(data.school_start_date!)} - {toDateString(data.school_end_date!)}

                <div className="flex flex-warp gap-3">
                    <Button
                        variant="destructive"
                        className=""
                        onClick={

                            async () => {
                                deleteEducation(data.id!, "null").then((res) => {
                                    if (res.error) {
                                        console.log(res.error)
                                    } else {
                                        va.track("Deleted Post");
                                        router.refresh();
                                        toast({
                                            title: "Success",
                                            description: "Successfully deleted post!",
                                        });
                                    }
                                })
                            }
                        }
                    >
                        Delete
                    </Button>

                </div>
            </CardFooter>
        </Card>
    )
}

export default EducationCard
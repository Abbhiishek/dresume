import EducationCard from "@/components/dashboard/portfolio/education/EducationCard";
import AddEducationForm from "@/components/form/add-education-form";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

async function EducationSection() {

    const user = auth();
    if (!user.userId) {
        return ("/")
    }

    const education = await prisma.userEducation.findMany({
        where: {
            user_id: user.userId as string,
        },
        orderBy: {
            school_end_date: "desc",
        },


    })


    return education.length > 0 ? (
        <main className="lg:container w-full space-y-2">
            {education.map((education) => (
                <EducationCard
                    key={education.id}
                    data={education}
                />
            ))}
            <Separator />
            <AddEducationForm />
        </main>
    ) : (
        <main className="flex flex-col space-y-4  w-full">
            <p className="text-lg text-stone-500 text-center">
                You do not have any Education yet. Create one to get started.
            </p>
            <AddEducationForm />
        </main>
    );
}

export default EducationSection
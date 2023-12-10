import { TypographyH3 } from "@/components/common/Typography";
import AddEducationToProfile from "@/components/dashboard/education/AddEducationToProfile";
import EducationCard from "@/components/dashboard/education/EducationCard";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function page() {

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
        <main className="lg:container w-full">
            <div className="flex justify-between items-center mb-10">
                <TypographyH3>Education 🎒</TypographyH3>
                <AddEducationToProfile />
            </div>
            <div className=" w-full space-y-2">

                {education.map((education) => (
                    <EducationCard
                        key={education.id}
                        data={education}
                    />
                ))}
            </div>
        </main>
    ) : (
        <main className=" flex flex-col space-x-4 justify-center items-center">
            <div className="flex justify-between items-center mb-10 w-full">
                <TypographyH3>Education 🎒</TypographyH3>
                <AddEducationToProfile />
            </div>

            <Image
                alt="missing site"
                src="https://illustrations.popsy.co/gray/web-design.svg"
                width={400}
                height={400}
                className="rounded-lg"
            />
            <p className="text-lg text-stone-500">
                You do not have any Portfolio yet. Create one to get started.
            </p>
        </main>
    );
}

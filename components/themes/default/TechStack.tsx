import prisma from "@/lib/db"
import Image from "next/image"




async function TechStackSection({
    siteId
}: {
    siteId: string
}) {

    const techstack = await prisma.siteTechStack.findMany({
        where: {
            siteId: siteId
        },
        select: {
            TechStack: true
        }
    })




    return (
        <div id="Skills" className="min-h-[500px]  my-4 pt-5">
            <h4 className="text-6xl font-light mt-5">Tech I&apos;m Familiar With</h4>
            <div className="flex flex-col gap-5">
                <div className="text-left">
                    <div className="relative ">
                        <h1
                            className="absolute text-primary -top-20 left-3 opacity-10 uppercase font-bold lg:text-8xl text-5xl font-title"
                        >
                            skills
                        </h1>
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    {
                        techstack.map((tech, index) => (
                            <div className="lg:basis-2/12 pt-4 md:pb-0 " key={index}>
                                <div
                                    className="flex flex-row items-center justify-start duration-200 
                                    gap-4 transition-all hover:bg-stone-800 rounded-2xl px-3 ">
                                    <Image
                                        width={500}
                                        height={500}
                                        src={tech.TechStack.icon} alt={tech.TechStack.name} className="w-16 h-16"
                                    />
                                    <p className="text-center text-sm lg:text-lg font-semibold">{tech.TechStack.name}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default TechStackSection
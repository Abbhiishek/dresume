import { TypographyH4, TypographyMuted, TypographyP } from "@/components/common/Typography"
import { toDateString } from "@/lib/utils"
import { UserWorkExperience } from "@prisma/client"



function ExperienceSection({ workexperience }: { workexperience: UserWorkExperience[] }) {
    return (
        <section className="min-h-[500px]  my-4 pt-5" id="Education">
            <h4 className="text-6xl font-light mt-5">Experience</h4>
            <div className="text-left relative">
                <h1
                    className="absolute -top-16 left-3 opacity-10 uppercase 
                    font-bold lg:text-8xl text-5xl font-title "
                >
                    profile
                </h1>
            </div>
            <div>
                {workexperience.length > 0 &&
                    workexperience.map((work, index) => (
                        <div className="pt-10" key={index}>
                            <div className="desc ">
                                <TypographyH4>{work.company_position} @ {work.company_name}</TypographyH4>
                                <TypographyP>
                                    <span className="text-primary">{work.company_location}</span>
                                </TypographyP>
                                <TypographyMuted>{toDateString(work.company_start_date!)} - {toDateString(work.company_end_date!)}</TypographyMuted>
                                <TypographyP className="mt-4 pl-2">
                                    {work.company_note}
                                </TypographyP>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default ExperienceSection
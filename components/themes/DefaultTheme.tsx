import { User, UserCertificate, UserEducation, UserWorkExperience, projects } from "@prisma/client";
import AboutSection from "./default/AboutSection";
import ContactSection from "./default/ContactSection";
import EducationSection from "./default/EducationSection";
import ExperienceSection from "./default/ExperienceSection";
import HomeSection from "./default/HomeSection";
import UserPortfolioNavbar from "./default/Navbar";
import ProjectSection from "./default/ProjectSection";
import TechStack from "./default/TechStack";

function DefaultTheme({
    sitedata,
    user
}: {
    // sitedata conatins mixed tyypes
    sitedata: {
        name: string | null,
        logo: string | null,
        education: UserEducation[],
        certificates: UserCertificate[],
        workexperience: UserWorkExperience[]
        projects: projects[]
    }
    user: User
}) {


    return (
        <>
            <UserPortfolioNavbar
                name={sitedata.name ?? ''}
                logo={sitedata.logo ? sitedata.logo : user.avatar!}
            />
            <div className="lg:container px-2">
                <HomeSection
                    name={sitedata.name ?? ''}
                    image={sitedata.logo ? sitedata.logo : user.avatar!}
                    tagline={user.tagline ?? ''}
                    twitterid={user.twitterid!}
                    githubid={user.githubid!}
                    linkedinid={user.linkedinid!}
                    websiteurl={user.websiteurl!}
                />
                <AboutSection

                    about={user.bio}
                    skills={["nsv", "sdfsdf"]}
                />

                <TechStack

                />

                <EducationSection
                    education={sitedata.education}
                />


                <ExperienceSection
                    workexperience={sitedata.workexperience}
                />

                <ProjectSection
                    projects={sitedata.projects}
                />

                <ContactSection
                    twitterid={user.twitterid!}
                    githubid={user.githubid!}
                    linkedinid={user.linkedinid!}
                    websiteurl={user.websiteurl!}
                    emailid={user.email}
                />
            </div>
        </>
    )
}

export default DefaultTheme
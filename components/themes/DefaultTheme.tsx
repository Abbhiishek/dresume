import { TechStack, User, UserCertificate, UserEducation, UserWorkExperience, projects } from "@prisma/client";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import AboutSection from "./default/AboutSection";
import ContactSection from "./default/ContactSection";
import EducationSection from "./default/EducationSection";
import ExperienceSection from "./default/ExperienceSection";
import FooterSection from "./default/FooterSection";
import HomeSection from "./default/HomeSection";
import UserPortfolioNavbar from "./default/Navbar";
import ProjectSection from "./default/ProjectSection";
import TechStackSection from "./default/TechStack";

function DefaultTheme({
    sitedata,
    user,
    about
}: {
    // sitedata conatins mixed tyypes
    sitedata: {
        id: string
        name: string | null,
        logo: string | null,
        skills: string[],
        tagline: string,
        subdomain: string,
        education: UserEducation[],
        certificates: UserCertificate[],
        workexperience: UserWorkExperience[]
        projects: projects[]
        techstack: TechStack[]
    }
    user: User,
    about: {
        about: string
        mdxSource: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>
    }
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
                    tagline={sitedata.tagline}
                    twitterid={user.twitterid!}
                    githubid={user.githubid!}
                    linkedinid={user.linkedinid!}
                    websiteurl={user.websiteurl!}
                />
                <AboutSection
                    skills={sitedata.skills}
                    mdxabout={about.mdxSource}
                />

                <TechStackSection
                    techstack={sitedata.techstack}
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


                <FooterSection />
            </div>
        </>
    )
}

export default DefaultTheme
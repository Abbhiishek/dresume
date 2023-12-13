import { TypographyH2, TypographyP } from "@/components/common/Typography"
import { GithubIcon, Globe2Icon, LinkedinIcon, MailIcon, Twitter } from "lucide-react"
import Link from "next/link"

function ContactSection({
    githubid,
    linkedinid,
    twitterid,
    emailid,
    websiteurl
}: {
    githubid: string,
    linkedinid: string,
    twitterid: string,
    emailid: string,
    websiteurl: string,
}) {
    return (
        <section className="lg:mt-36  py-5" id="Contact">
            <h4 className="text-6xl font-light mt-5">Contact</h4>
            <div className="text-left relative">
                <h1
                    className="absolute -top-16 left-3 opacity-10 uppercase 
                font-bold lg:text-8xl text-5xl font-title text-primary"
                >
                    Let&apos;s Talk
                </h1>
            </div>

            <div className="mt-10">
                <TypographyH2 className="mt-10">Let&apos;s Collaborate</TypographyH2>
                <TypographyP className="mt-2">
                    If you&apos;re interested in collaborating or have any inquiries,
                    <br />
                    Please don&apos;t hesitate to get in touch. I&apos;m open to exciting opportunities and projects.
                </TypographyP>
            </div>
            <div className="flex flex-wrap space-x-4 mt-10">
                {
                    twitterid ? (
                        <Link href={twitterid}
                            passHref

                        >
                            <Twitter className="w-8 h-8 text-primary hover:text-white transition-all duration-300 hover:-translate-y-4 " />
                        </Link>
                    ) : null
                }
                {
                    githubid ? (
                        <Link href={githubid}
                            passHref

                        >
                            <GithubIcon className="w-8 h-8 text-primary hover:text-white transition-all duration-300 hover:-translate-y-4 " />
                        </Link>
                    ) : null
                }
                {
                    linkedinid ? (
                        <Link href={linkedinid}
                            passHref

                        >
                            <LinkedinIcon className="w-8 h-8 text-primary hover:text-white transition-all duration-300 hover:-translate-y-4 " />
                        </Link>
                    ) : null
                }
                {
                    websiteurl ? (
                        <Link href={websiteurl}
                            passHref

                        >
                            <Globe2Icon className="w-8 h-8 text-primary hover:text-white transition-all duration-300 hover:-translate-y-4 " />
                        </Link>
                    ) : null
                }
                {
                    websiteurl ? (
                        <Link href={websiteurl}
                            passHref

                        >
                            <MailIcon className="w-8 h-8 text-primary hover:text-white transition-all duration-300 hover:-translate-y-4 " />
                        </Link>
                    ) : null
                }
            </div>
        </section>
    )
}

export default ContactSection
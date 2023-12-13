import { TypographyH1 } from "@/components/common/Typography";
import { GithubIcon, Globe2Icon, LinkedinIcon, Twitter } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";


function HomeSection({ name, image, tagline, twitterid, githubid, linkedinid, websiteurl }: {
    name: string,
    image: string,
    tagline: string,
    twitterid: string,
    githubid: string,
    linkedinid: string,
    websiteurl: string,

}) {
    return (

        <div className="flex flex-row items-center justify-around lg:min-h-[700px] min-h-[500px]" id="Home">
            <div className="flex flex-col items-start justify-start">
                <TypographyH1 className="font-default lg:text-7xl text-6xl">{name}</TypographyH1>
                <p className="font-default text-2xl mt-2">{tagline}</p>
                <div className="flex flex-wrap space-x-4 mt-10">
                    {
                        twitterid ? (
                            <Link href={twitterid}
                                passHref

                            >
                                <Twitter className="w-8 h-8 text-primary hover:text-white transition-all duration-300 hover:-translate-y-4 fill-primary" />
                            </Link>
                        ) : null
                    }
                    {
                        githubid ? (
                            <Link href={githubid}
                                passHref

                            >
                                <GithubIcon className="w-8 h-8 text-primary hover:text-white transition-all duration-300 hover:-translate-y-4 fill-primary" />
                            </Link>
                        ) : null
                    }
                    {
                        linkedinid ? (
                            <Link href={linkedinid}
                                passHref

                            >
                                <LinkedinIcon className="w-8 h-8 text-primary hover:text-white transition-all duration-300 hover:-translate-y-4 fill-primary" />
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
                </div>
            </div>
            <div className="hidden lg:flex">
                <Image
                    src={image}
                    alt="Abhishek Kushwaha"
                    width={50000}
                    height={50000}
                    className="w-96 h-96 rounded-full aspect-square"
                />
            </div>
            <a className="fixed bottom-14 right-8 z-[99] bg-primary cursor-pointer w-[100px] text-center h-12 rounded-full text-lg pt-3" href="#Contact" rel="noopener" aria-label="Contact" id="contactbtn">
                <strong>
                    Le&apos;s
                    Talk!
                </strong>
            </a>
        </div>

    )
}

export default HomeSection
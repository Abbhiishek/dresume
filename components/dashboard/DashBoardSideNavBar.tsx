'use client';


import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { SignOutButton } from "@clerk/nextjs";
import { AwardIcon, BookIcon, DollarSignIcon, LucideLogOut, MenuIcon, PlusCircleIcon, Rss, TrafficCone } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";

import { ScrollArea } from "@/components/ui/scroll-area";
import { APP_NAME } from "@/lib/contants";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TypographyLarge } from "../common/Typography";


const DashboardNav = [
    { name: "Portfolio", icon: <PlusCircleIcon className="w-5 h-5" />, Link: "/dashboard/create", urlname: "create" },
    { name: "My Portfoilo", icon: <AwardIcon className="w-5 h-5" />, Link: "/dashboard/portfolio", urlname: "portfolio" },
    { name: "Plans", icon: <DollarSignIcon className="w-5 h-5" />, Link: "/dashboard/plans", urlname: "plans" },
    { name: "Usage", icon: <BookIcon className="w-5 h-5" />, Link: "/dashboard/usage", urlname: "usage" }
]

const DashboardSecondaryNav = [
    { name: "Explore", icon: <TrafficCone className="w-5 h-5" />, link: "/community" },
    { name: "Give Feebback", icon: <Rss className="w-5 h-5" />, link: "/dashboard/feedback" },
]



function SideNavBar() {

    return (
        <>
            <div className="flex-col hidden h-screen gap-5 mb-10 lg:flex basis-1/5">
                <NavBarOptions />
            </div>
            <div className="lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">
                            <MenuIcon className="w-5 h-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>
                                <TypographyLarge>{APP_NAME}</TypographyLarge>
                            </SheetTitle>
                        </SheetHeader>
                        <ScrollArea className="h-full px-1">
                            <div className="grid gap-4 py-4">
                                <NavBarOptions />
                            </div>
                        </ScrollArea>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}

export default SideNavBar





const NavBarOptions = () => {

    const pathname = usePathname();
    const [active, setActive] = useState(usePathname().split('/').pop());

    useEffect(() => {
        setActive(pathname.split('/').pop());
    }, [pathname])


    return (
        <div className="flex flex-col items-start justify-center gap-5">
            {
                DashboardNav.map((nav, index) => (
                    <Link key={index} href={nav.Link} className="w-full">
                        <Button key={index}
                            onClick={() => setActive(nav.urlname)}
                            variant={active === nav.urlname ? "default" : "outline"}
                            className={`flex items-center justify-start w-full gap-2  rounded-3xl`}>
                            {nav.icon}
                            <span>{nav.name}</span>
                        </Button>
                    </Link>
                ))
            }
            {
                DashboardSecondaryNav.map((nav, index) => (
                    <Link key={index} href={nav.link} className="w-full">
                        <Button
                            variant="outline"
                            className={`flex items-center justify-start w-full gap-2 rounded-3xl
                                    `}>
                            {nav.icon}
                            <span>{nav.name}</span>
                        </Button>
                    </Link>
                ))
            }
            <Separator />
            <Button
                variant="destructive"
                className="flex items-center justify-start w-full gap-2 rounded-3xl"
            >
                <LucideLogOut className="w-5 h-5" /> <SignOutButton />
            </Button>
        </div>
    )
}
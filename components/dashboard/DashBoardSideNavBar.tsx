'use client';


import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { Boxes, CircleUser, LayoutDashboard, MenuIcon, Rss, Settings2 } from "lucide-react";
import Link from "next/link";

import { ScrollArea } from "@/components/ui/scroll-area";
import { APP_NAME } from "@/lib/contants";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TypographyLarge } from "../common/Typography";

const DashboardNav = [
    { name: "OverView", icon: <LayoutDashboard className="w-5 h-5" />, Link: "/dashboard", urlname: "dashboard" },
    { name: "Portfolio", icon: <CircleUser className="w-5 h-5" />, Link: "/dashboard/portfolio", urlname: "portfolio" },
    { name: "Settings", icon: <Settings2 className="w-5 h-5" />, Link: "/dashboard/settings", urlname: "settings" },
    // { name: "Plans", icon: <DollarSignIcon className="w-5 h-5" />, Link: "/dashboard/plans", urlname: "plans" },
    // { name: "Usage", icon: <BookIcon className="w-5 h-5" />, Link: "/dashboard/usage", urlname: "usage" },
    { name: "Explore", icon: <Boxes className="w-5 h-5" />, Link: "/community", urlname: "community" },
    { name: "Give Feebback", icon: <Rss className="w-5 h-5" />, Link: "/dashboard/feedback", urlname: "feedback" },
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
                            variant={active === nav.urlname ? "default" : "bordered"}
                            className={`flex items-center justify-start w-full gap-2  rounded-3xl`}>
                            {nav.icon}
                            <span>{nav.name}</span>
                        </Button>
                    </Link>
                ))
            }
        </div>
    )
}

export default SideNavBar;
// export default dynamic(() => Promise.resolve(SideNavBar), { ssr: false })

"use client";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";


export default function SiteSettingsNav() {
    const navItems = [
        {
            name: "General",
            value: "general",
            component: "sbfjksd bjk",
        },
        {
            name: "Domain",
            value: "domain",
            component: "sbfjksd bjk",
        },
        {
            name: "Education",
            value: "education",
            component: "sbfjksd bjk",
        },
        {
            name: "Work",
            value: "work",
            component: "sbfjksd bjk",
        },
        {
            name: "Project",
            value: "project",
            component: "sbfjksd bjk",
        },
        {
            name: "Certification",
            value: "certificate",
            component: "sbfjksd bjk",
        },
        {
            name: "Appearance",
            value: "appearance",
            component: "sbfjksd bjk",
        },
    ];

    return (
        <div className="flex space-x-4 border-b  pb-4 pt-2">
            <Tabs defaultValue="account" className="w-full h-full" >
                <TabsList defaultValue={"general"} className="grid w-full lg:grid-cols-7 h-full grid-cols-1  rounded-3xl content-center bg-stone-200 dark:bg-stone-800 ">
                    {
                        navItems.map((nav, index) => (
                            <TabsTrigger key={index} value={nav.value}
                                className={`rounded-3xl `}
                            >{nav.name}</TabsTrigger>
                        ))
                    }
                </TabsList>
                {
                    navItems.map((nav, index) => (
                        <TabsContent key={index} value={nav.value}>{nav.component}</TabsContent>
                    ))
                }
            </Tabs>
        </div>
    );
}

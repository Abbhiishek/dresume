import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import EducationSection from "./EducationSection";


export default function SiteSettingsNav() {
    const navItems = [
        {
            name: "General",
            value: "general",
            component: "General",
        },
        {
            name: "Domain",
            value: "domain",
            component: "Domain",
        },
        {
            name: "Education",
            value: "education",
            component: <EducationSection />,
        },
        {
            name: "Work",
            value: "work",
            component: "Work",
        },
        {
            name: "Project",
            value: "project",
            component: "Project",
        },
        {
            name: "Certification",
            value: "certificate",
            component: "Certification",
        },
        {
            name: "Appearance",
            value: "appearance",
            component: "Appearance",
        },
    ];

    return (
        <div className="flex space-x-4 border-b  pb-4 pt-2">
            <Tabs defaultValue="general" className="w-full h-full" >
                <TabsList className="grid w-full lg:grid-cols-7 h-full grid-cols-1  rounded-3xl content-center bg-stone-200 dark:bg-stone-800 ">
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

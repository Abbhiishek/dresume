

import SideNavBar from "@/components/dashboard/DashBoardSideNavBar";
import { APP_DESC } from "@/lib/contants";


export const metadata = {
    title: 'Dashboard',
    description: APP_DESC,
};


export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <section className="flex flex-col gap-5 p-2 mt-2 lg:container lg:mt-10 lg:flex-row ">
            <SideNavBar />
            <div className="w-full">
                {children}
            </div>
        </section>
    )
}
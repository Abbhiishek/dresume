import { Toaster } from "@/components/ui/toaster";
import { APP_DESC, APP_NAME } from '@/lib/contants';
import { GeistSans } from 'geist/font/sans';
import { Metadata } from "next";
import '.././styles/globals.css';
import { Providers } from './NextUIProvider';

const image = "https://app.dresume.me/placeholder.png";
export const metadata: Metadata = {
    title: APP_NAME,
    description: APP_DESC,
    icons: ["https://app.dresume.me/favicon.ico"],
    openGraph: {
        title: APP_NAME,
        description: APP_DESC,
        images: [image],
    },
    twitter: {
        card: "summary_large_image",
        title: APP_NAME,
        description: APP_DESC,
        images: [image],
        creator: "@abhishekkushwaha",
    },
    metadataBase: new URL("https://app.dresume.me"),
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={GeistSans.className} >
                {/* <NextTopLoader /> */}
                <Providers>
                    {children}
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}

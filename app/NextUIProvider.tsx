// app/providers.tsx
'use client'
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from './ThemeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark,
                variables: { colorPrimary: 'green' }
            }}
        >
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
            >
                <NextUIProvider navigate={router.push}>
                    {children}
                </NextUIProvider>
            </ThemeProvider>
        </ClerkProvider>
    )
}
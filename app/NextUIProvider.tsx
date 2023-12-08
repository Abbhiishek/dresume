// app/providers.tsx
'use client'

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from './ThemeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
        >
            <NextUIProvider navigate={router.push}>
                {children}
            </NextUIProvider>
        </ThemeProvider>
    )
}
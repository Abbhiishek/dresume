
import NavBar from '@/components/common/NavBar';
import { APP_DESC, APP_NAME } from '@/lib/contants';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './NextUIProvider';
import { ThemeProvider } from './ThemeProvider';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESC,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: 'green' }
      }}
    >
      <html lang="en" >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <body className={inter.className}>
              <NavBar />
              {children}
            </body>
          </Providers>
        </ThemeProvider>
      </html>
    </ClerkProvider >
  );
}

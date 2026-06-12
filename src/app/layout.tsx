import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import { StripWrapper } from '@/components/StripWrapper';
import { AuthGate } from '@/components/AuthGate';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OCDMantra',
  description: 'Your companion for OCD recovery and wellness',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <AuthGate>
            <StripWrapper>
              {children}
            </StripWrapper>
          </AuthGate>
        </Providers>
      </body>
    </html>
  );
}

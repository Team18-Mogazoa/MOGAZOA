import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MOGAZOA',
  description: 'MOGAZOA',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-black1`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

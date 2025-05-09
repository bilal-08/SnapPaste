import type { Metadata } from 'next';
import { Inter,Fira_Code } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const firaCode = Fira_Code({ subsets: ['latin'],variable:"--font-fira-code",weight:["400","700"] });
export const metadata: Metadata = {
  title: 'SnapPaste',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${firaCode.className}`}>{children}</body>
    </html>
  );
}

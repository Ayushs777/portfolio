import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { getContent } from '@/app/actions';
import CustomCursor from '@/components/CustomCursor';
import HologramOverlay from '@/components/HologramOverlay';
import SystemStatusHUD from '@/components/SystemStatusHUD';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    title: content.seoTitle || 'Ayush Chaudhary | Portfolio',
    description: content.seoDescription || 'Portfolio metadata description',
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} bg-[#050505] text-white min-h-screen font-sans antialiased overflow-x-hidden relative bg-grid-pattern`}>
        <CustomCursor />
        <HologramOverlay />
        <SystemStatusHUD />
        {children}
      </body>
    </html>
  );
}

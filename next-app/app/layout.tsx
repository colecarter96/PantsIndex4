
// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { FilterProvider } from "@/context/FilterContext"; // Import the filter context
import { FilterPanelProvider } from "@/context/FilterPanelContext"; // Import the filter panel context
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';  
import { Fraunces } from 'next/font/google';
import { DM_Serif_Text } from  'next/font/google'
import { Mulish } from 'next/font/google';
import { Schibsted_Grotesk } from "next/font/google";
import { texGyreHeros, comico } from './fonts';

const didactGothic = Fraunces({ weight: '500', subsets: ['latin'] });
const DMSerif = DM_Serif_Text({ weight: '400', subsets: ['latin'] });
const Muli = Mulish({ weight: '700', subsets: ['latin'] });
const SG = Schibsted_Grotesk({ weight: '500', subsets: ['latin']})
// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PI",
  description: "Measurements Based Pants Shopping",
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/TeXGyreHeros-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Comico-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${texGyreHeros.variable} ${comico.variable} ${SG.className}`}>
        {/* Wrap children in both providers */}
        <FilterProvider>
          <FilterPanelProvider>
            {children}
            <Analytics />
            <SpeedInsights />
          </FilterPanelProvider>
        </FilterProvider>
      </body>
    </html>
  );
}
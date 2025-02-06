// import './globals.css';
// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import { FilterProvider } from '@/context/FilterContext';
// import { FilterPanelProvider } from '@/context/FilterPanelContext';

// const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <FilterProvider>
//       <FilterPanelProvider>
//         <html lang="en">
//             <body className={inter.className}>{children}</body>
//         </html>
//       </FilterPanelProvider>
        
//     </FilterProvider>
    
//   )
// }


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

const didactGothic = Fraunces({ weight: '500', subsets: ['latin'] });
const DMSerif = DM_Serif_Text({ weight: '400', subsets: ['latin'] });
const Muli = Mulish({ weight: '700', subsets: ['latin'] });
const SG = Schibsted_Grotesk({ weight: '500', subsets: ['latin']})
// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pants Index",
  description: "Pants Based on Measurements",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={SG.className}>
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
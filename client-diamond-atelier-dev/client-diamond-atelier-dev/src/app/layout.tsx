import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Providers from "@/redux/providers";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import BuyerAccessible from "@/helpers/BuyerAccessible";
import { useEffect, useState } from "react";
import ConnectSeller from "@/components/base/ConnectSeller";



const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Diamond Atelier",
  description: "Diamond Atelier",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${lato.className} select-none`}>
        <main>
           <Providers>
          <Toaster position="top-center"/>
           <AuthProvider>
                <BuyerAccessible>
                 {children}
                </BuyerAccessible>
            </AuthProvider>
          </Providers>
        </main>
        <ConnectSeller/>
      </body>
    </html>
  );
}

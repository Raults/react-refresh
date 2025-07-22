import type { Metadata } from "next";
import TransitionOverlay from "@/components/shared/TransitionOverlay";
import { PageTransitionProvider } from "@/context/PageTransitionContext";
import { Roboto } from "next/font/google";
import PageTransitionOverlay from "@/components/shared/PageTransitionOverlay";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ryan Tibbetts",
  description: "Ctrl + Alt + Me",
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Add whatever weights you plan to use
  display: "swap",
  variable: "--font-roboto", // optional if you want to use as a CSS variable
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${roboto.variable} antialiased`}
      >
        <PageTransitionProvider>
          <PageTransitionOverlay />
          <TransitionOverlay />
          {children}
        </PageTransitionProvider>
      </body>
    </html>
  );
}

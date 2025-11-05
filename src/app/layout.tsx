import { Toaster } from "@/components/ui/toaster";
import "@/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import { Mulish } from "next/font/google";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Finances Neon",
  description: "Handle your finance boards with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider appearance={{ baseTheme: dark }}>
        <body className={`${mulish.className} dark antialiased`}>
          <div className="flex h-full flex-col overflow-hidden">
            {children}
            <Toaster />
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
}

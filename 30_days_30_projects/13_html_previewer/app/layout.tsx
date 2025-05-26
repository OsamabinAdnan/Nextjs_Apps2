import type { Metadata } from "next";
import {Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "HTML Previewer",
  description: "A simple HTML previewer built with Next.js",
  keywords: ["HTML", "Previewer", "Next.js", "Web Development", "Frontend"],
  icons: {
    // Single .ico file that contains multiple sizes (16x16, 32x32, etc.)
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

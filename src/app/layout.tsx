import type { Metadata } from "next";
import { Victor_Mono } from "next/font/google";
import "./globals.css";

const victorMono = Victor_Mono({
  display: "swap",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-victor-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HireAI Interview",
  description:
    "A modern AI-powered interview platform experience for candidates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${victorMono.variable} ${victorMono.className} h-full antialiased`}
    >
      <body className={`${victorMono.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}

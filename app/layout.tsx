import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LaporDesa",
  description: "Sistem pelaporan dan pengelolaan lingkungan desa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${poppins.variable} antialiased`}>
      <body className="min-h-full flex flex-col font-[var(--font-poppins)]">
        {children}
      </body>
    </html>
  );
}
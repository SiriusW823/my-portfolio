import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ALEX CHEN | Creative Developer",
  description: "Full-stack developer and creative technologist specializing in building exceptional digital experiences.",
  keywords: ["developer", "portfolio", "react", "next.js", "frontend", "creative"],
  authors: [{ name: "Alex Chen" }],
  openGraph: {
    title: "ALEX CHEN | Creative Developer",
    description: "Full-stack developer and creative technologist specializing in building exceptional digital experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={geistSans.variable + " " + geistMono.variable + " antialiased bg-[#0a0a0a] text-white"}
      >
        {children}
      </body>
    </html>
  );
}

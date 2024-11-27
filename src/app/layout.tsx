import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Fits U",
  description:
    "당신의 소비 패턴에 꼭 맞는 최적의 카드를 추천해주는 스마트 카드 매칭 플랫폼",
  icons: {
    icon: "/icons/favicon.ico",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-300`}
      >
        <div className="max-w-[600px] bg-black min-h-screen m-auto h-full overflow-x-hidden scrollbar-hide">
          {children}
        </div>
      </body>
    </html>
  );
}

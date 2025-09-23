import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
//
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const cormorantGaramond = Cormorant_Garamond({
    weight: ['400', '400', '600', '600', '700', '700'], // 400 = normal, 700 = negrita
    style: ['normal', 'italic', 'normal', 'italic', 'normal', 'italic'], // normal e italic
    subsets: ['latin'],
    display: 'swap',
});

export const metadata: Metadata = {
  title: "Meli & Jairo",
  description: "Invitación al matrimonio de Meli y Jairo",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

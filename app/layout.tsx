import type { Metadata } from 'next';
import { Inter, Noto_Sans_TC } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { LanguageProvider } from '@/contexts/LanguageContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  variable: '--font-noto-sans-tc',
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KYVEX | High-Performance Hardware',
  description: 'KYVEX - 專注於提供卓越的科技解決方案，助力企業數位轉型。',
  keywords: '科技公司, 數位轉型, 網頁開發, 軟體服務',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className={`${inter.variable} ${notoSansTC.variable}`}>
      <head>
        <Script
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
          strategy="beforeInteractive"
        />
        <Script id="emailjs-init" strategy="beforeInteractive">
          {`(function() { emailjs.init("zdgZAGmOm1G6tMy8E"); })();`}
        </Script>
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

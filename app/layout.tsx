import type { Metadata } from 'next';
import { Inter, Noto_Sans_TC } from 'next/font/google';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
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
  title: 'KYVEX | 高效能網站開發與數位解決方案',
  description: 'KYVEX 專注於高效能網站開發、Next.js/React 前端工程、客製化 Web 應用程式。我們堅持 Clean Code，拒絕套版，為企業打造未來就緒的數位基礎設施。',
  keywords: 'KYVEX, 網站開發, Web Development, Next.js, React, TypeScript, 前端工程, 客製化網站, 高效能網站, 數位轉型, Clean Code, 台灣網頁設計',
  authors: [{ name: 'KYVEX', url: 'https://kyvex-next.vercel.app' }],
  creator: 'KYVEX',
  publisher: 'KYVEX',
  openGraph: {
    title: 'KYVEX | 高效能網站開發與數位解決方案',
    description: '專注於 Next.js/React 高效能網站開發，堅持 Clean Code，為企業打造未來就緒的數位基礎設施。',
    url: 'https://kyvex-next.vercel.app',
    siteName: 'KYVEX',
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KYVEX | 高效能網站開發',
    description: '專注於 Next.js/React 高效能網站開發，堅持 Clean Code。',
  },
  robots: {
    index: true,
    follow: true,
  },
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

      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

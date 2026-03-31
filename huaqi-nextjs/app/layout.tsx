import type { Metadata } from 'next'
import { Inter, Noto_Sans_JP, Public_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/components/LanguageProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-jp',
})
const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-public-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.huaqi.jp'),
  title: {
    default: '華啓未来株式会社 | 中国と日本をつなぐ越境貿易企業',
    template: '%s | 華啓未来株式会社',
  },
  description:
    '華啓未来株式会社（Huaqi Future Co., Ltd.）は、トレーディングカード・ホビーグッズの輸入販売、越境貿易コンサルティングを手がける日中間貿易企業です。横浜を拠点に信頼のパートナーとして事業を展開しております。',
  applicationName: '華啓未来株式会社',
  keywords: [
    '華啓未来',
    'Huaqi Future',
    '越境貿易',
    'トレーディングカード',
    'ホビーグッズ',
    '日中貿易',
    '輸入販売',
    '横浜',
    '貿易コンサルティング',
  ],
  alternates: {
    canonical: 'https://www.huaqi.jp/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: '華啓未来株式会社 | 中国と日本をつなぐ越境貿易企業',
    description: '中国と日本をつなぐ越境貿易企業。トレーディングカード・ホビーグッズの輸入販売、貿易コンサルティング。',
    type: 'website',
    locale: 'ja_JP',
    url: 'https://www.huaqi.jp',
    siteName: '華啓未来株式会社',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '華啓未来株式会社',
    description: '中国と日本をつなぐ越境貿易企業',
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable} ${publicSans.variable}`}>
      <body className="bg-surface-50 text-primary antialiased font-jp">
        <LanguageProvider>
          {/* Status Pillar - Left Sidebar Decoration */}
          <div className="fixed left-0 top-0 w-px h-screen bg-container-200 z-50" />
          
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ポケモンカード相場一覧 / Card Market',
  description:
    'ポケモンカードの販売価格、相場推移、取引件数を確認できる一覧ページです。Bilingual market view of prices, trends, and featured cards.',
  alternates: {
    canonical: '/pokemon',
  },
  openGraph: {
    title: 'ポケモンカード相場一覧',
    description:
      'ポケモンカードの販売価格、相場推移、取引件数を確認できる一覧ページです。',
    url: 'https://www.huaqi.jp/pokemon',
    images: ['/opengraph-image'],
  },
}

export default function PokemonLayout({ children }: { children: React.ReactNode }) {
  return children
}

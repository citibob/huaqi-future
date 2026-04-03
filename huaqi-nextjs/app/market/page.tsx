import { AlertTriangle, BarChart2, RefreshCw, TrendingDown, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { POKEMON_CARDS } from '@/lib/pokemon-data'
import { GEM_PACKS } from '@/lib/gem-pack-data'
import { cn, formatCNY, formatJPY, formatPriceChange, mercariSoldUrl } from '@/lib/utils'
import LangText from '@/components/LangText'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'マーケット情報 / Market',
  description:
    'ポケモンカード市場の価格変動、取引件数、注目カードをまとめたマーケット情報ページです。Market overview covering card prices, movement, and highlighted listings.',
  alternates: {
    canonical: 'https://www.huaqi.jp/market',
  },
}

const MARKET_STATUS = [
  { name: 'Mercari JP', update: '2分前', count: 1240, tone: 'from-amber-400/15 to-transparent' },
  { name: 'eBay', update: '5分前', count: 380, tone: 'from-sky-400/15 to-transparent' },
  { name: 'AliExpress', update: '8分前', count: 220, tone: 'from-orange-400/15 to-transparent' },
  { name: 'Yahoo Auction', update: '3分前', count: 450, tone: 'from-violet-400/15 to-transparent' },
]

export default function MarketPage() {
  const sortedByChange = [...POKEMON_CARDS].sort((a, b) => Math.abs(b.priceChange24h) - Math.abs(a.priceChange24h))
  const gainers = [...POKEMON_CARDS].filter((c) => c.priceChange24h > 0).sort((a, b) => b.priceChange24h - a.priceChange24h).slice(0, 5)
  const losers = [...POKEMON_CARDS].filter((c) => c.priceChange24h < 0).sort((a, b) => a.priceChange24h - b.priceChange24h).slice(0, 5)
  const deals = POKEMON_CARDS.filter((c) => c.isBelowMedian).sort((a, b) => a.priceJPY / a.medianPriceJPY - b.priceJPY / b.medianPriceJPY).slice(0, 5)

  return (
    <div className="min-h-screen px-4 pb-20 pt-24 lg:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <section className="relative overflow-hidden rounded-xl border border-[#1e2a45] bg-[#131b2e] px-6 py-10 md:px-10 mb-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(201,168,76,0.08),transparent_30%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/15 bg-sky-400/8 px-4 py-2 text-xs font-medium text-sky-300 mb-5">
                <BarChart2 className="h-4 w-4" />
                <LangText ja="マーケットインテリジェンス" en="Market Intelligence" />
              </div>
              <h1 className="text-3xl font-bold leading-tight md:text-4xl mb-4">
                <LangText ja="マーケット情報" en="Market Overview" />
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-white/50">
                <LangText
                  ja="複数プラットフォームのポケモンカード市場データをリアルタイムで集約。価格変動、取引動向、注目カードの情報を一元的にご確認いただけます。"
                  en="Track Pokemon card market data across multiple platforms in real time, including price movement, sales activity, and featured cards."
                />
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/packs"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c9a84c] px-6 py-3 text-sm font-semibold text-[#0a0f1a] transition hover:bg-[#d4b85c]"
                >
                  <LangText ja="商品ページへ" en="View Products" />
                </Link>
                <Link
                  href="/business"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium transition hover:bg-white/10"
                >
                  <LangText ja="事業内容" en="Business" />
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {MARKET_STATUS.map((item) => (
                <div key={item.name} className={`rounded-xl border border-[#1e2a45] bg-gradient-to-br ${item.tone} bg-[#0a0f1a]/50 p-5`}>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold">{item.name}</div>
                    <div className="flex items-center gap-2 text-xs font-medium text-green-400">
                      <span className="h-2 w-2 rounded-full bg-green-400" />
                      LIVE
                    </div>
                  </div>
                  <div className="mt-4 text-3xl font-bold">{item.count.toLocaleString()}</div>
                  <div className="mt-1 text-sm text-white/40">
                    <LangText ja="出品中の商品数" en="Active Listings" />
                  </div>
                  <div className="mt-3 text-xs text-white/35">
                    <LangText ja={`${item.update}に更新`} en={`Updated ${item.update} ago`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trend Panels */}
        <section className="grid gap-5 lg:grid-cols-3 mb-10">
          <TrendPanel titleJa="値上がり注目" titleEn="Price Gainers" tone="text-red-400" icon={<TrendingUp className="h-4 w-4" />} items={gainers} />
          <TrendPanel titleJa="値下がり注目" titleEn="Price Losers" tone="text-green-400" icon={<TrendingDown className="h-4 w-4" />} items={losers} />
          <ArbitragePanel items={deals} />
        </section>

        {/* Full Table */}
        <section className="overflow-hidden rounded-xl border border-[#1e2a45] bg-[#131b2e] mb-10">
          <div className="flex flex-col gap-3 border-b border-[#1e2a45] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-lg font-bold">
                <LangText ja="全カード価格一覧" en="All Card Prices" />
              </div>
              <div className="mt-1 text-sm text-white/40">
                <LangText ja="価格変動の大きい順に表示" en="Sorted by largest price movement" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-green-400">
              <RefreshCw className="h-3.5 w-3.5" />
              <LangText ja="リアルタイム更新" en="Real-time Updates" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1e2a45] text-xs text-white/35">
                  <th className="px-4 py-4 text-left"><LangText ja="カード名" en="Card" /></th>
                  <th className="px-4 py-4 text-right"><LangText ja="現在価格（JPY）" en="Price (JPY)" /></th>
                  <th className="px-4 py-4 text-right"><LangText ja="現在価格（CNY）" en="Price (CNY)" /></th>
                  <th className="px-4 py-4 text-right"><LangText ja="7日間中央値" en="7-Day Median" /></th>
                  <th className="px-4 py-4 text-right"><LangText ja="24h変動" en="24h Change" /></th>
                  <th className="px-4 py-4 text-right"><LangText ja="出品数" en="Listings" /></th>
                  <th className="px-4 py-4 text-right"><LangText ja="週間販売数" en="7d Sales" /></th>
                </tr>
              </thead>
              <tbody>
                {sortedByChange.map((card) => (
                  <tr key={card.id} className="border-b border-[#1e2a45]/50 transition hover:bg-white/[0.02]">
                    <td className="px-4 py-4">
                      <a
                        href={mercariSoldUrl(card.nameJP, card.rarity)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                      >
                        <div className="relative h-9 w-9 rounded-lg overflow-hidden border border-[#1e2a45] shrink-0">
                          <Image src={card.imageUrl} alt={card.nameEN} fill className="object-cover" sizes="36px" />
                        </div>
                        <div>
                          <div className="font-medium hover:text-[#c9a84c] transition-colors"><LangText ja={card.nameJP} en={card.nameEN} /></div>
                          <div className="text-xs text-white/35">{card.series} · {card.rarity}</div>
                        </div>
                      </a>
                    </td>
                    <td className="px-4 py-4 text-right font-bold text-[#c9a84c]">{formatJPY(card.priceJPY)}</td>
                    <td className="px-4 py-4 text-right text-white/50">{formatCNY(card.priceCNY)}</td>
                    <td className="px-4 py-4 text-right text-white/35">{formatJPY(card.medianPriceJPY)}</td>
                    <td
                      className={cn(
                        'px-4 py-4 text-right font-bold',
                        card.priceChange24h > 0 ? 'text-red-400' : card.priceChange24h < 0 ? 'text-green-400' : 'text-white/35'
                      )}
                    >
                      {formatPriceChange(card.priceChange24h)}
                    </td>
                    <td className="px-4 py-4 text-right text-white/50">{card.onSaleCount}</td>
                    <td className="px-4 py-4 text-right text-white/50">{card.soldCount7d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Gem Pack Prices */}
        <section className="overflow-hidden rounded-xl border border-[#1e2a45] bg-[#131b2e]">
          <div className="border-b border-[#1e2a45] px-6 py-5">
            <div className="text-lg font-bold">
              <LangText ja="ジェムパック（Gem Pack）価格情報" en="Gem Pack Price Information" />
            </div>
            <div className="mt-1 text-sm text-white/40">
              <LangText ja="全シリーズの現在価格・中央値・出品数" en="Current price, median, and listing count for all series" />
            </div>
          </div>
          <div className="grid gap-px bg-[#1e2a45] md:grid-cols-2 xl:grid-cols-4">
            {GEM_PACKS.map((pack) => {
              const discount = Math.round((1 - pack.priceJPY / pack.medianPriceJPY) * 100)
              return (
                <div key={pack.id} className="bg-[#0a0f1a] p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-medium tracking-wider text-white/35">{pack.vol}</div>
                      <div className="mt-2 text-xl font-bold"><LangText ja={pack.nameJP} en={pack.nameEN} /></div>
                    </div>
                    <div className="rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/8 px-3 py-1 text-xs font-medium text-[#c9a84c]">
                      {pack.code}
                    </div>
                  </div>
                  <div className="mt-5 text-3xl font-bold text-[#c9a84c]">{formatJPY(pack.priceJPY)}</div>
                  <div className="mt-1 text-sm text-white/40">≈ {formatCNY(pack.priceCNY)}</div>
                  <div className="mt-5 grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <div className="text-white/35"><LangText ja="中央値" en="Median" /></div>
                      <div className="mt-1 font-semibold">{formatJPY(pack.medianPriceJPY)}</div>
                    </div>
                    <div>
                      <div className="text-white/35"><LangText ja="最安値" en="Lowest" /></div>
                      <div className="mt-1 font-semibold">{formatJPY(pack.lowestPriceJPY)}</div>
                    </div>
                    <div>
                      <div className="text-white/35"><LangText ja="出品数" en="Listings" /></div>
                      <div className="mt-1 font-semibold">
                        <LangText ja={`${pack.onSaleCount}件`} en={`${pack.onSaleCount}`} />
                      </div>
                    </div>
                  </div>
                  <div className={cn('mt-4 text-sm font-medium', discount > 0 ? 'text-green-400' : 'text-red-400')}>
                    <LangText
                      ja={discount > 0 ? `中央値より ${discount}% 安い` : `中央値より ${Math.abs(discount)}% 高い`}
                      en={discount > 0 ? `${discount}% below median` : `${Math.abs(discount)}% above median`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

function TrendPanel({
  titleJa,
  titleEn,
  tone,
  icon,
  items,
}: {
  titleJa: string
  titleEn: string
  tone: string
  icon: React.ReactNode
  items: typeof POKEMON_CARDS
}) {
  return (
    <div className="rounded-xl border border-[#1e2a45] bg-[#131b2e] p-5">
      <div className={cn('mb-5 flex items-center gap-2 text-sm font-semibold', tone)}>
        {icon}
        <LangText ja={titleJa} en={titleEn} />
      </div>
      <div className="space-y-3">
        {items.map((card) => (
          <a
            key={card.id}
            href={mercariSoldUrl(card.nameJP, card.rarity)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-lg bg-[#0a0f1a] px-3 py-3 hover:bg-white/[0.03] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 rounded-lg overflow-hidden border border-[#1e2a45] shrink-0">
                <Image src={card.imageUrl} alt={card.nameEN} fill className="object-cover" sizes="32px" />
              </div>
              <div>
                <div className="text-sm font-medium"><LangText ja={card.nameJP} en={card.nameEN} /></div>
                <div className="text-xs text-white/35">{formatJPY(card.priceJPY)}</div>
              </div>
            </div>
            <div className={cn('text-sm font-bold', tone)}>
              {card.priceChange24h > 0 ? '+' : ''}
              {card.priceChange24h.toFixed(1)}%
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

function ArbitragePanel({ items }: { items: typeof POKEMON_CARDS }) {
  return (
    <div className="rounded-xl border border-[#1e2a45] bg-[#131b2e] p-5">
      <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-[#c9a84c]">
        <AlertTriangle className="h-4 w-4" />
        <LangText ja="注目価格差" en="Notable Deals" />
      </div>
      <div className="space-y-3">
        {items.map((card) => {
          const discount = Math.round((1 - card.priceJPY / card.medianPriceJPY) * 100)
          return (
            <a
              key={card.id}
              href={mercariSoldUrl(card.nameJP, card.rarity)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg bg-[#0a0f1a] px-3 py-3 hover:bg-white/[0.03] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="relative h-8 w-8 rounded-lg overflow-hidden border border-[#1e2a45] shrink-0">
                  <Image src={card.imageUrl} alt={card.nameEN} fill className="object-cover" sizes="32px" />
                </div>
                <div>
                  <div className="text-sm font-medium"><LangText ja={card.nameJP} en={card.nameEN} /></div>
                  <div className="text-xs text-white/35">{formatJPY(card.priceJPY)}</div>
                </div>
              </div>
              <div className="text-sm font-bold text-green-400">-{discount}%</div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, TrendingDown, Shield, Globe, Package, Star } from 'lucide-react'
import { getCardById, getPriceHistory, POKEMON_CARDS } from '@/lib/pokemon-data'
import { getSimilarCards } from '@/lib/recommendations'
import {
  formatJPY, formatCNY, formatPriceChange,
  TYPE_BADGE_COLORS, TYPE_NAMES_CN, RARITY_COLORS, SERIES_LABELS, TYPE_COLORS, cn, mercariSoldUrl,
} from '@/lib/utils'
import PokemonCardUI from '@/components/PokemonCard'
import RecordViewClient from './RecordViewClient'
import type { Metadata } from 'next'
import LangText from '@/components/LangText'

// Next.js static params for all cards
export function generateStaticParams() {
  return POKEMON_CARDS.map(c => ({ id: c.id }))
}

interface Props { params: { id: string } }

export function generateMetadata({ params }: Props): Metadata {
  const card = getCardById(params.id)
  if (!card) return { title: 'カードが見つかりません' }

  return {
    title: `${card.nameCN} ${card.rarity} ${card.cardNumber}`,
    description:
      `${card.nameJP}（${card.nameEN}）の相場ページです。現在価格${formatJPY(card.priceJPY)}、7日中央値${formatJPY(card.medianPriceJPY)}、週間販売数${card.soldCount7d}件。`,
    alternates: {
      canonical: `/pokemon/${card.id}`,
    },
    openGraph: {
      title: `${card.nameCN} ${card.rarity} ${card.cardNumber}`,
      description:
        `${card.nameJP}（${card.nameEN}）の相場ページです。現在価格${formatJPY(card.priceJPY)}、7日中央値${formatJPY(card.medianPriceJPY)}。`,
      url: `https://www.huaqi.jp/pokemon/${card.id}`,
      images: [card.imageUrl],
    },
  }
}

export default function CardDetailPage({ params }: Props) {
  const card = getCardById(params.id)
  if (!card) return notFound()

  const similar = getSimilarCards(card.id, 6)
  const priceHistory = getPriceHistory(card.id)
  const mainType = card.types[0]
  const gradient = TYPE_COLORS[mainType]

  const MARKET_NAMES: Record<string, string> = {
    mercari: 'Mercari JP', ebay: 'eBay', aliexpress: 'AliExpress', yahoo: 'Yahoo拍卖'
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 grid-bg">
      <RecordViewClient cardId={card.id} />
      <div className="max-w-6xl mx-auto">
        {/* Back */}
        <Link
          href="/pokemon"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> <LangText ja="カード市場に戻る" en="Back to Card Market" />
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Left — card visual */}
          <div>
            <div className={cn(
              'relative rounded-3xl overflow-hidden aspect-[3/4]',
              'bg-[#0a0f1a]',
              'shadow-2xl'
            )}>
              <Image
                src={card.imageUrl}
                alt={card.nameCN}
                fill
                className="object-contain p-4"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Holographic overlay */}
              <div className="absolute inset-0 card-holographic opacity-30" />

              {/* Card info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-white/70">{card.series} #{card.cardNumber}</span>
                  <span className={cn('text-sm font-bold', RARITY_COLORS[card.rarity])}>{card.rarity}</span>
                </div>
              </div>
            </div>

            {/* Price history mini chart */}
            <div className="mt-4 p-4 rounded-2xl bg-pokemon-card border border-pokemon-border">
              <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3"><LangText ja="14日価格推移" en="14-Day Price Trend" /></h3>
              <div className="flex items-end gap-0.5 h-16">
                {priceHistory.map((point, i) => {
                  const prices = priceHistory.map(p => p.priceJPY)
                  const min = Math.min(...prices)
                  const max = Math.max(...prices)
                  const h = max === min ? 50 : ((point.priceJPY - min) / (max - min)) * 100
                  return (
                    <div
                      key={i}
                      title={`${point.date}: ${formatJPY(point.priceJPY)}`}
                      className="flex-1 rounded-t bg-pokemon-yellow/60 hover:bg-pokemon-yellow transition-colors cursor-pointer"
                      style={{ height: `${Math.max(h, 5)}%` }}
                    />
                  )
                })}
              </div>
              <div className="flex justify-between mt-2 text-xs text-white/30">
                <span>{priceHistory[0]?.date}</span>
                <span>{priceHistory[priceHistory.length - 1]?.date}</span>
              </div>
            </div>
          </div>

          {/* Right — details */}
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {card.types.map(t => (
                  <span key={t} className={cn('text-xs px-2.5 py-1 rounded-lg border', TYPE_BADGE_COLORS[t])}>
                    {TYPE_NAMES_CN[t]}
                  </span>
                ))}
                {card.isNewListing && (
                  <span className="text-xs px-2.5 py-1 rounded-lg border border-blue-400/30 bg-blue-400/10 text-blue-300"><LangText ja="新着" en="New" /></span>
                )}
              </div>

              <h1 className="text-4xl font-black mb-1">{card.nameCN}</h1>
              <p className="text-white/40">{card.nameJP} · {card.nameEN}</p>
              <p className="text-white/30 text-sm mt-1">{card.series} · {SERIES_LABELS[card.series]}</p>
            </div>

            {/* Price block */}
            <div className="p-5 rounded-2xl bg-pokemon-surface border border-pokemon-border space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-black text-pokemon-yellow">{formatJPY(card.priceJPY)}</div>
                  <div className="text-white/40 text-sm">≈ {formatCNY(card.priceCNY)} CNY</div>
                </div>
                <div className={cn(
                  'flex items-center gap-1 text-lg font-bold',
                  card.priceChange24h > 0 ? 'text-red-400' : 'text-green-400'
                )}>
                  {card.priceChange24h > 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  {formatPriceChange(card.priceChange24h)}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-pokemon-card p-3">
                  <div className="text-sm font-bold">{formatJPY(card.medianPriceJPY)}</div>
                  <div className="text-xs text-white/40"><LangText ja="7日均価" en="7d Median" /></div>
                </div>
                <div className="rounded-xl bg-pokemon-card p-3">
                  <div className="text-sm font-bold">{formatJPY(card.lowestPriceJPY)}</div>
                  <div className="text-xs text-white/40"><LangText ja="最安値" en="Lowest" /></div>
                </div>
                <div className="rounded-xl bg-pokemon-card p-3">
                  <div className={cn('text-sm font-bold', card.isBelowMedian ? 'text-green-400' : 'text-white')}>
                    {card.isBelowMedian ? `-${Math.round((1 - card.priceJPY / card.medianPriceJPY) * 100)}%` : 'OK'}
                  </div>
                  <div className="text-xs text-white/40"><LangText ja="均価比" en="vs Median" /></div>
                </div>
              </div>

              {card.isBelowMedian && (
                <div className="flex items-center gap-2 text-sm text-green-300 bg-green-400/10 border border-green-400/20 rounded-xl px-4 py-3">
                  <Star className="w-4 h-4" />
                  <LangText ja="市場均価を下回っており、仕入れ好機です" en="Below market median. Potential buying opportunity." />
                </div>
              )}
            </div>

            {/* Graded pricing */}
            {card.gradedAvailable && card.gradedPriceJPY && (
              <div className="p-4 rounded-2xl bg-pokemon-card border border-pokemon-border">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-semibold"><LangText ja="鑑定済みカード (PSA10 / BGS10)" en="Graded Card (PSA10 / BGS10)" /></span>
                </div>
                <div className="text-2xl font-black text-yellow-400">{formatJPY(card.gradedPriceJPY)}</div>
                <div className="text-white/40 text-xs">≈ {formatCNY(card.gradedPriceJPY * 0.04334)} CNY</div>
              </div>
            )}

            {/* Market availability */}
            <div className="p-4 rounded-2xl bg-pokemon-card border border-pokemon-border">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold"><LangText ja="掲載市場" en="Available Markets" /></span>
              </div>
              <div className="flex flex-wrap gap-2">
                {card.availableOn.map(market => (
                  <span key={market} className="text-xs px-3 py-1.5 rounded-lg bg-blue-400/10 border border-blue-400/20 text-blue-300">
                    {MARKET_NAMES[market]}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-3 text-sm text-white/40">
                <span><LangText ja={<>掲載 <strong className="text-white">{card.onSaleCount}</strong> 件</>} en={<>Listed <strong className="text-white">{card.onSaleCount}</strong></>} /></span>
                <span><LangText ja={<>7日売上 <strong className="text-white">{card.soldCount7d}</strong></>} en={<>7d Sales <strong className="text-white">{card.soldCount7d}</strong></>} /></span>
              </div>
            </div>

            {/* CTA — Mercari JP */}
            <a
              href={mercariSoldUrl(card.nameJP, card.rarity)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-pokemon-yellow text-black font-bold py-3.5 rounded-xl hover:bg-yellow-400 transition-all shadow-lg hover:shadow-yellow-500/30"
            >
              <Package className="w-5 h-5" />
              <LangText ja="Mercari JP で検索する" en="Search on Mercari JP" />
            </a>
          </div>
        </div>

        {/* Similar cards */}
        {similar.length > 0 && (
          <div>
            <h2 className="text-xl font-black mb-6"><LangText ja="関連カード" en="Related Cards" /></h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {similar.map(c => <PokemonCardUI key={c.id} card={c} compact />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

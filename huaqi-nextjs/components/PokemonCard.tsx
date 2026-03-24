'use client'

import Image from 'next/image'
import { TrendingUp, TrendingDown, Minus, Star, Zap } from 'lucide-react'
import { cn, formatJPY, formatCNY, formatPriceChange, TYPE_COLORS, TYPE_BADGE_COLORS, TYPE_NAMES_CN, RARITY_COLORS, mercariSoldUrl } from '@/lib/utils'
import type { PokemonCard } from '@/lib/types'

interface Props {
  card: PokemonCard
  reasons?: string[]
  compact?: boolean
  onClick?: () => void
}

export default function PokemonCardUI({ card, reasons, compact = false, onClick }: Props) {
  const mainType = card.types[0]
  const gradient = TYPE_COLORS[mainType]
  const pctDiscount = card.isBelowMedian
    ? Math.round((1 - card.priceJPY / card.medianPriceJPY) * 100)
    : 0

  const PriceIcon =
    card.priceChange24h > 0.5
      ? TrendingUp
      : card.priceChange24h < -0.5
      ? TrendingDown
      : Minus

  const priceColor =
    card.priceChange24h > 0.5
      ? 'text-red-400'
      : card.priceChange24h < -0.5
      ? 'text-green-400'
      : 'text-white/40'

  const content = (
    <div
      onClick={onClick}
      className={cn(
        'group relative rounded-2xl overflow-hidden cursor-pointer',
        'bg-pokemon-card border border-pokemon-border',
        'hover:border-pokemon-neon-yellow/40 hover:shadow-xl hover:shadow-pokemon-neon-yellow/10',
        'transition-all duration-300 hover:-translate-y-1',
        'card-shine',
        compact ? 'p-3' : 'p-4'
      )}
    >
      {/* Top gradient bar */}
      <div className={cn('absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r opacity-60', gradient)} />

      {/* Badges */}
      <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
        {card.isNewListing && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
            NEW
          </span>
        )}
        {card.isHot && (
          <span className="flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
            <Zap className="w-2.5 h-2.5" /> HOT
          </span>
        )}
        {pctDiscount > 0 && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
            -{pctDiscount}%
          </span>
        )}
      </div>

      {/* Card image area */}
      <div
        className={cn(
          'relative rounded-xl overflow-hidden mb-3',
          compact ? 'h-28' : 'h-44',
          'bg-[#0a0f1a]'
        )}
      >
        <Image
          src={card.imageUrl}
          alt={card.nameCN}
          fill
          className="object-contain p-2"
          sizes={compact ? '120px' : '200px'}
        />
        {/* Holographic shimmer on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 card-holographic" />
        {/* Series badge */}
        <div className="absolute bottom-2 left-2 text-[10px] font-mono font-bold text-white/70 bg-black/40 px-1.5 py-0.5 rounded">
          {card.series} #{card.cardNumber}
        </div>
        {/* Rarity */}
        <div className={cn('absolute bottom-2 right-2 text-xs font-bold', RARITY_COLORS[card.rarity])}>
          {card.rarity}
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2">
        <div>
          <h3 className={cn('font-bold leading-tight', compact ? 'text-sm' : 'text-base')}>
            {card.nameCN}
          </h3>
          <p className="text-white/40 text-xs">{card.nameJP} · {card.nameEN}</p>
        </div>

        {/* Type badges */}
        <div className="flex gap-1 flex-wrap">
          {card.types.map(t => (
            <span
              key={t}
              className={cn('text-[10px] px-1.5 py-0.5 rounded border', TYPE_BADGE_COLORS[t])}
            >
              {TYPE_NAMES_CN[t]}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-end justify-between pt-1">
          <div>
            <div className="text-lg font-black text-pokemon-yellow">
              {formatJPY(card.priceJPY)}
            </div>
            <div className="text-xs text-white/40">≈ {formatCNY(card.priceCNY)} CNY</div>
          </div>
          <div className={cn('flex items-center gap-0.5 text-xs font-semibold', priceColor)}>
            <PriceIcon className="w-3 h-3" />
            {formatPriceChange(card.priceChange24h)}
          </div>
        </div>

        {/* Market availability */}
        {!compact && (
          <div className="flex items-center justify-between text-xs text-white/40 pt-1 border-t border-pokemon-border">
            <span>{card.onSaleCount} 件在售</span>
            <span>周销 {card.soldCount7d}</span>
          </div>
        )}

        {/* Recommendation reasons */}
        {reasons && reasons.length > 0 && (
          <div className="pt-1 space-y-0.5">
            {reasons.map((r, i) => (
              <div key={i} className="flex items-center gap-1 text-[10px] text-purple-300">
                <Star className="w-2.5 h-2.5" />
                {r}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  if (onClick) return content

  const mercariUrl = mercariSoldUrl(card.nameJP, card.rarity)

  return (
    <a href={mercariUrl} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  )
}


'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'
import { POKEMON_CARDS } from '@/lib/pokemon-data'
import { formatJPY, formatPriceChange, cn } from '@/lib/utils'

export default function MarketTicker() {
  const tickerCards = [...POKEMON_CARDS]
    .sort((a, b) => Math.abs(b.priceChange24h) - Math.abs(a.priceChange24h))
    .slice(0, 12)

  // Duplicate for infinite scroll effect
  const items = [...tickerCards, ...tickerCards]

  return (
    <div className="bg-pokemon-surface border-y border-pokemon-border overflow-hidden py-2.5">
      <div className="flex items-center gap-0 animate-[scroll_40s_linear_infinite]"
        style={{ width: 'max-content' }}>
        {items.map((card, i) => (
          <div
            key={`${card.id}-${i}`}
            className="flex items-center gap-2 px-6 whitespace-nowrap border-r border-pokemon-border last:border-0"
          >
            <span className="text-white/50 text-xs font-mono">
              {card.series}#{card.cardNumber}
            </span>
            <span className="text-white text-xs font-semibold">{card.nameCN}</span>
            <span className="text-pokemon-yellow text-xs font-bold">{formatJPY(card.priceJPY)}</span>
            <span className={cn(
              'flex items-center gap-0.5 text-xs font-semibold',
              card.priceChange24h > 0 ? 'text-red-400' : 'text-green-400'
            )}>
              {card.priceChange24h > 0
                ? <TrendingUp className="w-3 h-3" />
                : <TrendingDown className="w-3 h-3" />}
              {formatPriceChange(card.priceChange24h)}
            </span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

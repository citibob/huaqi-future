import Link from 'next/link'
import { Tag, ArrowRight } from 'lucide-react'
import { getDealsCards } from '@/lib/pokemon-data'
import PokemonCardUI from './PokemonCard'

export default function DealsSection() {
  const deals = getDealsCards().slice(0, 4)

  return (
    <section className="py-16 px-4 bg-pokemon-surface border-y border-pokemon-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Tag className="w-5 h-5 text-green-400" />
              <span className="text-xs font-semibold text-green-400 uppercase tracking-widest">
                套利机会
              </span>
            </div>
            <h2 className="text-2xl font-black text-white">低于市场均价</h2>
            <p className="text-white/40 text-sm mt-1">当前市场上低于7日均价的卡牌，实时更新</p>
          </div>
          <Link
            href="/pokemon?filter=deals"
            className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
          >
            查看全部 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {deals.map(card => (
            <PokemonCardUI key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}

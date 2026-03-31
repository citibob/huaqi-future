'use client'

import { useState, useMemo } from 'react'
import { Search, Crown, ExternalLink, Trophy } from 'lucide-react'
import PokemonCardUI from '@/components/PokemonCard'
import { POKEMON_CARDS } from '@/lib/pokemon-data'
import { formatJPY } from '@/lib/utils'
import LangText from '@/components/LangText'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ポケモンカード相場一覧 / Card Market',
  description:
    'ポケモンカードの販売価格、相場推移、取引件数を確認できます。Mercari JP の成交実績に基づいたリアルタイムランキング。',
  alternates: {
    canonical: 'https://www.huaqi.jp/pokemon',
  },
}

const PLATFORM_OPTIONS = [
  { value: 'mercari' as const, label: 'Mercari JP', icon: '🟡', url: (q: string) => `https://jp.mercari.com/search?keyword=${encodeURIComponent(q)}&status=sold_out&sort=price&order=desc` },
  { value: 'ebay' as const, label: 'eBay', icon: '🔵', url: (q: string) => `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(q)}&LH_Complete=1&LH_Sold=1&_sop=16` },
]

export default function PokemonPage() {
  const [query, setQuery] = useState('')
  const [searchPlatform, setSearchPlatform] = useState<'mercari' | 'ebay'>('mercari')

  // Always sort by price descending (highest sold price first)
  const ranked = useMemo(() => {
    let cards = [...POKEMON_CARDS].sort((a, b) => b.priceJPY - a.priceJPY)

    if (query) {
      const q = query.toLowerCase()
      cards = cards.filter(c =>
        c.nameCN.includes(q) ||
        c.nameJP.includes(q) ||
        c.nameEN.toLowerCase().includes(q) ||
        c.cardNumber.includes(q)
      )
    }

    return cards
  }, [query])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    const platform = PLATFORM_OPTIONS.find(p => p.value === searchPlatform)
    if (platform) {
      window.open(platform.url(query.trim()), '_blank')
    }
  }

  // Top 3 cards for the podium
  const top3 = ranked.slice(0, 3)
  const rest = ranked.slice(3)

  return (
    <div className="min-h-screen pt-20 px-4 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/20 text-[#c9a84c] text-xs font-medium tracking-wider mb-4">
            <Crown className="w-3.5 h-3.5" />
            <LangText ja="MERCARI 成交価格ランキング" en="Mercari Sold Price Ranking" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-[#c9a84c] via-[#f4d03f] to-[#c9a84c] bg-clip-text text-transparent">
            <LangText ja="高額カード TOP 20" en="Top 20 High-Value Cards" />
          </h1>
          <p className="text-white/35 text-sm max-w-lg mx-auto">
            <LangText
              ja="Mercari JP 直近の成交実績に基づく、高額取引カードランキング"
              en="Ranking based on recent Mercari JP sold listings."
            />
          </p>
        </div>

        {/* Search bar — clean and minimal */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
              <input
                type="text"
                placeholder="Card name / Number"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#131b2e] border border-[#1e2a45] rounded-xl text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#c9a84c]/40 transition-colors"
              />
            </div>
            <div className="flex bg-[#131b2e] border border-[#1e2a45] rounded-xl overflow-hidden">
              {PLATFORM_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type={opt.value === searchPlatform ? 'submit' : 'button'}
                  onClick={() => {
                    if (opt.value === searchPlatform && query.trim()) {
                      // submit
                    } else {
                      setSearchPlatform(opt.value)
                    }
                  }}
                  className={`px-4 py-3 text-xs font-medium transition-all flex items-center gap-1.5 ${
                    opt.value === searchPlatform
                      ? 'bg-[#c9a84c]/15 text-[#c9a84c] border-r border-[#1e2a45]'
                      : 'text-white/40 hover:text-white/60 border-r border-[#1e2a45] last:border-r-0'
                  }`}
                >
                  <span>{opt.icon}</span>
                  {opt.label}
                  {opt.value === searchPlatform && <ExternalLink className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* Top 3 Podium */}
        {!query && top3.length === 3 && (
          <div className="grid grid-cols-3 gap-4 md:gap-6 mb-12 max-w-4xl mx-auto items-end">
            {/* #2 */}
            <div className="flex flex-col items-center">
              <div className="text-center mb-3">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#c0c0c0]/15 border border-[#c0c0c0]/30 text-[#c0c0c0] text-sm font-black mb-1">2</div>
                <div className="text-xs text-white/30 truncate max-w-[120px]">{top3[1].nameCN}</div>
                <div className="text-sm font-bold text-[#c0c0c0]">{formatJPY(top3[1].priceJPY)}</div>
              </div>
              <PokemonCardUI card={top3[1]} />
            </div>
            {/* #1 */}
            <div className="flex flex-col items-center -mt-6">
              <div className="text-center mb-3">
                <div className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#c9a84c]/15 border-2 border-[#c9a84c]/40 text-[#c9a84c] text-base font-black mb-1">
                  <Trophy className="w-5 h-5" />
                </div>
                <div className="text-xs text-white/30 truncate max-w-[120px]">{top3[0].nameCN}</div>
                <div className="text-base font-bold text-[#c9a84c]">{formatJPY(top3[0].priceJPY)}</div>
              </div>
              <div className="ring-2 ring-[#c9a84c]/20 rounded-2xl">
                <PokemonCardUI card={top3[0]} />
              </div>
            </div>
            {/* #3 */}
            <div className="flex flex-col items-center mt-2">
              <div className="text-center mb-3">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#cd7f32]/15 border border-[#cd7f32]/30 text-[#cd7f32] text-sm font-black mb-1">3</div>
                <div className="text-xs text-white/30 truncate max-w-[120px]">{top3[2].nameCN}</div>
                <div className="text-sm font-bold text-[#cd7f32]">{formatJPY(top3[2].priceJPY)}</div>
              </div>
              <PokemonCardUI card={top3[2]} />
            </div>
          </div>
        )}

        {/* Divider */}
        {!query && (
          <div className="flex items-center gap-4 mb-8 max-w-4xl mx-auto">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#1e2a45] to-transparent" />
            <span className="text-xs text-white/20 tracking-widest">RANK 4 – 20</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#1e2a45] to-transparent" />
          </div>
        )}

        {/* Card grid with rank numbers */}
        {(query ? ranked : rest).length === 0 ? (
          <div className="text-center py-20 text-white/30">
            <div className="text-5xl mb-4">🔍</div>
            <p><LangText ja="該当するカードが見つかりません" en="No matching cards found." /></p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {(query ? ranked : rest).map((card, i) => (
              <div key={card.id} className="relative">
                {/* Rank number */}
                <div className={`absolute -top-2 -left-1 z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-lg ${
                  query
                    ? 'bg-[#131b2e] border border-[#1e2a45] text-white/50'
                    : 'bg-[#131b2e] border border-[#1e2a45] text-white/50'
                }`}>
                  {query ? i + 1 : i + 4}
                </div>
                <PokemonCardUI card={card} />
              </div>
            ))}
          </div>
        )}

        {/* Bottom stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-6 text-xs text-white/20">
            <span>データソース: Mercari JP</span>
            <span>·</span>
            <span><LangText ja="更新: 毎日" en="Updated: Daily" /></span>
            <span>·</span>
            <span><LangText ja={`全 ${POKEMON_CARDS.length} 種`} en={`${POKEMON_CARDS.length} cards`} /></span>
          </div>
        </div>
      </div>
    </div>
  )
}

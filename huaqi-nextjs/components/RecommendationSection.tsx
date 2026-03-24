'use client'

import { useState, useEffect } from 'react'
import { Sparkles, RefreshCw } from 'lucide-react'
import PokemonCardUI from './PokemonCard'
import {
  loadPreferences,
  getRecommendations,
  getColdStartRecommendations,
} from '@/lib/recommendations'
import type { RecommendedCard } from '@/lib/types'

export default function RecommendationSection() {
  const [recs, setRecs] = useState<RecommendedCard[]>([])
  const [isPersonalized, setIsPersonalized] = useState(false)
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    setTimeout(() => {
      const prefs = loadPreferences()
      const hasHistory = prefs.viewedCards.length > 0
      setIsPersonalized(hasHistory)
      const results = hasHistory
        ? getRecommendations(prefs, [], 8)
        : getColdStartRecommendations(8)
      setRecs(results)
      setLoading(false)
    }, 300)
  }

  useEffect(() => { load() }, [])

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">
                {isPersonalized ? '个性化推荐' : '热门推荐'}
              </span>
            </div>
            <h2 className="text-2xl font-black text-white">
              {isPersonalized ? '为你推荐' : '本周热门'}
            </h2>
            <p className="text-white/40 text-sm mt-1">
              {isPersonalized
                ? '根据你的浏览记录与偏好，智能匹配最适合你的卡牌'
                : '浏览更多卡牌后，系统将为你生成个性化推荐'}
            </p>
          </div>
          <button
            onClick={load}
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white px-3 py-2 rounded-lg border border-pokemon-border hover:border-white/20 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            刷新
          </button>
        </div>

        {/* Cards grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-72 rounded-2xl bg-pokemon-card border border-pokemon-border shimmer"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {recs.map(({ card, reasons }) => (
              <PokemonCardUI key={card.id} card={card} reasons={reasons} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

'use client'

import Link from 'next/link'
import { ArrowRight, Shield, Zap, Globe, TrendingUp } from 'lucide-react'
import { POKEMON_CARDS } from '@/lib/pokemon-data'
import { TYPE_COLORS, formatJPY, formatPriceChange, cn } from '@/lib/utils'

const STATS = [
  { label: '监控卡牌', value: '24+', icon: Shield },
  { label: '实时价格', value: '4市场', icon: Globe },
  { label: '本周成交', value: '500+', icon: TrendingUp },
  { label: '更新频率', value: '10分钟', icon: Zap },
]

export default function Hero() {
  const featuredCards = POKEMON_CARDS.filter(c => c.isHot).slice(0, 5)

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16 grid-bg">
      {/* Background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              ジェムパック × AR × SAR — 日本直采
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl font-black leading-[1.05] tracking-tight">
                <span className="text-white">Pokemon</span>
                <br />
                <span className="text-pokemon-yellow neon-yellow">卡牌市场</span>
                <br />
                <span className="text-white/50 text-4xl">透明 · 精准 · 高效</span>
              </h1>
            </div>

            <p className="text-lg text-white/60 leading-relaxed max-w-lg">
              实时追踪 Mercari、eBay、AliExpress、Yahoo拍卖四大市场价格，
              AI 驱动个性化推荐，一站式发现ジェムパック套利机会。
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/pokemon"
                className="flex items-center gap-2 bg-pokemon-yellow text-black font-bold px-6 py-3 rounded-xl hover:bg-yellow-400 transition-all shadow-lg hover:shadow-yellow-500/30 hover:scale-105"
              >
                浏览卡牌市场
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/market"
                className="flex items-center gap-2 border border-pokemon-border text-white px-6 py-3 rounded-xl hover:border-white/30 hover:bg-white/5 transition-all"
              >
                <Zap className="w-4 h-4 text-green-400" />
                实时价格监控
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {STATS.map(({ label, value, icon: Icon }) => (
                <div key={label} className="text-center p-3 rounded-xl bg-pokemon-surface border border-pokemon-border">
                  <Icon className="w-4 h-4 text-pokemon-yellow mx-auto mb-1" />
                  <div className="text-xl font-black text-white">{value}</div>
                  <div className="text-xs text-white/40">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating cards */}
          <div className="relative h-[520px] hidden lg:block">
            {featuredCards.map((card, i) => {
              const mainType = card.types[0]
              const gradient = TYPE_COLORS[mainType]
              const positions = [
                { top: '5%', left: '20%', rotate: '-8deg', zIndex: 5, delay: '0s' },
                { top: '10%', left: '50%', rotate: '6deg', zIndex: 4, delay: '0.5s' },
                { top: '35%', left: '5%', rotate: '-4deg', zIndex: 3, delay: '1s' },
                { top: '38%', left: '60%', rotate: '10deg', zIndex: 2, delay: '1.5s' },
                { top: '62%', left: '30%', rotate: '-6deg', zIndex: 1, delay: '2s' },
              ]
              const pos = positions[i]
              return (
                <div
                  key={card.id}
                  style={{
                    position: 'absolute',
                    top: pos.top,
                    left: pos.left,
                    transform: `rotate(${pos.rotate})`,
                    zIndex: pos.zIndex,
                    animation: `float 6s ease-in-out ${pos.delay} infinite`,
                  }}
                  className="w-44 rounded-2xl overflow-hidden border border-white/10 shadow-2xl hover:scale-110 hover:z-10 transition-transform duration-300 cursor-pointer"
                >
                  <div className={cn('h-28 bg-gradient-to-br flex items-center justify-center', gradient)}>
                    <span className="text-4xl">{getPokemonEmoji(card.nameEN)}</span>
                  </div>
                  <div className="bg-pokemon-card p-2.5">
                    <div className="font-bold text-xs text-white">{card.nameCN}</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-pokemon-yellow text-xs font-bold">{formatJPY(card.priceJPY)}</span>
                      <span className={cn(
                        'text-[10px] font-semibold',
                        card.priceChange24h > 0 ? 'text-red-400' : 'text-green-400'
                      )}>
                        {formatPriceChange(card.priceChange24h)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function getPokemonEmoji(name: string): string {
  const map: Record<string, string> = {
    Eevee: '🦊', Espeon: '🔮', Umbreon: '🌙', Leafeon: '🍃', Glaceon: '❄️',
    Sylveon: '🎀', Gengar: '👻', Charizard: '🐉', Blastoise: '🐢', Bulbasaur: '🌱',
    Lugia: '🕊️', Rayquaza: '🌈', Gardevoir: '🪄', Mewtwo: '⚗️', Mew: '✨',
    Pikachu: '⚡', Ogerpon: '🎭',
  }
  return map[name] ?? '🃏'
}

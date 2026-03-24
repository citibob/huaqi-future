'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CardItem {
  src: string
  label: string
}

export default function CardFanCarousel({
  boxImage,
  boxLabel,
  cards,
  isHot,
}: {
  boxImage: string
  boxLabel: string
  cards: CardItem[]
  isHot?: boolean
}) {
  const [active, setActive] = useState(0) // start immediately at first card
  const [isPlaying, setIsPlaying] = useState(true)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total = cards.length

  const goNext = useCallback(() => {
    setActive((i) => (i + 1) % total)
  }, [total])

  // Auto-play starts immediately
  useEffect(() => {
    if (isPlaying && total > 1) {
      timerRef.current = setInterval(goNext, 2200) // faster for smoother feel
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, goNext, total])

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (isPlaying && total > 1) {
      timerRef.current = setInterval(goNext, 2200)
    }
  }

  const navigate = (dir: 'prev' | 'next') => {
    setActive((i) => dir === 'prev' ? (i - 1 + total) % total : (i + 1) % total)
    resetTimer()
  }

  const selectCard = (idx: number) => {
    setActive(idx)
    resetTimer()
  }

  const displaySrc = cards[active]?.src ?? boxImage
  const displayLabel = cards[active]?.label ?? boxLabel

  // Smooth fan layout with cubic-bezier-like easing via inline transition
  const getCardStyle = (idx: number): React.CSSProperties => {
    let d = idx - active
    if (d > total / 2) d -= total
    if (d < -total / 2) d += total

    const absD = Math.abs(d)
    const maxVisible = 3

    if (absD > maxVisible) {
      return {
        opacity: 0,
        transform: `translateX(${d > 0 ? 200 : -200}px) scale(0.4) rotateZ(${d > 0 ? -20 : 20}deg)`,
        zIndex: 0,
        pointerEvents: 'none',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      }
    }

    const translateX = d * 80
    const translateY = absD * absD * 4 // quadratic curve for natural arc
    const rotateZ = d * -7
    const scale = 1 - absD * 0.1
    const opacity = absD === 0 ? 1 : Math.max(0.35, 1 - absD * 0.22)
    const zIndex = 100 - absD

    return {
      transform: `translateX(${translateX}px) translateY(${translateY}px) rotateZ(${rotateZ}deg) scale(${scale})`,
      zIndex,
      opacity,
      filter: absD > 0 ? `brightness(${1 - absD * 0.12})` : 'brightness(1.05)',
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    }
  }

  return (
    <div className="flex flex-col items-center">
      {/* Main Display — synced with active card */}
      <div className="relative w-full max-w-[320px] mx-auto mb-2">
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-[#1e2a45] bg-[#131b2e] shadow-2xl">
          {/* Crossfade: render all images, only active one is visible */}
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="absolute inset-0"
              style={{
                opacity: idx === active ? 1 : 0,
                transition: 'opacity 0.6s ease-in-out',
                zIndex: idx === active ? 2 : 1,
              }}
            >
              <Image
                src={card.src}
                alt={card.label}
                fill
                className="object-contain p-3"
                priority={idx < 3}
                sizes="320px"
              />
            </div>
          ))}
          {/* badge removed */}
          {/* Label overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3 z-10">
            <p className="text-sm text-white/80 text-center truncate" style={{ transition: 'opacity 0.3s' }}>{displayLabel}</p>
          </div>
        </div>
      </div>

      {/* Card Fan Area */}
      {total > 0 && (
        <div className="relative w-full mt-2">
          <div
            className="relative mx-auto flex items-end justify-center"
            style={{ height: 220 }}
          >
            {cards.map((card, idx) => (
              <button
                key={idx}
                onClick={() => selectCard(idx)}
                className={cn(
                  'absolute bottom-0 rounded-lg overflow-hidden border-2 shadow-xl cursor-pointer',
                  idx === active
                    ? 'border-[#c9a84c] shadow-[0_0_20px_rgba(201,168,76,0.3)]'
                    : 'border-[#1e2a45] hover:border-white/20'
                )}
                style={{
                  width: 140,
                  height: 196,
                  transformOrigin: 'center bottom',
                  ...getCardStyle(idx),
                }}
              >
                <Image
                  src={card.src}
                  alt={card.label}
                  fill
                  className="object-cover"
                  sizes="140px"
                />
                {idx === active && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/8 to-transparent pointer-events-none" />
                )}
              </button>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => navigate('prev')}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#131b2e]/80 border border-[#1e2a45] hover:border-[#c9a84c]/50 flex items-center justify-center text-white/60 hover:text-white transition-all"
            aria-label="前のカード"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('next')}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#131b2e]/80 border border-[#1e2a45] hover:border-[#c9a84c]/50 flex items-center justify-center text-white/60 hover:text-white transition-all"
            aria-label="次のカード"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Controls */}
      {total > 0 && (
        <div className="flex items-center justify-between w-full mt-4 px-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/50 transition-colors"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {isPlaying ? '一時停止' : '自動再生'}
          </button>
          <span className="text-xs text-white/30">{active + 1} / {total}</span>
        </div>
      )}

      {/* Dot indicators */}
      {total > 1 && (
        <div className="flex gap-1.5 mt-3">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => selectCard(idx)}
              className={cn(
                'rounded-full transition-all duration-500',
                idx === active
                  ? 'w-6 h-2 bg-[#c9a84c]'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

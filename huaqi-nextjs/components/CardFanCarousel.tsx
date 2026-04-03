'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import LangText from './LangText'

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
  const [active, setActive] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [lightbox, setLightbox] = useState(false)
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

  // Lightbox: pause autoplay when open, close on Escape
  const openLightbox = () => {
    setLightbox(true)
    setIsPlaying(false)
  }

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % total)
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + total) % total)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox, total])

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
        <div
          className="relative aspect-[3/4] rounded-xl overflow-hidden border border-[#1e2a45] bg-[#131b2e] shadow-2xl cursor-zoom-in group"
          onClick={openLightbox}
        >
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
          <div className="absolute inset-0 z-[3] bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="text-white text-xs bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <LangText ja="クリックして拡大" en="Click to enlarge" />
            </span>
          </div>
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
            aria-label="Previous card"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('next')}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#131b2e]/80 border border-[#1e2a45] hover:border-[#c9a84c]/50 flex items-center justify-center text-white/60 hover:text-white transition-all"
            aria-label="Next card"
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
            <LangText ja={isPlaying ? '一時停止' : '自動再生'} en={isPlaying ? 'Pause' : 'Autoplay'} />
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

      {/* Fullscreen Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ animation: 'lightboxFadeIn 0.3s ease-out' }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setLightbox(false)}
          />

          {/* Close button */}
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Card image */}
          <div
            className="relative z-10 w-[85vmin] max-w-[600px] aspect-[3/4]"
            style={{ animation: 'lightboxScaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="absolute inset-0"
                style={{
                  opacity: idx === active ? 1 : 0,
                  transition: 'opacity 0.4s ease-in-out',
                }}
              >
                <Image
                  src={card.src}
                  alt={card.label}
                  fill
                  className="object-contain drop-shadow-[0_0_60px_rgba(201,168,76,0.15)]"
                  sizes="600px"
                  quality={95}
                />
              </div>
            ))}
          </div>

          {/* Label */}
          <div className="absolute bottom-8 left-0 right-0 text-center z-10">
            <p className="text-white/70 text-sm">{displayLabel}</p>
            <p className="text-white/30 text-xs mt-1">{active + 1} / {total}</p>
          </div>

          {/* Navigation arrows */}
          {total > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setActive((i) => (i - 1 + total) % total) }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setActive((i) => (i + 1) % total) }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      )}

      {/* Lightbox animations */}
      <style jsx global>{`
        @keyframes lightboxFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes lightboxScaleIn {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

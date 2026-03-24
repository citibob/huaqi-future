'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GalleryImage {
  src: string
  label: string
}

export default function ProductGallery({
  images,
  isHot,
  isSealed,
}: {
  images: GalleryImage[]
  isHot?: boolean
  isSealed?: boolean
}) {
  const [selectedImg, setSelectedImg] = useState(0)
  const thumbRef = useRef<HTMLDivElement>(null)

  const goPrev = () => setSelectedImg((i) => (i > 0 ? i - 1 : images.length - 1))
  const goNext = () => setSelectedImg((i) => (i < images.length - 1 ? i + 1 : 0))

  // scroll thumbnail strip to make the active thumb visible
  const scrollToThumb = (idx: number) => {
    if (!thumbRef.current) return
    const el = thumbRef.current.children[idx] as HTMLElement | undefined
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  const selectImg = (idx: number) => {
    setSelectedImg(idx)
    scrollToThumb(idx)
  }

  const handlePrev = () => {
    const next = selectedImg > 0 ? selectedImg - 1 : images.length - 1
    setSelectedImg(next)
    scrollToThumb(next)
  }

  const handleNext = () => {
    const next = selectedImg < images.length - 1 ? selectedImg + 1 : 0
    setSelectedImg(next)
    scrollToThumb(next)
  }

  return (
    <>
      {/* Main Image */}
      <div className="rounded-xl border border-[#1e2a45] bg-[#131b2e] overflow-hidden">
        <div className="relative aspect-[4/3] bg-[#0a0f1a] group">
          <Image
            src={images[selectedImg].src}
            alt={images[selectedImg].label}
            fill
            className="object-contain p-6"
            priority
          />
          {isHot && selectedImg === 0 && (
            <div className="absolute top-4 left-4 bg-red-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-full">人気</div>
          )}
          {isSealed && selectedImg === 0 && (
            <div className="absolute top-4 right-4 bg-[#c9a84c]/90 text-[#0a0f1a] text-xs font-bold px-3 py-1.5 rounded-full">未開封</div>
          )}

          {/* Prev / Next arrows on main image */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white/70 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                aria-label="前の画像"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white/70 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                aria-label="次の画像"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image counter */}
          <div className="absolute bottom-3 right-3 bg-black/60 text-white/70 text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <ImageIcon className="w-3 h-3" />
            {selectedImg + 1} / {images.length}
          </div>
        </div>
        {/* Caption */}
        <div className="px-4 py-2.5 border-t border-[#1e2a45] text-xs text-white/40 text-center">
          {images[selectedImg].label}
        </div>
      </div>

      {/* Thumbnail Strip with arrows */}
      {images.length > 1 && (
        <div className="relative mt-3 group/thumbs">
          {/* Left scroll arrow */}
          <button
            onClick={() => {
              if (thumbRef.current) thumbRef.current.scrollBy({ left: -200, behavior: 'smooth' })
            }}
            className="absolute left-0 top-0 bottom-0 z-10 w-8 flex items-center justify-center bg-gradient-to-r from-[#0a0f1a] to-transparent opacity-0 group-hover/thumbs:opacity-100 transition-opacity"
            aria-label="左にスクロール"
          >
            <ChevronLeft className="w-4 h-4 text-white/70" />
          </button>

          <div
            ref={thumbRef}
            className="flex gap-2 overflow-x-auto pb-1 scroll-smooth px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => selectImg(i)}
                className={cn(
                  'relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all',
                  selectedImg === i
                    ? 'border-[#c9a84c] ring-1 ring-[#c9a84c]/30'
                    : 'border-[#1e2a45] hover:border-white/20 opacity-60 hover:opacity-100'
                )}
              >
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>

          {/* Right scroll arrow */}
          <button
            onClick={() => {
              if (thumbRef.current) thumbRef.current.scrollBy({ left: 200, behavior: 'smooth' })
            }}
            className="absolute right-0 top-0 bottom-0 z-10 w-8 flex items-center justify-center bg-gradient-to-l from-[#0a0f1a] to-transparent opacity-0 group-hover/thumbs:opacity-100 transition-opacity"
            aria-label="右にスクロール"
          >
            <ChevronRight className="w-4 h-4 text-white/70" />
          </button>
        </div>
      )}
    </>
  )
}

export function CardShowcaseGrid({
  images,
}: {
  images: GalleryImage[]
}) {
  if (images.length <= 1) return null

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-[#c9a84c]" /> 商品・カード紹介
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.slice(1).map((img, i) => (
          <div
            key={i}
            className="rounded-xl border border-[#1e2a45] bg-[#131b2e] overflow-hidden group"
          >
            <div className="relative aspect-[4/3] bg-[#0a0f1a]">
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="px-4 py-3 border-t border-[#1e2a45]">
              <p className="text-sm text-white/50">{img.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

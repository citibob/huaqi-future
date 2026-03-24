'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ExternalLink, Copy, Check, TrendingUp, TrendingDown } from 'lucide-react'
import { cn, formatJPY, formatCNY } from '@/lib/utils'
import type { GemPackData } from '@/lib/gem-pack-data'

interface Props {
  pack: GemPackData
}

export default function GemPackCard({ pack }: Props) {
  const [copied, setCopied] = useState(false)
  const [imgError, setImgError] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(pack.mercariUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = pack.mercariUrl
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const PriceIcon = pack.priceChange24h > 0 ? TrendingUp : TrendingDown
  const priceColor = pack.priceChange24h > 0 ? 'text-red-400' : 'text-green-400'

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-900/30 to-amber-900/20 border border-yellow-500/20 hover:border-yellow-500/50 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-500/10">
      {/* Top badge */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        {pack.isSealed && (
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
            ✓ 含封膜
          </span>
        )}
        {pack.isHot && (
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
            🔥 热门
          </span>
        )}
      </div>

      {/* Image */}
      <Link href={`/packs/${pack.id}`}>
        <div className="relative h-48 bg-gradient-to-br from-yellow-400/20 to-amber-600/30 flex items-center justify-center">
          {!imgError ? (
            <img
              src={pack.imageUrl}
              alt={pack.nameCN}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="text-6xl">💎</div>
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {/* Vol badge */}
          <div className="absolute bottom-3 left-3">
            <span className="text-xs font-mono font-bold text-white/80 bg-black/50 px-2 py-1 rounded">
              {pack.code} · {pack.vol}
            </span>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-5">
        <Link href={`/packs/${pack.id}`}>
          <h3 className="font-bold text-lg text-white group-hover:text-yellow-300 transition-colors">
            {pack.nameCN}
          </h3>
          <p className="text-sm text-white/50 mt-1">{pack.nameJP}</p>
        </Link>

        {/* Price */}
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="text-2xl font-black text-yellow-300">
              {formatJPY(pack.priceJPY)}
            </div>
            <div className="text-xs text-white/50">
              ≈ ¥{pack.priceCNY} CNY
            </div>
          </div>
          <div className={cn('flex items-center gap-1 text-sm font-semibold', priceColor)}>
            <PriceIcon className="w-4 h-4" />
            {pack.priceChange24h > 0 ? '+' : ''}{pack.priceChange24h}%
          </div>
        </div>

        {/* Stats */}
        <div className="mt-3 flex items-center justify-between text-xs text-white/40">
          <span>{pack.onSaleCount}件在售</span>
          <span>周销 {pack.soldCount7d}个</span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleCopy}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all',
              copied
                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/10'
            )}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                复制成功
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                复制链接
              </>
            )}
          </button>
          <a
            href={pack.mercariUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-yellow-400 text-black hover:bg-yellow-300 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            前往Mercari
          </a>
        </div>
      </div>
    </div>
  )
}

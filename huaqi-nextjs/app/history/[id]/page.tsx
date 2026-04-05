import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Calendar, Hash, Layers, Star, ExternalLink } from 'lucide-react'
import { TIMELINE, findEntry, getAllEntryIds } from '@/lib/history-data'
import CardFanCarousel from '@/components/CardFanCarousel'

/* ── Static Params ── */
export function generateStaticParams() {
  return getAllEntryIds().map((id) => ({ id }))
}

/* ── Metadata ── */
export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const result = findEntry(params.id)
  if (!result) return { title: 'Not Found' }
  return {
    title: `${result.entry.title} — 简中宝可梦TCG发展史`,
    description: result.entry.description,
    alternates: { canonical: `https://www.huaqi.jp/history/${params.id}` },
  }
}

/* ── Type Config ── */
const TYPE_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  expansion: { label: '补充包', color: 'bg-blue-500/15 text-blue-400 border-blue-500/20', icon: '📦' },
  enhanced: { label: '强化包', color: 'bg-green-500/15 text-green-400 border-green-500/20', icon: '⚡' },
  'gem-pack': { label: '宝石包', color: 'bg-[#c9a84c]/15 text-[#c9a84c] border-[#c9a84c]/20', icon: '💎' },
  starter: { label: '起始包', color: 'bg-purple-500/15 text-purple-400 border-purple-500/20', icon: '🎯' },
  special: { label: '专题包', color: 'bg-pink-500/15 text-pink-400 border-pink-500/20', icon: '✨' },
  milestone: { label: '里程碑', color: 'bg-amber-500/15 text-amber-400 border-amber-500/20', icon: '🏆' },
}

/* ── Navigation Helper ── */
function getAdjacentEntries(currentId: string) {
  const allIds = getAllEntryIds()
  const idx = allIds.indexOf(currentId)
  const prevId = idx > 0 ? allIds[idx - 1] : null
  const nextId = idx < allIds.length - 1 ? allIds[idx + 1] : null
  return {
    prev: prevId ? findEntry(prevId) : null,
    next: nextId ? findEntry(nextId) : null,
  }
}

/* ── Page ── */
export default function HistoryDetailPage({ params }: { params: { id: string } }) {
  const result = findEntry(params.id)
  if (!result) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">未找到该条目</h1>
          <Link href="/history" className="text-[#c9a84c] hover:underline">返回发展史</Link>
        </div>
      </div>
    )
  }

  const { entry, era } = result
  const typeConfig = TYPE_CONFIG[entry.type] || TYPE_CONFIG.expansion
  const { prev, next } = getAdjacentEntries(params.id)
  const descriptionParagraphs = (entry.descriptionLong || entry.description).split('\n\n')

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Header */}
      <div className="relative overflow-hidden">
        {/* Background glow */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] ${era.dotColor}/5 rounded-full blur-3xl`} />

        <div className="relative max-w-4xl mx-auto px-4 py-12 md:py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/30 mb-8">
            <Link href="/history" className="hover:text-white/60 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" />
              发展史
            </Link>
            <span>/</span>
            <span className={era.color}>{era.era}</span>
            <span>/</span>
            <span className="text-white/50">{entry.title}</span>
          </div>

          {/* Title Area */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Image */}
            {entry.image && (
              <div
                className={`relative flex-shrink-0 ${
                  entry.type === 'gem-pack'
                    ? 'w-full md:w-56 aspect-square'
                    : 'w-full md:w-72 aspect-[16/9]'
                } rounded-xl overflow-hidden bg-black/40 border ${era.borderColor}`}
              >
                <Image
                  src={entry.image}
                  alt={entry.title}
                  fill
                  className="object-contain p-3"
                  sizes="300px"
                  priority
                />
              </div>
            )}

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`text-xs font-bold px-2.5 py-1 rounded border ${typeConfig.color}`}>
                  {typeConfig.icon} {typeConfig.label}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded ${era.bgColor} ${era.color} border ${era.borderColor}`}>
                  {era.era}
                </span>
              </div>

              <h1 className={`text-3xl md:text-4xl font-black mb-2 ${entry.highlight ? era.color : 'text-white'}`}>
                {entry.title}
              </h1>
              <p className="text-sm text-white/30 mb-5">{entry.titleEn}</p>

              {/* Meta Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="bg-white/3 rounded-lg p-3 border border-white/5">
                  <div className="flex items-center gap-1.5 text-[10px] text-white/30 mb-1">
                    <Calendar className="w-3 h-3" />
                    发售日期
                  </div>
                  <div className="text-sm font-bold text-white/80">{entry.date}</div>
                </div>
                {entry.code && (
                  <div className="bg-white/3 rounded-lg p-3 border border-white/5">
                    <div className="flex items-center gap-1.5 text-[10px] text-white/30 mb-1">
                      <Hash className="w-3 h-3" />
                      编号
                    </div>
                    <div className="text-sm font-bold font-mono text-white/80">{entry.code}</div>
                  </div>
                )}
                {entry.cardCount && (
                  <div className="bg-white/3 rounded-lg p-3 border border-white/5">
                    <div className="flex items-center gap-1.5 text-[10px] text-white/30 mb-1">
                      <Layers className="w-3 h-3" />
                      收录卡牌
                    </div>
                    <div className="text-sm font-bold text-white/80">{entry.cardCount}</div>
                  </div>
                )}
                <div className="bg-white/3 rounded-lg p-3 border border-white/5">
                  <div className="flex items-center gap-1.5 text-[10px] text-white/30 mb-1">
                    <Star className="w-3 h-3" />
                    类型
                  </div>
                  <div className="text-sm font-bold text-white/80">{typeConfig.label}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 mt-4">
        {/* Card Fan Carousel — shown first */}
        {entry.cardImages && entry.cardImages.length > 0 && (
          <section className={`rounded-xl border p-6 md:p-8 mb-6 ${era.bgColor} ${era.borderColor}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">卡牌图鉴</h2>
              <span className="text-xs text-white/30">{entry.cardImages.length} 张卡牌</span>
            </div>
            <CardFanCarousel
              boxImage={entry.cardImages[0]}
              boxLabel={entry.title}
              cards={entry.cardImages.map((url) => ({
                src: url,
                label: url.split('/').pop()?.replace(/\.\w+$/, '') ?? '',
              }))}
            />
          </section>
        )}

        {/* Description */}
        <section className={`rounded-xl border p-6 md:p-8 mb-6 ${era.bgColor} ${era.borderColor}`}>
          <h2 className="text-lg font-bold mb-4">详细介绍</h2>
          <div className="space-y-4">
            {descriptionParagraphs.map((p, i) => (
              <p key={i} className="text-sm text-white/55 leading-relaxed">{p}</p>
            ))}
          </div>
        </section>

        {/* Features */}
        {entry.features && entry.features.length > 0 && (
          <section className="rounded-xl border border-[#1e2a45]/50 bg-[#0c1220]/50 p-6 md:p-8 mb-6">
            <h2 className="text-lg font-bold mb-4">特色亮点</h2>
            <div className="flex flex-wrap gap-2">
              {entry.features.map((f) => (
                <span
                  key={f}
                  className={`text-xs px-3 py-1.5 rounded-full border ${era.borderColor} ${era.bgColor} ${era.color}`}
                >
                  {f}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Sub-sets */}
        {entry.subSets && entry.subSets.length > 0 && (
          <section className="rounded-xl border border-[#1e2a45]/50 bg-[#0c1220]/50 p-6 md:p-8 mb-6">
            <h2 className="text-lg font-bold mb-4">包含产品</h2>
            <div className="space-y-2">
              {entry.subSets.map((s) => (
                <div key={s} className="flex items-center gap-3 text-sm text-white/50 bg-white/3 rounded-lg px-4 py-2.5 border border-white/5">
                  <div className={`w-2 h-2 rounded-full ${era.dotColor}`} />
                  {s}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Wiki Link */}
        {entry.wikiUrl && (
          <section className="mb-6">
            <a
              href={entry.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors bg-white/3 rounded-lg px-4 py-3 border border-white/5"
            >
              <ExternalLink className="w-4 h-4" />
              在神奇宝贝百科查看完整信息
            </a>
          </section>
        )}

        {/* Gem Pack Link */}
        {entry.type === 'gem-pack' && (
          <section className="mb-6">
            <Link
              href={`/packs/gem-pack-vol${entry.id.replace('gem-pack-', '')}`}
              className="flex items-center justify-between bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-xl px-5 py-4 hover:bg-[#c9a84c]/15 transition-colors"
            >
              <div>
                <div className="text-[#c9a84c] font-bold text-sm">查看商品详情</div>
                <div className="text-xs text-white/30 mt-0.5">前往{entry.title}商品页购买</div>
              </div>
              <ArrowRight className="w-5 h-5 text-[#c9a84c]" />
            </Link>
          </section>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-10">
          {prev ? (
            <Link
              href={`/history/${prev.entry.id}`}
              className="flex-1 group bg-white/3 border border-white/5 hover:border-white/15 rounded-xl p-4 transition-all"
            >
              <div className="text-[10px] text-white/25 mb-1 flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" />
                上一条
              </div>
              <div className="text-sm font-bold text-white/70 group-hover:text-white transition-colors truncate">{prev.entry.title}</div>
              <div className="text-[10px] text-white/20 mt-0.5">{prev.entry.date}</div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/history/${next.entry.id}`}
              className="flex-1 group bg-white/3 border border-white/5 hover:border-white/15 rounded-xl p-4 transition-all text-right"
            >
              <div className="text-[10px] text-white/25 mb-1 flex items-center justify-end gap-1">
                下一条
                <ArrowRight className="w-3 h-3" />
              </div>
              <div className="text-sm font-bold text-white/70 group-hover:text-white transition-colors truncate">{next.entry.title}</div>
              <div className="text-[10px] text-white/20 mt-0.5">{next.entry.date}</div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>

        {/* Back to timeline */}
        <div className="text-center mt-8">
          <Link
            href="/history"
            className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            返回完整发展史
          </Link>
        </div>
      </div>
    </div>
  )
}

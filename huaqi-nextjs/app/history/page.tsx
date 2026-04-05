import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { TIMELINE, type TimelineEntry } from '@/lib/history-data'

export const metadata: Metadata = {
  title: '简体中文版宝可梦TCG发展史 / Pokemon TCG SC History',
  description:
    '简体中文版宝可梦集换式卡牌游戏（Pokemon TCG）完整发展史。从2022年太阳&月亮系列首发，到朱&紫系列与宝石包，记录每一个里程碑。',
  alternates: {
    canonical: 'https://www.huaqi.jp/history',
  },
}

/* ── Type Badge ── */
function TypeBadge({ type }: { type: TimelineEntry['type'] }) {
  const config: Record<string, { label: string; color: string }> = {
    expansion: { label: '补充包', color: 'bg-blue-500/15 text-blue-400 border-blue-500/20' },
    enhanced: { label: '强化包', color: 'bg-green-500/15 text-green-400 border-green-500/20' },
    'gem-pack': { label: '宝石包', color: 'bg-[#c9a84c]/15 text-[#c9a84c] border-[#c9a84c]/20' },
    starter: { label: '起始包', color: 'bg-purple-500/15 text-purple-400 border-purple-500/20' },
    special: { label: '专题包', color: 'bg-pink-500/15 text-pink-400 border-pink-500/20' },
    milestone: { label: '里程碑', color: 'bg-amber-500/15 text-amber-400 border-amber-500/20' },
  }
  const c = config[type] || config.expansion
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${c.color}`}>
      {c.label}
    </span>
  )
}

/* ── Page ── */
export default function HistoryPage() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Header */}
      <div className="relative overflow-hidden py-16 md:py-24 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-500/5 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            返回首页
          </Link>
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#c9a84c] bg-[#c9a84c]/8 border border-[#c9a84c]/15 px-4 py-2 rounded-full mb-6">
            ⏱ 发展史 · History
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
            简体中文版<br />
            <span className="text-[#c9a84c]">宝可梦TCG发展史</span>
          </h1>
          <p className="text-base md:text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
            从2022年10月首发到今天，简体中文版宝可梦集换式卡牌游戏<br className="hidden md:block" />
            走过了三个系列时代，发行了数十套扩展包。
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 md:gap-16 mt-10">
            <div>
              <div className="text-3xl md:text-4xl font-black text-[#c9a84c]">3</div>
              <div className="text-[10px] text-white/30 uppercase tracking-wider mt-1">系列 Series</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-[#c9a84c]">30+</div>
              <div className="text-[10px] text-white/30 uppercase tracking-wider mt-1">扩展包 Sets</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-[#c9a84c]">5</div>
              <div className="text-[10px] text-white/30 uppercase tracking-wider mt-1">宝石包 Gem Packs</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-black text-[#c9a84c]">3.5年</div>
              <div className="text-[10px] text-white/30 uppercase tracking-wider mt-1">历程 Years</div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto px-4">
        {TIMELINE.map((era) => (
          <section key={era.era} className="relative mb-16 last:mb-0">
            {/* Era Header */}
            <div className="sticky top-16 z-10 py-4 bg-[#050608]/90 backdrop-blur-md border-b border-white/5 mb-8">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${era.color.replace('text-', 'bg-')} shadow-lg`} />
                <div>
                  <h2 className={`text-xl md:text-2xl font-black ${era.color}`}>{era.era}</h2>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-white/30">{era.eraEn}</span>
                    <span className="text-[10px] text-white/20 bg-white/5 px-2 py-0.5 rounded">{era.period}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Line */}
            <div className="relative">
              <div className={`absolute left-4 md:left-6 top-0 bottom-0 w-px ${era.borderColor}`} />

              {/* Entries */}
              <div className="space-y-6">
                {era.entries.map((entry) => (
                  <Link
                    key={`${entry.date}-${entry.title}`}
                    href={`/history/${entry.id}`}
                    className="relative pl-10 md:pl-16 block group"
                  >
                    {/* Dot on timeline */}
                    <div
                      className={`absolute left-[13px] md:left-[21px] top-2 w-2.5 h-2.5 rounded-full border-2 transition-all group-hover:scale-125 ${
                        entry.highlight
                          ? `${era.color.replace('text-', 'bg-')} border-transparent shadow-lg`
                          : `bg-[#0a0f1a] ${era.borderColor} group-hover:${era.color.replace('text-', 'bg-')}`
                      }`}
                    />

                    {/* Card */}
                    <div
                      className={`rounded-xl border p-5 md:p-6 transition-all group-hover:border-white/20 group-hover:shadow-lg ${
                        entry.highlight
                          ? `${era.bgColor} ${era.borderColor} shadow-lg`
                          : 'bg-[#0c1220]/50 border-[#1e2a45]/50 hover:border-[#1e2a45]'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        {/* Image */}
                        {entry.image && (
                          <div
                            className={`relative flex-shrink-0 ${
                              entry.type === 'gem-pack'
                                ? 'w-full md:w-32 aspect-square'
                                : 'w-full md:w-48 aspect-[16/7]'
                            } rounded-lg overflow-hidden bg-black/30`}
                          >
                            <Image
                              src={entry.image}
                              alt={entry.title}
                              fill
                              className="object-contain p-2"
                              sizes="200px"
                            />
                          </div>
                        )}

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-[11px] font-mono text-white/25">{entry.date}</span>
                            <TypeBadge type={entry.type} />
                            {entry.code && (
                              <span className="text-[10px] font-mono text-white/20 bg-white/5 px-1.5 py-0.5 rounded">
                                {entry.code}
                              </span>
                            )}
                          </div>
                          <h3 className={`text-lg md:text-xl font-black mb-1 ${entry.highlight ? era.color : 'text-white'} group-hover:${era.color}`}>
                            {entry.title}
                          </h3>
                          <p className="text-[11px] text-white/25 mb-2">{entry.titleEn}</p>
                          <p className="text-sm text-white/50 leading-relaxed">{entry.description}</p>
                          {entry.cardCount && (
                            <div className="mt-3 text-[11px] text-white/30">
                              📦 收录卡牌：{entry.cardCount}
                            </div>
                          )}
                          {/* Click hint */}
                          <div className="mt-3 flex items-center gap-1 text-[10px] text-white/20 group-hover:text-white/40 transition-colors">
                            查看详情 <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* End Mark */}
        <div className="text-center py-12 mt-8">
          <div className="inline-flex items-center gap-2 text-xs text-white/20 bg-white/3 border border-white/5 px-5 py-2.5 rounded-full">
            📅 持续更新中 · To be continued...
          </div>
        </div>
      </div>
    </div>
  )
}

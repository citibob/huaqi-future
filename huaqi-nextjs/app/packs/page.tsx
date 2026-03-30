import Image from 'next/image'
import Link from 'next/link'
import { Package, ShieldCheck, Truck, Star } from 'lucide-react'
import { GEM_PACKS } from '@/lib/gem-pack-data'
import { cn, formatJPY, formatCNY } from '@/lib/utils'
import LangText from '@/components/LangText'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ジェムパックシリーズ / Gem Pack',
  description:
    '中国版ポケモンカード「ジェムパック」全シリーズの紹介ページです。Gem Pack lineup with pricing, stock, and product highlights from Vol.1 to Vol.5.',
  alternates: {
    canonical: '/packs',
  },
}

const FEATURES = [
  { icon: ShieldCheck, text: '中国正規ライセンス品', desc: '正規店からの直接仕入れ' },
  { icon: Package, text: '未開封・シュリンク付き', desc: '品質保証済みの完全未開封品' },
  { icon: Truck, text: '全国配送対応', desc: '追跡番号付きで安全にお届け' },
  { icon: Star, text: 'PSA鑑定代行', desc: 'ご希望の方にはPSA鑑定も対応' },
]

export default function PacksPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero */}
      <div className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(201,168,76,0.08),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.06),transparent_40%)]" />
        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-medium text-[#c9a84c] bg-[#c9a84c]/8 border border-[#c9a84c]/15 px-4 py-2 rounded-full mb-6">
                <Package className="w-4 h-4" />
                <LangText ja={`全${GEM_PACKS.length}シリーズ取扱中`} en={`${GEM_PACKS.length} Series Available`} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                <LangText ja="ジェムパックシリーズ" en="Gem Pack Series" />
              </h1>
              <p className="text-white/45 leading-relaxed mb-8">
                <LangText
                  ja="中国で正規発売されているポケモンカード「ジェムパック」シリーズの全ラインナップ。中国正規ライセンス店からの直接仕入れにより、真贋鑑定済みの商品のみをお届けいたします。"
                  en="Complete lineup of China-released Pokemon Gem Pack products. We source directly from authorized partners and handle only verified genuine items."
                />
              </p>
              <div className="grid grid-cols-2 gap-3">
                {FEATURES.map((f) => (
                  <div key={f.text} className="flex items-start gap-3 rounded-lg bg-[#131b2e] border border-[#1e2a45] p-3">
                    <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/8 flex items-center justify-center shrink-0">
                      <f.icon className="w-4 h-4 text-[#c9a84c]" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold">{f.text}</div>
                      <div className="text-xs text-white/35 mt-0.5">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              {/* Vol.5 — 最新弾を大きく表示 */}
              <Link href="/packs/gem-pack-vol5" className="relative block mb-3 group">
                <Image
                  src="/images/poster-vol5-square.png"
                  alt="ジェムパック Vol.5 — Coming Soon"
                  width={600}
                  height={600}
                  className="rounded-xl border border-[#c9a84c]/30 shadow-2xl w-full aspect-square object-cover group-hover:brightness-110 transition-all duration-300"
                />
                <div className="absolute top-3 right-3 bg-[#c9a84c] text-[#0a0f1a] text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  NEW — 2026.4.24
                </div>
              </Link>
              {/* Vol.1〜4 */}
              <div className="grid grid-cols-4 gap-3">
                <Link href="/packs/gem-pack-vol1" className="group">
                  <Image
                    src="/images/poster-vol1-square.png"
                    alt="ジェムパック Vol.1"
                    width={300}
                    height={300}
                    className="rounded-lg border border-[#1e2a45] shadow-xl aspect-square object-cover group-hover:border-[#c9a84c]/40 group-hover:brightness-110 transition-all duration-300"
                  />
                </Link>
                <Link href="/packs/gem-pack-vol2" className="group">
                  <Image
                    src="/images/poster-vol2-square.png"
                    alt="ジェムパック Vol.2"
                    width={300}
                    height={300}
                    className="rounded-lg border border-[#1e2a45] shadow-xl aspect-square object-cover group-hover:border-[#c9a84c]/40 group-hover:brightness-110 transition-all duration-300"
                  />
                </Link>
                <Link href="/packs/gem-pack-vol3" className="group">
                  <Image
                    src="/images/poster-vol3-square.png"
                    alt="ジェムパック Vol.3"
                    width={300}
                    height={300}
                    className="rounded-lg border border-[#1e2a45] shadow-xl aspect-square object-cover group-hover:border-[#c9a84c]/40 group-hover:brightness-110 transition-all duration-300"
                  />
                </Link>
                <Link href="/packs/gem-pack-vol4" className="group">
                  <Image
                    src="/images/poster-vol4-square.png"
                    alt="ジェムパック Vol.4"
                    width={300}
                    height={300}
                    className="rounded-lg border border-[#1e2a45] shadow-xl aspect-square object-cover group-hover:border-[#c9a84c]/40 group-hover:brightness-110 transition-all duration-300"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-8">商品一覧</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {GEM_PACKS.map((pack) => {
              const isComingSoon = pack.priceJPY === 0
              const discount = isComingSoon ? 0 : Math.round((1 - pack.priceJPY / pack.medianPriceJPY) * 100)
              return (
                <Link key={pack.id} href={`/packs/${pack.id}`} className="rounded-xl border border-[#1e2a45] bg-[#131b2e] overflow-hidden group hover:border-[#c9a84c]/30 transition-colors">
                  {/* Image */}
                  <div className="relative aspect-[4/3] bg-[#0a0f1a] overflow-hidden">
                    <Image
                      src={pack.imageUrl}
                      alt={pack.nameCN}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                    {isComingSoon && (
                      <div className="absolute top-3 left-3 bg-[#c9a84c] text-[#0a0f1a] text-xs font-bold px-3 py-1 rounded-full">
                        COMING SOON
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="text-xs font-medium tracking-wider text-white/35 mb-1">{pack.vol} · {pack.code}</div>
                    <h3 className="font-bold text-lg mb-1">{pack.nameCN}</h3>
                    <p className="text-sm text-white/40 mb-4">{pack.nameJP}</p>

                    {isComingSoon ? (
                      <>
                        <div className="text-2xl font-bold text-[#c9a84c] mb-1">発売予定</div>
                        <div className="text-sm text-white/40 mb-4">2026年4月24日</div>
                        <div className="text-sm font-medium mb-4 text-[#c9a84c]">
                          予約受付中
                        </div>
                        <div className="block w-full text-center bg-[#c9a84c] text-[#0a0f1a] font-semibold py-2.5 rounded-lg hover:bg-[#d4b85c] transition-colors text-sm">
                          詳細を見る
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-2xl font-bold text-[#c9a84c] mb-1">{formatJPY(pack.priceJPY)}</div>
                        <div className="text-sm text-white/40 mb-4">≈ {formatCNY(pack.priceCNY)}</div>

                        <div className="grid grid-cols-3 gap-3 text-xs mb-4">
                          <div>
                            <div className="text-white/35">中央値</div>
                            <div className="mt-1 font-semibold">{formatJPY(pack.medianPriceJPY)}</div>
                          </div>
                          <div>
                            <div className="text-white/35">最安値</div>
                            <div className="mt-1 font-semibold">{formatJPY(pack.lowestPriceJPY)}</div>
                          </div>
                          <div>
                            <div className="text-white/35">出品数</div>
                            <div className="mt-1 font-semibold">{pack.onSaleCount}件</div>
                          </div>
                        </div>

                        <div className={cn('text-sm font-medium mb-4', discount > 0 ? 'text-green-400' : 'text-red-400')}>
                          {discount > 0 ? `中央値より ${discount}% お得` : `中央値より ${Math.abs(discount)}% 高い`}
                        </div>

                        <div className="block w-full text-center bg-[#c9a84c] text-[#0a0f1a] font-semibold py-2.5 rounded-lg hover:bg-[#d4b85c] transition-colors text-sm">
                          お問い合わせ
                        </div>
                      </>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="px-4 py-8">
        <div className="max-w-6xl mx-auto text-center text-white/30 text-xs space-y-2">
          <p>※ 表示価格は参考価格です。最新の価格はお問い合わせください。</p>
          <p>※ 日本国内発送。通常3〜7営業日以内にお届けいたします。</p>
          <p>※ 10,000円以上のご注文で送料無料。</p>
        </div>
      </section>
    </div>
  )
}

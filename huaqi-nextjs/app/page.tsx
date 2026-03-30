import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { ArrowRight, Gem, Shield, Languages, Truck } from 'lucide-react'
import { GEM_PACKS } from '@/lib/gem-pack-data'
import { formatJPY } from '@/lib/utils'
import LangText from '@/components/LangText'

/* ───────── stats ───────── */
const STATS = [
  { label: '設立', value: '2024', suffix: '年' },
  { label: '取引国', value: '5', suffix: 'ヶ国' },
  { label: 'パートナー', value: '50', suffix: '+' },
  { label: '顧客満足度', value: '98', suffix: '%' },
]

const SIGNATURES = [
  'JAPAN ENTITY',
  'CROSS-BORDER FLOW',
  'AUTHORIZED DISTRIBUTION',
]

export const metadata: Metadata = {
  title: 'ホーム / Home',
  description:
    '華啓未来株式会社は、中国正規品ポケモンカードの輸入販売、ホビーグッズ流通、日中間の越境貿易支援を行う日本法人です。Huaqi Future is a Japan-based company for trading cards, hobby goods, and cross-border trade support.',
  alternates: {
    canonical: '/',
  },
}

/* ───────── page ───────── */
export default function HomePage() {
  return (
    <>
      {/* ========== Hero ========== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background with tonal layering */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,143,255,0.14),transparent_18%),radial-gradient(circle_at_top_right,rgba(214,179,106,0.16),transparent_24%),linear-gradient(180deg,#050608_0%,#0b0e13_52%,#050608_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
        <div className="absolute right-[14%] top-28 hidden xl:block w-52 h-52 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute left-[18%] bottom-20 hidden xl:block w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
        
        {/* Status Pillar - Vertical Decoration */}
        <div className="absolute left-[5%] top-0 w-px h-40 bg-gradient-to-b from-secondary to-transparent" />
        <div className="absolute right-[8%] top-20 w-px h-60 bg-container-300" />
        
        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-sm bg-secondary flex items-center justify-center">
              <Gem className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
              Authorized Pokemon Card Dealer
            </span>
          </div>

          <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.15fr)_320px]">
            <div>
              {/* Main Heading - Asymmetric Typography */}
              <div className="max-w-4xl mb-12">
                <p className="mb-4 text-xs uppercase tracking-[0.35em] text-muted-light">
                  Yokohama / Japan
                </p>
                <h1 className="font-black text-display-xl text-primary leading-[0.9] tracking-tighter mb-4">
                  <LangText ja="華啓未来" en="HUAQI FUTURE" />
                </h1>
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-px w-16 bg-secondary/50" />
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-light font-light">
                    HUAQI FUTURE Inc.
                  </p>
                </div>
              </div>

              <p className="text-lg md:text-[1.35rem] lux-text max-w-2xl leading-relaxed font-light mb-10">
                <LangText
                  ja="中国正規品ポケモンカード「ジェムパック」の日本国内正規販売と、日中をまたぐ商流設計を一体で担う日本法人。"
                  en="A Japan-based company specializing in the authorized domestic distribution of China-licensed Pokemon Gem Pack products and end-to-end Japan-China trade flow design."
                />
              </p>

              <div className="mb-12 flex flex-wrap gap-3">
                {SIGNATURES.map((item) => (
                  <span
                    key={item}
                    className="rounded-sm border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-muted-light"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/packs"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary to-[#f0d69a] text-[#120d04] px-8 py-4 rounded-sm font-bold hover:opacity-90 transition-colors"
                >
                  <LangText ja="ジェムパックを見る" en="View Gem Pack" />
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 lux-panel text-primary px-8 py-4 rounded-sm font-medium hover:bg-white/5 transition-colors"
                >
                  <LangText ja="お問い合わせ" en="Contact" />
                </Link>
              </div>
            </div>

            <div className="gold-shimmer lux-outline hidden rounded-sm p-6 lg:block">
              <div className="mb-8 flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-muted-light">
                <span>Brand Note</span>
                <span className="gold-text font-bold">01</span>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.22em] text-secondary">Focus</p>
                  <p className="text-sm leading-7 lux-text">
                    正規流通、法人取引、継続供給。価格だけでなく、信頼できる商流を価値として提供。
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.22em] text-secondary">Positioning</p>
                  <p className="text-sm leading-7 lux-text">
                    ホビー領域を起点に、日本品質の運用と中国供給網を接続する越境パートナー。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Image Element */}
        <div className="absolute right-[8%] top-1/3 hidden h-[400px] w-[320px] lg:block">
          <div className="relative h-full w-full overflow-hidden rounded-sm gold-shimmer shadow-card">
            <Image
              src="/images/gem-pack-vol4.png"
              alt="Pokemon Card Gem Pack Vol.4"
              fill
              className="object-cover"
            />
            {/* Gold accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-secondary" />
          </div>
        </div>
      </section>

      {/* ========== Stats - Bento Grid ========== */}
      <section className="relative py-20 bg-[#06080b]">
        {/* Status Pillar */}
        <div className="absolute left-[5%] top-0 w-px h-full bg-container-200" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Section Label */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-6 h-px bg-secondary" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
              Company Overview
            </span>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`rounded-sm p-6 ${i === 0 ? 'gold-shimmer lux-outline' : i === 3 ? 'lux-panel' : 'bg-container-100/90 border border-white/5'}`}
              >
                <div className="mb-1 text-4xl font-black text-primary">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-muted font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Gem Pack Showcase ========== */}
      <section className="relative py-20 bg-[#050608]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-3 block">
                Featured Products
              </span>
              <h2 className="text-display-lg text-primary leading-[0.95] tracking-tighter">
                ジェムパック<br />コレクション
              </h2>
            </div>
            <Link
              href="/packs"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors"
            >
              すべて見る
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Bento Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {GEM_PACKS.map((pack, i) => (
              <Link
                key={pack.id}
                href={`/packs/${pack.id}`}
                className={`group relative overflow-hidden rounded-sm ${
                  i === 0 ? 'md:col-span-2 md:row-span-2 gold-shimmer lux-outline' : 'bg-[#0d1015] border border-white/6'
                }`}
              >
                {/* Card Content */}
                <div className={`${i === 0 ? 'p-8' : 'p-6'}`}>
                  {/* Image */}
                  <div className={`relative ${i === 0 ? 'h-48 md:h-64' : 'h-32'} mb-4 bg-container-200 rounded-sm overflow-hidden`}>
                    <Image
                      src={pack.imageUrl}
                      alt={pack.nameCN}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Status Badge */}
                    {pack.isSealed && (
                      <div className="absolute top-3 right-3 bg-secondary/90 text-white text-xs font-bold px-2 py-1 rounded-sm">
                        シュリンク付き
                      </div>
                    )}
                  </div>

                  {/* Text */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-light uppercase tracking-wider">
                        {pack.code}
                      </span>
                      <span className="text-xs text-secondary font-medium">
                        {pack.vol}
                      </span>
                    </div>
                    <h3 className={`font-black text-primary ${i === 0 ? 'text-2xl' : 'text-base'}`}>
                      {pack.nameCN}
                    </h3>
                    <p className="text-2xl font-black text-secondary">
                      {formatJPY(pack.priceJPY)}
                    </p>
                  </div>
                </div>

                {/* Hover Accent */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
          </div>

          <div className="mt-8 md:hidden text-center">
            <Link
              href="/packs"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors"
            >
              すべて見る
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== Strengths - Tonal Cards ========== */}
      <section className="relative py-20 bg-[linear-gradient(180deg,#050608_0%,#0b0e13_100%)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="gold-shimmer lux-outline rounded-sm p-8">
              <div className="w-12 h-12 bg-white/5 rounded-sm flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-black text-lg text-primary mb-2 tracking-tight">
                正規品保証
              </h3>
              <p className="text-sm lux-text leading-relaxed">
                中国正規ライセンス店との直接取引により、全商品の真贋を保証。
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-container-100/90 border border-white/6 p-8 rounded-sm">
              <div className="w-12 h-12 bg-white/5 rounded-sm flex items-center justify-center mb-6">
                <Languages className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-black text-lg text-primary mb-2 tracking-tight">
                日中バイリンガル
              </h3>
              <p className="text-sm lux-text leading-relaxed">
                日本語・中国語によるシームレスなコミュニケーションを実現。
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-container-200/90 border border-white/6 p-8 rounded-sm">
              <div className="w-12 h-12 bg-white/5 rounded-sm flex items-center justify-center mb-6">
                <Truck className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-black text-lg text-primary mb-2 tracking-tight">
                確実な配送体制
              </h3>
              <p className="text-sm lux-text leading-relaxed">
                追跡番号付き国内配送。越境物流にも完全対応。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SEO Content ========== */}
      <section className="relative py-20 bg-[#06080b]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-6 h-px bg-secondary" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
              Company Introduction
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <h2 className="text-display-lg text-primary leading-[0.95] tracking-tighter mb-5">
                日本法人として
                <br />
                信頼できる商流をつくる
              </h2>
              <p className="text-sm lux-text leading-relaxed">
                華啓未来株式会社は、中国と日本をつなぐ越境貿易企業として、継続可能で透明性の高い取引体制を重視しています。
              </p>
              <div className="mt-8 gold-shimmer lux-outline rounded-sm p-6">
                <p className="mb-2 text-xs uppercase tracking-[0.24em] text-secondary">Official Statement</p>
                <p className="text-sm leading-7 lux-text">
                  当社ウェブサイトは、会社情報、取扱商材、連絡窓口を明確に公開するための公式コーポレートサイトです。
                </p>
              </div>
            </div>

            <div className="space-y-5 text-sm lux-text leading-8">
              <p>
                当社は横浜を拠点とし、中国正規品ポケモンカード「ジェムパック」の輸入販売をはじめ、
                ホビーグッズ流通、企業間の越境取引支援、パートナーマッチング、物流設計まで一貫して対応しています。
                単に商品を販売するだけではなく、日本市場における信頼性、継続供給、問い合わせ対応、配送品質、
                取引後のフォローまで含めて、法人としての責任ある運営を行うことを基本方針としています。
              </p>
              <p>
                取扱分野は、トレーディングカード、ホビー・キャラクターグッズ、ならびに日中間の貿易コンサルティングです。
                日本国内の小売販売だけでなく、卸売りや事業提携のご相談にも対応しており、商材の調達、商流整理、
                市場確認、継続供給の可否、配送条件の調整など、実務に即した支援を提供しています。
                中国側の供給網と日本側の販売・運用感覚の両方を理解していることが、当社の大きな特徴です。
              </p>
              <p>
                特にポケモンカード分野では、正規流通ルートの明確化、真贋に対する不安の軽減、継続仕入れの安定化が重要です。
                当社では、正規性の確認できる商流を重視し、国内のお客様や事業者が安心して取引できる体制づくりを進めています。
                また、日本語と中国語の両方に対応しているため、日中間の情報差やコミュニケーションの齟齬を減らし、
                より正確で実務的な取引につなげることができます。
              </p>
              <p>
                当サイトは、当社の会社情報、取扱商材、事業内容、連絡窓口を明確にご案内するための公式ウェブサイトです。
                日本国内のお客様、法人の仕入れ担当者、流通パートナー候補、中国側の取引先候補に向けて、
                現在の事業内容と対応範囲をわかりやすく提示することを目的としています。
                商品のご相談、法人取引、協業提案、越境販売に関するお問い合わせは、当サイト内の連絡先より受け付けています。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="relative py-20 bg-[linear-gradient(135deg,#0b0e13_0%,#151a22_100%)]">
        {/* Status Pillar */}
        <div className="absolute left-[5%] top-0 w-px h-full bg-secondary/30" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/45 to-transparent" />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-muted-light">Contact Window</p>
          <h2 className="text-display-md text-white leading-[0.95] tracking-tighter mb-6">
            まずはお問い合わせ<br />ください
          </h2>
          <p className="text-white/70 mb-10 max-w-md mx-auto">
            仕入れ・コラボレーション・越大貿易の詳細について、お気軽にお問い合わせください。
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary to-[#f0d69a] text-[#120d04] px-10 py-4 rounded-sm font-bold hover:opacity-90 transition-colors"
          >
            お問い合わせ
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}

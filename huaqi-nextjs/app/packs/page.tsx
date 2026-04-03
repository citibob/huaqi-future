import Image from 'next/image'
import Link from 'next/link'
import { Package, ShieldCheck, Truck, Star, Sparkles, Globe, Layers, BookOpen } from 'lucide-react'
import { GEM_PACKS } from '@/lib/gem-pack-data'
import { cn, formatJPY, formatCNY } from '@/lib/utils'
import LangText from '@/components/LangText'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ジェムパックシリーズ / Gem Pack',
  description:
    '中国版ポケモンカード「ジェムパック（宝石包）」とは？全シリーズの紹介・稀有度体系・日版との違いを解説。What is Gem Pack? Complete guide to China-released Pokemon TCG series with rarity system, JP/EN comparison, and full product lineup.',
  alternates: {
    canonical: 'https://www.huaqi.jp/packs',
  },
}

const FEATURES = [
  { icon: ShieldCheck, text: '中国正規発売品', textEn: 'China Official Release', desc: '信頼できる仕入先から調達', descEn: 'Sourced from trusted suppliers' },
  { icon: Package, text: '原盒原膜・未開封', textEn: 'Factory Sealed', desc: '原盒原膜の完全未開封品', descEn: 'Original box, original shrink-wrap' },
  { icon: Truck, text: '全国配送対応', textEn: 'Nationwide Shipping', desc: '追跡番号付きで安全にお届け', descEn: 'Safe delivery with tracking number' },
  { icon: Star, text: '丁寧な梱包・配送', textEn: 'Careful Packing', desc: '商品の状態を保つ丁寧な梱包', descEn: 'Careful packaging to preserve condition' },
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
                  ja="中国で正規発売されているポケモンカード「ジェムパック」シリーズの全ラインナップ。信頼できる仕入先から原盒原膜の商品を調達し、真贋確認済みの商品のみをお届けいたします。"
                  en="Complete lineup of China-released Pokemon Gem Pack products. We source factory-sealed products from trusted suppliers and handle only authenticity-verified items."
                />
              </p>
              <div className="grid grid-cols-2 gap-3">
                {FEATURES.map((f) => (
                  <div key={f.text} className="flex items-start gap-3 rounded-lg bg-[#131b2e] border border-[#1e2a45] p-3">
                    <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/8 flex items-center justify-center shrink-0">
                      <f.icon className="w-4 h-4 text-[#c9a84c]" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold">
                        <LangText ja={f.text} en={f.textEn} />
                      </div>
                      <div className="text-xs text-white/35 mt-0.5">
                        <LangText ja={f.desc} en={f.descEn} />
                      </div>
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

      {/* ========== What is Gem Pack ========== */}
      <section className="px-4 py-16 border-t border-[#1e2a45]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-medium text-sky-300 bg-sky-400/8 border border-sky-400/15 px-4 py-2 rounded-full mb-6 w-fit">
            <BookOpen className="w-4 h-4" />
            <LangText ja="ジェムパックとは" en="What is Gem Pack?" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            <LangText
              ja={<>中国版ポケモンカード<br className="md:hidden" />「ジェムパック（宝石包）」とは</>}
              en={<>What is the China-released<br className="md:hidden" /> Pokemon &quot;Gem Pack&quot;?</>}
            />
          </h2>

          <div className="grid lg:grid-cols-2 gap-10 mb-16">
            <div className="space-y-5 text-sm text-white/55 leading-relaxed">
              <p>
                <LangText
                  ja="「ジェムパック（宝石包）」は、ポケモンカードゲームの中国語版として中国国内で正規発売されているトレーディングカードシリーズです。中国語名は「宝可梦集换式卡牌游戏 宝石包」。2025年1月にVol.1が発売され、現在Vol.5まで展開されています。"
                  en="Gem Pack (宝石包) is a trading card series officially released in China as the Chinese-language edition of the Pokemon Trading Card Game. The Chinese name is '宝可梦集换式卡牌游戏 宝石包'. Vol.1 launched in January 2025, and the series has now expanded to Vol.5."
                />
              </p>
              <p>
                <LangText
                  ja="最大の特徴は、全カードがキラカード（ホログラフィック）仕様であること。通常のポケモンカードではノーマルカードが多数を占めますが、ジェムパックは1パック4枚入りで全てキラ仕様という豪華な構成です。価格も中国国内定価10元（約200円）と非常に手頃で、コレクション入門にも最適です。"
                  en="The standout feature is that every card in the series is holographic. Unlike standard Pokemon TCG sets where most cards are non-holo, Gem Pack contains 4 cards per pack — all holographic. The retail price in China is just ¥10 RMB (~US$1.40), making it perfect for new collectors."
                />
              </p>
              <p>
                <LangText
                  ja="日本のコレクター市場では、中国版独自のイラストバリエーションや金箔ロゴ入りカード、つなぎアートカードなどが高い人気を集めており、特にVol.2のイーブイ進化形シリーズやVol.4のポニータバリエーションは注目を集めています。"
                  en="In Japan's collector market, the series has gained popularity for its unique illustration variants, gold-foil logo cards, and connected panorama art cards. Vol.2's Eevee evolution series and Vol.4's Ponyta variants have attracted particular attention."
                />
              </p>
            </div>

            <div className="rounded-xl bg-[#0d1015] border border-white/8 p-6">
              <h3 className="font-bold mb-4">
                <LangText ja="基本仕様" en="Basic Specs" />
              </h3>
              <div className="space-y-3 text-sm">
                {([
                  { labelJa: '正式名称', labelEn: 'Official Name', valJa: '宝可梦集换式卡牌游戏 宝石包', valEn: 'Pokemon TCG Gem Pack (宝石包)' },
                  { labelJa: '発売地域', labelEn: 'Release Region', valJa: '中国大陸', valEn: 'Mainland China' },
                  { labelJa: '言語', labelEn: 'Language', valJa: '簡体字中国語', valEn: 'Simplified Chinese' },
                  { labelJa: 'パック内容', labelEn: 'Pack Contents', valJa: '1パック4枚入り（全キラ仕様）', valEn: '4 cards per pack (all holographic)' },
                  { labelJa: '中国定価', labelEn: 'China Retail Price', valJa: '10元 / パック', valEn: '¥10 RMB / pack' },
                  { labelJa: 'シリーズ数', labelEn: 'Series Count', valJa: '全5シリーズ（Vol.1〜5）', valEn: '5 series (Vol.1–5)' },
                  { labelJa: '発売開始', labelEn: 'First Release', valJa: '2025年1月17日（Vol.1）', valEn: 'January 17, 2025 (Vol.1)' },
                ] as const).map((row) => (
                  <div key={row.labelEn} className="flex border-b border-white/5 pb-3">
                    <div className="w-28 shrink-0 text-white/35 font-medium"><LangText ja={row.labelJa} en={row.labelEn} /></div>
                    <div className="text-white/70"><LangText ja={row.valJa} en={row.valEn} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ========== Rarity System ========== */}
          <div className="mb-16">
            <div className="flex items-center gap-2 text-xs font-medium text-[#c9a84c] bg-[#c9a84c]/8 border border-[#c9a84c]/15 px-4 py-2 rounded-full mb-6 w-fit">
              <Sparkles className="w-4 h-4" />
              <LangText ja="稀有度体系" en="Rarity System" />
            </div>
            <h3 className="text-xl font-bold mb-6">
              <LangText ja="5段階のレアリティ" en="5-Tier Rarity System" />
            </h3>
            <p className="text-sm text-white/50 leading-relaxed mb-8 max-w-3xl">
              <LangText
                ja="ジェムパックは独自の5段階レアリティ体系を採用しています。全カードがキラカードですが、加工方法や箔押しのパターンによって希少度が異なります。"
                en="Gem Pack uses a unique 5-tier rarity system. While all cards are holographic, they differ in rarity based on foil processing and stamping patterns."
              />
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {([
                {
                  symbol: '●',
                  nameJa: '属性シンボル',
                  nameEn: 'Attribute Symbol',
                  descJa: 'タイプシンボルの箔押し加工。最も入手しやすいレアリティ。',
                  descEn: 'Type symbol foil stamping. The most common rarity tier.',
                  image: '/images/CBB4C0101.png',
                  color: 'border-gray-500/30',
                },
                {
                  symbol: '◆',
                  nameJa: '花紋・星柄',
                  nameEn: 'Floral / Star Pattern',
                  descJa: '花や星のパターン箔押し。通常版より華やかなデザイン。',
                  descEn: 'Floral or star pattern foil. More ornate design than the standard tier.',
                  image: '/images/CBB4C0104.png',
                  color: 'border-blue-500/30',
                },
                {
                  symbol: '★',
                  nameJa: '異色・マスボ柄',
                  nameEn: 'Alt Color / Master Ball',
                  descJa: '異色（色違い風）やマスターボール柄の箔押し加工。',
                  descEn: 'Alternative color or Master Ball pattern foil stamping.',
                  image: '/images/CBB4C0105.png',
                  color: 'border-green-500/30',
                },
                {
                  symbol: '★★',
                  nameJa: 'ジェムパックロゴ',
                  nameEn: 'Gem Pack Logo',
                  descJa: '金箔押しジェムパックロゴ入り。コレクター人気の高いレアリティ。',
                  descEn: 'Gold-foil Gem Pack logo stamp. Highly popular among collectors.',
                  image: '/images/CBB4C0107.png',
                  color: 'border-[#c9a84c]/40',
                },
                {
                  symbol: '★★★',
                  nameJa: 'トレーナー・アート',
                  nameEn: 'Trainer / Art Rare',
                  descJa: '最高レアリティ。トレーナーイラストやフルアート仕様の特別カード。',
                  descEn: 'Highest rarity. Special trainer illustration or full art cards.',
                  image: '/images/CBB1C0109.png',
                  color: 'border-purple-500/40',
                },
              ] as const).map((tier) => (
                <div key={tier.symbol} className={`rounded-xl bg-[#0d1015] border ${tier.color} p-4 flex flex-col`}>
                  <div className="text-center mb-3">
                    <span className="text-2xl font-black text-[#c9a84c]">{tier.symbol}</span>
                  </div>
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#131b2e] mb-3">
                    <Image src={tier.image} alt={tier.nameEn} fill className="object-contain p-2" sizes="200px" />
                  </div>
                  <h4 className="text-sm font-bold mb-1">
                    <LangText ja={tier.nameJa} en={tier.nameEn} />
                  </h4>
                  <p className="text-xs text-white/40 leading-relaxed">
                    <LangText ja={tier.descJa} en={tier.descEn} />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ========== JP / EN / CN Comparison ========== */}
          <div className="mb-16">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-300 bg-emerald-400/8 border border-emerald-400/15 px-4 py-2 rounded-full mb-6 w-fit">
              <Globe className="w-4 h-4" />
              <LangText ja="各国版との違い" en="Regional Comparison" />
            </div>
            <h3 className="text-xl font-bold mb-6">
              <LangText ja="日版・英語版・中国版の違い" en="Japan vs English vs China Edition" />
            </h3>
            <div className="overflow-x-auto rounded-xl border border-[#1e2a45]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#131b2e] border-b border-[#1e2a45]">
                    <th className="px-5 py-4 text-left text-white/50 font-medium"><LangText ja="項目" en="Category" /></th>
                    <th className="px-5 py-4 text-left text-white/50 font-medium"><LangText ja="日本版" en="Japan Edition" /></th>
                    <th className="px-5 py-4 text-left text-white/50 font-medium"><LangText ja="英語版" en="English Edition" /></th>
                    <th className="px-5 py-4 text-left text-[#c9a84c] font-semibold"><LangText ja="中国版（宝石包）" en="China Edition (Gem Pack)" /></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2a45]">
                  {([
                    { catJa: '言語', catEn: 'Language', jpJa: '日本語', jpEn: 'Japanese', enJa: '英語', enEn: 'English', cnJa: '簡体字中国語', cnEn: 'Simplified Chinese' },
                    { catJa: 'カード仕様', catEn: 'Card Type', jpJa: 'ノーマル＋キラ混合', jpEn: 'Normal + Holo mix', enJa: 'ノーマル＋キラ混合', enEn: 'Normal + Holo mix', cnJa: '全カードキラ仕様', cnEn: 'All cards holographic' },
                    { catJa: '1パック枚数', catEn: 'Cards/Pack', jpJa: '5枚', jpEn: '5 cards', enJa: '10枚', enEn: '10 cards', cnJa: '4枚', cnEn: '4 cards' },
                    { catJa: '定価', catEn: 'Retail Price', jpJa: '180〜260円', jpEn: '¥180–260', enJa: 'US$3.99〜5.99', enEn: 'US$3.99–5.99', cnJa: '10元（約200円）', cnEn: '¥10 RMB (~US$1.40)' },
                    { catJa: '独自要素', catEn: 'Unique Features', jpJa: 'SAR, AR等の日本限定レアリティ', jpEn: 'SAR, AR Japan-exclusive rarities', enJa: 'Illustration Rare等', enEn: 'Illustration Rare etc.', cnJa: '金箔ロゴ、つなぎアート、独自稀有度体系', cnEn: 'Gold-foil logo, panorama art, unique rarity system' },
                    { catJa: '公式大会使用', catEn: 'Tournament Legal', jpJa: '使用可', jpEn: 'Yes', enJa: '使用可', enEn: 'Yes', cnJa: '中国国内大会のみ', cnEn: 'China domestic events only' },
                    { catJa: 'コレクター需要', catEn: 'Collector Demand', jpJa: '世界的に高い', jpEn: 'Globally high', enJa: '高い', enEn: 'High', cnJa: '急速に拡大中', cnEn: 'Rapidly growing' },
                  ] as const).map((row) => (
                    <tr key={row.catEn} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3.5 text-white/50 font-medium"><LangText ja={row.catJa} en={row.catEn} /></td>
                      <td className="px-5 py-3.5 text-white/60"><LangText ja={row.jpJa} en={row.jpEn} /></td>
                      <td className="px-5 py-3.5 text-white/60"><LangText ja={row.enJa} en={row.enEn} /></td>
                      <td className="px-5 py-3.5 text-white/80 font-medium"><LangText ja={row.cnJa} en={row.cnEn} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ========== Why Collect ========== */}
          <div className="mb-16">
            <div className="flex items-center gap-2 text-xs font-medium text-violet-300 bg-violet-400/8 border border-violet-400/15 px-4 py-2 rounded-full mb-6 w-fit">
              <Layers className="w-4 h-4" />
              <LangText ja="収集の魅力" en="Why Collect" />
            </div>
            <h3 className="text-xl font-bold mb-6">
              <LangText ja="なぜジェムパックが注目されるのか" en="Why Gem Pack is Gaining Attention" />
            </h3>
            <div className="grid md:grid-cols-3 gap-5">
              {([
                {
                  titleJa: '全キラの満足感',
                  titleEn: 'All-Holo Satisfaction',
                  descJa: '1パックからノーマルカードが出ない構成は、ポケモンカードでは珍しい仕様。開封するたびにキラカードが手に入るため、コレクション効率が非常に高いのが特徴です。',
                  descEn: 'A pack structure with no normal cards is rare in Pokemon TCG. Every pack opening yields holographic cards, making collection building highly efficient.',
                },
                {
                  titleJa: '手頃な価格帯',
                  titleEn: 'Affordable Price Point',
                  descJa: '中国国内定価10元（約200円）という価格は、日本版パック（180〜260円）と比べても手頃。全キラ仕様を考えると、コストパフォーマンスが高い商品です。',
                  descEn: 'At ¥10 RMB (~¥200 JPY), pricing is comparable to Japanese packs (¥180–260) while offering all-holo cards — excellent cost-performance ratio.',
                },
                {
                  titleJa: '独自のコレクション性',
                  titleEn: 'Unique Collectibility',
                  descJa: '金箔押しジェムパックロゴ、つなぎアートイラスト、中国版限定の加工パターンなど、他の言語版にはない独自の収集要素が多数存在します。',
                  descEn: 'Gold-foil Gem Pack logos, connected panorama illustrations, and China-exclusive foil patterns offer collecting elements not found in any other language edition.',
                },
              ] as const).map((item) => (
                <div key={item.titleEn} className="rounded-xl bg-[#0d1015] border border-white/8 p-6">
                  <h4 className="font-bold mb-3">
                    <LangText ja={item.titleJa} en={item.titleEn} />
                  </h4>
                  <p className="text-sm text-white/45 leading-relaxed">
                    <LangText ja={item.descJa} en={item.descEn} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-4 py-12 border-t border-[#1e2a45]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-8">
            <LangText ja="商品一覧" en="Product List" />
          </h2>
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
                    <h3 className="font-bold text-lg mb-1"><LangText ja={pack.nameJP} en={pack.nameEN} /></h3>

                    {isComingSoon ? (
                      <>
                        <div className="text-2xl font-bold text-[#c9a84c] mb-1">
                          <LangText ja="発売予定" en="Coming Soon" />
                        </div>
                        <div className="text-sm text-white/40 mb-4">2026年4月24日</div>
                        <div className="text-sm font-medium mb-4 text-[#c9a84c]">
                          <LangText ja="予約受付中" en="Pre-orders Open" />
                        </div>
                        <div className="block w-full text-center bg-[#c9a84c] text-[#0a0f1a] font-semibold py-2.5 rounded-lg hover:bg-[#d4b85c] transition-colors text-sm">
                          <LangText ja="詳細を見る" en="View Details" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-2xl font-bold text-[#c9a84c] mb-1">{formatJPY(pack.priceJPY)}</div>
                        <div className="text-sm text-white/40 mb-4">≈ {formatCNY(pack.priceCNY)}</div>

                        <div className="grid grid-cols-3 gap-3 text-xs mb-4">
                          <div>
                            <div className="text-white/35"><LangText ja="中央値" en="Median" /></div>
                            <div className="mt-1 font-semibold">{formatJPY(pack.medianPriceJPY)}</div>
                          </div>
                          <div>
                            <div className="text-white/35"><LangText ja="最安値" en="Lowest" /></div>
                            <div className="mt-1 font-semibold">{formatJPY(pack.lowestPriceJPY)}</div>
                          </div>
                          <div>
                            <div className="text-white/35"><LangText ja="出品数" en="Listings" /></div>
                            <div className="mt-1 font-semibold">
                              <LangText ja={`${pack.onSaleCount}件`} en={`${pack.onSaleCount}`} />
                            </div>
                          </div>
                        </div>

                        <div className={cn('text-sm font-medium mb-4', discount > 0 ? 'text-green-400' : 'text-red-400')}>
                          <LangText
                            ja={discount > 0 ? `中央値より ${discount}% お得` : `中央値より ${Math.abs(discount)}% 高い`}
                            en={discount > 0 ? `${discount}% below median` : `${Math.abs(discount)}% above median`}
                          />
                        </div>

                        <div className="block w-full text-center bg-[#c9a84c] text-[#0a0f1a] font-semibold py-2.5 rounded-lg hover:bg-[#d4b85c] transition-colors text-sm">
                          <LangText ja="お問い合わせ" en="Contact Us" />
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
          <p>
            <LangText
              ja="※ 表示価格は参考価格です。最新の価格はお問い合わせください。"
              en="* Prices shown are for reference. Please contact us for the latest pricing."
            />
          </p>
          <p>
            <LangText
              ja="※ 日本国内発送。通常3〜7営業日以内にお届けいたします。"
              en="* Domestic Japan shipping. Usually delivered within 3–7 business days."
            />
          </p>
          <p>
            <LangText
              ja="※ 10,000円以上のご注文で送料無料。"
              en="* Free shipping on orders over ¥10,000."
            />
          </p>
        </div>
      </section>
    </div>
  )
}

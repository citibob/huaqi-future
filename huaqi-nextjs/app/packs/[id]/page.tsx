import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Package, ShieldCheck, Star, Truck, ExternalLink } from 'lucide-react'
import { GEM_PACKS, getGemPackById } from '@/lib/gem-pack-data'
import { formatJPY, formatCNY, cn } from '@/lib/utils'
import CardFanCarousel from '@/components/CardFanCarousel'
import BackButton from '@/components/BackButton'
import LangText from '@/components/LangText'

import type { Metadata } from 'next'

/* Card images for the fan carousel per volume */
const CARD_IMAGES: Record<string, { src: string; label: string }[]> = {
  'gem-pack-vol1': [
    { src: '/images/vol1-wiki-pack.png', label: 'パック包装' },
    { src: '/images/vol1-wiki-promo.png', label: '活動特典パック' },
    { src: '/images/vol1-card2.jpg', label: 'ニャオハ（新叶喵）' },
    { src: '/images/CBB1C0109.png', label: 'ニャオハ ★★★（トレーナー）' },
    { src: '/images/CBB1C0108.png', label: 'ニャオハ ★★★（アート）' },
    { src: '/images/CBB1C0106.png', label: 'ニャオハ ★（異色）' },
    { src: '/images/CBB1C0104.png', label: 'ニャオハ ◆（花紋）' },
    { src: '/images/CBB1C0309.png', label: 'ホゲータ ★★★（トレーナー）' },
    { src: '/images/CBB1C0509.png', label: 'クワッス ★★★（トレーナー）' },
    { src: '/images/CBB1C0709.png', label: 'キャプテンピカチュウ ★★★（トレーナー）' },
    { src: '/images/CBB1C0708.png', label: 'ピカチュウ ★★★（アート）' },
    { src: '/images/CBB1C0701.png', label: 'キャプテンピカチュウ ●（属性）' },
    { src: '/images/CBB1C1701.png', label: '精霊球（モンスターボール）' },
    { src: '/images/CBB1C1702.png', label: 'スーパーボール' },
    { src: '/images/CBB1C1703.png', label: 'ハイパーボール' },
  ],
  'gem-pack-vol2': [
    { src: '/images/vol2-wiki-pack.png', label: 'パック包装' },
    { src: '/images/CBB2C0115.png', label: 'イーブイ（つなぎアート）' },
    { src: '/images/CBB2C0615.png', label: 'ブラッキー（つなぎアート）' },
    { src: '/images/CBB2C0715.png', label: 'リーフィア（つなぎアート）' },
    { src: '/images/CBB2C0915.png', label: 'ニンフィア（つなぎアート）' },
  ],
  'gem-pack-vol3': [
    { src: '/images/vol3-wiki-pack.png', label: 'パック包装' },
    { src: '/images/vol3-card2.jpg', label: 'ピッピ → ピクシーex' },
    { src: '/images/vol3-card3.jpg', label: 'ピクシーex（皮可西ex）' },
    { src: '/images/CBB3C0207.png', label: 'ニャース ★★（ジェムパックロゴ）' },
    { src: '/images/CBB3C0306.png', label: 'ゲンガー ★（異色）' },
    { src: '/images/CBB3C0307.png', label: 'ゲンガー ★★（ジェムパックロゴ）' },
    { src: '/images/CBB3C0407.png', label: 'カラカラ ★★（ジェムパックロゴ）' },
    { src: '/images/CBB3C1107.png', label: 'シャンデラ ★★（ジェムパックロゴ）' },
    { src: '/images/CBB3C1507.png', label: 'ソウブレイズ ★★（ジェムパックロゴ）' },
    { src: '/images/CBB3C1607.png', label: 'ボチ ★★（ジェムパックロゴ）' },
    { src: '/images/CBB3C1904.png', label: 'パワフルロッド（トレーナーズ）' },
    { src: '/images/CBB3C1901.png', label: 'ネストボール（トレーナーズ）' },
    { src: '/images/CBB3C2006.png', label: 'ピア（トレーナーズ）' },
  ],
  'gem-pack-vol5': [
    { src: '/images/vol5-card02.png', label: 'パック包装' },
    { src: '/images/vol5-card01.png', label: '蒂蕾喵（ニャオハ進化）' },
    { src: '/images/vol5-card03.png', label: 'キャプテンピカチュウ＆フリード' },
    { src: '/images/vol5-card04.png', label: '蒂蕾喵＆リコ' },
    { src: '/images/vol5-card05.png', label: '涌跃鸭＆ドット' },
    { src: '/images/vol5-card06.png', label: '炙烫鳄＆ロイ' },
    { src: '/images/vol5-card07.png', label: '洗翠カティ狗' },
    { src: '/images/vol5-card08.png', label: '三合一磁怪' },
    { src: '/images/vol5-card09.png', label: '風鈴鈴' },
    { src: '/images/vol5-card10.png', label: '海豹球' },
    { src: '/images/vol5-card11.png', label: '彩粉蝶' },
    { src: '/images/vol5-card12.png', label: '米立龍' },
  ],
  'gem-pack-vol4': [
    { src: '/images/vol4-wiki-pack.png', label: 'パック包装' },
    { src: '/images/CBB4C0107.png', label: 'ポニータ ★★（ジェムパックロゴ）' },
    { src: '/images/CBB4C0101.png', label: 'ポニータ ●（属性）' },
    { src: '/images/CBB4C0102.png', label: 'ポニータ ●（別バリエーション）' },
    { src: '/images/CBB4C0103.png', label: 'ポニータ ◆（星）' },
    { src: '/images/CBB4C0104.png', label: 'ポニータ ◆（花紋）' },
    { src: '/images/CBB4C0105.png', label: 'ポニータ ★（異色）' },
    { src: '/images/CBB4C0106.png', label: 'ポニータ ★（マスターボール柄）' },
    { src: '/images/CBB4C0407.png', label: 'イーブイ ★★（ジェムパックロゴ）' },
    { src: '/images/CBB4C0607.png', label: 'コータス ★★（ジェムパックロゴ）' },
    { src: '/images/CBB4C0907.png', label: 'ゴウカザル ★★（ジェムパックロゴ）' },
    { src: '/images/CBB4C1407.png', label: 'ドリュウズ ★★（ジェムパックロゴ）' },
    { src: '/images/CBB4C1607.png', label: 'チラチーノ ★★（ジェムパックロゴ）' },
    { src: '/images/CBB4C1907.png', label: 'ヘラクロス ★★（ジェムパックロゴ）' },
    { src: '/images/CBB4C2007.png', label: 'ヒノヤコマ ★★（ジェムパックロゴ）' },
    { src: '/images/CBB4C2307.png', label: 'バドレックス ★★（ジェムパックロゴ）' },
    { src: '/images/CBB4C2407.png', label: 'メルタン ★★（ジェムパックロゴ）' },
  ],
}

const PRODUCT_DETAILS: Record<string, {
  releaseDate: string
  retailPrice: string
  cardsPerPack: number
  theme: string
  coverPokemon: string
  highlights: string[]
  cardTypes: string[]
  officialUrl: string
  themeEN: string
  coverPokemonEN: string
  highlightsEN: string[]
  cardTypesEN: string[]
}> = {
  'gem-pack-vol1': {
    releaseDate: '2025年1月17日',
    retailPrice: '¥10（中国国内定価）',
    cardsPerPack: 4,
    theme: 'パルデア地方の冒険',
    coverPokemon: 'ニャオハ / ホゲータ / クワッス',
    highlights: [
      '全カードがキラカード仕様',
      'キャプテンピカチュウ収録',
      '5段階のレアリティ（● / ◆ / ★ / ★★ / ★★★）',
      '属性シンボルキラカード・マスターボール柄キラカード',
      '金箔押しジェムパックロゴ入りキラカード',
      '30パック購入でプロモカード1枚進呈（限定25万枚）',
    ],
    cardTypes: [
      'ポケモンカード（複数のイラストバリエーション）',
      'トレーナーズカード（モンスターボール、スーパーボール、ハイパーボール、ネモ）',
      'エネルギーカード（くさ、ほのお、みず基本エネルギー）',
    ],
    officialUrl: 'https://www.pokemon.cn/tcg/product/15582.html',
    themeEN: 'Paldea Region Adventure',
    coverPokemonEN: 'Sprigatito / Fuecoco / Quaxly',
    highlightsEN: [
      'Every card features premium holographic foil',
      'Includes the iconic Captain Pikachu card',
      '5 rarity tiers (● / ◆ / ★ / ★★ / ★★★)',
      'Attribute symbol holo & Master Ball pattern holo cards',
      'Gold-foil stamped Gem Pack logo holo cards',
      'Bonus promo card with every 30-pack purchase (limited to 250,000)',
    ],
    cardTypesEN: [
      'Pokémon Cards (multiple illustration variants)',
      'Trainer Cards (Poké Ball, Great Ball, Ultra Ball, Nemona)',
      'Energy Cards (Grass, Fire, Water basic energies)',
    ],
  },
  'gem-pack-vol2': {
    releaseDate: '2025年5月16日',
    retailPrice: '¥10（中国国内定価）',
    cardsPerPack: 4,
    theme: 'イーブイと全進化形態',
    coverPokemon: 'ニンフィア（仙子伊布）',
    highlights: [
      '全カードがキラカード仕様',
      'イーブイ全9種進化形態が集結',
      '4枚つなぎアートイラストカード（リーフィア→ニンフィア→ブラッキー→イーブイの森パノラマ）',
      'ポケモンV・ポケモンVMAXカード搭載',
      '異なる加工処理による多彩なバリエーション',
      '金箔押しジェムパックロゴ入りキラカード',
    ],
    cardTypes: [
      'ポケモンカード（イーブイ進化系9種＋α）',
      'ポケモンV / ポケモンVMAXカード',
      'トレーナーズカード（どうぐ・サポーター）',
      'エネルギーカード',
    ],
    officialUrl: 'https://www.pokemon.cn/tcg/product/15518.html',
    themeEN: 'Eevee & All Evolutions',
    coverPokemonEN: 'Sylveon',
    highlightsEN: [
      'Every card features premium holographic foil',
      'All 8 Eevee evolutions featured in one set',
      '4-card connected panorama illustration (Leafeon → Sylveon → Umbreon → Eevee Forest)',
      'Pokémon V and Pokémon VMAX cards included',
      'Multiple foil processing variants',
      'Gold-foil stamped Gem Pack logo holo cards',
    ],
    cardTypesEN: [
      'Pokémon Cards (Eevee + all 8 evolutions)',
      'Pokémon V / Pokémon VMAX Cards',
      'Trainer Cards (Items & Supporters)',
      'Energy Cards',
    ],
  },
  'gem-pack-vol3': {
    releaseDate: '2025年9月26日',
    retailPrice: '¥10（中国国内定価）',
    cardsPerPack: 4,
    theme: '夜の闇に潜むポケモン',
    coverPokemon: 'ゲンガー（耿鬼）',
    highlights: [
      '全カードがキラカード仕様',
      '夜行性ポケモンをテーマにした収録ラインナップ',
      'ポケモンexキラカード収録',
      '9種のアートイラストキラカード（ニャース、ゲンガー、カラカラ等）',
      '属性シンボル・マスターボール柄・金箔押しカード',
      'トレーナーズキラカード（パワフルロッド、ネストボール、ポケモン入れ替え、ピア）',
    ],
    cardTypes: [
      'ポケモンカード（夜行性ポケモン中心）',
      'ポケモンexキラカード',
      'アートイラストキラカード（9種）',
      'トレーナーズカード（どうぐ・サポーター）',
      'エネルギーカード（かくとう、はがね基本エネルギー、ルミナスエネルギー）',
    ],
    officialUrl: 'https://www.pokemon.cn/tcg/product/15431.html',
    themeEN: 'Pokémon of the Night',
    coverPokemonEN: 'Gengar',
    highlightsEN: [
      'Every card features premium holographic foil',
      'Nocturnal Pokémon themed lineup',
      'Pokémon ex holo cards included',
      '9 art illustration holo cards (Meowth, Gengar, Cubone & more)',
      'Attribute symbol, Master Ball pattern & gold foil cards',
      'Trainer holo cards (Powerful Rod, Nest Ball, Pokémon Switch, Penny)',
    ],
    cardTypesEN: [
      'Pokémon Cards (nocturnal Pokémon focus)',
      'Pokémon ex Holo Cards',
      'Art Illustration Holo Cards (9 types)',
      'Trainer Cards (Items & Supporters)',
      'Energy Cards (Fighting, Steel basic energies, Luminous Energy)',
    ],
  },
  'gem-pack-vol5': {
    releaseDate: '2026年4月24日（予定）',
    retailPrice: '¥10（中国国内定価）',
    cardsPerPack: 4,
    theme: '地平線の冒険（ポケモンHorizons）',
    coverPokemon: '蒂蕾喵 / 炙烫鳄 / 涌跃鸭 / キャプテンピカチュウ',
    highlights: [
      '全カードがキラカード仕様',
      'ポケモンHorizonsのキャラクターが登場',
      'リコ・ロイ・ドット・フリードとパートナーポケモンのアートカード',
      'キャプテンピカチュウとフリードがブレイブアサギ号に乗るアートワーク',
      '属性シンボル・マスターボール柄・金箔押しカード収録',
      '多彩なイラストバリエーション',
    ],
    cardTypes: [
      'ポケモンカード（Horizonsキャラクター中心）',
      'キャラクターアートカード（リコ、ロイ、ドット、フリード）',
      'トレーナーズカード',
      'エネルギーカード',
    ],
    officialUrl: 'https://www.pokemon.cn/tcg/product/21078.html',
    themeEN: 'Pokémon Horizons Adventure',
    coverPokemonEN: 'Meowscarada / Skeledirge / Quaquaval / Captain Pikachu',
    highlightsEN: [
      'Every card features premium holographic foil',
      'Pokémon Horizons anime characters featured',
      'Character art cards: Liko, Roy, Dot & Friede with partner Pokémon',
      'Captain Pikachu and Friede aboard the Brave Asagi art card',
      'Attribute symbol, Master Ball pattern & gold foil cards',
      'Rich variety of illustration variants',
    ],
    cardTypesEN: [
      'Pokémon Cards (Horizons characters focus)',
      'Character Art Cards (Liko, Roy, Dot, Friede)',
      'Trainer Cards',
      'Energy Cards',
    ],
  },
  'gem-pack-vol4': {
    releaseDate: '2026年2月6日',
    retailPrice: '¥10（中国国内定価）',
    cardsPerPack: 4,
    theme: '新春を駆けるポケモン',
    coverPokemon: 'ポニータ＆ギャロップ',
    highlights: [
      '全カードがキラカード仕様',
      '新春（旧正月）テーマの最新弾',
      '属性シンボル・マスターボール柄・金箔押しカード収録',
      'アートイラストキラカード充実',
      'ポニータが草原を跳ねる躍動感あるイラスト',
      'ギャロップが見守る温かなシーン描写',
    ],
    cardTypes: [
      'ポケモンカード（新春テーマ）',
      'アートイラストキラカード',
      'トレーナーズカード',
      'エネルギーカード',
    ],
    officialUrl: 'https://www.pokemon.cn/tcg/product/20382.html',
    themeEN: 'Lunar New Year Celebration',
    coverPokemonEN: 'Ponyta & Rapidash',
    highlightsEN: [
      'Every card features premium holographic foil',
      'Lunar New Year themed latest set',
      'Attribute symbol, Master Ball pattern & gold foil cards',
      'Rich art illustration holo card lineup',
      'Dynamic Ponyta galloping across the meadow artwork',
      'Warm Rapidash watching over artwork',
    ],
    cardTypesEN: [
      'Pokémon Cards (Lunar New Year theme)',
      'Art Illustration Holo Cards',
      'Trainer Cards',
      'Energy Cards',
    ],
  },
}

export function generateStaticParams() {
  return GEM_PACKS.map((pack) => ({ id: pack.id }))
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const pack = getGemPackById(params.id)
  if (!pack) return { title: '商品が見つかりません' }
  return {
    title: `${pack.nameCN}（${pack.nameJP}）`,
    description: pack.descriptionJP,
    alternates: {
      canonical: `/packs/${pack.id}`,
    },
    openGraph: {
      title: `${pack.nameCN}（${pack.nameJP}）`,
      description: pack.descriptionJP,
      url: `https://www.huaqi.jp/packs/${pack.id}`,
      images: ['/packs/opengraph-image'],
    },
  }
}

export default function PackDetailPage({ params }: { params: { id: string } }) {
  const pack = getGemPackById(params.id)
  if (!pack) notFound()

  const details = PRODUCT_DETAILS[pack.id]
  const cards = CARD_IMAGES[pack.id] || []

  const idx = GEM_PACKS.findIndex((p) => p.id === pack.id)
  const prev = idx > 0 ? GEM_PACKS[idx - 1] : null
  const next = idx < GEM_PACKS.length - 1 ? GEM_PACKS[idx + 1] : null

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back + Breadcrumb */}
        <div className="flex items-center gap-4 mb-8">
          <BackButton />
          <div className="flex items-center gap-2 text-sm text-white/40">
            <Link href="/" className="hover:text-white/60 transition-colors"><LangText ja="ホーム" en="Home" /></Link>
            <span>/</span>
            <Link href="/packs" className="hover:text-white/60 transition-colors"><LangText ja="ジェムパックシリーズ" en="Gem Pack Series" /></Link>
            <span>/</span>
            <span className="text-white/60"><LangText ja={pack.nameJP} en={pack.nameEN} /></span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Product + Card Fan Carousel */}
          <div>
            <CardFanCarousel
              boxImage={pack.imageUrl}
              boxLabel={pack.nameCN}
              cards={cards}
              isHot={pack.isHot}
            />

            {/* Badges */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {([
                { icon: ShieldCheck, ja: '正品確認済', en: 'Verified Genuine' },
                { icon: Package, ja: '原盒原膜', en: 'Factory Sealed' },
                { icon: Truck, ja: '全国配送', en: 'Nationwide' },
              ] as const).map((b) => (
                <div key={b.ja} className="flex items-center gap-2 text-xs text-white/40 bg-[#131b2e] border border-[#1e2a45] rounded-lg p-3 justify-center">
                  <b.icon className="w-3.5 h-3.5 text-[#c9a84c]" />
                  <LangText ja={b.ja} en={b.en} />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div>
            <div className="text-xs font-medium tracking-wider text-white/30 mb-2">{pack.vol} · {pack.code}</div>
            <h1 className="text-2xl md:text-3xl font-bold mb-6"><LangText ja={pack.nameJP} en={pack.nameEN} /></h1>

            {/* Price */}
            {pack.priceJPY > 0 ? (
              <div className="rounded-xl bg-[#131b2e] border border-[#1e2a45] p-6 mb-6">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <div className="text-xs text-white/30 mb-1"><LangText ja="Mercari中央値価格（BOX）" en="Mercari Median Price (BOX)" /></div>
                    <div className="text-3xl font-bold text-[#c9a84c]">{formatJPY(pack.priceJPY)}</div>
                    <div className="text-sm text-white/35 mt-1">≈ {formatCNY(pack.priceCNY)}</div>
                  </div>
                  <div className={cn(
                    'text-sm font-semibold px-3 py-1.5 rounded-full',
                    pack.priceChange24h > 0 ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'
                  )}>
                    {pack.priceChange24h > 0 ? '↑' : '↓'} {Math.abs(pack.priceChange24h)}%
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="bg-[#0a0f1a] rounded-lg p-3 text-center">
                    <div className="text-white/30"><LangText ja="最安値" en="Lowest" /></div>
                    <div className="mt-1 font-semibold">{formatJPY(pack.lowestPriceJPY)}</div>
                  </div>
                  <div className="bg-[#0a0f1a] rounded-lg p-3 text-center">
                    <div className="text-white/30"><LangText ja="出品数" en="Listings" /></div>
                    <div className="mt-1 font-semibold"><LangText ja={`${pack.onSaleCount}件`} en={`${pack.onSaleCount}`} /></div>
                  </div>
                  <div className="bg-[#0a0f1a] rounded-lg p-3 text-center">
                    <div className="text-white/30"><LangText ja="7日間売上" en="7-day Sales" /></div>
                    <div className="mt-1 font-semibold"><LangText ja={`${pack.soldCount7d}件`} en={`${pack.soldCount7d}`} /></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-gradient-to-br from-[#131b2e] to-[#1a2340] border border-[#c9a84c]/20 p-6 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#c9a84c] text-[#0a0f1a] text-xs font-bold px-3 py-1 rounded-full">COMING SOON</div>
                  <span className="text-sm text-white/40"><LangText ja="予約受付中" en="Pre-orders Open" /></span>
                </div>
                <div className="text-3xl font-bold text-[#c9a84c] mb-1"><LangText ja="発売予定" en="Coming Soon" /></div>
                <div className="text-sm text-white/50"><LangText ja="2026年4月24日 発売開始" en="Launching April 24, 2026" /></div>
              </div>
            )}

            <Link
              href="/contact"
              className="block w-full text-center bg-[#c9a84c] text-[#0a0f1a] font-bold py-4 rounded-lg hover:bg-[#d4b85c] transition-colors text-base mb-3"
            >
              <LangText ja={pack.priceJPY > 0 ? 'この商品についてお問い合わせ' : '予約・お問い合わせ'} en={pack.priceJPY > 0 ? 'Inquire About This Product' : 'Reserve / Inquire'} />
            </Link>
            <div className="mb-8" />

            <p className="text-sm text-white/50 leading-relaxed mb-6">
              <LangText ja={pack.descriptionJP} en={pack.descriptionEN} />
            </p>

            {details && (
              <div className="rounded-xl bg-[#131b2e] border border-[#1e2a45] overflow-hidden">
                <div className="px-6 py-4 border-b border-[#1e2a45]">
                  <h3 className="font-semibold"><LangText ja="商品詳細" en="Product Details" /></h3>
                </div>
                <div className="divide-y divide-[#1e2a45]">
                  {([
                    { labelJa: '発売日', labelEn: 'Release Date', valJa: details.releaseDate, valEn: details.releaseDate },
                    { labelJa: 'パック内容', labelEn: 'Contents', valJa: `${details.cardsPerPack}枚入り（全キラ）`, valEn: `${details.cardsPerPack} cards (All Holo)` },
                    { labelJa: 'テーマ', labelEn: 'Theme', valJa: details.theme, valEn: details.themeEN },
                    { labelJa: '表紙ポケモン', labelEn: 'Cover Pokémon', valJa: details.coverPokemon, valEn: details.coverPokemonEN },
                  ] as const).map((row) => (
                    <div key={row.labelEn} className="flex px-6 py-3 text-sm">
                      <div className="w-40 shrink-0 text-white/35"><LangText ja={row.labelJa} en={row.labelEn} /></div>
                      <div className="text-white/70"><LangText ja={row.valJa} en={row.valEn} /></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {details && (
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="rounded-xl bg-[#131b2e] border border-[#1e2a45] p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-[#c9a84c]" /> <LangText ja="収録ハイライト" en="Highlights" />
              </h3>
              <ul className="space-y-2.5">
                {details.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/50">
                    <span className="text-[#c9a84c] mt-0.5">•</span>
                    <LangText ja={h} en={details.highlightsEN[i]} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-[#131b2e] border border-[#1e2a45] p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Package className="w-4 h-4 text-[#c9a84c]" /> <LangText ja="収録カード種別" en="Card Types" />
              </h3>
              <ul className="space-y-2.5">
                {details.cardTypes.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/50">
                    <span className="text-[#c9a84c] mt-0.5">•</span>
                    <LangText ja={t} en={details.cardTypesEN[i]} />
                  </li>
                ))}
              </ul>
              {details.officialUrl && (
                <a href={details.officialUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#c9a84c] mt-4 hover:text-[#d4b85c] transition-colors">
                  <ExternalLink className="w-3 h-3" /> <LangText ja="pokemon.cn 商品ページ" en="Pokemon.cn product page" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Prev / Next */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-[#1e2a45]">
          {prev ? (
            <Link href={`/packs/${prev.id}`} className="flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors">
              <ArrowLeft className="w-4 h-4" /> <LangText ja={prev.nameJP} en={prev.nameEN} />
            </Link>
          ) : <div />}
          <Link href="/packs" className="text-sm text-[#c9a84c] hover:text-[#d4b85c] transition-colors"><LangText ja="一覧に戻る" en="Back to List" /></Link>
          {next ? (
            <Link href={`/packs/${next.id}`} className="flex items-center gap-2 text-sm text-white/40 hover:text-white/60 transition-colors">
              <LangText ja={next.nameJP} en={next.nameEN} /> <ArrowRight className="w-4 h-4" />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  )
}

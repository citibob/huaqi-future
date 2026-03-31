import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  CheckCircle,
  CreditCard,
  Globe,
  Package,
  Palette,
  ShieldCheck,
  Truck,
  Users,
} from 'lucide-react'
import LangText from '@/components/LangText'

export const metadata: Metadata = {
  title: '事業内容 / Business',
  description:
    '華啓未来株式会社の事業内容ページです。トレーディングカード輸入販売、ホビーグッズ輸入販売、越境貿易コンサルティングの3事業を案内しています。 Overview of our core businesses in Japan and cross-border trade.',
  alternates: {
    canonical: 'https://www.huaqi.jp/business',
  },
}

const SERVICE_LINES = [
  {
    id: 'trading-cards',
    icon: CreditCard,
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/8',
    borderColor: 'border-amber-400/15',
    title: 'トレーディングカード輸入販売事業',
    overview:
      '中国で正規発売されているポケモンカードを中心に、トレーディングカードの輸入販売を行っております。中国正規ライセンス店との直接取引契約に基づき、真贋鑑定済みの商品のみを取り扱い、日本国内のコレクター・投資家・法人バイヤーの皆様にお届けしております。',
    audience: [
      'カードコレクター・トレーディングカード愛好家',
      'カード投資家',
      'カードショップ・小売店',
      '法人バイヤー・大量購入ご希望のお客様',
    ],
    methods: [
      '自社ECサイトでの販売',
      '法人向け卸売（個別見積もり対応）',
      'イベント出店による直接販売',
      '委託販売',
    ],
    deliverables: [
      '真贋鑑定済み商品のお届け',
      'PSA鑑定代行サービス',
      '品質保証書の発行',
      '追跡番号付き配送',
    ],
    products: 'ブースターパック（ジェムパック Vol.1〜4）、シングルカード（全レアリティ）、PSA鑑定済みカード、ボックスセット、プロモーションカード、プレイマット',
    href: '/packs',
  },
  {
    id: 'hobby-goods',
    icon: Palette,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/8',
    borderColor: 'border-blue-400/15',
    title: 'ホビー・キャラクターグッズ輸入販売事業',
    overview:
      '原神（Genshin Impact）をはじめとする人気IP作品のキャラクターグッズを、中国の公式メーカーから直接仕入れ、日本市場へお届けしております。アジア地域限定アイテムを中心に、日本国内では入手困難な商品を幅広く取り揃えております。',
    audience: [
      'アニメ・ゲームファン、コレクター',
      'ホビーショップ・キャラクターグッズ専門店',
      'EC事業者',
      'イベント企画会社',
    ],
    methods: [
      '自社ECサイトでの販売',
      '法人向け卸売',
      '予約受付・取り寄せ販売',
      'カスタムオーダー対応',
    ],
    deliverables: [
      '正規品保証付き商品',
      '商品状態確認レポート',
      '丁寧な梱包による配送',
      '追跡番号付き配送',
    ],
    products: 'フィギュア、アクリルスタンド、キーホルダー、アパレル、文具、生活雑貨、限定コラボアイテム',
    href: '/pokemon',
  },
  {
    id: 'consulting',
    icon: Globe,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-400/8',
    borderColor: 'border-indigo-400/15',
    title: '越境貿易コンサルティング事業',
    overview:
      '日中間の越境貿易に関する包括的なコンサルティングサービスを提供しております。市場調査から法規制対応、パートナー企業の紹介、物流最適化まで、貿易に必要なあらゆる段階をサポートいたします。',
    audience: [
      '日本進出を検討する中国企業',
      '中国からの輸入を検討する日本企業',
      '越境EC事業者',
      '個人輸入をご希望のお客様',
    ],
    methods: [
      'オンラインコンサルティング',
      '現地視察同行',
      '定期レポート提供',
      'プロジェクト単位での受託',
    ],
    deliverables: [
      '市場調査レポート',
      'パートナー企業の紹介・マッチング',
      '法規制チェックリスト',
      '物流最適化プラン',
    ],
    products: '',
    href: '/culture',
  },
]

const WORKFLOW = [
  { step: '01', title: 'お問い合わせ', desc: 'ご要望・ご予算をヒアリング' },
  { step: '02', title: 'ご提案', desc: '最適な商品・サービスのご提案' },
  { step: '03', title: 'ご発注', desc: 'お見積り確認後、正式にご発注' },
  { step: '04', title: '調達・検品', desc: '商品の調達と品質検査を実施' },
  { step: '05', title: 'お届け', desc: '追跡番号付きで安全にお届け' },
]

export default function BusinessPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Header */}
      <div className="relative overflow-hidden py-20 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#1a365d]/8 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#c9a84c] bg-[#c9a84c]/8 border border-[#c9a84c]/15 px-4 py-2 rounded-full mb-6">
            <Building2 className="w-4 h-4" />
            <LangText ja="事業内容" en="Business" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <LangText ja="事業内容" en="Business Overview" />
          </h1>
          <p className="text-white/45 max-w-2xl mx-auto leading-relaxed">
            <LangText
              ja="当社は3つの事業を柱に、日中間の貿易を通じて両国の経済・文化の発展に貢献しております。"
              en="We operate through three core business lines, contributing to economic and cultural exchange between Japan and China."
            />
          </p>
        </div>
      </div>

      {/* Service Lines */}
      <section className="px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-16">
          {SERVICE_LINES.map((line) => (
            <div key={line.id} className="rounded-xl border border-[#1e2a45] overflow-hidden">
              {/* Service Header */}
              <div className={`px-8 py-6 bg-[#131b2e] border-b ${line.borderColor}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg ${line.bgColor} flex items-center justify-center`}>
                    <line.icon className={`w-6 h-6 ${line.color}`} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{line.title}</h2>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-8">
                {/* Overview */}
                <div>
                  <h3 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#c9a84c]" />
                    事業概要
                  </h3>
                  <p className="text-sm text-white/55 leading-relaxed">{line.overview}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Audience */}
                  <div>
                    <h3 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#c9a84c]" />
                      サービス対象
                    </h3>
                    <ul className="space-y-2">
                      {line.audience.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-white/50">
                          <CheckCircle className="w-4 h-4 text-[#c9a84c]/60 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Methods */}
                  <div>
                    <h3 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#c9a84c]" />
                      提供方式
                    </h3>
                    <ul className="space-y-2">
                      {line.methods.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-white/50">
                          <CheckCircle className="w-4 h-4 text-[#c9a84c]/60 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <h3 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#c9a84c]" />
                    交付内容・品質保証
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {line.deliverables.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-white/50 bg-[#131b2e] rounded-lg px-4 py-3 border border-[#1e2a45]">
                        <CheckCircle className="w-4 h-4 text-green-400/70 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Products (if any) */}
                {line.products && (
                  <div>
                    <h3 className="text-sm font-semibold text-white/70 mb-3">取扱商品</h3>
                    <p className="text-sm text-white/45 leading-relaxed">{line.products}</p>
                  </div>
                )}

                {/* Link */}
                <Link
                  href={line.href}
                  className={`inline-flex items-center gap-2 text-sm font-medium ${line.color} hover:underline`}
                >
                  詳細ページへ <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold mb-10 text-center">ご利用の流れ</h2>
          <div className="grid sm:grid-cols-5 gap-4">
            {WORKFLOW.map((item) => (
              <div key={item.step} className="rounded-xl bg-[#131b2e] border border-[#1e2a45] p-5 text-center">
                <div className="text-lg font-bold text-[#c9a84c] mb-2">{item.step}</div>
                <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-white/40">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-xl bg-[#131b2e] border border-[#1e2a45] p-12">
            <h2 className="text-xl font-bold mb-4">お取引・ご相談のお問い合わせ</h2>
            <p className="text-white/45 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
              商品のお見積り、法人向けのお取引、越境貿易に関するご相談など、
              まずはお気軽にお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#c9a84c] text-[#0a0f1a] font-semibold px-8 py-3.5 rounded-lg hover:bg-[#d4b85c] transition-colors"
              >
                お問い合わせ <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/company"
                className="inline-flex items-center justify-center gap-2 bg-white/8 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/12 transition-colors border border-white/10"
              >
                会社概要
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  CreditCard,
  Palette,
  Handshake,
  ArrowRight,
  Users,
  Package,
  Search,
  FileText,
  Truck,
  ShieldCheck,
} from 'lucide-react'
import LangText from '@/components/LangText'

export const metadata: Metadata = {
  title: '事業紹介',
  description:
    '華啓未来株式会社の事業紹介ページです。トレーディングカード事業、ホビーグッズ事業、越境貿易コンサルティング事業を案内しています。',
  alternates: {
    canonical: 'https://www.huaqi.jp/services',
  },
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Header */}
      <div className="relative overflow-hidden py-20 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#1a365d]/8 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#c9a84c] bg-[#c9a84c]/8 border border-[#c9a84c]/15 px-4 py-2 rounded-full mb-6">
            <Package className="w-4 h-4" />
            <LangText ja="事業紹介" en="Services" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4"><LangText ja="事業紹介" en="Services" /></h1>
          <p className="text-lg text-white/45 max-w-2xl mx-auto leading-relaxed">
            <LangText ja="当社は3つの事業を柱に、日中間の貿易を通じて両国の経済・文化の発展に貢献しております。" en="Our three core business lines support trade and cultural exchange between Japan and China." />
          </p>
        </div>
      </div>

      {/* Trading Card Business */}
      <section className="px-4 py-12" id="trading-cards">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-[#1a365d]/30 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-[#c9a84c]" />
            </div>
            <div>
              <h2 className="text-xl font-bold"><LangText ja="トレーディングカード事業" en="Trading Card Business" /></h2>
              <p className="text-sm text-white/40">Trading Card Business</p>
            </div>
          </div>

          <div className="rounded-xl bg-[#131b2e] border border-[#1e2a45] p-8 mb-6">
            <h3 className="font-semibold text-white/80 mb-3"><LangText ja="事業概要" en="Overview" /></h3>
            <p className="text-sm text-white/55 leading-relaxed mb-6">
              中国で正規発売されているポケモンカードを中心としたトレーディングカードの輸入販売事業です。
              中国の信頼できる仕入先から原盒原膜の商品を調達し、高品質なカード商品を日本市場にお届けしております。
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-[#c9a84c] mb-3"><LangText ja="サービス内容" en="Services" /></h4>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#c9a84c]/60 shrink-0 mt-0.5" />
                    シングルカード販売（個人・法人対応）
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#c9a84c]/60 shrink-0 mt-0.5" />
                    ボックス・パック販売
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#c9a84c]/60 shrink-0 mt-0.5" />
                    法人向け卸売・大量仕入れ
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#c9a84c] mb-3"><LangText ja="取扱商品" en="Products" /></h4>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex items-start gap-2">
                    <Package className="w-4 h-4 text-[#c9a84c]/60 shrink-0 mt-0.5" />
                    ブースターパック
                  </li>
                  <li className="flex items-start gap-2">
                    <Package className="w-4 h-4 text-[#c9a84c]/60 shrink-0 mt-0.5" />
                    シングルカード（レア・限定品含む）
                  </li>
                  <li className="flex items-start gap-2">
                    <Package className="w-4 h-4 text-[#c9a84c]/60 shrink-0 mt-0.5" />
                    ボックスセット・プロモカード
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#1e2a45]">
              <h4 className="text-sm font-semibold text-[#c9a84c] mb-3"><LangText ja="対象顧客" en="Target Customers" /></h4>
              <div className="flex flex-wrap gap-2">
                {['コレクター', '投資家', 'カードショップ', '法人バイヤー'].map((tag) => (
                  <span key={tag} className="text-xs bg-[#1a365d]/20 text-white/50 px-3 py-1.5 rounded-md border border-[#1e2a45]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hobby & Character Goods Business */}
      <section className="px-4 py-12" id="hobby-goods">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-[#1a365d]/30 flex items-center justify-center">
              <Palette className="w-5 h-5 text-[#c9a84c]" />
            </div>
            <div>
              <h2 className="text-xl font-bold">ホビー・キャラクターグッズ事業</h2>
              <p className="text-sm text-white/40">Hobby and Character Goods Business</p>
            </div>
          </div>

          <div className="rounded-xl bg-[#131b2e] border border-[#1e2a45] p-8 mb-6">
            <h3 className="font-semibold text-white/80 mb-3">事業概要</h3>
            <p className="text-sm text-white/55 leading-relaxed mb-6">
              原神をはじめとする人気キャラクターグッズの輸入販売事業です。
              フィギュア、アクリルスタンド、キーホルダー、アパレル等、幅広いカテゴリの商品を取り扱っております。
              アジア限定品や日本未発売商品の調達にも対応し、ファンやコレクターの皆様にご満足いただける品揃えを実現しております。
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-[#c9a84c] mb-3">サービス内容</h4>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#c9a84c]/60 shrink-0 mt-0.5" />
                    個人向け小売販売
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#c9a84c]/60 shrink-0 mt-0.5" />
                    法人向け卸売販売
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#c9a84c]/60 shrink-0 mt-0.5" />
                    限定品・レア商品の調達代行
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#c9a84c]/60 shrink-0 mt-0.5" />
                    企業・EVT向け一括発注
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#c9a84c] mb-3">取扱商品</h4>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex items-start gap-2">
                    <Package className="w-4 h-4 text-[#c9a84c]/60 shrink-0 mt-0.5" />
                    フィギュア・アクリルスタンド
                  </li>
                  <li className="flex items-start gap-2">
                    <Package className="w-4 h-4 text-[#c9a84c]/60 shrink-0 mt-0.5" />
                    キーホルダー・アクセサリー
                  </li>
                  <li className="flex items-start gap-2">
                    <Package className="w-4 h-4 text-[#c9a84c]/60 shrink-0 mt-0.5" />
                    アパレル・文具
                  </li>
                  <li className="flex items-start gap-2">
                    <Package className="w-4 h-4 text-[#c9a84c]/60 shrink-0 mt-0.5" />
                    生活雑貨・インテリア
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#1e2a45]">
              <h4 className="text-sm font-semibold text-[#c9a84c] mb-3">対象顧客</h4>
              <div className="flex flex-wrap gap-2">
                {['ファン・コレクター', '小売店', 'EVT企画会社', 'ECショップ運営者'].map((tag) => (
                  <span key={tag} className="text-xs bg-[#1a365d]/20 text-white/50 px-3 py-1.5 rounded-md border border-[#1e2a45]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-border Trade Consulting */}
      <section className="px-4 py-12" id="consulting">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-[#1a365d]/30 flex items-center justify-center">
              <Handshake className="w-5 h-5 text-[#c9a84c]" />
            </div>
            <div>
              <h2 className="text-xl font-bold">越境貿易コンサルティング</h2>
              <p className="text-sm text-white/40">Cross-border Trade Consulting</p>
            </div>
          </div>

          <div className="rounded-xl bg-[#131b2e] border border-[#1e2a45] p-8 mb-6">
            <h3 className="font-semibold text-white/80 mb-3">事業概要</h3>
            <p className="text-sm text-white/55 leading-relaxed mb-6">
              日中間の越境貿易に関する総合コンサルティング事業です。
              市場調査、ビジネスパートナーマッチング、物流最適化、法規制対応まで、
              越境貿易に必要なサポートをワンストップで提供いたします。
              日本進出を検討する中国企业様、および中国からの輸入を検討する日本企業様を幅広くサポートしております。
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-[#c9a84c] mb-3">対象顧客</h4>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-[#c9a84c]/60 shrink-0 mt-0.5" />
                    日本進出を検討する中国企业
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-[#c9a84c]/60 shrink-0 mt-0.5" />
                    中国からの輸入を検討する日本企業
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-[#c9a84c]/60 shrink-0 mt-0.5" />
                    越境EC展開を検討する事業者
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#c9a84c] mb-3">提供内容</h4>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex items-start gap-2">
                    <Search className="w-4 h-4 text-[#c9a84c]/60 shrink-0 mt-0.5" />
                    市場調査レポート
                  </li>
                  <li className="flex items-start gap-2">
                    <Handshake className="w-4 h-4 text-[#c9a84c]/60 shrink-0 mt-0.5" />
                    パートナーマッチング
                  </li>
                  <li className="flex items-start gap-2">
                    <Truck className="w-4 h-4 text-[#c9a84c]/60 shrink-0 mt-0.5" />
                    物流コンサルティング
                  </li>
                  <li className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-[#c9a84c]/60 shrink-0 mt-0.5" />
                    法規制アドバイス
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl bg-[#131b2e] border border-[#1e2a45] p-12 text-center">
            <h2 className="text-xl font-bold mb-4">
              事業に関するお問い合わせ
            </h2>
            <p className="text-white/45 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
              各事業の詳細、法人向けお取引のご相談、
              パートナーシップのご提案など、まずはお気軽にお問い合わせください。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#c9a84c] text-[#0a0f1a] font-semibold px-8 py-3.5 rounded-lg hover:bg-[#d4b85c] transition-colors"
            >
              お問い合わせ <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

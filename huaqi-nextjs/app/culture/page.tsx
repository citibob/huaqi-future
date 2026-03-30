import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Globe,
  Handshake,
  TrendingUp,
  Users,
  ArrowRight,
  CheckCircle,
  Target,
  Briefcase,
  ShieldCheck,
} from 'lucide-react'
import LangText from '@/components/LangText'

export const metadata: Metadata = {
  title: '越境貿易コンサルティング',
  description:
    '日中間の越境貿易コンサルティング事業を紹介しています。市場調査、パートナーマッチング、物流設計、法規制対応を支援します。',
  alternates: {
    canonical: '/culture',
  },
}

const SERVICES = [
  {
    icon: Globe,
    title: '越境EC支援',
    desc: '中国・日本間のEC出店支援、プラットフォーム選定、出品代行、カスタマーサポートなど、越境ECに必要なサービスを包括的に提供いたします。',
  },
  {
    icon: Briefcase,
    title: 'ビジネスコンサルティング',
    desc: '日中間のビジネス展開に関する市場調査、戦略立案、法規制対応のアドバイスなど、専門的なコンサルティングを行います。',
  },
  {
    icon: Handshake,
    title: 'パートナーシップ構築',
    desc: '中国・日本双方の企業ネットワークを活用し、最適なビジネスパートナーのマッチングとパートナーシップ構築を支援いたします。',
  },
  {
    icon: ShieldCheck,
    title: '品質管理・検品',
    desc: '輸入商品の品質管理、真贋鑑定、検品サービスを提供。正規品のみを確実にお届けする体制を構築いたします。',
  },
]

const PARTNER_REGIONS = [
  { region: '日本', desc: '東京、大阪、横浜を中心とした流通ネットワーク' },
  { region: '中国', desc: '上海、深圳、広州の主要メーカーとの直接取引' },
  { region: '台湾', desc: '台北を拠点とした東アジア市場への展開' },
  { region: '香港', desc: '国際貿易ハブとしてのロジスティクス連携' },
  { region: '韓国', desc: 'ソウルを中心としたポップカルチャー市場開拓' },
]

const VISION_STEPS = [
  { year: '2024', title: '創業', desc: 'トレーディングカード事業を軸に会社設立' },
  { year: '2025', title: '事業拡大', desc: 'ホビーグッズ・貿易コンサルティング事業を本格展開' },
  { year: '2026', title: 'ネットワーク強化', desc: '5カ国50社以上のパートナー企業との連携体制確立' },
  { year: '2027', title: '新規事業', desc: 'デジタルコンテンツ・IP関連事業への参入' },
  { year: '2028', title: 'グローバル展開', desc: '東南アジア市場への事業拡大' },
]

export default function CulturePage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Header */}
      <div className="relative overflow-hidden py-20 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#1a365d]/8 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#c9a84c] bg-[#c9a84c]/8 border border-[#c9a84c]/15 px-4 py-2 rounded-full mb-6">
            <Globe className="w-4 h-4" />
            <LangText ja="貿易コンサルティング" en="Trade Consulting" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4"><LangText ja="越境貿易コンサルティング" en="Cross-Border Trade Consulting" /></h1>
          <p className="text-lg text-white/45 max-w-2xl mx-auto leading-relaxed">
            <LangText
              ja="日中間の貿易における課題を解決し、ビジネスの成長を支援いたします。"
              en="We solve cross-border trade issues between Japan and China and support business growth."
            />
          </p>
        </div>
      </div>

      {/* Services */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold mb-8"><LangText ja="サービス内容" en="Services" /></h2>
          <div className="grid md:grid-cols-2 gap-5">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="rounded-xl bg-[#131b2e] border border-[#1e2a45] p-8 hover:border-[#c9a84c]/20 transition-colors"
              >
                <div className="w-11 h-11 rounded-lg bg-[#1a365d]/30 flex items-center justify-center mb-5">
                  <s.icon className="w-5 h-5 text-[#c9a84c]" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{s.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">
                  <LangText
                    ja={s.desc}
                    en={{
                      '越境EC支援': 'Comprehensive support for Japan-China e-commerce operations including platform selection, listing setup, and customer support.',
                      'ビジネスコンサルティング': 'Professional consulting for market research, strategy planning, and regulatory support in Japan-China business expansion.',
                      'パートナーシップ構築': 'Matching and partnership support using our network in both China and Japan.',
                      '品質管理・検品': 'Inspection, authenticity review, and quality control systems for imported products.',
                    }[s.title] || s.desc}
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Network */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-5 h-5 text-[#c9a84c]" />
            <h2 className="text-xl font-bold"><LangText ja="パートナーネットワーク" en="Partner Network" /></h2>
          </div>
          <p className="text-white/45 mb-8 max-w-2xl text-sm leading-relaxed">
            <LangText
              ja="5カ国にわたるパートナー企業との強固なネットワークを構築。各地域の特性を活かした最適な取引スキームをご提案いたします。"
              en="We maintain a strong partner network across five regions and design practical trade schemes based on each market."
            />
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PARTNER_REGIONS.map((p) => (
              <div
                key={p.region}
                className="rounded-lg bg-[#131b2e] border border-[#1e2a45] p-5 flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-[#c9a84c] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">{p.region}</h4>
                  <p className="text-xs text-white/40">
                    <LangText
                      ja={p.desc}
                      en={{
                        日本: 'Distribution network centered on Tokyo, Osaka, and Yokohama.',
                        中国: 'Direct trading relations with major suppliers in Shanghai, Shenzhen, and Guangzhou.',
                        台湾: 'Expansion support into East Asia through Taipei.',
                        香港: 'Logistics collaboration through the international trade hub of Hong Kong.',
                        韓国: 'Market development centered on Seoul and pop culture channels.',
                      }[p.region] || p.desc}
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5-year Vision */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Target className="w-5 h-5 text-[#c9a84c]" />
            <h2 className="text-xl font-bold"><LangText ja="5カ年ビジョン" en="Five-Year Vision" /></h2>
          </div>
          <div className="relative">
            <div className="absolute left-[23px] top-0 bottom-0 w-px bg-[#1e2a45] hidden md:block" />

            <div className="space-y-5">
              {VISION_STEPS.map((step, i) => (
                <div key={step.year} className="flex gap-6 items-start">
                  <div className="hidden md:flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        i <= 2
                          ? 'bg-[#c9a84c]/15 text-[#c9a84c] border border-[#c9a84c]/25'
                          : 'bg-[#131b2e] text-white/35 border border-[#1e2a45]'
                      }`}
                    >
                      {step.year}
                    </div>
                  </div>
                  <div
                    className={`rounded-lg border p-5 flex-1 ${
                      i <= 2
                        ? 'bg-[#131b2e] border-[#c9a84c]/15'
                        : 'bg-[#131b2e] border-[#1e2a45]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-[#c9a84c] md:hidden">
                        {step.year}
                      </span>
                      <TrendingUp className="w-4 h-4 text-[#c9a84c]" />
                      <h4 className="font-semibold text-sm">
                        <LangText
                          ja={step.title}
                          en={{ 創業: 'Foundation', 事業拡大: 'Expansion', ネットワーク強化: 'Network Growth', 新規事業: 'New Business', グローバル展開: 'Global Expansion' }[step.title] || step.title}
                        />
                      </h4>
                    </div>
                    <p className="text-sm text-white/45">
                      <LangText
                        ja={step.desc}
                        en={{
                          創業: 'Company founded with trading cards as the core business.',
                          事業拡大: 'Hobby goods and consulting businesses expanded.',
                          ネットワーク強化: 'Partnership system established across five countries and 50+ companies.',
                          新規事業: 'Expansion into digital content and IP-related business.',
                          グローバル展開: 'Expansion into Southeast Asian markets.',
                        }[step.title] || step.desc}
                      />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-xl bg-[#131b2e] border border-[#1e2a45] p-12 text-center">
            <h2 className="text-xl font-bold mb-4">
              <LangText ja="パートナーシップのご相談" en="Partnership Consultation" />
            </h2>
            <p className="text-white/45 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
              <LangText
                ja="日中間のビジネス展開、越境ECのご相談など、まずはお気軽にお問い合わせください。"
                en="For Japan-China business development or cross-border e-commerce consultation, contact us anytime."
              />
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#c9a84c] text-[#0a0f1a] font-semibold px-8 py-3.5 rounded-lg hover:bg-[#d4b85c] transition-colors"
            >
              <LangText ja="お問い合わせ" en="Contact" /> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

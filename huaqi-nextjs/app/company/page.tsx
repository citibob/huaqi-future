import type { Metadata } from 'next'
import { Building2, Target, Heart, Eye } from 'lucide-react'
import LangText from '@/components/LangText'

export const metadata: Metadata = {
  title: '会社概要 / Company',
  description: '華啓未来株式会社の会社概要。中国と日本をつなぐ越境貿易企業。Company profile of Huaqi Future Co., Ltd., based in Yokohama, Japan.',
  alternates: {
    canonical: 'https://www.huaqi.jp/company',
  },
}

const COMPANY_INFO = [
  { label: '会社名', value: '華啓未来株式会社（Huaqi Future Co., Ltd.）' },
  { label: '所在地', value: '〒231-0057 神奈川県横浜市中区曙町1-3 藤和伊勢佐木ハイタウン615号室' },
  { label: '代表者', value: '代表取締役 鮑 海明' },
  { label: '設立', value: '2024年7月31日' },
  { label: '資本金', value: '500万円' },
  {
    label: '事業内容',
    value:
      'トレーディングカード輸入販売事業\nホビー・キャラクターグッズ輸入販売事業\n越境貿易コンサルティング事業',
  },
  { label: '対応国・地域', value: '日本、中国、台湾、香港、韓国' },
  { label: '対応言語', value: '日本語・中国語' },
  { label: '取引形態', value: 'BtoB（法人間取引）/ BtoC（個人向け小売）' },
  {
    label: '主要取扱商材',
    value: 'ポケモンカード（中国正規品）、原神関連グッズ、その他アジアIPキャラクターグッズ',
  },
  { label: '営業時間', value: '平日 10:00〜18:00（土日祝休業）' },
  { label: 'メールアドレス', value: 'asiacardptcg@gmail.com' },
  { label: '取引銀行', value: '準備中' },
]

const VALUES = [
  {
    icon: Target,
    title: '信頼',
    desc: 'すべてのお取引において誠実さと透明性を大切にし、長期的な信頼関係を築きます。',
  },
  {
    icon: Heart,
    title: '品質',
    desc: '正規品のみを取り扱い、厳格な品質管理体制のもと、お客様に安心をお届けします。',
  },
  {
    icon: Eye,
    title: '革新',
    desc: '越境貿易の可能性を追求し、日中間の新たなビジネスモデルを創造し続けます。',
  },
]

const HISTORY = [
  { date: '2024年7月', event: '華啓未来株式会社設立（神奈川県横浜市）' },
  { date: '2024年9月', event: 'ポケモンカード輸入販売事業を開始' },
  { date: '2024年11月', event: '中国正規ライセンス店との取引契約を締結' },
  { date: '2024年10月', event: '原神関連グッズ輸入販売事業を開始' },
  { date: '2024年12月', event: '取引パートナー企業数20社突破' },
  { date: '2025年3月', event: '越境貿易コンサルティング事業を開始' },
  { date: '2025年6月', event: '台湾・香港市場への展開開始' },
  { date: '2025年9月', event: '取引パートナー企業数50社突破' },
  { date: '2025年12月', event: '年間取扱高1億円突破' },
  { date: '2026年1月', event: '韓国市場への展開開始' },
  { date: '2026年3月', event: '公式ウェブサイトリニューアル' },
]

export default function CompanyPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Header */}
      <div className="relative overflow-hidden py-20 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#c9a84c] bg-[#c9a84c]/8 border border-[#c9a84c]/15 px-4 py-2 rounded-full mb-6">
            <Building2 className="w-4 h-4" />
            <LangText ja="会社概要" en="Company" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <LangText ja="華啓未来株式会社" en="Huaqi Future Co., Ltd." />
          </h1>
          <p className="text-lg text-muted">Huaqi Future Co., Ltd.</p>
        </div>
      </div>

      {/* Company Info Table */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-8">
            <LangText ja="会社情報" en="Company Information" />
          </h2>
          <div className="rounded-xl border border-white/8 overflow-hidden bg-[#090b0f]/65">
            {COMPANY_INFO.map((item, i) => (
              <div
                key={item.label}
                className={`flex flex-col sm:flex-row ${
                  i !== COMPANY_INFO.length - 1 ? 'border-b border-[#1e2a45]' : ''
                }`}
              >
                <div className="sm:w-48 shrink-0 bg-[#10141b] px-6 py-4 font-medium text-sm text-secondary">
                  {item.label}
                </div>
                <div className="px-6 py-4 text-sm lux-text whitespace-pre-line">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-8">
            <LangText ja="代表挨拶" en="Message from the CEO" />
          </h2>
          <div className="rounded-xl bg-[#0d1015] border border-white/8 p-8 md:p-12 shadow-card">
            <div className="space-y-5 lux-text leading-relaxed text-sm">
              <p>
                華啓未来株式会社のウェブサイトをご覧いただき、誠にありがとうございます。
              </p>
              <p>
                私は中国で生まれ育ち、日本で長年生活する中で、両国の文化やビジネス慣習を
                深く理解してまいりました。その経験を活かし、2024年7月に当社を設立いたしました。
              </p>
              <p>
                創業のきっかけは、中国で正規発売されているポケモンカードが日本のコレクター市場で
                高い需要を持つにもかかわらず、信頼できる流通経路が極めて少ないという課題を
                目の当たりにしたことです。中国の正規ライセンス店との直接取引契約を結び、
                真贋鑑定済みの商品のみを取り扱うことで、この課題の解決に取り組んでおります。
              </p>
              <p>
                当社の強みは、中国側の仕入先との長年の信頼関係と、日本市場における商慣習への
                深い理解を併せ持つ点にあります。単なる商品の輸出入にとどまらず、
                両国の企業間の架け橋として、市場調査からパートナーマッチング、
                物流最適化まで、包括的な貿易コンサルティングサービスを提供しております。
              </p>
              <p>
                おかげさまで、設立から2年で取引パートナー企業数は50社を超え、
                日本、中国、台湾、香港、韓国の5カ国にまたがるビジネスネットワークを
                構築することができました。
              </p>
              <p>
                今後も「正規品のみ」「品質第一」「透明性のある取引」を経営の根幹とし、
                着実に事業を拡大してまいる所存です。
                皆様のご支援・ご愛顧を賜りますよう、何卒よろしくお願い申し上げます。
              </p>
              <div className="pt-5 border-t border-white/8">
                <p className="font-semibold text-white">華啓未来株式会社</p>
                <p className="text-sm text-white/50">代表取締役　鮑 海明</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business History */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-8">業務沿革</h2>
          <div className="rounded-xl border border-white/8 overflow-hidden bg-[#090b0f]/65">
            {HISTORY.map((item, i) => (
              <div
                key={item.date}
                className={`flex flex-col sm:flex-row ${
                  i !== HISTORY.length - 1 ? 'border-b border-[#1e2a45]' : ''
                }`}
              >
                <div className="sm:w-40 shrink-0 bg-[#10141b] px-6 py-3.5 font-medium text-sm text-secondary">
                  {item.date}
                </div>
                <div className="px-6 py-3.5 text-sm lux-text">
                  {item.event}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-8">企業理念</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-xl bg-[#0d1015] border border-white/8 p-6 shadow-card"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-[#c9a84c]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
                <p className="text-sm lux-text leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

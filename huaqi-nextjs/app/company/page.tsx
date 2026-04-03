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
  {
    label: '会社名',
    labelEn: 'Company Name',
    value: '華啓未来株式会社（Huaqi Future Co., Ltd.）',
    valueEn: 'Huaqi Future Co., Ltd.',
  },
  {
    label: '所在地',
    labelEn: 'Address',
    value: '〒231-0057 神奈川県横浜市中区曙町1-3 藤和伊勢佐木ハイタウン615号室',
    valueEn: '1-3 Akebonocho, Naka-ku, Yokohama, Kanagawa 231-0057, Fujiwa Isezaki Hightown #615',
  },
  {
    label: '代表者',
    labelEn: 'Representative',
    value: '代表取締役 鮑 海明',
    valueEn: 'CEO: Bao Haiming',
  },
  {
    label: '設立',
    labelEn: 'Established',
    value: '2024年7月31日',
    valueEn: 'July 31, 2024',
  },
  {
    label: '資本金',
    labelEn: 'Capital',
    value: '500万円',
    valueEn: '¥5,000,000',
  },
  {
    label: '事業内容',
    labelEn: 'Business Lines',
    value: 'トレーディングカード輸入販売事業\nホビー・キャラクターグッズ輸入販売事業\n越境貿易コンサルティング事業',
    valueEn: 'Trading Card Import & Sales\nHobby / Character Goods Import & Sales\nCross-Border Trade Consulting',
  },
  {
    label: '対応国・地域',
    labelEn: 'Countries / Regions',
    value: '日本、中国、台湾、香港、韓国',
    valueEn: 'Japan, China, Taiwan, Hong Kong, South Korea',
  },
  {
    label: '対応言語',
    labelEn: 'Languages',
    value: '日本語・中国語',
    valueEn: 'Japanese, Chinese',
  },
  {
    label: '取引形態',
    labelEn: 'Transaction Types',
    value: 'BtoB（法人間取引）/ BtoC（個人向け小売）',
    valueEn: 'B2B (Corporate) / B2C (Retail)',
  },
  {
    label: '主要取扱商材',
    labelEn: 'Key Products',
    value: 'ポケモンカード（中国正規発売品）、原神関連グッズ、その他アジアIPキャラクターグッズ',
    valueEn: 'Pokemon Cards (China official release), Genshin Impact goods, other Asian IP character goods',
  },
  {
    label: '営業時間',
    labelEn: 'Business Hours',
    value: '平日 10:00〜18:00（土日祝休業）',
    valueEn: 'Weekdays 10:00–18:00 (Closed weekends & holidays)',
  },
  {
    label: 'メールアドレス',
    labelEn: 'Email',
    value: 'asiacardptcg@gmail.com',
    valueEn: 'asiacardptcg@gmail.com',
  },
  {
    label: '取引銀行',
    labelEn: 'Banking',
    value: '準備中',
    valueEn: 'Pending',
  },
]

const VALUES = [
  {
    icon: Target,
    title: '信頼',
    titleEn: 'Trust',
    desc: 'すべてのお取引において誠実さと透明性を大切にし、長期的な信頼関係を築きます。',
    descEn: 'We value integrity and transparency in every transaction, building lasting relationships.',
  },
  {
    icon: Heart,
    title: '品質',
    titleEn: 'Quality',
    desc: '正規品のみを取り扱い、厳格な品質管理体制のもと、お客様に安心をお届けします。',
    descEn: 'We handle only genuine products with strict quality control, delivering peace of mind.',
  },
  {
    icon: Eye,
    title: '革新',
    titleEn: 'Innovation',
    desc: '越境貿易の可能性を追求し、日中間の新たなビジネスモデルを創造し続けます。',
    descEn: 'We pursue cross-border trade possibilities and continuously create new Japan-China business models.',
  },
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
                  <LangText ja={item.label} en={item.labelEn} />
                </div>
                <div className="px-6 py-4 text-sm lux-text whitespace-pre-line">
                  <LangText ja={item.value} en={item.valueEn} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-8">
            <LangText ja="企業理念" en="Core Values" />
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-xl bg-[#0d1015] border border-white/8 p-6 shadow-card"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-[#c9a84c]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  <LangText ja={v.title} en={v.titleEn} />
                </h3>
                <p className="text-sm lux-text leading-relaxed">
                  <LangText ja={v.desc} en={v.descEn} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

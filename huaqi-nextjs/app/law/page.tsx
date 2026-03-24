import type { Metadata } from 'next'
import { Scale } from 'lucide-react'

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記 | 華啓未来株式会社',
  description: '華啓未来株式会社の特定商取引法に基づく表記。販売業者情報、返品・交換ポリシー、送料・配送方法について。',
  alternates: {
    canonical: '/law',
  },
}

const LAW_ITEMS = [
  { label: '販売業者', value: '華啓未来株式会社' },
  { label: '運営統括責任者', value: '代表取締役 鮑 海明' },
  { label: '所在地', value: '〒231-0057 神奈川県横浜市中区曙町1-3 藤和伊勢佐木ハイタウン615号室' },
  { label: '電話番号', value: 'お問い合わせフォームよりご連絡ください' },
  { label: 'メールアドレス', value: 'asiacardptcg@gmail.com' },
  { label: 'ホームページURL', value: 'https://www.huaqi.jp' },
  {
    label: '販売価格',
    value: '各商品ページに表示された価格（税込）',
  },
  {
    label: '商品代金以外の必要料金',
    value: '送料、銀行振込手数料（お客様ご負担）',
  },
  {
    label: '送料',
    value: '全国一律500円（北海道・沖縄・離島は800円）\n10,000円以上のご注文で送料無料',
  },
  {
    label: '配送方法',
    value: '佐川急便・日本郵便・国際配送対応',
  },
  {
    label: '配送時期',
    value: 'ご注文確認後、通常3〜7営業日以内に発送いたします。\n海外からの取り寄せ商品は2〜4週間程度お時間をいただく場合がございます。',
  },
  {
    label: 'お支払方法',
    value: '銀行振込、クレジットカード（VISA / Mastercard / JCB / AMEX）、各種オンライン決済',
  },
  {
    label: 'お支払時期',
    value: '銀行振込：ご注文後7日以内にお振込みください。\nクレジットカード・オンライン決済：ご注文時に決済が完了いたします。',
  },
  {
    label: '返品・交換について',
    value:
      '商品到着後7日以内に限り、未使用・未開封品の交換に対応いたします。\nお客様のご都合による返品・交換はお受けできません。\n商品に不良がある場合は、送料当社負担にて交換いたします。',
  },
  {
    label: '返品連絡先',
    value: 'asiacardptcg@gmail.com',
  },
  {
    label: '営業時間',
    value: '平日 10:00 - 18:00（土日祝日を除く）',
  },
]

export default function LawPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Header */}
      <div className="relative overflow-hidden py-20 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#1a365d]/8 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#c9a84c] bg-[#c9a84c]/8 border border-[#c9a84c]/15 px-4 py-2 rounded-full mb-6">
            <Scale className="w-4 h-4" />
            法的表記
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            特定商取引法に基づく表記
          </h1>
          <p className="text-white/45 max-w-2xl mx-auto">
            特定商取引に関する法律第11条に基づく表示
          </p>
        </div>
      </div>

      {/* Table */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl border border-[#1e2a45] overflow-hidden">
            {LAW_ITEMS.map((item, i) => (
              <div
                key={item.label}
                className={`flex flex-col sm:flex-row ${
                  i !== LAW_ITEMS.length - 1 ? 'border-b border-[#1e2a45]' : ''
                }`}
              >
                <div className="sm:w-56 shrink-0 bg-[#131b2e] px-6 py-4 font-medium text-sm text-white/70">
                  {item.label}
                </div>
                <div className="px-6 py-4 text-sm text-white/55 whitespace-pre-line leading-relaxed">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

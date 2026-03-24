import type { Metadata } from 'next'
import { ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | 華啓未来株式会社',
  description: '華啓未来株式会社のプライバシーポリシー。個人情報の取り扱い、収集目的、管理体制について。',
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Header */}
      <div className="relative overflow-hidden py-20 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#1a365d]/8 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#c9a84c] bg-[#c9a84c]/8 border border-[#c9a84c]/15 px-4 py-2 rounded-full mb-6">
            <ShieldCheck className="w-4 h-4" />
            個人情報保護方針
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">プライバシーポリシー</h1>
          <p className="text-white/45 max-w-2xl mx-auto">
            個人情報の保護に関する基本方針
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="prose-sm text-white/55 leading-relaxed space-y-10">

            <p>
              華啓未来株式会社（以下「当社」といいます。）は、お客様の個人情報の保護を重要な責務と認識し、
              以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定め、
              個人情報の適切な取り扱いと保護に努めてまいります。
            </p>

            {/* Section 1 */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">
                第1条（個人情報の収集について）
              </h2>
              <p className="mb-3">
                当社は、以下の場合に必要な範囲でお客様の個人情報を収集することがあります。
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>お問い合わせフォームからのご連絡時</li>
                <li>商品のご注文・お取引時</li>
                <li>メールマガジンの登録時</li>
                <li>各種アンケートへのご回答時</li>
                <li>その他、当社サービスのご利用に際して必要となる場合</li>
              </ul>
              <p className="mt-3">
                収集する個人情報には、氏名、住所、電話番号、メールアドレス、
                その他お取引に必要な情報が含まれます。
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">
                第2条（個人情報の利用目的）
              </h2>
              <p className="mb-3">
                当社は、収集した個人情報を以下の目的で利用いたします。
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>商品の発送およびお取引に関する連絡</li>
                <li>お問い合わせへの回答および対応</li>
                <li>当社サービスに関する情報のご案内</li>
                <li>サービスの改善および新サービスの開発</li>
                <li>統計データの作成（個人を特定できない形式に加工した上で）</li>
                <li>その他、上記利用目的に付随する業務</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">
                第3条（個人情報の第三者提供）
              </h2>
              <p className="mb-3">
                当社は、以下の場合を除き、お客様の個人情報を第三者に提供いたしません。
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>お客様の同意がある場合</li>
                <li>法令に基づく開示請求があった場合</li>
                <li>人の生命、身体または財産の保護のために必要がある場合であって、お客様の同意を得ることが困難な場合</li>
                <li>商品の配送業務等、業務遂行上必要な範囲で業務委託先に提供する場合</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">
                第4条（個人情報の管理）
              </h2>
              <p>
                当社は、お客様の個人情報を正確かつ最新の状態に保つとともに、
                個人情報への不正アクセス、紛失、破損、改ざんおよび漏洩等を防止するため、
                合理的な安全対策を講じます。
                また、個人情報の取り扱いに関する社内規程を整備し、
                従業員に対する教育・啓発活動を実施してまいります。
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">
                第5条（Cookie（クッキー）の使用について）
              </h2>
              <p className="mb-3">
                当社のウェブサイトでは、お客様の利便性向上およびウェブサイトの改善を目的として、
                Cookie（クッキー）を使用する場合があります。
              </p>
              <p>
                Cookieの使用を希望されない場合は、ブラウザの設定によりCookieを無効にすることが可能です。
                ただし、一部のサービスが正常に機能しなくなる場合がありますので、ご了承ください。
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">
                第6条（プライバシーポリシーの変更）
              </h2>
              <p>
                当社は、必要に応じて本ポリシーを変更することがあります。
                変更後のプライバシーポリシーは、当社ウェブサイトに掲載した時点から効力を生じるものとします。
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">
                第7条（お問い合わせ窓口）
              </h2>
              <p className="mb-3">
                個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。
              </p>
              <div className="rounded-xl bg-[#131b2e] border border-[#1e2a45] p-6 text-sm">
                <p className="font-semibold text-white mb-2">華啓未来株式会社</p>
                <p>〒231-0057 神奈川県横浜市中区曙町1-3 藤和伊勢佐木ハイタウン615号室</p>
                <p className="mt-1">メールアドレス: asiacardptcg@gmail.com</p>
                <p className="mt-1">営業時間: 平日 10:00 - 18:00</p>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-8 border-t border-[#1e2a45] text-sm text-white/40">
              <p>制定日: 2024年1月1日</p>
              <p>最終改定日: 2026年3月1日</p>
              <p className="mt-2">華啓未来株式会社</p>
              <p>代表取締役 鮑 海明</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'
import { ShieldCheck } from 'lucide-react'
import LangText from '@/components/LangText'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: '華啓未来株式会社のプライバシーポリシー。個人情報の取り扱い、収集目的、管理体制について。',
  alternates: {
    canonical: 'https://www.huaqi.jp/privacy',
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Header */}
      <div className="relative overflow-hidden py-20 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#c9a84c] bg-[#c9a84c]/8 border border-[#c9a84c]/15 px-4 py-2 rounded-full mb-6">
            <ShieldCheck className="w-4 h-4" />
            <LangText ja="個人情報保護方針" en="Privacy Policy" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4"><LangText ja="プライバシーポリシー" en="Privacy Policy" /></h1>
          <p className="text-muted max-w-2xl mx-auto">
            <LangText ja="個人情報の保護に関する基本方針" en="Basic policy regarding the protection of personal information." />
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="prose-sm lux-text leading-relaxed space-y-10">

            <p><LangText ja="華啓未来株式会社（以下「当社」といいます。）は、お客様の個人情報の保護を重要な責務と認識し、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます。）を定め、個人情報の適切な取り扱いと保護に努めてまいります。" en="Huaqi Future Co., Ltd. recognizes the protection of personal information as a material responsibility. We establish this Privacy Policy and strive to handle and protect personal information appropriately." /></p>

            {/* Section 1 */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">
                <LangText ja="第1条（個人情報の収集について）" en="Article 1: Collection of Personal Information" />
              </h2>
              <p className="mb-3">
                <LangText ja="当社は、以下の場合に必要な範囲でお客様の個人情報を収集することがあります。" en="We may collect personal information from customers to the extent necessary in the following situations." />
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li><LangText ja="お問い合わせフォームからのご連絡時" en="When you contact us through the inquiry form" /></li>
                <li><LangText ja="商品のご注文・お取引時" en="When placing orders or conducting transactions" /></li>
                <li><LangText ja="メールマガジンの登録時" en="When subscribing to newsletters" /></li>
                <li><LangText ja="各種アンケートへのご回答時" en="When responding to surveys" /></li>
                <li><LangText ja="その他、当社サービスのご利用に際して必要となる場合" en="Other situations required for use of our services" /></li>
              </ul>
              <p className="mt-3">
                <LangText ja="収集する個人情報には、氏名、住所、電話番号、メールアドレス、その他お取引に必要な情報が含まれます。" en="Collected information may include name, address, phone number, email address, and other information necessary for transactions." />
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">
                <LangText ja="第2条（個人情報の利用目的）" en="Article 2: Purpose of Use" />
              </h2>
              <p className="mb-3">
                <LangText ja="当社は、収集した個人情報を以下の目的で利用いたします。" en="We use collected personal information for the following purposes." />
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li><LangText ja="商品の発送およびお取引に関する連絡" en="Shipping products and communicating regarding transactions" /></li>
                <li><LangText ja="お問い合わせへの回答および対応" en="Responding to inquiries" /></li>
                <li><LangText ja="当社サービスに関する情報のご案内" en="Providing information about our services" /></li>
                <li><LangText ja="サービスの改善および新サービスの開発" en="Improving services and developing new services" /></li>
                <li><LangText ja="統計データの作成（個人を特定できない形式に加工した上で）" en="Preparing statistical data in a non-identifiable form" /></li>
                <li><LangText ja="その他、上記利用目的に付随する業務" en="Other operations incidental to the above purposes" /></li>
              </ul>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">
                <LangText ja="第3条（個人情報の第三者提供）" en="Article 3: Provision to Third Parties" />
              </h2>
              <p className="mb-3">
                <LangText ja="当社は、以下の場合を除き、お客様の個人情報を第三者に提供いたしません。" en="We do not provide personal information to third parties except in the following cases." />
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li><LangText ja="お客様の同意がある場合" en="When the customer has given consent" /></li>
                <li><LangText ja="法令に基づく開示請求があった場合" en="When disclosure is required by law" /></li>
                <li><LangText ja="人の生命、身体または財産の保護のために必要がある場合であって、お客様の同意を得ることが困難な場合" en="When necessary to protect life, body, or property and obtaining consent is difficult" /></li>
                <li><LangText ja="商品の配送業務等、業務遂行上必要な範囲で業務委託先に提供する場合" en="When information is shared with subcontractors as necessary for operations such as delivery" /></li>
              </ul>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">
                <LangText ja="第4条（個人情報の管理）" en="Article 4: Management of Personal Information" />
              </h2>
              <p>
                <LangText ja="当社は、お客様の個人情報を正確かつ最新の状態に保つとともに、個人情報への不正アクセス、紛失、破損、改ざんおよび漏洩等を防止するため、合理的な安全対策を講じます。また、個人情報の取り扱いに関する社内規程を整備し、従業員に対する教育・啓発活動を実施してまいります。" en="We keep personal information accurate and up to date and implement reasonable security measures to prevent unauthorized access, loss, damage, falsification, and leakage. We also maintain internal rules and conduct employee training regarding personal information handling." />
              </p>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">
                <LangText ja="第5条（Cookie（クッキー）の使用について）" en="Article 5: Use of Cookies" />
              </h2>
              <p className="mb-3">
                <LangText ja="当社のウェブサイトでは、お客様の利便性向上およびウェブサイトの改善を目的として、Cookie（クッキー）を使用する場合があります。" en="Our website may use cookies to improve user convenience and enhance the website." />
              </p>
              <p>
                <LangText ja="Cookieの使用を希望されない場合は、ブラウザの設定によりCookieを無効にすることが可能です。ただし、一部のサービスが正常に機能しなくなる場合がありますので、ご了承ください。" en="If you do not wish cookies to be used, you may disable them in your browser settings. Please note that some services may not function properly as a result." />
              </p>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">
                <LangText ja="第6条（プライバシーポリシーの変更）" en="Article 6: Changes to This Policy" />
              </h2>
              <p>
                <LangText ja="当社は、必要に応じて本ポリシーを変更することがあります。変更後のプライバシーポリシーは、当社ウェブサイトに掲載した時点から効力を生じるものとします。" en="We may revise this policy when necessary. The revised policy becomes effective when posted on our website." />
              </p>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">
                <LangText ja="第7条（お問い合わせ窓口）" en="Article 7: Contact Point" />
              </h2>
              <p className="mb-3">
                <LangText ja="個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。" en="For inquiries regarding personal information handling, please contact us below." />
              </p>
              <div className="rounded-xl bg-[#0d1015] border border-white/8 p-6 text-sm shadow-card">
                <p className="font-semibold text-white mb-2">華啓未来株式会社</p>
                <p>〒231-0057 神奈川県横浜市中区曙町1-3 藤和伊勢佐木ハイタウン615号室</p>
                <p className="mt-1"><LangText ja="メールアドレス: asiacardptcg@gmail.com" en="Email: asiacardptcg@gmail.com" /></p>
                <p className="mt-1"><LangText ja="営業時間: 平日 10:00 - 18:00" en="Business Hours: Weekdays 10:00 - 18:00" /></p>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-8 border-t border-white/8 text-sm text-muted-light">
              <p><LangText ja="制定日: 2024年1月1日" en="Established: January 1, 2024" /></p>
              <p><LangText ja="最終改定日: 2026年3月1日" en="Last Updated: March 1, 2026" /></p>
              <p className="mt-2">華啓未来株式会社</p>
              <p><LangText ja="代表取締役 鮑 海明" en="CEO Bao Haiming" /></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

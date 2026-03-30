'use client'

import { useState } from 'react'
import { Mail, MapPin, Clock, Languages, Send, CheckCircle, Loader2 } from 'lucide-react'
import LangText from '@/components/LangText'
import { useLanguage } from '@/components/LanguageProvider'

const INQUIRY_TYPES = [
  { ja: '商品に関するお問い合わせ', en: 'Product Inquiry' },
  { ja: '法人・卸売りのご相談', en: 'Wholesale / B2B Inquiry' },
  { ja: 'パートナーシップのご提案', en: 'Partnership Proposal' },
  { ja: '配送・返品について', en: 'Shipping / Returns' },
  { ja: 'その他', en: 'Other' },
]

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'メール',
    enLabel: 'Email',
    value: 'asiacardptcg@gmail.com',
  },
  {
    icon: MapPin,
    label: '所在地',
    enLabel: 'Address',
    value: '〒231-0057\n神奈川県横浜市中区曙町1-3\n藤和伊勢佐木ハイタウン615号室',
  },
  {
    icon: Clock,
    label: '営業時間',
    enLabel: 'Business Hours',
    value: '平日 10:00〜18:00\n（土日祝日を除く）',
  },
  {
    icon: Languages,
    label: '対応言語',
    enLabel: 'Languages',
    value: '日本語・中国語',
  },
]

export default function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { language } = useLanguage()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      category: (form.elements.namedItem('category') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) {
        setError(
          json.error ||
            (language === 'en' ? 'Failed to send your inquiry.' : '送信に失敗しました')
        )
      } else {
        setSubmitted(true)
      }
    } catch {
      setError(
        language === 'en'
          ? 'Network error. Please contact us directly by email.'
          : 'ネットワークエラー。メールまたはWeChatより直接ご連絡ください。'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="relative overflow-hidden py-20 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#c9a84c] bg-[#c9a84c]/8 border border-[#c9a84c]/15 px-4 py-2 rounded-full mb-6">
            <Mail className="w-4 h-4" />
            <LangText ja="お問い合わせ" en="Contact" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <LangText ja="お問い合わせ" en="Contact Us" />
          </h1>
          <p className="text-muted max-w-2xl mx-auto">
            <LangText
              ja={
                <>
                  商品の仕入れ、法人取引、越境貿易支援、パートナー提携に関するご相談を受け付けています。
                  <br className="hidden sm:block" />
                  内容確認後、通常 2 営業日以内を目安にご返信いたします。
                </>
              }
              en={
                <>
                  We handle product sourcing, wholesale inquiries, cross-border trade support, and partnership requests.
                  <br className="hidden sm:block" />
                  We usually reply within 2 business days.
                </>
              }
            />
          </p>
        </div>
      </div>

      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="rounded-xl bg-green-500/8 border border-green-500/20 p-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-3">
                  <LangText ja="お問い合わせありがとうございます" en="Thank You for Your Inquiry" />
                </h3>
                <p className="lux-text">
                  <LangText
                    ja="内容を確認の上、2営業日以内にご連絡いたします。"
                    en="We will review your message and reply within 2 business days."
                  />
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    <LangText ja="お名前" en="Name" /> <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={language === 'en' ? 'John Smith' : '山田 太郎'}
                    className="w-full bg-[#10141b] border border-white/8 rounded-lg px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-secondary/60 focus:ring-1 focus:ring-secondary/20 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    <LangText ja="会社名" en="Company" />
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder={language === 'en' ? 'Example Co., Ltd.' : '株式会社○○'}
                    className="w-full bg-[#10141b] border border-white/8 rounded-lg px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-secondary/60 focus:ring-1 focus:ring-secondary/20 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    <LangText ja="メールアドレス" en="Email" /> <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="example@email.com"
                    className="w-full bg-[#10141b] border border-white/8 rounded-lg px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-secondary/60 focus:ring-1 focus:ring-secondary/20 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    <LangText ja="お問い合わせ種別" en="Inquiry Type" /> <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="category"
                    required
                    defaultValue=""
                    className="w-full bg-[#10141b] border border-white/8 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary/60 focus:ring-1 focus:ring-secondary/20 transition-colors appearance-none"
                  >
                    <option value="" disabled className="bg-[#131b2e]">
                      <LangText ja="選択してください" en="Select one" />
                    </option>
                    {INQUIRY_TYPES.map((type) => (
                      <option key={type.ja} value={type.ja} className="bg-[#131b2e]">
                        {type.ja} / {type.en}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    <LangText ja="メッセージ" en="Message" /> <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    placeholder={language === 'en' ? 'Please enter your message.' : 'お問い合わせ内容をご記入ください'}
                    className="w-full bg-[#10141b] border border-white/8 rounded-lg px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-secondary/60 focus:ring-1 focus:ring-secondary/20 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-[#f0d69a] text-[#120d04] font-semibold px-8 py-3.5 rounded-lg hover:opacity-90 transition-colors w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  <LangText ja={loading ? '送信中...' : '送信する'} en={loading ? 'Sending...' : 'Send'} />
                </button>

                {error && (
                  <p className="text-red-400 text-sm bg-red-500/8 border border-red-500/20 rounded-lg px-4 py-3">
                    {error}
                  </p>
                )}
              </form>
            )}
          </div>

          <div className="lg:col-span-2 space-y-5">
            {CONTACT_INFO.map((info) => (
              <div
                key={info.label}
                className="rounded-xl bg-[#0d1015] border border-white/8 p-6 shadow-card"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <info.icon className="w-5 h-5 text-[#c9a84c]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">
                      <LangText ja={info.label} en={info.enLabel} />
                    </h3>
                    <p className="text-sm lux-text whitespace-pre-line leading-relaxed">
                      {info.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-xl bg-[#0d1015] border border-white/8 p-6 shadow-card">
              <h3 className="font-semibold text-sm mb-3">
                <LangText ja="ご相談いただける内容" en="What We Can Help With" />
              </h3>
              <p className="text-sm lux-text leading-relaxed">
                <LangText
                  ja="日本国内での販売相談、法人向け卸売り、継続仕入れ、日中間の商流構築、物流手配、パートナー提携など、実務ベースのご相談に対応しています。"
                  en="We support practical business requests including domestic sales strategy in Japan, wholesale supply, recurring sourcing, cross-border trade flow design, logistics coordination, and partnerships."
                />
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

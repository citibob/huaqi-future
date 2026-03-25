'use client'

import { useState } from 'react'
import { Mail, MapPin, Clock, Languages, Send, CheckCircle, Loader2 } from 'lucide-react'

const INQUIRY_TYPES = [
  '商品に関するお問い合わせ',
  '法人・卸売りのご相談',
  'パートナーシップのご提案',
  '配送・返品について',
  'その他',
]

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'メール',
    value: 'asiacardptcg@gmail.com',
  },
  {
    icon: MapPin,
    label: '所在地',
    value: '〒231-0057\n神奈川県横浜市中区曙町1-3\n藤和伊勢佐木ハイタウン615号室',
  },
  {
    icon: Clock,
    label: '営業時間',
    value: '平日 10:00〜18:00\n（土日祝日を除く）',
  },
  {
    icon: Languages,
    label: '対応言語',
    value: '日本語・中国語',
  },
]

export default function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
        setError(json.error || '送信に失敗しました')
      } else {
        setSubmitted(true)
      }
    } catch {
      setError('ネットワークエラー。メールまたはWeChatより直接ご連絡ください。')
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
            お問い合わせ
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">お問い合わせ</h1>
          <p className="text-muted max-w-2xl mx-auto">
            商品の仕入れ、法人取引、越境貿易支援、パートナー提携に関するご相談を受け付けています。
            <br className="hidden sm:block" />
            内容確認後、通常 2 営業日以内を目安にご返信いたします。
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
                  お問い合わせありがとうございます
                </h3>
                <p className="lux-text">
                  内容を確認の上、2営業日以内にご連絡いたします。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    お名前 <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="山田 太郎"
                    className="w-full bg-[#10141b] border border-white/8 rounded-lg px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-secondary/60 focus:ring-1 focus:ring-secondary/20 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    会社名
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="株式会社○○"
                    className="w-full bg-[#10141b] border border-white/8 rounded-lg px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-secondary/60 focus:ring-1 focus:ring-secondary/20 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    メールアドレス <span className="text-red-400">*</span>
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
                    お問い合わせ種別 <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="category"
                    required
                    defaultValue=""
                    className="w-full bg-[#10141b] border border-white/8 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary/60 focus:ring-1 focus:ring-secondary/20 transition-colors appearance-none"
                  >
                    <option value="" disabled className="bg-[#131b2e]">
                      選択してください
                    </option>
                    {INQUIRY_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-[#131b2e]">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    メッセージ <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    placeholder="お問い合わせ内容をご記入ください"
                    className="w-full bg-[#10141b] border border-white/8 rounded-lg px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-secondary/60 focus:ring-1 focus:ring-secondary/20 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-[#f0d69a] text-[#120d04] font-semibold px-8 py-3.5 rounded-lg hover:opacity-90 transition-colors w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {loading ? '送信中...' : '送信する'}
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
                    <h3 className="font-semibold text-sm mb-1">{info.label}</h3>
                    <p className="text-sm lux-text whitespace-pre-line leading-relaxed">
                      {info.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-xl bg-[#0d1015] border border-white/8 p-6 shadow-card">
              <h3 className="font-semibold text-sm mb-3">ご相談いただける内容</h3>
              <p className="text-sm lux-text leading-relaxed">
                日本国内での販売相談、法人向け卸売り、継続仕入れ、日中間の商流構築、
                物流手配、パートナー提携など、実務ベースのご相談に対応しています。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

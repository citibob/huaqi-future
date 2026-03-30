import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'
import LangText from './LangText'

export default function Footer() {
  return (
    <footer className="relative bg-[#06080b] border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-secondary via-[#f1d392] to-accent flex items-center justify-center shadow-card">
                <span className="text-[#120d04] font-black text-xs tracking-tighter">華</span>
              </div>
              <div>
                <span className="font-black text-sm tracking-tight text-primary">華啓未来株式会社</span>
                <span className="block text-[10px] text-muted-light uppercase tracking-widest">HUAQI FUTURE CO., LTD.</span>
              </div>
            </div>
            <p className="text-sm lux-text leading-relaxed max-w-md">
              <LangText
                ja="中国と日本をつなぐ越境貿易企業。トレーディングカード・ホビーグッズの輸入販売、貿易コンサルティングを通じて、両国の架け橋となることを目指す。"
                en="A cross-border trading company connecting Japan and China through trading cards, hobby goods, and consulting services."
              />
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">
              <LangText ja="クイックリンク" en="Quick Links" />
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/', ja: 'ホーム', en: 'Home' },
                { href: '/market', ja: 'マーケット', en: 'Market' },
                { href: '/packs', ja: 'トレーディングカード', en: 'Trading Cards' },
                { href: '/company', ja: '会社概要', en: 'Company' },
                { href: '/contact', ja: 'お問い合わせ', en: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-primary transition-colors">
                    <LangText ja={link.ja} en={link.en} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4">
              <LangText ja="お問い合わせ" en="Contact" />
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-sm lux-text">asiacardptcg@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-sm lux-text">
                  <LangText ja="神奈川県横浜市" en="Yokohama, Kanagawa" />
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-light">
            © 2024-2026 華啓未来株式会社. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-muted hover:text-primary transition-colors">
              <LangText ja="プライバシーポリシー" en="Privacy Policy" />
            </Link>
            <Link href="/law" className="text-xs text-muted hover:text-primary transition-colors">
              <LangText ja="特定商取引法" en="Legal Notice" />
            </Link>
          </div>
        </div>
      </div>

      {/* Status Pillar - Right Side Decoration */}
      <div className="absolute right-0 top-0 w-px h-16 bg-container-300" />
    </footer>
  )
}

import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

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
              中国と日本をつなぐ越境貿易企業。トレーディングカード・ホビーグッズの輸入販売、貿易コンサルティングを通じて、両国の架け橋となることを目指す。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-secondary mb-4">クイックリンク</h4>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'ホーム' },
                { href: '/market', label: 'マーケット' },
                { href: '/packs', label: 'トレーディングカード' },
                { href: '/company', label: '会社概要' },
                { href: '/contact', label: 'お問い合わせ' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-secondary mb-4">お問い合わせ</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-sm lux-text">asiacardptcg@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-sm lux-text">神奈川県横浜市</span>
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
            <Link href="/privacy" className="text-xs text-muted hover:text-primary transition-colors">プライバシーポリシー</Link>
            <Link href="/law" className="text-xs text-muted hover:text-primary transition-colors">特定商取引法</Link>
          </div>
        </div>
      </div>

      {/* Status Pillar - Right Side Decoration */}
      <div className="absolute right-0 top-0 w-px h-16 bg-container-300" />
    </footer>
  )
}

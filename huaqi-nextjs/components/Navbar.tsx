'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Menu,
  X,
  Home,
  Package,
  Palette,
  Globe,
  Building2,
  Mail,
  TrendingUp,
  ChevronDown,
  Briefcase,
} from 'lucide-react'
import LangText from './LangText'
import { useLanguage } from './LanguageProvider'

const businessItems = [
  { href: '/business', ja: '事業一覧', en: 'Services', icon: Briefcase },
  { href: '/packs', ja: 'トレーディングカード', en: 'Trading Cards', icon: Package },
  { href: '/pokemon', ja: 'カード相場', en: 'Card Market', icon: Palette },
  { href: '/culture', ja: '越境貿易コンサルティング', en: 'Cross-Border Consulting', icon: Globe },
]

const navItems = [
  { href: '/', ja: 'ホーム', en: 'Home', icon: Home },
  { href: '/market', ja: 'マーケット', en: 'Market', icon: TrendingUp },
  { href: '/company', ja: '会社概要', en: 'Company', icon: Building2 },
  { href: '/contact', ja: 'お問い合わせ', en: 'Contact', icon: Mail },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [bizOpen, setBizOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-secondary via-[#f1d392] to-accent flex items-center justify-center shadow-card">
              <span className="text-[#120d04] font-black text-xs tracking-tighter">華</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm leading-none tracking-tight text-primary">華啓未来</span>
              <span className="text-[10px] text-muted-light leading-none mt-0.5 tracking-widest uppercase">
                HUAQI FUTURE
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-muted hover:text-primary transition-colors font-medium">
              <LangText ja="ホーム" en="Home" />
            </Link>

            {/* Business dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setBizOpen(true)}
              onMouseLeave={() => setBizOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm text-muted hover:text-primary transition-colors py-5 font-medium">
                <LangText ja="事業内容" en="Business" />
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {bizOpen && (
                <div className="absolute top-full left-0 w-64 lux-panel rounded-sm p-2 z-[60]">
                  {businessItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-muted hover:bg-white/5 hover:text-primary rounded-sm transition-colors"
                    >
                      <item.icon className="w-4 h-4 text-secondary" />
                      <LangText ja={item.ja} en={item.en} />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/market" className="text-sm text-muted hover:text-primary transition-colors font-medium">
              <LangText ja="マーケット" en="Market" />
            </Link>
            <Link href="/company" className="text-sm text-muted hover:text-primary transition-colors font-medium">
              <LangText ja="会社概要" en="Company" />
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center rounded-sm border border-white/10 bg-white/[0.03] p-1">
              <button
                type="button"
                onClick={() => setLanguage('ja')}
                className={`px-3 py-1.5 text-[11px] font-bold tracking-[0.2em] transition-colors ${
                  language === 'ja' ? 'bg-secondary text-[#120d04]' : 'text-muted'
                }`}
              >
                JP
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-[11px] font-bold tracking-[0.2em] transition-colors ${
                  language === 'en' ? 'bg-secondary text-[#120d04]' : 'text-muted'
                }`}
              >
                EN
              </button>
            </div>
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-secondary to-[#f0d69a] text-[#120d04] px-5 py-2.5 rounded-sm hover:opacity-90 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <LangText ja="お問い合わせ" en="Contact" />
            </Link>

            <button
              className="md:hidden p-2 text-primary"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 bg-[#090b0f]/95">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 py-3 text-muted hover:text-primary"
                onClick={() => setMenuOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <LangText ja={item.ja} en={item.en} />
              </Link>
            ))}

            <div className="flex items-center gap-2 py-3">
              <button
                type="button"
                onClick={() => setLanguage('ja')}
                className={`rounded-sm border px-3 py-1 text-xs font-bold tracking-[0.2em] ${
                  language === 'ja' ? 'border-secondary bg-secondary text-[#120d04]' : 'border-white/10 text-muted'
                }`}
              >
                JP
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`rounded-sm border px-3 py-1 text-xs font-bold tracking-[0.2em] ${
                  language === 'en' ? 'border-secondary bg-secondary text-[#120d04]' : 'border-white/10 text-muted'
                }`}
              >
                EN
              </button>
            </div>

            <div className="border-t border-white/10 mt-2 pt-2">
              <p className="text-xs text-muted-light px-2 py-2 uppercase tracking-wider">
                <LangText ja="事業内容" en="Business" />
              </p>
              {businessItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 py-3 pl-4 text-muted hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 text-secondary" />
                  <LangText ja={item.ja} en={item.en} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

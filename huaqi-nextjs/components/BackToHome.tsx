'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function BackToHome() {
  return (
    <div className="px-4 pt-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        ホームに戻る
      </Link>
    </div>
  )
}

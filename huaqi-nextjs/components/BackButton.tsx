'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import LangText from './LangText'

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors bg-[#131b2e] border border-[#1e2a45] hover:border-white/20 rounded-lg px-3 py-2 shrink-0"
    >
      <ArrowLeft className="w-4 h-4" /> <LangText ja="戻る" en="Back" />
    </button>
  )
}

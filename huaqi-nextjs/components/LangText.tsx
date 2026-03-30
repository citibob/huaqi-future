'use client'

import { useLanguage } from './LanguageProvider'

export default function LangText({ ja, en }: { ja: React.ReactNode; en: React.ReactNode }) {
  const { language } = useLanguage()
  return <>{language === 'en' ? en : ja}</>
}

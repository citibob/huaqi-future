import type { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description:
    '華啓未来株式会社へのお問い合わせページ。商品仕入れ、法人取引、越境貿易支援、パートナーシップに関するご相談を受け付けています。',
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}

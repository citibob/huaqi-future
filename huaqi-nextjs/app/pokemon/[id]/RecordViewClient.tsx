'use client'

import { useEffect } from 'react'
import { recordView } from '@/lib/recommendations'

export default function RecordViewClient({ cardId }: { cardId: string }) {
  useEffect(() => {
    recordView(cardId)
  }, [cardId])
  return null
}

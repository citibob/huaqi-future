'use client'

import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'
import { useCart } from './CartProvider'
import { useLanguage } from './LanguageProvider'

interface AddToCartButtonProps {
  id: string
  variantId: string | undefined
  name: string
  nameJP: string
  price: number
  imageUrl: string
  disabled?: boolean
}

export default function AddToCartButton({
  id, variantId, name, nameJP, price, imageUrl, disabled = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const { language } = useLanguage()
  const [added, setAdded] = useState(false)

  const t = {
    add:   language === 'ja' ? 'カートに追加'      : 'Add to Cart',
    added: language === 'ja' ? 'カートに追加しました' : 'Added to Cart',
  }

  function handleAdd() {
    if (disabled) return
    addItem({ id, variantId, name, nameJP, price, imageUrl })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={disabled || added}
      className="w-full flex items-center justify-center gap-2 bg-white text-[#0a0f1a] font-bold py-4 rounded-lg hover:bg-white/90 disabled:bg-white/20 disabled:text-white/40 disabled:cursor-not-allowed transition-colors text-base mb-3"
    >
      {added ? (
        <>
          <Check className="w-5 h-5" />
          {t.added}
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          {t.add}
        </>
      )}
    </button>
  )
}

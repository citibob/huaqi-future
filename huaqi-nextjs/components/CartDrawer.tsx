'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from './CartProvider'
import { useLanguage } from './LanguageProvider'

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'huaqi-future.myshopify.com'
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || ''

const RESOLVE_VARIANTS_QUERY = `
  query AllProducts {
    products(first: 20) {
      nodes {
        title
        handle
        variants(first: 1) {
          nodes { id availableForSale }
        }
      }
    }
  }
`

const CART_CREATE = `
  mutation CreateCart($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { checkoutUrl }
      userErrors { message }
    }
  }
`

async function storefrontFetch<T>(query: string): Promise<T | null> {
  try {
    const res = await fetch(`https://${STORE_DOMAIN}/api/2026-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
    })
    const json = await res.json() as { data?: T; errors?: unknown[] }
    if (json.errors?.length) return null
    return json.data ?? null
  } catch {
    return null
  }
}

function extractVol(text: string): string | null {
  const m = text.match(/vol(?:ume)?[-.\s]?(\d+)/i)
  return m?.[1] ?? null
}

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems, isOpen, closeCart } = useCart()
  const { language } = useLanguage()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const t = {
    cart:         language === 'ja' ? 'カート'                         : 'Cart',
    empty:        language === 'ja' ? 'カートは空です'                  : 'Your cart is empty',
    subtotal:     language === 'ja' ? '小計'                           : 'Subtotal',
    shipping:     language === 'ja' ? '送料は決済時に確定します（表示価格は消費税10%込み）'  : 'Shipping calculated at checkout (prices include 10% consumption tax)',
    checkout:     language === 'ja' ? 'Shopifyで決済する'               : 'Checkout with Shopify',
    processing:   language === 'ja' ? '決済ページへ移動中…'             : 'Redirecting to checkout…',
    noItems:      language === 'ja' ? '商品情報を取得できませんでした。ページを更新してお試しください。' : 'Could not load product info. Please refresh and try again.',
    urlError:     language === 'ja' ? '決済URLを取得できませんでした'     : 'Could not retrieve checkout URL',
    genericError: language === 'ja' ? '決済処理中にエラーが発生しました'  : 'An error occurred during checkout',
    guestNote:    language === 'ja' ? 'アカウント登録不要・ゲストとしてお支払いいただけます' : 'No account needed — you can pay as a guest',
  }

  async function resolveVariantIds(): Promise<Map<string, string>> {
    const data = await storefrontFetch<{
      products: { nodes: Array<{ title: string; handle: string; variants: { nodes: Array<{ id: string; availableForSale: boolean }> } }> }
    }>(RESOLVE_VARIANTS_QUERY)

    const map = new Map<string, string>()
    if (!data?.products?.nodes) return map

    for (const product of data.products.nodes) {
      const vol = extractVol(product.title) ?? extractVol(product.handle)
      if (vol && product.variants.nodes[0]?.id) {
        map.set(vol, product.variants.nodes[0].id)
      }
    }
    return map
  }

  async function handleCheckout() {
    setIsCheckingOut(true)
    setError(null)

    try {
      // Resolve missing variantIds from Shopify
      const needsResolve = items.some(i => !i.variantId)
      let volToVariant = new Map<string, string>()
      if (needsResolve) {
        volToVariant = await resolveVariantIds()
      }

      const lines = items.map(item => {
        let variantId = item.variantId
        if (!variantId) {
          // item.id is like 'gem-pack-vol1' — extract vol number
          const vol = extractVol(item.id)
          if (vol) variantId = volToVariant.get(vol)
        }
        return variantId ? { merchandiseId: variantId, quantity: item.quantity } : null
      }).filter(Boolean) as Array<{ merchandiseId: string; quantity: number }>

      if (!lines.length) {
        throw new Error(t.noItems)
      }

      const data = await storefrontFetch<{
        cartCreate: { cart?: { checkoutUrl?: string }; userErrors?: Array<{ message: string }> }
      }>(`mutation { cartCreate(input: { lines: [${lines.map(l =>
        `{ merchandiseId: "${l.merchandiseId}", quantity: ${l.quantity} }`
      ).join(',')}] }) { cart { checkoutUrl } userErrors { message } } }`)

      const userErrors = data?.cartCreate?.userErrors ?? []
      if (userErrors.length) throw new Error(userErrors.map(e => e.message).join('; '))

      const checkoutUrl = data?.cartCreate?.cart?.checkoutUrl
      if (!checkoutUrl) throw new Error(t.urlError)

      clearCart()
      window.location.href = checkoutUrl
    } catch (err) {
      setError(err instanceof Error ? err.message : t.genericError)
      setIsCheckingOut(false)
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm" onClick={closeCart} />
      )}

      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0d1015] border-l border-white/10 z-[70] flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-[#c9a84c]" />
            <span className="font-bold text-base">{t.cart}</span>
            {totalItems > 0 && (
              <span className="bg-[#c9a84c] text-[#0a0f1a] text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="p-2 text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-white/30">
              <ShoppingBag className="w-12 h-12 mb-3" />
              <p className="text-sm">{t.empty}</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map(item => (
                <li key={item.id} className="flex gap-4 bg-[#131b2e] rounded-xl p-4 border border-[#1e2a45]">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-[#0a0f1a]">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-tight truncate">
                      {language === 'ja' ? item.nameJP : item.name}
                    </p>
                    <p className="text-[#c9a84c] font-bold text-sm mt-1">
                      ¥{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-md border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto p-1.5 text-white/30 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-white/10 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">{t.subtotal}</span>
              <span className="font-bold text-lg">¥{totalPrice.toLocaleString()}<span className="text-xs font-normal text-white/40 ml-1">税込</span></span>
            </div>
            <p className="text-xs text-white/30">{t.shipping}</p>
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-gradient-to-r from-[#c9a84c] to-[#f0d69a] text-[#0a0f1a] font-bold py-4 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity text-base"
            >
              {isCheckingOut ? t.processing : t.checkout}
            </button>
            <p className="text-xs text-white/40 text-center">{t.guestNote}</p>
          </div>
        )}
      </div>
    </>
  )
}

'use client'

import { useMemo, useState } from 'react'

interface ShopifyBuyNowButtonProps {
  storeDomain: string
  storefrontAccessToken: string
  variantId?: string
  productName: string
  disabled?: boolean
}

const CREATE_CART_MUTATION = `#graphql
  mutation CreateCart($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`

function normalizeStoreDomain(domain: string): string {
  const trimmed = domain.trim()
  if (!trimmed) return ''
  return trimmed.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

export default function ShopifyBuyNowButton({
  storeDomain,
  storefrontAccessToken,
  variantId,
  productName,
  disabled = false,
}: ShopifyBuyNowButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const normalizedDomain = useMemo(() => normalizeStoreDomain(storeDomain), [storeDomain])
  const isConfigured = normalizedDomain.length > 0 && storefrontAccessToken.trim().length > 0 && Boolean(variantId)
  const isDisabled = disabled || isLoading || !isConfigured

  async function handleBuyNow() {
    if (!variantId || !isConfigured) {
      setError('Checkout is temporarily unavailable.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`https://${normalizedDomain}/api/2024-10/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
        },
        body: JSON.stringify({
          query: CREATE_CART_MUTATION,
          variables: {
            lines: [
              {
                quantity: 1,
                merchandiseId: variantId,
              },
            ],
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`Storefront API error: ${response.status}`)
      }

      const payload = await response.json()
      const userErrors = payload?.data?.cartCreate?.userErrors ?? []
      const checkoutUrl = payload?.data?.cartCreate?.cart?.checkoutUrl

      if (userErrors.length > 0) {
        throw new Error(userErrors[0]?.message || 'Unable to create checkout.')
      }

      if (!checkoutUrl) {
        throw new Error('No checkout URL returned from Shopify.')
      }

      window.location.href = checkoutUrl
    } catch (err) {
      console.error('Shopify buy now failed', err)
      setError(err instanceof Error ? err.message : 'Unable to start checkout.')
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleBuyNow}
        disabled={isDisabled}
        className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#6e3ef7] to-[#9f6bff] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#6e3ef7]/30 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? 'Redirecting to checkout...' : `Buy ${productName} on Shopify`}
      </button>

      {!isConfigured ? (
        <p className="text-xs text-amber-300/90">
          Shopify checkout is not configured for this product yet.
        </p>
      ) : null}

      {error ? <p className="text-xs text-rose-300">{error}</p> : null}
    </div>
  )
}

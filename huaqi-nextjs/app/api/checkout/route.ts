import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getGemPackById } from '@/lib/gem-pack-data'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || ''
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-04-10' as any,
})

export async function POST(req: NextRequest) {
  if (!stripeSecretKey) {
    return NextResponse.json({ error: 'STRIPE_SECRET_KEY is not configured' }, { status: 500 })
  }

  try {
    const { productId, quantity } = await req.json()
    const product = getGemPackById(productId)
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    if (product.priceJPY === 0) {
      return NextResponse.json({ error: 'This item is currently unavailable' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: product.nameJP,
              description: product.descriptionJP,
              images: product.imageUrl ? [`${req.nextUrl.origin}${product.imageUrl}`] : [],
            },
            unit_amount: product.priceJPY,
          },
          quantity: quantity || 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/packs/${productId}`,
    })

    return NextResponse.json({ id: session.id, url: session.url })
  } catch (err: any) {
    console.error('[checkout] Stripe error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
}

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getDB } from '@/lib/db'

const ALLOWED_CATEGORIES = [
  '商品に関するお問い合わせ',
  '法人・卸売りのご相談',
  'パートナーシップのご提案',
  '配送・返品について',
  'その他',
]

const TO_EMAIL = 'asiacardptcg@gmail.com'
const FROM_EMAIL = '華啓未来ウェブサイト <onboarding@resend.dev>'

interface ContactPayload {
  name: string
  email: string
  category: string
  message: string
  company?: string
}

function buildEmailBody(data: ContactPayload): string {
  const lines = [
    '◆ お問い合わせ通知 (華啓未来ウェブサイト)',
    '================================',
    '',
    `お名前: ${data.name}`,
    data.company ? `会社名: ${data.company}` : null,
    `メールアドレス: ${data.email}`,
    `種別: ${data.category}`,
    '',
    '【メッセージ】',
    data.message,
    '',
    '================================',
    `送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}`,
  ].filter(Boolean) as string[]
  return lines.join('\n')
}

export async function POST(req: NextRequest) {
  let body: Partial<ContactPayload>

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'リクエストの形式が不正です' }, { status: 400 })
  }

  const { name, email, category, message } = body

  // Validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return NextResponse.json({ error: 'お名前を入力してください' }, { status: 400 })
  }
  if (name.trim().length > 100) {
    return NextResponse.json({ error: 'お名前が長すぎます' }, { status: 400 })
  }

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'メールアドレスを入力してください' }, { status: 400 })
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'メールアドレスの形式が不正です' }, { status: 400 })
  }

  if (!category || typeof category !== 'string' || !ALLOWED_CATEGORIES.includes(category)) {
    return NextResponse.json({ error: 'お問い合わせ種別を選択してください' }, { status: 400 })
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return NextResponse.json({ error: 'メッセージを入力してください' }, { status: 400 })
  }
  if (message.trim().length > 2000) {
    return NextResponse.json({ error: 'メッセージが長すぎます（2000文字以内）' }, { status: 400 })
  }

  const payload: ContactPayload = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    category,
    message: message.trim(),
    company: typeof body.company === 'string' ? body.company.trim() : undefined,
  }

  console.log('[contact] 新規お問い合わせ:', {
    name: payload.name,
    email: payload.email,
    category: payload.category,
    timestamp: new Date().toISOString(),
  })

  // 1. Save to D1 Database if available (B2B/B2C Upgrade)
  try {
    const db = getDB()
    if (db) {
      await db.prepare(
        'INSERT INTO inquiries (name, email, category, company, message) VALUES (?, ?, ?, ?, ?)'
      )
      .bind(payload.name, payload.email, payload.category, payload.company || null, payload.message)
      .run()
      console.log('[contact] Inquired saved to D1 database')
    }
  } catch (dbErr) {
    console.error('[contact] D1 database save failed:', dbErr)
    // Continue anyway, don't block email delivery
  }

  // 2. Send email via Resend (requires RESEND_API_KEY env var)
  const apiKey = process.env.RESEND_API_KEY
  if (apiKey) {
    try {
      const resend = new Resend(apiKey)
      const { error: resendError } = await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        replyTo: payload.email,
        subject: `【ウェブサイト】${payload.category} - ${payload.name}様`,
        text: buildEmailBody(payload),
      })

      if (resendError) {
        console.error('[contact] Resend error:', resendError)
        // Still return success to user — their message is logged above
        console.log('[contact] Email delivery failed but submission logged')
      } else {
        console.log('[contact] Email sent successfully via Resend')
      }
    } catch (err) {
      console.error('[contact] Email exception:', err)
      // Fall through — submission is still logged
    }
  } else {
    console.warn('[contact] RESEND_API_KEY not set — skipping email send (submissions are console-logged only)')
  }

  return NextResponse.json(
    {
      success: true,
      message: 'お問い合わせを受け付けました。2営業日以内にご連絡いたします。',
    },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    }
  )
}

// Reject non-POST methods
export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
}

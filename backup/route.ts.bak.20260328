import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_CATEGORIES = [
  '商品に関するお問い合わせ',
  '法人・卸売りのご相談',
  'パートナーシップのご提案',
  '配送・返品について',
  'その他',
]

const CONTACT_EMAIL = 'asiacardptcg@gmail.com'

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

  // Log submission (for debugging/deployment verification)
  console.log('[contact] 新規お問い合わせ:', {
    name: payload.name,
    email: payload.email,
    category: payload.category,
    timestamp: new Date().toISOString(),
  })

  // TODO: Integrate email sending here
  // Recommended options:
  // 1. Cloudflare Email Workers + SMTP relay (free, no external service)
  // 2. Resend API (https://resend.com) - free tier 100 emails/day
  // 3. SendGrid / Mailgun with API key in .dev.vars

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

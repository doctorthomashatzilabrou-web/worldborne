import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

interface ContactPayload {
  name: string
  email: string
  company?: string
  message: string
}

export async function POST(req: NextRequest) {
  let body: ContactPayload

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, email, company, message } = body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'name, email, and message are required' }, { status: 422 })
  }

  // ─── EMAIL DELIVERY ────────────────────────────────────────────────────────
  // Wire up your preferred email provider here.
  //
  // Option A — Resend (recommended for Next.js, generous free tier):
  //   npm install resend
  //   Set env var: RESEND_API_KEY=re_xxxxxxx
  //
  //   import { Resend } from 'resend'
  //   const resend = new Resend(process.env.RESEND_API_KEY)
  //   await resend.emails.send({
  //     from: 'no-reply@worldborne.com',        // must be a verified Resend sender
  //     to:   'contact@worldborne.com',
  //     replyTo: email,
  //     subject: `Free Audit Request — ${name}`,
  //     text: [
  //       `Name:    ${name}`,
  //       `Email:   ${email}`,
  //       `Company: ${company ?? '—'}`,
  //       ``,
  //       message,
  //     ].join('\n'),
  //   })
  //
  // Option B — Formspree (zero-backend, no server required):
  //   Replace the fetch('/api/contact') call in page.tsx with a direct POST
  //   to 'https://formspree.io/f/<YOUR_FORM_ID>' and remove this route entirely.
  //
  // Option C — Nodemailer + SMTP (self-hosted):
  //   npm install nodemailer @types/nodemailer
  //   Set env vars: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
  // ───────────────────────────────────────────────────────────────────────────

  // Log while provider is not wired
  console.log('[contact] new audit request', { name, email, company: company ?? '—', preview: message.slice(0, 80) })

  return NextResponse.json({ success: true })
}

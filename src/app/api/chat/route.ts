import { NextRequest, NextResponse } from 'next/server'

const MAX_MESSAGE_LENGTH = 500

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL

  if (!webhookUrl) {
    return NextResponse.json(
      { error: 'Chat is not configured.' },
      { status: 503 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (
    !body ||
    typeof body !== 'object' ||
    !('message' in body) ||
    typeof (body as Record<string, unknown>).message !== 'string'
  ) {
    return NextResponse.json({ error: 'Missing message field.' }, { status: 400 })
  }

  const message = ((body as Record<string, string>).message).trim()

  if (message.length === 0) {
    return NextResponse.json({ error: 'Message cannot be empty.' }, { status: 400 })
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: 'Message too long.' }, { status: 400 })
  }

  try {
    const authKey = process.env.N8N_AUTH_KEY
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (authKey) {
      headers['Authorization'] = `Bearer ${authKey}`
    }

    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ message }),
    })

    if (!upstream.ok) {
      return NextResponse.json(
        { error: 'Assistant is unavailable right now.' },
        { status: 502 }
      )
    }

    const data = await upstream.json()
    return NextResponse.json(data)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('[chat] fetch error:', msg)
    return NextResponse.json(
      { error: 'Failed to reach assistant.', detail: msg },
      { status: 502 }
    )
  }
}

// Block all other HTTP methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}

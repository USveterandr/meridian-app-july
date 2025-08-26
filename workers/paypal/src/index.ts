// Minimal R2Bucket type to avoid external type dependency at build time
type R2Bucket = {
  put: (key: string, value: string | ArrayBuffer | ReadableStream | Uint8Array, options?: any) => Promise<any>
}

export interface Env {
  PAYPAL_ENV: 'sandbox' | 'live'
  PAYPAL_CLIENT_ID: string
  PAYPAL_CLIENT_SECRET: string
  PAYPAL_WEBHOOK_ID: string
  PAYPAL_LOGS: R2Bucket
}

const PP_BASE = {
  sandbox: 'https://api-m.sandbox.paypal.com',
  live: 'https://api-m.paypal.com',
} as const

async function getAccessToken(env: Env): Promise<string> {
  const url = `${PP_BASE[env.PAYPAL_ENV]}/v1/oauth2/token`
  const credentials = btoa(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_CLIENT_SECRET}`)
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  if (!resp.ok) {
    const text = await resp.text()
    throw new Response(`PayPal auth failed: ${text}`, { status: resp.status })
  }
  const data = (await resp.json()) as { access_token: string }
  return data.access_token
}

async function createOrder(env: Env, req: Request): Promise<Response> {
  const token = await getAccessToken(env)
  const body = await (req.json().catch(() => ({})))
  const purchase_units = body?.purchase_units ?? [
    {
      amount: { currency_code: 'USD', value: '10.00' },
    },
  ]
  const resp = await fetch(`${PP_BASE[env.PAYPAL_ENV]}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ intent: 'CAPTURE', purchase_units }),
  })
  const text = await resp.text()
  if (!resp.ok) return new Response(text, { status: resp.status })
  return new Response(text, { status: 200, headers: { 'Content-Type': 'application/json' } })
}

async function captureOrder(env: Env, orderId: string): Promise<Response> {
  const token = await getAccessToken(env)
  const resp = await fetch(`${PP_BASE[env.PAYPAL_ENV]}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  const text = await resp.text()
  if (!resp.ok) return new Response(text, { status: resp.status })
  return new Response(text, { status: 200, headers: { 'Content-Type': 'application/json' } })
}

async function verifyWebhook(env: Env, req: Request): Promise<Response> {
  const bodyText = await req.text()
  const event = JSON.parse(bodyText)
  const token = await getAccessToken(env)
  const verification = await fetch(`${PP_BASE[env.PAYPAL_ENV]}/v1/notifications/verify-webhook-signature`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      transmission_id: req.headers.get('paypal-transmission-id'),
      transmission_time: req.headers.get('paypal-transmission-time'),
      cert_url: req.headers.get('paypal-cert-url'),
      auth_algo: req.headers.get('paypal-auth-algo'),
      transmission_sig: req.headers.get('paypal-transmission-sig'),
      webhook_id: env.PAYPAL_WEBHOOK_ID,
      webhook_event: event,
    }),
  })
  const verifyBody = await (verification.json().catch(async () => ({ raw: await verification.text() })))
  // Always store an audit log of the event and verification status
  const key = `paypal/${new Date().toISOString()}_${crypto.randomUUID()}.json`
  await env.PAYPAL_LOGS.put(key, JSON.stringify({ verification: verifyBody, event }), {
    httpMetadata: { contentType: 'application/json' },
  })
  if (!verification.ok) return new Response(JSON.stringify(verifyBody), { status: verification.status, headers: { 'Content-Type': 'application/json' } })
  return new Response(JSON.stringify(verifyBody), { status: 200, headers: { 'Content-Type': 'application/json' } })
}

function notFound(): Response {
  return new Response(JSON.stringify({ error: 'Not found' }), {
    status: 404,
    headers: { 'Content-Type': 'application/json' },
  })
}

function withCors(resp: Response): Response {
  const headers = new Headers(resp.headers)
  headers.set('Access-Control-Allow-Origin', '*')
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  headers.set('Access-Control-Allow-Headers', 'Content-Type')
  return new Response(resp.body, { status: resp.status, headers })
}

function preflight(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  })
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url)
    try {
      if (req.method === 'OPTIONS') return preflight()
      if (req.method === 'POST' && url.pathname === '/paypal/create-order') {
        return withCors(await createOrder(env, req))
      }
      if (req.method === 'POST' && url.pathname === '/paypal/capture-order') {
        const { orderId } = await (req.json().catch(() => ({ })))
        if (!orderId) return withCors(new Response(JSON.stringify({ error: 'orderId required' }), { status: 400 }))
        return withCors(await captureOrder(env, orderId))
      }
      if (req.method === 'POST' && url.pathname === '/paypal/webhook') {
        return withCors(await verifyWebhook(env, req))
      }
      return withCors(notFound())
    } catch (err: any) {
      const message = typeof err === 'string' ? err : err?.message || 'Unknown error'
      return withCors(new Response(JSON.stringify({ error: message }), { status: 500, headers: { 'Content-Type': 'application/json' } }))
    }
  },
}

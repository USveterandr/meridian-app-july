// Simple helper to call the PayPal Worker endpoints from Next.js server components/routes.
export async function paypalWorkerFetch(path: string, init?: RequestInit) {
  const base = process.env.NEXT_PUBLIC_PAYPAL_WORKER_URL
  if (!base) throw new Error('NEXT_PUBLIC_PAYPAL_WORKER_URL is not set')
  const url = `${base.replace(/\/$/, '')}${path.startsWith('/') ? '' : '/'}${path}`
  const res = await fetch(url, {
    ...init,
    // prevent Next from caching worker responses
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `PayPal worker error: ${res.status}`)
  }
  return res.json()
}

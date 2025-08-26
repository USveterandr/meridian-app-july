import { paypalWorkerFetch } from '@/lib/paypal'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const res = await paypalWorkerFetch('/paypal/create-order', {
    method: 'POST',
    body: JSON.stringify(body),
  })
  return Response.json(res)
}

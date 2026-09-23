import type {APIRoute} from 'astro'
import {getProvider, normalizeEmail, normalizePhone, SubscribeError} from '../../lib/newsletter'

export const prerender = false

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {status, headers: {'Content-Type': 'application/json'}})

export const POST: APIRoute = async ({request, redirect}) => {
  const wantsJson = request.headers.get('accept')?.includes('application/json')
  const form = await request.formData()

  // Honeypot: bots fill every field. Pretend success.
  if (form.get('company')) return wantsJson ? json(200, {ok: true}) : redirect('/?subscribed=1', 303)

  try {
    const email = normalizeEmail(String(form.get('email') ?? ''))
    const phone = normalizePhone(String(form.get('phone') ?? ''))
    if (!email && !phone) throw new SubscribeError('Add an email or a phone number')
    if (form.get('consent') !== 'on') throw new SubscribeError('Please accept the terms to sign up')

    await getProvider().subscribe({email, phone, source: String(form.get('source') ?? 'website')})
    return wantsJson ? json(200, {ok: true}) : redirect('/?subscribed=1', 303)
  } catch (err) {
    if (err instanceof SubscribeError) {
      return wantsJson ? json(400, {ok: false, error: err.message}) : redirect('/?subscribed=0', 303)
    }
    console.error('[subscribe]', err)
    return wantsJson
      ? json(502, {ok: false, error: 'Something went wrong, please try again'})
      : redirect('/?subscribed=0', 303)
  }
}

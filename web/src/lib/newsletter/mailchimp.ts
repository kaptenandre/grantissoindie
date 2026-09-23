import {createHash} from 'node:crypto'
import {SubscribeError, type NewsletterProvider, type Subscriber} from './types'

type Options = {
  apiKey: string
  audienceId: string
  /** "pending" sends a confirmation email first (double opt-in) */
  doubleOptIn: boolean
  tags: string[]
}

/**
 * Mailchimp Marketing API. Contacts are keyed by email, so email is required.
 * SMS consent is stored on the same contact; the audience must have SMS marketing set up
 * (Sweden needs a Branded Sender ID). If the audience rejects SMS fields we still save the email.
 */
export function mailchimp({apiKey, audienceId, doubleOptIn, tags}: Options): NewsletterProvider {
  const dc = apiKey.split('-').pop()
  const base = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`
  const auth = `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`

  async function upsert(email: string, body: Record<string, unknown>) {
    const hash = createHash('md5').update(email).digest('hex')
    return fetch(`${base}/${hash}`, {
      method: 'PUT',
      headers: {Authorization: auth, 'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    })
  }

  return {
    name: 'mailchimp',
    async subscribe({email, phone, source}: Subscriber) {
      if (!email) throw new SubscribeError('Add your email address')

      const status = doubleOptIn ? 'pending' : 'subscribed'
      const body: Record<string, unknown> = {email_address: email, status_if_new: status, status}
      const sms = phone ? {sms_phone_number: phone, sms_subscription_status: 'subscribed'} : {}

      let res = await upsert(email, {...body, ...sms})
      if (!res.ok && phone && res.status === 400) {
        console.error('[mailchimp] SMS fields rejected, saving email only:', await res.text())
        res = await upsert(email, body)
      }
      if (!res.ok) {
        const text = await res.text()
        // Mailchimp flags fake/role addresses and people who were permanently deleted
        if (res.status === 400 && /looks fake|invalid|permanently deleted|compliance/i.test(text)) {
          throw new SubscribeError('That email address could not be added')
        }
        throw new Error(`Mailchimp ${res.status}: ${text}`)
      }

      const tagList = [...tags, source].filter(Boolean)
      if (tagList.length) {
        const hash = createHash('md5').update(email).digest('hex')
        await fetch(`${base}/${hash}/tags`, {
          method: 'POST',
          headers: {Authorization: auth, 'Content-Type': 'application/json'},
          body: JSON.stringify({tags: tagList.map((name) => ({name, status: 'active'}))}),
        }).catch((err) => console.error('[mailchimp] tagging failed', err))
      }
    },
  }
}

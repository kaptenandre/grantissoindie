import type {NewsletterProvider, Subscriber} from './types'

/** POSTs the subscriber as JSON. Useful for Zapier/Make into Laylo, Mailchimp, a sheet, etc. */
export function webhook(url: string): NewsletterProvider {
  return {
    name: 'webhook',
    async subscribe(subscriber: Subscriber) {
      const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...subscriber, subscribedAt: new Date().toISOString()}),
      })
      if (!res.ok) throw new Error(`Webhook ${res.status}: ${await res.text()}`)
    },
  }
}

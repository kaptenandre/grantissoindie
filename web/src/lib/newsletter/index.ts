import {
  NEWSLETTER_PROVIDER,
  MAILCHIMP_API_KEY,
  MAILCHIMP_AUDIENCE_ID,
  MAILCHIMP_DOUBLE_OPT_IN,
  MAILCHIMP_TAGS,
  KLAVIYO_PRIVATE_KEY,
  KLAVIYO_LIST_ID,
  NEWSLETTER_WEBHOOK_URL,
  DEFAULT_PHONE_COUNTRY_CODE,
} from 'astro:env/server'
import {mailchimp} from './mailchimp'
import {klaviyo} from './klaviyo'
import {webhook} from './webhook'
import {SubscribeError, type NewsletterProvider} from './types'

export {SubscribeError}

export function getProvider(): NewsletterProvider {
  switch (NEWSLETTER_PROVIDER) {
    case 'mailchimp':
      if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID) throw new Error('Mailchimp env vars missing')
      return mailchimp({
        apiKey: MAILCHIMP_API_KEY,
        audienceId: MAILCHIMP_AUDIENCE_ID,
        doubleOptIn: MAILCHIMP_DOUBLE_OPT_IN,
        tags: MAILCHIMP_TAGS.split(',').map((t) => t.trim()).filter(Boolean),
      })
    case 'klaviyo':
      if (!KLAVIYO_PRIVATE_KEY || !KLAVIYO_LIST_ID) throw new Error('Klaviyo env vars missing')
      return klaviyo(KLAVIYO_PRIVATE_KEY, KLAVIYO_LIST_ID)
    case 'webhook':
      if (!NEWSLETTER_WEBHOOK_URL) throw new Error('NEWSLETTER_WEBHOOK_URL missing')
      return webhook(NEWSLETTER_WEBHOOK_URL)
    default:
      return {
        name: 'log',
        async subscribe(s) {
          console.info('[newsletter:log]', s)
        },
      }
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeEmail(input: string): string | undefined {
  const email = input.trim().toLowerCase()
  if (!email) return undefined
  if (email.length > 254 || !EMAIL_RE.test(email)) throw new SubscribeError('Check your email address')
  return email
}

/** Loose E.164 normalisation: "070-123 45 67" -> "+46701234567", "0046..." -> "+46..." */
export function normalizePhone(input: string, defaultCountry = DEFAULT_PHONE_COUNTRY_CODE): string | undefined {
  let p = input.replace(/[\s\-().]/g, '')
  if (!p) return undefined
  if (p.startsWith('00')) p = `+${p.slice(2)}`
  else if (p.startsWith('0')) p = `+${defaultCountry}${p.slice(1)}`
  else if (!p.startsWith('+')) p = `+${defaultCountry}${p}`
  if (!/^\+[1-9]\d{6,14}$/.test(p)) throw new SubscribeError('Check your phone number')
  return p
}

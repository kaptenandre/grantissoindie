import type {NewsletterProvider, Subscriber} from './types'

const API = 'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs'
const REVISION = '2024-10-15'

/**
 * Klaviyo handles email + SMS in one list with explicit marketing consent per channel.
 * SMS must be enabled on the Klaviyo account (sender number / alphanumeric ID for SE).
 */
export function klaviyo(privateKey: string, listId: string): NewsletterProvider {
  return {
    name: 'klaviyo',
    async subscribe({email, phone, source}: Subscriber) {
      const subscriptions: Record<string, unknown> = {}
      if (email) subscriptions.email = {marketing: {consent: 'SUBSCRIBED'}}
      if (phone) subscriptions.sms = {marketing: {consent: 'SUBSCRIBED'}}

      const res = await fetch(API, {
        method: 'POST',
        headers: {
          Authorization: `Klaviyo-API-Key ${privateKey}`,
          revision: REVISION,
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/vnd.api+json',
        },
        body: JSON.stringify({
          data: {
            type: 'profile-subscription-bulk-create-job',
            attributes: {
              custom_source: source,
              profiles: {
                data: [
                  {
                    type: 'profile',
                    attributes: {
                      ...(email && {email}),
                      ...(phone && {phone_number: phone}),
                      subscriptions,
                    },
                  },
                ],
              },
            },
            relationships: {list: {data: {type: 'list', id: listId}}},
          },
        }),
      })
      if (!res.ok) {
        throw new Error(`Klaviyo ${res.status}: ${await res.text()}`)
      }
    },
  }
}

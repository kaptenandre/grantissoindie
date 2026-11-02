export type Subscriber = {
  email?: string
  /** E.164, e.g. +46701234567 */
  phone?: string
  /** English country name, e.g. "Sweden" */
  country?: string
  source: string
}

export interface NewsletterProvider {
  name: string
  subscribe(subscriber: Subscriber): Promise<void>
}

/** Thrown for problems the visitor can fix (shown in the form). */
export class SubscribeError extends Error {}

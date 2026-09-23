// @ts-check
import {defineConfig, envField} from 'astro/config'
import netlify from '@astrojs/netlify'

export default defineConfig({
  site: process.env.SITE_URL || 'https://example.com',
  // Pages are prerendered; API routes and server islands opt out with `prerender = false` / `server:defer`
  adapter: netlify(),
  env: {
    schema: {
      SANITY_PROJECT_ID: envField.string({context: 'server', access: 'public', optional: true}),
      SANITY_DATASET: envField.string({context: 'server', access: 'public', default: 'production'}),
      SANITY_API_VERSION: envField.string({context: 'server', access: 'public', default: '2026-09-01'}),
      SANITY_READ_TOKEN: envField.string({context: 'server', access: 'secret', optional: true}),

      NEWSLETTER_PROVIDER: envField.enum({
        context: 'server',
        access: 'secret',
        values: ['mailchimp', 'klaviyo', 'webhook', 'log'],
        default: 'log',
      }),
      MAILCHIMP_API_KEY: envField.string({context: 'server', access: 'secret', optional: true}),
      MAILCHIMP_AUDIENCE_ID: envField.string({context: 'server', access: 'secret', optional: true}),
      MAILCHIMP_DOUBLE_OPT_IN: envField.boolean({context: 'server', access: 'secret', default: false}),
      MAILCHIMP_TAGS: envField.string({context: 'server', access: 'secret', default: 'website'}),
      KLAVIYO_PRIVATE_KEY: envField.string({context: 'server', access: 'secret', optional: true}),
      KLAVIYO_LIST_ID: envField.string({context: 'server', access: 'secret', optional: true}),
      NEWSLETTER_WEBHOOK_URL: envField.string({context: 'server', access: 'secret', optional: true}),
      DEFAULT_PHONE_COUNTRY_CODE: envField.string({context: 'server', access: 'secret', default: '46'}),

      BANDSINTOWN_APP_ID: envField.string({context: 'server', access: 'secret', optional: true}),
    },
  },
})

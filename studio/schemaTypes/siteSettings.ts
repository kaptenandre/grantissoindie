import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    {name: 'general', title: 'General', default: true},
    {name: 'hero', title: 'Hero'},
    {name: 'links', title: 'Links & socials'},
    {name: 'newsletter', title: 'Newsletter'},
    {name: 'shows', title: 'Shows'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'artistName', type: 'string', group: 'general', validation: (r) => r.required()}),
    defineField({name: 'tagline', type: 'string', group: 'general'}),
    defineField({
      name: 'featuredRelease',
      type: 'reference',
      to: [{type: 'release'}],
      group: 'general',
      description: 'Shown on the front page. Falls back to the latest release.',
    }),
    defineField({name: 'backgroundVideo', type: 'backgroundVideo', group: 'hero'}),
    defineField({
      name: 'navLinks',
      title: 'Top links',
      type: 'array',
      of: [{type: 'link'}],
      group: 'links',
      description: 'Links at the top of the page: Stream, Pre-save, Merch, Tour...',
    }),
    defineField({name: 'socials', type: 'array', of: [{type: 'socialLink'}], group: 'links'}),
    defineField({
      name: 'newsletter',
      type: 'object',
      group: 'newsletter',
      fields: [
        defineField({name: 'enabled', type: 'boolean', initialValue: true}),
        defineField({name: 'heading', type: 'string', initialValue: 'Get updates'}),
        defineField({name: 'body', type: 'text', rows: 2}),
        defineField({name: 'collectPhone', title: 'Ask for phone number (SMS)', type: 'boolean', initialValue: true}),
        defineField({
          name: 'consentText',
          type: 'text',
          rows: 3,
          initialValue:
            'By signing up you agree to receive email and/or SMS updates. Unsubscribe at any time. Message & data rates may apply.',
        }),
        defineField({name: 'successMessage', type: 'string', initialValue: 'Thanks! You are on the list.'}),
        defineField({name: 'privacyUrl', type: 'url'}),
      ],
    }),
    defineField({
      name: 'shows',
      type: 'object',
      group: 'shows',
      fields: [
        defineField({name: 'enabled', type: 'boolean', initialValue: false}),
        defineField({
          name: 'bandsintownArtist',
          type: 'string',
          description: 'Artist name or Bandsintown ID ("id_123456"), exactly as on Bandsintown',
        }),
        defineField({name: 'emptyText', type: 'string', initialValue: 'No upcoming shows'}),
      ],
    }),
    defineField({
      name: 'seo',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({name: 'title', type: 'string'}),
        defineField({name: 'description', type: 'text', rows: 2}),
        defineField({name: 'ogImage', type: 'image'}),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})

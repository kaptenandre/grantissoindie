import {defineField, defineType} from 'sanity'

export const SOCIAL_PLATFORMS = [
  {title: 'Instagram', value: 'instagram'},
  {title: 'TikTok', value: 'tiktok'},
  {title: 'Spotify', value: 'spotify'},
  {title: 'Apple Music', value: 'appleMusic'},
  {title: 'YouTube', value: 'youtube'},
  {title: 'SoundCloud', value: 'soundcloud'},
  {title: 'Bandcamp', value: 'bandcamp'},
  {title: 'Tidal', value: 'tidal'},
  {title: 'Deezer', value: 'deezer'},
  {title: 'Facebook', value: 'facebook'},
  {title: 'X', value: 'x'},
  {title: 'Threads', value: 'threads'},
  {title: 'Bandsintown', value: 'bandsintown'},
  {title: 'Email', value: 'email'},
  {title: 'Other', value: 'other'},
]

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      type: 'string',
      options: {list: SOCIAL_PLATFORMS},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'url',
      type: 'url',
      validation: (r) => r.required().uri({scheme: ['http', 'https', 'mailto']}),
    }),
  ],
  preview: {select: {title: 'platform', subtitle: 'url'}},
})

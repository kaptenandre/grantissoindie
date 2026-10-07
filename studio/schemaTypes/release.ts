import {defineArrayMember, defineField, defineType} from 'sanity'

export const release = defineType({
  name: 'release',
  title: 'Release',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'titleUppercase',
      title: 'Title in capitals',
      type: 'boolean',
      initialValue: false,
      description: 'Show the big title in capitals on the site. Preview without saving: add ?caps to the site URL.',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'type',
      type: 'string',
      options: {list: ['single', 'ep', 'album'], layout: 'radio', direction: 'horizontal'},
      initialValue: 'single',
    }),
    defineField({name: 'releaseDate', type: 'date', validation: (r) => r.required()}),
    defineField({
      name: 'releaseAt',
      title: 'Release time (optional)',
      type: 'datetime',
      description:
        'Exact time it goes live. The site shows "Pre-save" until then and switches to "Listen" by itself. Empty = midnight after the release date.',
    }),
    defineField({name: 'label', type: 'string', initialValue: 'Skolhaus'}),
    defineField({name: 'artwork', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'smartLink',
      title: 'Smart link / pre-save',
      type: 'url',
      description: 'Feature.fm, Linkfire, Toneden, DistroKid Hyperfollow...',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video',
      type: 'url',
      description: 'Music video (YouTube). Shown as a "Watch video" button next to Listen.',
    }),
    defineField({
      name: 'streamingLinks',
      type: 'array',
      of: [{type: 'socialLink'}],
      description: 'Direct links per service',
    }),
    defineField({
      name: 'tracks',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'song'}]})],
    }),
  ],
  orderings: [
    {title: 'Release date, newest', name: 'releaseDateDesc', by: [{field: 'releaseDate', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', type: 'type', date: 'releaseDate', media: 'artwork'},
    prepare: ({title, type, date, media}) => ({
      title,
      subtitle: [type?.toUpperCase(), date].filter(Boolean).join(' · '),
      media,
    }),
  },
})

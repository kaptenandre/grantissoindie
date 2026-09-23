import {defineArrayMember, defineField, defineType} from 'sanity'

export const song = defineType({
  name: 'song',
  title: 'Song',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'lyrics',
      type: 'array',
      description: 'One block per verse/chorus. Shift+Enter for line breaks inside a block.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Section label', value: 'h3'},
          ],
          lists: [],
          marks: {decorators: [{title: 'Italic', value: 'em'}], annotations: []},
        }),
      ],
    }),
    defineField({name: 'showLyrics', type: 'boolean', initialValue: true, description: 'Hide until release day'}),
    defineField({name: 'credits', type: 'text', rows: 4}),
    defineField({name: 'isrc', title: 'ISRC', type: 'string'}),
  ],
  preview: {select: {title: 'title', subtitle: 'slug.current'}},
})

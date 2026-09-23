import {defineField, defineType} from 'sanity'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({name: 'label', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'url',
      type: 'url',
      validation: (r) => r.required().uri({allowRelative: true, scheme: ['http', 'https', 'mailto']}),
    }),
    defineField({
      name: 'highlight',
      type: 'boolean',
      description: 'Visually emphasise this link (e.g. "Pre-save")',
      initialValue: false,
    }),
  ],
  preview: {select: {title: 'label', subtitle: 'url'}},
})

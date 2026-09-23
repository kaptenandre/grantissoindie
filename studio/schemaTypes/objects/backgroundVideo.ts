import {defineField, defineType} from 'sanity'

export const backgroundVideo = defineType({
  name: 'backgroundVideo',
  title: 'Background video',
  type: 'object',
  description:
    'Short, muted loop. Aim for 10-20 s, 1080p, H.264 MP4 under ~8 MB. Add a WebM for smaller files and a mobile cut if needed.',
  fields: [
    defineField({
      name: 'mp4',
      title: 'MP4 (H.264)',
      type: 'file',
      options: {accept: 'video/mp4'},
    }),
    defineField({
      name: 'webm',
      title: 'WebM (VP9/AV1, optional)',
      type: 'file',
      options: {accept: 'video/webm'},
    }),
    defineField({
      name: 'mobileMp4',
      title: 'Mobile MP4 (portrait, optional)',
      type: 'file',
      options: {accept: 'video/mp4'},
    }),
    defineField({
      name: 'externalUrl',
      title: 'External MP4 URL',
      type: 'url',
      description: 'Use instead of uploads if the file is hosted elsewhere (Mux static rendition, Cloudinary, Bunny...)',
    }),
    defineField({
      name: 'poster',
      type: 'image',
      description: 'Shown while loading, on reduced motion and on data saver',
      options: {hotspot: true},
    }),
  ],
})

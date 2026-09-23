import {sanityFetch} from './sanity'
import {settingsQuery} from './queries'
import type {SiteSettings} from './types'

/** Used until the matching content exists in Sanity. */
const defaults: SiteSettings = {
  artistName: 'GRANT',
  backgroundVideo: {
    mp4: '/video/bg-1080.mp4',
    webm: '/video/bg-1080.webm',
    mobileMp4: '/video/bg-mobile.mp4',
    posterUrl: '/video/bg-poster.jpg',
  },
  navLinks: [],
  socials: [
    {platform: 'instagram', url: 'https://www.instagram.com/grantissondie/'},
    {platform: 'tiktok', url: 'https://www.tiktok.com/@grantissoindie'},
    {platform: 'facebook', url: 'https://www.facebook.com/grantissoindie'},
  ],
  newsletter: {enabled: true, heading: 'Get updates', collectPhone: true},
}

let cached: Promise<SiteSettings> | undefined

/** Settings are read by several components per build; fetch once. */
export function getSettings() {
  cached ??= sanityFetch<SiteSettings | null>(settingsQuery, {}, null).then((s) => ({
    ...defaults,
    ...s,
    artistName: s?.artistName || defaults.artistName,
    backgroundVideo: s?.backgroundVideo?.mp4 || s?.backgroundVideo?.webm ? s.backgroundVideo : defaults.backgroundVideo,
    socials: s?.socials?.length ? s.socials : defaults.socials,
    newsletter: s?.newsletter ?? defaults.newsletter,
  }))
  return cached
}

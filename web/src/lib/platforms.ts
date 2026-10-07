/** Display names for `socialLink.platform` values (keep in sync with studio/schemaTypes/objects/socialLink.ts). */
export const PLATFORM_LABELS: Record<string, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  spotify: 'Spotify',
  appleMusic: 'Apple Music',
  youtube: 'YouTube',
  youtubeMusic: 'YouTube Music',
  amazonMusic: 'Amazon Music',
  soundcloud: 'SoundCloud',
  bandcamp: 'Bandcamp',
  tidal: 'Tidal',
  deezer: 'Deezer',
  facebook: 'Facebook',
  x: 'X',
  threads: 'Threads',
  bandsintown: 'Bandsintown',
  email: 'Email',
}

export const platformLabel = (platform: string) => PLATFORM_LABELS[platform] ?? platform

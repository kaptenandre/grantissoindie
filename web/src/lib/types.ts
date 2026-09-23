import type {PortableTextBlock} from '@portabletext/types'

export type SanityImage = {
  asset?: {_ref?: string; _id?: string}
  hotspot?: {x: number; y: number}
  crop?: {top: number; bottom: number; left: number; right: number}
  alt?: string
}

export type Link = {label: string; url: string; highlight?: boolean}
export type SocialLink = {platform: string; url: string}

export type SongSummary = {title: string; slug: string; hasLyrics: boolean}

export type Release = {
  title: string
  slug: string
  type?: 'single' | 'ep' | 'album'
  releaseDate: string
  label?: string
  artwork?: SanityImage
  smartLink?: string
  streamingLinks?: SocialLink[]
  tracks?: SongSummary[]
}

export type Song = {
  title: string
  slug: string
  lyrics?: PortableTextBlock[]
  credits?: string
  release?: {title: string; slug: string; label?: string; releaseDate: string}
}

export type SiteSettings = {
  artistName: string
  tagline?: string
  lyricsEnabled?: boolean
  backgroundVideo?: {
    mp4?: string
    webm?: string
    mobileMp4?: string
    poster?: SanityImage
    posterUrl?: string
  }
  navLinks?: Link[]
  socials?: SocialLink[]
  newsletter?: {
    enabled?: boolean
    heading?: string
    body?: string
    collectPhone?: boolean
    consentText?: string
    successMessage?: string
    privacyUrl?: string
  }
  shows?: {enabled?: boolean; bandsintownArtist?: string; emptyText?: string}
  seo?: {title?: string; description?: string; ogImage?: SanityImage}
  featuredRelease?: Release
}

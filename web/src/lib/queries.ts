const releaseFields = /* groq */ `
  title,
  "slug": slug.current,
  type,
  releaseDate,
  label,
  artwork,
  smartLink,
  streamingLinks,
  "tracks": tracks[]->{
    title,
    "slug": slug.current,
    "hasLyrics": showLyrics != false && count(lyrics) > 0
  }
`

export const settingsQuery = /* groq */ `
*[_id == "siteSettings"][0]{
  artistName,
  tagline,
  "backgroundVideo": backgroundVideo{
    "mp4": coalesce(mp4.asset->url, externalUrl),
    "webm": webm.asset->url,
    "mobileMp4": mobileMp4.asset->url,
    poster
  },
  navLinks,
  socials,
  newsletter,
  shows,
  seo,
  "featuredRelease": coalesce(
    featuredRelease->{${releaseFields}},
    *[_type == "release" && releaseDate <= now()] | order(releaseDate desc)[0]{${releaseFields}}
  )
}`

export const releasesQuery = /* groq */ `
*[_type == "release"] | order(releaseDate desc){${releaseFields}}`

export const lyricSlugsQuery = /* groq */ `
*[_type == "song" && defined(slug.current) && showLyrics != false && count(lyrics) > 0].slug.current`

export const songQuery = /* groq */ `
*[_type == "song" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  lyrics,
  credits,
  "release": *[_type == "release" && references(^._id)] | order(releaseDate asc)[0]{
    title, "slug": slug.current, label, releaseDate
  }
}`

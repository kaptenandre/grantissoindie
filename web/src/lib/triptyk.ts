/** TRIPTYK album announce. Hardcoded while we review on staging; moves to Sanity once approved. */
export const album = {
  title: 'TRIPTYK',
  releaseDate: '2027-02-05',
  label: 'Skolhaus',
  // TODO: real links when Linkfire/store are set up
  presaveUrl: '',
  preorderUrl: 'https://shop.skolhaus.com/products/grant-triptyk-lp',
  vinyl: {
    format: '12" vinyl LP',
    catalogue: 'SH030LP',
    edition: 'Limited first pressing, 500 copies',
    price: '349 SEK',
  },
  /** The current single, shown under the album buttons */
  single: {
    title: 'Baby / Baby Pt. 2',
    releaseDate: '2026-11-05',
    // Out 5 Nov. Direct links from skolhaus.lnk.to/baby
    releaseAt: '2026-11-02T00:00:00Z',
    smartLink: 'https://skolhaus.lnk.to/baby',
    streamingLinks: [
      {platform: 'spotify', url: 'https://open.spotify.com/album/3L6eKwIWVOxRaLOIuQTsxp'},
      {platform: 'appleMusic', url: 'https://music.apple.com/se/album/baby-baby-pt-2-single/6816772244'},
      {platform: 'tidal', url: 'https://tidal.com/album/564037881'},
      {platform: 'youtubeMusic', url: 'https://music.youtube.com/playlist?list=OLAK5uy_mwlZrYMQzWrgLWgj6AUwnG9kaFNb-ww5s'},
      {platform: 'deezer', url: 'https://www.deezer.com/album/1104344682'},
      {platform: 'amazonMusic', url: 'https://music.amazon.com/albums/B0HKWVJ6S2'},
    ] as {platform: string; url: string}[],
  },
  video: {
    mp4: '/triptyk/baby-169.mp4',
    webm: '/triptyk/baby-169.webm',
    posterUrl: '/triptyk/baby-169-poster.jpg',
    mobileMp4: '/triptyk/baby-916.mp4',
  },
  /** Titles as in the label copy (SH030). Numbered I–XIV in this order (Siren Call is I) */
  tracks: [
    'Siren Call',
    'Never Looking Back',
    'Song In My Ear',
    'Powerpoint Powermoves',
    'C’mon Caroline',
    'Annihilate',
    'Baby',
    'Breathing',
    'Declaration w/ Sara Parkman',
    'Non Zero',
    'Let It All Out',
    'Baby Pt. 2',
    'The Last One',
    'Waking The Witch',
  ],
  /** Music videos embedded on the page, newest first. aspect = the video's own ratio (Baby is wider than 16:9) */
  musicVideos: [
    {id: 'dd1zAPjtWSU', title: 'Baby (Official Video)', aspect: '1280 / 664'},
    {id: 'zv1ncAiVLuo', title: 'C’mon Caroline (Official Video)', aspect: '16 / 9'},
  ],
}

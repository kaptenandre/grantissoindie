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
    // Shown as out now from the announce; real DSP links replace the Linkfire ones on release
    releaseAt: '2026-11-02T00:00:00Z',
    smartLink: 'https://skolhaus.lnk.to/baby',
    streamingLinks: [
      {platform: 'spotify', url: 'https://skolhaus.lnk.to/baby'},
      {platform: 'appleMusic', url: 'https://skolhaus.lnk.to/baby'},
      {platform: 'tidal', url: 'https://skolhaus.lnk.to/baby'},
      {platform: 'youtubeMusic', url: 'https://skolhaus.lnk.to/baby'},
      {platform: 'deezer', url: 'https://skolhaus.lnk.to/baby'},
      {platform: 'amazonMusic', url: 'https://skolhaus.lnk.to/baby'},
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
  /** Music videos embedded on the page, newest first */
  musicVideos: [
    {id: 'dd1zAPjtWSU', title: 'Baby (Official Video)'},
    {id: 'zv1ncAiVLuo', title: 'C’mon Caroline (Official Video)'},
  ],
}

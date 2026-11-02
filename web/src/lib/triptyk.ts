/** TRIPTYK album announce. Hardcoded while we review on staging; moves to Sanity once approved. */
export const album = {
  title: 'TRIPTYK',
  releaseDate: '2027-02-05',
  label: 'Skolhaus',
  // TODO: real links when Linkfire/store are set up
  presaveUrl: '',
  preorderUrl: '',
  vinyl: {
    format: '12" vinyl LP',
    catalogue: 'SH030LP',
    edition: 'Limited first pressing, 500 copies',
    price: '349 SEK',
  },
  /** The current single, shown under the album buttons */
  single: {
    title: 'Baby / Baby Pt.2',
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
  tracks: [
    'Never looking back',
    'Song in my ear',
    'Powerpoint powermoves',
    'C’mon Caroline',
    'Annihilate',
    'Baby',
    'Breathing',
    'Declaration',
    'Non-Zero',
    'Let it all out',
    'Baby pt. 2',
    'The last one',
    'Waking the witch',
  ],
  credits: [
    {group: 'Creative', lines: ['Creative Direction: Angelina Mamoun-Bergenwall', 'Creative Direction: Caroline Cederlöf']},
    {
      group: 'Label',
      lines: [
        'A&R: Pontus Winnberg & Oskar Ekman',
        'Executive Creative Director: André Jofré',
        'Creative & Strategy: Jamie Hudson',
        'Art Direction: Victor Svedberg & Jamie Hudson',
        'Creative & Designer: Johanna Nebelius',
        'Creative: Martin Staaf',
        'Project Manager: Nelly Hinas',
        'Project Manager: Michelle Olsson',
      ],
    },
    {
      group: 'Video',
      lines: [
        'Director: Angelina Mamoun-Bergenwall',
        'DOP: Zoë Que',
        'Gaffer: Carl Erskine',
        '1st AC: Stickan Olsson',
        'Best Boy: Luciano Quinteros',
        'Intern: Leo Heickell',
      ],
    },
    {
      group: 'Photo',
      lines: ['Photographer: Angelina Mamoun-Bergenwall', 'Photo Assistant/DIT: Per Nilsson', 'Photo Assistant: Ilie Savencov'],
    },
    {
      group: 'Production',
      lines: ['Production Company: Lundlund', 'Production Company: Skolhaus', 'Line Producer: Dante McGhee'],
    },
    {
      group: 'Post Production',
      lines: ['Editor: Craig Griffiths', 'Grade: Alex O’Brien', 'Post Producer: Tia Duff', 'Post Producer: Clelland Allen'],
    },
    {
      group: 'VP Nordic',
      lines: ['VP Nordic: Johannes Skoog', 'VP Sup: Rasmus Eriksson', 'VP Montage: Arvid Myhlback', 'VP Montage: Nellie Hanberger'],
    },
    {group: 'Set Design', lines: ['Set Designer: Fatima Fransson', 'Set Design Assistant: Sandra Engardt']},
    {group: 'Beauty', lines: ['Stylist: Marie Higuchi', 'Make-Up: Jarmide']},
    {group: 'Catering', lines: ['Janne Cederlöf']},
    {
      group: 'Special Thanks',
      lines: ['Kayt Hall', 'Lisa Schultz', 'Jan Lundgren', 'All staff at Ljud och Bildmedia', 'Janne Cederlöf'],
    },
  ],
}

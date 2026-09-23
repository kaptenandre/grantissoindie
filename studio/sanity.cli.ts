import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'grantissoindie',
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '0qb7s66h',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  deployment: {autoUpdates: true},
})

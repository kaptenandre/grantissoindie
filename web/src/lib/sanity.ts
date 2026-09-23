import {createClient, type QueryParams} from '@sanity/client'
import {createImageUrlBuilder} from '@sanity/image-url'
import {SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION, SANITY_READ_TOKEN} from 'astro:env/server'
import type {SanityImage} from './types'

export const sanityConfigured = Boolean(SANITY_PROJECT_ID)

const client = sanityConfigured
  ? createClient({
      projectId: SANITY_PROJECT_ID!,
      dataset: SANITY_DATASET,
      apiVersion: SANITY_API_VERSION,
      useCdn: false, // pages are built on publish, so always read fresh
      token: SANITY_READ_TOKEN,
      perspective: 'published',
    })
  : null

/** Runs a GROQ query, or returns `fallback` when Sanity isn't configured yet. */
export async function sanityFetch<T>(query: string, params: QueryParams = {}, fallback: T): Promise<T> {
  if (!client) return fallback
  return (await client.fetch<T>(query, params)) ?? fallback
}

const builder = sanityConfigured
  ? createImageUrlBuilder({projectId: SANITY_PROJECT_ID!, dataset: SANITY_DATASET})
  : null

export function imageUrl(source: SanityImage | undefined, width: number, height?: number) {
  if (!builder || !source?.asset) return undefined
  let b = builder.image(source).width(width).auto('format').fit('crop')
  if (height) b = b.height(height)
  return b.url()
}

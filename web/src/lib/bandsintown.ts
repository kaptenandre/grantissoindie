import {BANDSINTOWN_APP_ID} from 'astro:env/server'

export type Show = {
  id: string
  datetime: string
  url: string
  venue: {name: string; city: string; country: string; region?: string}
  lineup: string[]
  offers: {type: string; url: string; status: string}[]
  soldOut: boolean
}

type BitEvent = {
  id: string
  datetime: string
  url: string
  venue: {name: string; city: string; country: string; region?: string}
  lineup?: string[]
  offers?: {type: string; url: string; status: string}[]
  sold_out?: boolean
}

/**
 * Upcoming events from the Bandsintown public API.
 * Returns `null` when not configured or the request fails, so callers can hide the section.
 */
export async function getUpcomingShows(artist: string | undefined): Promise<Show[] | null> {
  if (!BANDSINTOWN_APP_ID || !artist) return null
  const url = `https://rest.bandsintown.com/artists/${encodeURIComponent(artist)}/events?app_id=${encodeURIComponent(BANDSINTOWN_APP_ID)}&date=upcoming`
  try {
    const res = await fetch(url, {headers: {Accept: 'application/json'}})
    if (!res.ok) {
      console.error(`[bandsintown] ${res.status} ${res.statusText}`)
      return null
    }
    const data: unknown = await res.json()
    // Unknown artists come back as an object with an error message instead of an array
    if (!Array.isArray(data)) return []
    return (data as BitEvent[]).map((e) => ({
      id: e.id,
      datetime: e.datetime,
      url: e.url,
      venue: e.venue,
      lineup: e.lineup ?? [],
      offers: e.offers ?? [],
      soldOut: Boolean(e.sold_out),
    }))
  } catch (err) {
    console.error('[bandsintown] fetch failed', err)
    return null
  }
}

import {siteSettings} from './siteSettings'
import {release} from './release'
import {song} from './song'
import {link} from './objects/link'
import {socialLink} from './objects/socialLink'
import {backgroundVideo} from './objects/backgroundVideo'

export const schemaTypes = [siteSettings, release, song, link, socialLink, backgroundVideo]

export const singletonTypes = new Set(['siteSettings'])

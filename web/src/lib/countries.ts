/** ISO 3166 countries with English names, sorted by name. Built from Intl so there is no list to maintain. */
const NOT_COUNTRIES = new Set(['AC', 'CP', 'DG', 'EA', 'EU', 'EZ', 'IC', 'QO', 'TA', 'UN', 'XA', 'XB', 'ZZ'])

export function countries(): {code: string; name: string}[] {
  const names = new Intl.DisplayNames(['en'], {type: 'region', fallback: 'none'})
  const out: {code: string; name: string}[] = []
  for (let a = 65; a <= 90; a++) {
    for (let b = 65; b <= 90; b++) {
      const code = String.fromCharCode(a, b)
      if (NOT_COUNTRIES.has(code)) continue
      // Skip retired codes (UK, YD, RH...) that just alias a current one and would show up twice
      if (Intl.getCanonicalLocales(`und-${code}`)[0] !== `und-${code}`) continue
      const name = names.of(code)
      if (name && name !== code) out.push({code, name})
    }
  }
  return out.sort((x, y) => x.name.localeCompare(y.name, 'en'))
}

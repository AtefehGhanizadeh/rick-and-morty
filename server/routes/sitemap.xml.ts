interface CharacterCountResponse {
  info: { count: number }
}

const ONE_DAY_IN_SECONDS = 60 * 60 * 24

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toUrlEntry(loc: string): string {
  return `  <url><loc>${escapeXml(loc)}</loc></url>`
}

export default defineCachedEventHandler(
  async (event) => {
    const { apiBase } = useRuntimeConfig(event).public
    const origin = getSiteOrigin(event)

    let characterCount: number
    try {
      const { info } = await $fetch<CharacterCountResponse>(`${apiBase}/character`)
      characterCount = info.count
    } catch {
      throw createError({ status: 503, statusText: 'Sitemap temporarily unavailable' })
    }

    const urls = [
      `${origin}/`,
      ...Array.from({ length: characterCount }, (_, i) => `${origin}/character/${i + 1}`),
    ]

    setHeader(event, 'content-type', 'application/xml; charset=utf-8')

    return [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urls.map(toUrlEntry),
      '</urlset>',
    ].join('\n')
  },
  {
    name: 'sitemap',
    maxAge: ONE_DAY_IN_SECONDS,
    varies: ['host', 'x-forwarded-host'],
  },
)

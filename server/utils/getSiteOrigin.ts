import type { H3Event } from 'h3'

export function getSiteOrigin(event: H3Event): string {
  const { siteUrl } = useRuntimeConfig(event).public
  return (siteUrl || getRequestURL(event).origin).replace(/\/+$/, '')
}

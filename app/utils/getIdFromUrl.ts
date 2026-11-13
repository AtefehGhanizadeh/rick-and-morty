export function getIdFromUrl(url: string): Nullable<number> {
  const id = Number(url.split('/').pop())
  return Number.isInteger(id) && id > 0 ? id : null
}

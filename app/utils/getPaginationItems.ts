export type PaginationItem = number | 'left-ellipsis' | 'right-ellipsis'

const VISIBLE_PAGES = 5

export function getPaginationItems(current: number, total: number): PaginationItem[] {
  if (total <= VISIBLE_PAGES) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  if (current <= VISIBLE_PAGES - 1) {
    return [...Array.from({ length: VISIBLE_PAGES }, (_, i) => i + 1), 'right-ellipsis']
  }

  if (current >= total - (VISIBLE_PAGES - 2)) {
    return [
      'left-ellipsis',
      ...Array.from({ length: VISIBLE_PAGES }, (_, i) => total - (VISIBLE_PAGES - 1) + i),
    ]
  }

  return ['left-ellipsis', current - 1, current, current + 1, 'right-ellipsis']
}
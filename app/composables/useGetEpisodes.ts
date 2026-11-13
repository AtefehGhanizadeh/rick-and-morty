interface EpisodesParams {
  ids: MaybeRefOrGetter<number[]>
}

export function useGetEpisodes({ ids }: EpisodesParams) {
  const { $api } = useNuxtApp()
  return useAsyncData(
    () => `episodes-${toValue(ids).join(',')}`,
    async () => {
      const episodeIds = toValue(ids)
      if (!episodeIds.length) return []
      const response = await $api.get<Episode | Episode[]>(`/episode/${episodeIds.join(',')}`)
      return Array.isArray(response.data) ? response.data : [response.data]
    },
    { lazy: true },
  )
}

interface EpisodesParams {
  ids: MaybeRefOrGetter<number[]>
  enabled?: MaybeRefOrGetter<boolean>
}

export function useGetEpisodes({ ids, enabled = true }: EpisodesParams) {
  const { $api } = useNuxtApp()
  const isEnabled = computed(() => toValue(enabled))

  const asyncData = useAsyncData(
    () => `episodes-${toValue(ids).join(',')}`,
    async () => {
      const response = await $api.get<Episode | Episode[]>(`/episode/${toValue(ids).join(',')}`)
      return Array.isArray(response.data) ? response.data : [response.data]
    },
    { lazy: true, immediate: isEnabled.value },
  )

  watch(isEnabled, (value) => {
    if (value && asyncData.status.value !== 'pending') asyncData.execute()
  })

  return {
    ...asyncData,
    status: computed(() => (isEnabled.value ? asyncData.status.value : 'idle')),
  }
}

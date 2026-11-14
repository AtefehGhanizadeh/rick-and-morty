interface LocationParams {
  id: MaybeRefOrGetter<Nullable<number>>
  enabled?: MaybeRefOrGetter<boolean>
}

export function useGetLocations({ id, enabled = true }: LocationParams) {
  const { $api } = useNuxtApp()
  const isEnabled = computed(() => toValue(enabled))

  const asyncData = useAsyncData(
    () => `location-${toValue(id)}`,
    async () => {
      const locationId = toValue(id)
      if (locationId == null) return null
      const response = await $api.get<LocationDetail>(`/location/${locationId}`)
      return response.data
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

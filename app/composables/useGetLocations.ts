interface LocationParams {
  id: MaybeRefOrGetter<Nullable<number>>
}

export function useGetLocations({ id }: LocationParams) {
  const { $api } = useNuxtApp()
  return useAsyncData(
    () => `location-${toValue(id)}`,
    async () => {
      const locationId = toValue(id)

      if (!locationId) return null

      const response = await $api.get<LocationDetail>(`/location/${locationId}`)

      return response.data
    },
    { lazy: true },
  )
}

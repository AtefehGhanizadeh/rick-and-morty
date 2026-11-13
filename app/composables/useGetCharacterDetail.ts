interface CharacterDetailParams {
  id: MaybeRefOrGetter<string | number>
}

export function useGetCharacterDetail({ id }: CharacterDetailParams) {
  const { $api } = useNuxtApp()
  return useAsyncData(
    () => `character-detail-${toValue(id)}`,
    async () => {
      const response = await $api.get<Character>(`/character/${toValue(id)}`)
      return response.data
    },
    { lazy: true },
  )
}

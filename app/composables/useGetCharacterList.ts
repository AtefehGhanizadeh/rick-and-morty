interface CharacterParams {
  page: MaybeRefOrGetter<number>
  name?: MaybeRefOrGetter<string>
}

export function useGetCharacterList({ name, page }: CharacterParams) {
  const { $api } = useNuxtApp()

  return useAsyncData(
    () => `characters-${toValue(page)}-${toValue(name)}`,
    async () => {
      try {
        const response = await $api.get<Paginated<Character>>('/character', {
          params: {
            page: toValue(page),
            ...(toValue(name) ? { name: toValue(name) } : {}),
          },
        })

        return response.data
      } catch (error) {
        if (isNuxtError(error) && error.status === 404 && toValue(name)) {
          const empty: Paginated<Character> = {
            info: { count: 0, pages: 0, next: null, prev: null },
            results: [],
          }
          return empty
        }

        throw error
      }
    },
    {
      lazy: true,
    },
  )
}

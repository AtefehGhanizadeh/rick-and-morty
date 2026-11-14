<script setup lang="ts">
import Container from '~/components/layout/Container.vue'
import CharacterList from '~/components/character/CharacterList.vue'
import Pagination from '~/components/ui/Pagination.vue'
import EmptyState from '~/components/ui/EmptyState.vue'
import ErrorState from '~/components/ui/ErrorState.vue'
import SearchInput from '~/components/header/SearchInput.vue'

const route = useRoute()

const name = computed(() => {
  const value = route.query.name
  return typeof value === 'string' ? value : ''
})

const page = computed(() => Number(route.query.page) || 1)

const { data, status, error, refresh } = useGetCharacterList({ name, page })
</script>
<template>
  <div>
    <Header class="h-44 md:h-48">
      <template #search>
        <SearchInput />
      </template>
      <template #shadow>
        <div class="absolute z-0 top-0 hidden md:block">
          <NuxtImg src="/images/shadow-home.svg" />
        </div>
      </template>
    </Header>
    <main>
      <Container class="py-8">
        <CharacterList
          v-if="data?.results.length"
          :character-list="data.results"
          :status="status"
        />
        <EmptyState v-else-if="status === 'success' && data?.results.length === 0" />
        <ErrorState v-else-if="error" :message="error.message" @retry="refresh" />
        <Pagination
          v-if="data?.results.length"
          :current-page="page"
          :total-pages="data.info.pages"
        />
      </Container>
    </main>
  </div>
</template>

<script setup lang="ts">
import CharacterHero from '~/components/character/CharacterHero.vue'
import CharacterHeroSkeleton from '~/components/character/CharacterHeroSkeleton.vue'
import CharacterInfo from '~/components/character/CharacterInfo.vue'
import CharacterSection from '~/components/character/CharacterSection.vue'
import EpisodeIcon from '~/components/icons/EpisodeIcon.vue'
import LocationIcon from '~/components/icons/LocationIcon.vue'
import Container from '~/components/layout/Container.vue'

definePageMeta({
  validate: (route) => /^\d+$/.test(String(route.params.id)),
})

const route = useRoute()
const config = useRuntimeConfig()

const id = computed(() => String(route.params.id ?? ''))
const {
  data: character,
  status: detailStatus,
  error: characterError,
} = useGetCharacterDetail({ id })

useHead({
  link: [
    {
      rel: 'canonical',
      href: `${config.public.siteUrl}${route.path}`,
    },
  ],
})

useSeoMeta({
  title: () => character.value?.name,
  description: () =>
    character.value
      ? `${character.value.name}: ${character.value.status} ${character.value.species} from ${character.value.origin.name}.`
      : undefined,
  ogTitle: () => character.value?.name,
  ogImage: () => character.value?.image,
  ogType: 'profile',
  twitterCard: 'summary_large_image',
})

if (characterError.value) {
  const status = characterError.value?.status ?? 404
  throw createError({
    status,
    statusText: status === 404 ? 'Character not found' : 'Could not load character',
    fatal: true,
  })
}

const episodeIds = computed(() =>
  (character.value?.episode ?? [])
    .map((url) => getIdFromUrl(url))
    .filter((episodeId): episodeId is number => episodeId !== null),
)
const locationId = computed(() => {
  const url = character.value?.location.url
  return url ? getIdFromUrl(url) : null
})
const { data: episodes, status: episodeStatus } = useGetEpisodes({ ids: episodeIds })
const { data: location, status: locationStatus } = useGetLocations({ id: locationId })
</script>

<template>
  <main>
    <Header class="h-[387px] md:h-[432px]">
      <CharacterHeroSkeleton v-if="detailStatus === 'pending'" />

      <CharacterHero v-if="character" :character="character" />
      <template #shadow>
        <div class="absolute z-0 left-0 top-5.25 md:hidden">
          <img src="/images/shadow-character-1.svg" />
        </div>
        <div class="absolute z-0 top-0 hidden md:block">
          <img src="/images/shadow-character-2.svg" />
        </div>
      </template>
    </Header>
    <Container class="py-8">
      <div class="flex flex-col gap-8 md:gap-16">
        <CharacterSection :status="episodeStatus" title="Episodes" :icon="EpisodeIcon">
          <CharacterInfo
            v-for="episode in episodes"
            :key="episode.id"
            :card-title="episode.name"
            :card-sub-title="episode.episode"
            :card-description="episode.air_date"
          />
        </CharacterSection>
        <CharacterSection :status="locationStatus" title="Locations" :icon="LocationIcon">
          <CharacterInfo
            v-if="location"
            :card-title="location.name"
            :card-sub-title="location.type"
            :card-description="location.dimension"
          />
        </CharacterSection>
      </div>
    </Container>
  </main>
</template>

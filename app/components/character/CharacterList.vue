<script setup lang="ts">
interface Props {
  characterList: Character[]
  status: Status
}

defineProps<Props>()
</script>

<template>
  <ul class="grid grid-cols-[repeat(auto-fill,minmax(328px,1fr))] justify-center gap-4">
    <template v-if="status === 'pending' || status === 'idle'">
      <CharacterCardSkeleton v-for="index in 20" :key="index" />
    </template>

    <CharacterCard
      v-for="character in characterList"
      v-else
      :key="character.id"
      :character="character"
    />
  </ul>
</template>

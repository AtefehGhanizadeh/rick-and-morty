<script setup lang="ts">
defineProps<{ character: Character }>()
</script>

<template>
  <div class="z-1 mt-9 flex flex-col gap-4 md:mt-17 md:flex-row md:items-center md:gap-12">
    <CharacterAvatar
      :src="character.image"
      :alt="character.name"
      :size="240"
      priority
      class="size-[180px] shrink-0 md:size-[240px]"
    />
    <div class="flex w-full flex-col items-start gap-4">
      <h1 class="text-24-medium text-text wrap-break-word">{{ character.name }}</h1>
      <CharacterStatus :status="character.status" :species="character.species" />
    </div>
  </div>
</template>

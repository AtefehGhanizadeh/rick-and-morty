<script setup lang="ts">
interface Props {
  character: Character
}

defineProps<Props>()
</script>

<template>
  <NuxtLink :to="`/character/${character.id}`" class="group block">
    <li
      class="text-text flex flex-col items-center p-4 border border-border rounded-2xl gap-4 hover:border-accent transition-colors duration-300"
    >
      <CharacterAvatar
        :src="character.image"
        :alt="character.name"
        :size="296"
        class="size-full"
        
      />
      <div class="flex flex-col items-start gap-3 w-full">
        <p
          class="text-20-bold wrap-break-word transition-colors duration-300 group-hover:text-accent"
        >
          {{ character.name }}
        </p>
        <CharacterStatus :status="character.status" :species="character.species" />
      </div>
    </li>
  </NuxtLink>
</template>

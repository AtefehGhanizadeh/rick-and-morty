<script setup lang="ts">
interface Props {
  status: Character['status']
  species:Character['species']
}

defineProps<Props>()
</script>

<template>
  <div class="flex justify-center items-center gap-2">
    <div
      :class="[
        {
          'bg-badge-green': status === 'Alive',
          'bg-badge-red': status === 'Dead',
          'bg-text-muted': status === 'unknown',
        },
        'rounded-full w-3 h-3',
      ]"
    />
    <p class="text-text">{{ status }}-{{ species }}</p>
  </div>
</template>


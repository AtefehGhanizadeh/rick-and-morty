<script setup lang="ts">
interface Props {
  cardTitle: string
  cardSubTitle: string|null
  cardDescription: string|null
}

 defineProps<Props>()
</script>

<template>
  <li class="rounded-2xl bg-blue-background p-4 flex flex-col items-start justify-between gap-4 ">
    <p class="text-text text-20-bold">{{ cardTitle }}</p>
    <p class="text-text-blue text-16-medium">{{ cardSubTitle??'-' }}</p>
    <p class="text-16 text-text-muted">{{ cardDescription??'-' }}</p>
  </li>
</template>


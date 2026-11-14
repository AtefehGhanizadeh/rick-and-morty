<script setup lang="ts">
interface Props {
  title: string
  icon: Component
  status: Status
  skeletonCount?: number
}
withDefaults(defineProps<Props>(), {
  skeletonCount: 4,
})
</script>

<template>
  <div class="flex flex-col gap-5 md:gap-6">
    <div class="flex gap-3 items-center">
      <component :is="icon" />
      <h2 class="text-24-medium text-text">
        {{ title }}
      </h2>
    </div>
    <ul
      class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,328px),384px))] auto-rows-fr justify-center gap-4 md:gap-6"
    >
      <template v-if="status === 'idle' || status === 'pending'">
        <CharacterInfoSkeleton v-for="item in skeletonCount" :key="item" />
      </template>

      <template v-else-if="status === 'success'">
        <slot />
      </template>
    </ul>
  </div>
</template>

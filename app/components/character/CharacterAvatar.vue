
<script setup lang="ts">
interface Props {
  src: string
  alt: string
  size: number
  priority?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  priority: false,
})

const FALLBACK_SRC = '/images/defaultImage.jpeg'

const isLoaded = ref(false)
const hasError = ref(false)

const currentSrc = computed(() =>
  hasError.value ? FALLBACK_SRC : props.src,
)

watch(
  () => props.src,
  () => {
    isLoaded.value = false
    hasError.value = false
  },
)

function handleError() {
  if (currentSrc.value !== FALLBACK_SRC) {
    hasError.value = true
    return
  }

  isLoaded.value = true
}
</script>

<template>
  <div class="relative  overflow-hidden rounded-md">
    <div
      v-if="!isLoaded"
      class="bg-input absolute inset-0 animate-pulse"
      aria-hidden="true"
    />

    <NuxtImg
      :key="currentSrc"
      :src="currentSrc"
      :alt="alt"
      :width="size"
      :height="size"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : 'auto'"
      class="size-full object-cover"
      @load="isLoaded = true"
      @error="handleError"
    />
  </div>
</template>

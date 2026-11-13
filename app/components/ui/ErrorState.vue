<script setup lang="ts">
interface Props {
  title?: string
  message?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Something went wrong',
  message: 'We couldn’t load the data. Please try again in a moment.',
})

const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <div role="alert" class="flex flex-col items-center justify-center gap-4 py-16 text-center">
    <h2 class="text-24-medium text-text">{{ title }}</h2>
    <p class="text-text-muted">{{ message }}</p>
    <button
      type="button"
      class="bg-accent text-accent-foreground text-14-medium focus-visible:outline-text h-12 cursor-pointer rounded-sm px-4 focus-visible:outline-2 focus-visible:outline-offset-2"
      @click="emit('retry')"
    >
      Try again
    </button>
  </div>
</template>
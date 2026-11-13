<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => props.error.status === 404)

const title = computed(() => (isNotFound.value ? 'Page not found' : 'Something went wrong'))
const message = computed(() =>
  isNotFound.value
    ? 'The character or page you are looking for doesn’t exist.'
    : 'An unexpected error occurred. Please try again in a moment.',
)

useHead({ title })

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div>
    <Header />
    <main>
      <LayoutContainer class="flex flex-col items-center gap-6 py-16 text-center">
        <p class="text-32-medium text-accent">{{ error.status }}</p>
        <h1 class="text-24-medium text-text">{{ title }}</h1>
        <p class="text-16 text-text-muted">{{ message }}</p>
        <button
          type="button"
          class="bg-accent text-accent-foreground text-14-medium focus-visible:outline-text h-12 cursor-pointer rounded-sm px-4 focus-visible:outline-2 focus-visible:outline-offset-2"
          @click="goHome"
        >
          Back to all characters
        </button>
      </LayoutContainer>
    </main>
  </div>
</template>
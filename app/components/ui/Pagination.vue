<script setup lang="ts">
import type { Component } from 'vue'
import ArrowLeft from '../icons/ArrowLeft.vue'
import ArrowRight from '../icons/ArrowRight.vue'
import DoubleArrowLeft from '../icons/DoubleArrowLeft.vue'
import DoubleArrowRight from '../icons/DoubleArrowRight.vue'

type PaginationAction = 'increase' | 'decrease' | 'first' | 'last'

interface Props {
  totalPages: number
  currentPage: number
}

const route = useRoute()

const props = defineProps<Props>()

const leftArrowsDisabled = computed(() => props.currentPage === 1)
const rightArrowsDisabled = computed(() => props.currentPage === props.totalPages)

interface ArrowButtonType {
  action: PaginationAction
  disabled: boolean
  icon: Component
}

const buttons = computed<ArrowButtonType[]>(() => [
  {
    icon: DoubleArrowLeft,
    action: 'first',
    disabled: leftArrowsDisabled.value,
  },
  {
    icon: ArrowLeft,
    action: 'decrease',
    disabled: leftArrowsDisabled.value,
  },
  {
    icon: ArrowRight,
    action: 'increase',
    disabled: rightArrowsDisabled.value,
  },
  {
    icon: DoubleArrowRight,
    action: 'last',
    disabled: rightArrowsDisabled.value,
  },
])

function handlePagination(action: PaginationAction) {
  let newPage: number

  switch (action) {
    case 'first':
      newPage = 1
      break

    case 'last':
      newPage = props.totalPages
      break

    case 'increase':
      newPage = props.currentPage + 1
      break

    case 'decrease':
      newPage = props.currentPage - 1
      break
  }

  goToPage(newPage)
}
async function goToPage(page: number) {
  navigateTo({
    query: {
      ...route.query,
      page,
    },
  })

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const paginationItems = computed(() => {
  const current = props.currentPage
  const total = props.totalPages

  return getPaginationItems(current, total)
})
</script>

<template>
  <nav aria-label="Pagination" class="flex w-full items-center justify-center gap-2 mt-10">
    <button
      v-for="button in buttons.slice(0, 2)"
      :key="button.action"
      class="cursor-pointer text-text disabled:cursor-not-allowed disabled:text-pagination-icon-muted"
      :disabled="button.disabled"
      @click="handlePagination(button.action)"
    >
      <component :is="button.icon" :disabled="button.disabled" />
    </button>
    <template v-for="(item, index) in paginationItems" :key="`${item}-${index}`">
      <span v-if="typeof item !== 'number'" class="text-text"> ... </span>

      <button
        v-else
        type="button"
        class="flex size-6 items-center justify-center rounded-full text-16-medium"
        :class="item === currentPage ? 'bg-accent text-accent-foreground' : 'text-text'"
        @click="goToPage(item)"
      >
        {{ item }}
      </button>
    </template>
    <button
      v-for="button in buttons.slice(2)"
      :key="button.action"
      class="cursor-pointer text-text disabled:cursor-not-allowed disabled:text-pagination-icon-muted"
      :disabled="button.disabled"
      @click="handlePagination(button.action)"
    >
      <component :is="button.icon" :disabled="button.disabled" />
    </button>
  </nav>
</template>

<script setup>
const searchValue = ref('')

const handleSearch = () => {
  const formattedSearchValue = searchValue.value.trim()
  navigateTo({
    query: {
      name: formattedSearchValue || undefined,
      page: 1,
    },
  })
  searchValue.value = ''
}
</script>

<template>
  <div class="bg-input-container rounded-lg p-4 mt-6 md:mt-10 z-1">
    <form @submit.prevent="handleSearch" class="flex items-center gap-4">
      <input
        type="text"
        class="bg-input rounded-sm py-[13.5px] pl-4 flex-1 leading-[21px] text-text focus-visible:outline-2 focus-visible:outline-accent placeholder:text-text placeholder:text-sm"
        placeholder="Search for characters..."
        v-model="searchValue"
      />
      <button
        type="submit"
        class="rounded-sm bg-accent text-accent-foreground h-12 px-4 flex items-center justify-center"
      >
        <IconsSearchIcon />
        <span class="hidden md:inline text-accent-foreground text-14-medium ml-2">Search</span>
      </button>
    </form>
  </div>
</template>

<template>
  <li
    class="border-border flex flex-col items-center gap-4 rounded-2xl border p-4"
    aria-hidden="true"
  >
    <UiSkeleton class="size-[296px]" />
    <div class="flex w-full flex-col items-start gap-3">
      <UiSkeleton class="h-7 w-3/4" />
      <UiSkeleton class="h-6 w-1/2" />
    </div>
  </li>
</template>

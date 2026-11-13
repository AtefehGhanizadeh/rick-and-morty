<template>
  <header class="bg-header w-full">
    <LayoutContainer class="pt-3 pb-6">
      <div class="flex flex-col">
        <HeaderLogo />
        <slot name="search" />
        <slot />
        <slot name="shadow" />
      </div>
    </LayoutContainer>
  </header>
</template>

<script setup lang="ts">
import Logo from './Logo.vue';
import Container from '../layout/Container.vue';

</script>

<template>
  <header class="bg-header w-full">
    <Container class="pt-3 pb-6">
      <div class="flex flex-col">
        <Logo/>
        <slot name="search" />
        <slot />
        <slot name="shadow" />
      </div>
    </Container>
  </header>
</template>

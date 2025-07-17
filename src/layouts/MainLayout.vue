<script lang="ts" setup>
  import Header from '@components/Header.vue'
  import Aside from '@components/Aside.vue'
  import Footer from '@components/Footer.vue'
</script>

<template>
  <div
    class="grid grid-cols-[250px_1fr] grid-rows-[auto_1fr_auto] min-h-screen"
  >
    <Aside class="row-span-3 border-r border-gray-500" />
    <Header class="border-b border-gray-500" />
    <main class="overflow-y-auto">
      <slot />
    </main>
    <Footer class="border-t border-gray-500" />
  </div>
</template>

<style scoped></style>

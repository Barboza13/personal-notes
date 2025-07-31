<script lang="ts" setup>

import {useUser} from "@composables/useUser.ts";

const { userName } = useUser()
</script>

<template>
  <aside class="flex flex-col justify-start items-center bg-(--default-background) py-2 px-4">
    <section class="flex justify-center items-center border-b border-gray-500 h-1/12 w-full">
      <h1 class="text-(--text-color)">{{ userName }}</h1>
    </section>
  </aside>
</template>

<style scoped></style>

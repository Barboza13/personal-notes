<script lang="ts" setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const goToSettings = (): void => {
    router.push({ name: 'settings' })
  }
</script>

<template>
  <footer class="flex justify-around items-center h-full w-full bg-(--default-background) text-(--text-color) py-2">
    <button
      class="flex justify-end items-center h-full w-full cursor-pointer px-4"
      @click="goToSettings"
    >
      <v-icon
        name="io-settings-sharp"
        scale="1.5"
        title="Configuracion"
        animation="wrench"
        speed="slow"
        hover
      />
    </button>
  </footer>
</template>

<style scoped></style>

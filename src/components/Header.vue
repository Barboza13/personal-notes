<script lang="ts" setup>
import {useRouter} from 'vue-router'

const router = useRouter()

const gotoForm = (): void => {
  router.push({ name: 'home' })
}
</script>

<template>
  <header
    class="flex justify-around items-center h-full w-full bg-(--default-background) text-(--text-color) p-4"
  >
    <section class="flex justify-center items-center h-full w-1/2">
      Total registros: 0
    </section>
    <section class="flex justify-center items-center h-full w-1/2">
      <button
        class="bg-green-500 hover:bg-green-700 rounded-md cursor-pointer transition-colors duration-75 ease-in p-2"
        @click="gotoForm"
      >
        Nuevo registro
        <v-icon name="md-add-round" />
      </button>
    </section>
  </header>
</template>

<style scoped></style>

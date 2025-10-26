<script setup lang="ts">
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const props = defineProps({ noteId: { required: true, type: Number }, noteTitle: { required: true, type: String } })

  const goToPath = (): void => {
    router.push({ name: 'note-detail', params: { id: props.noteId } })
  }
</script>

<template>
  <article
    class="flex justify-center items-center min-h-8 w-full bg-gray-600 hover:bg-gray-700 cursor-pointer rounded-md text-white transition-colors duration-75 ease-in"
    @click="goToPath"
  >
    {{ props.noteTitle }}
  </article>
</template>

<style scoped></style>

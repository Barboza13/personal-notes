<script lang="ts" setup>
  import MainLayout from '@layouts/MainLayout.vue'
  import NoteService from '@services/NoteService.ts'

  const noteService = new NoteService()
</script>

<template>
  <MainLayout>
    <template #default>
      <form
        class="flex flex-col justify-start items-center h-full w-full bg-(--default-background) text-(--text-primary) p-6"
      >
        <div class="flex flex-col h-auto w-full mb-3">
          <label for="title">Titulo</label>
          <input
            class="bg-white text-black rounded-md outline-none h-10 px-2"
            type="text"
            id="title"
            name="title"
          />
        </div>
        <div class="flex flex-col h-full w-full mb-3">
          <label for="content">Contenido</label>
          <textarea
            class="h-full bg-white text-black rounded-md outline-none p-2"
            name="content"
            id="content"
          ></textarea>
        </div>
        <div class="flex justify-end items-center h-auto w-full">
          <button
            class="w-1/3 bg-green-500 hover:bg-green-700 rounded-md cursor-pointer transition-colors duration-75 ease-in p-2"
          >
            Guardar
          </button>
        </div>
      </form>
    </template>
  </MainLayout>
</template>

<style scoped></style>

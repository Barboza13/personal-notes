<script lang="ts" setup>
import type {Ref} from 'vue'
import {onMounted, ref} from 'vue'
import MainLayout from '@layouts/MainLayout.vue'
import ShowMessageDialog from '@transitions/ShowMessageDialog.vue'
import {useUser} from '@composables/useUser.ts'
import {useRoute, useRouter} from 'vue-router'
import NoteService from '@services/NoteService.ts'
import type {MessageData} from '@interfaces/global.ts'
import {useNote} from '@composables/useNote.ts'
import type {Note} from '@interfaces/notes.ts'

const { message: messageJson } = useRoute().query
const router = useRouter()
const { isLoggedIn, getUserId } = useUser()
const { addNote } = useNote()

if (!isLoggedIn) router.push({ name: 'login' })

const noteService = new NoteService()
const title: Ref<string> = ref('')
const content: Ref<string> = ref('')
const messageData: Ref<MessageData> = ref({ error: false, content: '' })

const checkAndShowMessage = (): void => {
  if (messageJson && typeof messageJson === "string") {
    messageData.value = JSON.parse(messageJson)
    setTimeout(() => messageData.value = { error: false, content: '' }, 3000)
  }
}
const handleSubmit = async (): Promise<void> => {
  const note: Note = {
    userId: getUserId() ?? 0,
    title: title.value,
    content: content.value
  }

  try {
    const response = await noteService.createNote(note)

    if (response) {
      messageData.value = response
    }

    title.value = ''
    content.value = ''
    addNote(note)
  } catch (error) {
    messageData.value = {
      error: true,
      content: '¡Ocurrio un error inesperado, intente de nuevo!',
    }
    console.error(`Error creating note: ${String(error)}`)
  }

  setTimeout(() => messageData.value = { error: false, content: '' }, 3000)
}

onMounted(() => checkAndShowMessage())
</script>

<template>
  <MainLayout>
    <template #default>
      <form
        class="flex flex-col justify-start items-center h-full w-full bg-(--default-background) text-(--text-color) p-6"
        @submit.prevent="handleSubmit"
      >
        <div class="flex flex-col h-auto w-full mb-3">
          <label for="title">Titulo</label>
          <input
            class="bg-white text-black rounded-md outline-none h-10 px-2"
            v-model="title"
            type="text"
            id="title"
          />
        </div>
        <div class="flex flex-col h-full w-full mb-3">
          <label for="content">Contenido</label>
          <textarea
            class="h-full bg-white text-black rounded-md outline-none p-2"
            v-model="content"
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
      <ShowMessageDialog>
        <div v-if="messageData.content"
             :class="[
                 messageData.error ? 'text-red-500' : 'text-(--text-color)',
                 'fixed bottom-10 right-5 flex justify-center items-center bg-(--detail-color) rounded-md p-4 z-100'
             ]"
        >
          {{ messageData.content }}
        </div>
      </ShowMessageDialog>
    </template>
  </MainLayout>
</template>

<style scoped></style>

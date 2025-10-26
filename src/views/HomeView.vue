<script lang="ts" setup>
  import type { Ref } from 'vue'
  import { onMounted, ref } from 'vue'
  import MainLayout from '@layouts/MainLayout.vue'
  import ShowMessageDialog from '@transitions/ShowMessageDialog.vue'
  import { useUser } from '@composables/useUser.ts'
  import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
  import NoteService from '@services/NoteService.ts'
  import type { MessageData } from '@interfaces/global.ts'
  import { useNote } from '@composables/useNote.ts'
  import type { Note } from '@interfaces/notes.ts'
  import { getCurrentTimestamp } from '@utils/utils.ts'

  const {
    message: deleteMessageJson,
    id: noteIdToEdit,
    title: noteTitleToEdit,
    content: noteContentToEdit,
  } = useRoute().query
  const router = useRouter()
  const { isLoggedIn, getUserId } = useUser()
  const { addNote, updateNote } = useNote()

  if (!isLoggedIn) router.push({ name: 'login' })

  const noteService = new NoteService()
  const isEdit: Ref<boolean> = ref(false)
  const noteId: Ref<number | null> = ref(null)
  const title: Ref<string> = ref('')
  const content: Ref<string> = ref('')
  const messageData: Ref<MessageData> = ref({ error: false, content: '' })

  onBeforeRouteUpdate((to, from) => {
    if (to.params !== from.params) {
      noteId.value = null
      isEdit.value = false
      title.value = ''
      content.value = ''
    }
  })

  const checkAndShowMessage = (): void => {
    if (deleteMessageJson && typeof deleteMessageJson === 'string') {
      showMessage(JSON.parse(deleteMessageJson))
    }
  }

  const checkIfEditNote = (): void => {
    if (noteIdToEdit != null && noteTitleToEdit != null && noteContentToEdit != null) {
      isEdit.value = true
      noteId.value = parseInt(String(noteIdToEdit))
      title.value = String(noteTitleToEdit)
      content.value = String(noteContentToEdit)
    }
  }

  const showMessage = (message: MessageData): void => {
    messageData.value = message
    setTimeout(() => (messageData.value = { error: false, content: '' }), 3000)
  }

  const handleSubmit = async (): Promise<void> => {
    const note: Note = { user_id: getUserId() ?? 0, title: title.value, content: content.value }

    if (isEdit.value) {
      note.id = noteId.value ?? 0
      note.updated_at = getCurrentTimestamp()

      try {
        const message = <MessageData>await noteService.updateNote(noteId.value ?? 0, note)
        showMessage(message)

        if (!updateNote(note)) {
          showMessage({ error: true, content: '¡Error al actualizar la tarea en la vista!' })
        }

        title.value = ''
        content.value = ''
      } catch (error) {
        showMessage({ error: true, content: '¡Ocurrio un error inesperado, intente de nuevo!' })
        console.error(`Error editing note: ${String(error)}`)
      }

      return
    }

    try {
      const message = <MessageData>await noteService.createNote(note)
      showMessage(message)

      addNote(note)
      title.value = ''
      content.value = ''
    } catch (error) {
      showMessage({ error: true, content: '¡Ocurrio un error inesperado, intente de nuevo!' })
      console.error(`Error creating note: ${String(error)}`)
    }
  }

  onMounted(() => {
    checkAndShowMessage()
    checkIfEditNote()
  })
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
            {{ isEdit ? 'Actualizar' : 'Guardar' }}
          </button>
        </div>
      </form>
      <ShowMessageDialog>
        <div
          v-if="messageData.content"
          :class="[
            messageData.error ? 'text-red-500' : 'text-(--text-color)',
            'fixed bottom-10 right-5 flex justify-center items-center bg-(--detail-color) rounded-md p-4 z-100',
          ]"
        >
          {{ messageData.content }}
        </div>
      </ShowMessageDialog>
    </template>
  </MainLayout>
</template>

<style scoped></style>

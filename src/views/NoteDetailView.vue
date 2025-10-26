<script setup lang="ts">
  import MainLayout from '@layouts/MainLayout.vue'
  import NoteService from '@services/NoteService.ts'
  import { Note } from '@interfaces/notes.ts'
  import { onMounted, ref, Ref } from 'vue'
  import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
  import { MessageData } from '@interfaces/global.ts'
  import { getCurrentTimestamp } from '@utils/utils.ts'
  import ShowMessageDialog from '@transitions/ShowMessageDialog.vue'
  import ShowConfirmModal from '@transitions/ShowConfirmModal.vue'

  const { id } = useRoute().params
  const noteId: Ref<number> = ref(parseInt(String(id) ?? '0'))
  const router = useRouter()
  const noteService = new NoteService()
  const noteData: Ref<Note | null> = ref(null)
  const isOpenDeleteModal: Ref<boolean> = ref(false)
  const messageData: Ref<MessageData> = ref({ error: false, content: '' })

  onBeforeRouteUpdate(async (to, from) => {
    if (to.params.id !== from.params.id) {
      const newId = parseInt(String(to.params.id))
      if (!isNaN(newId)) {
        noteId.value = newId
        await getNoteData()
      }
    }
  })

  const getNoteData = async (): Promise<void> => {
    try {
      noteData.value = (await noteService.getNoteById(noteId.value)) ?? null
    } catch (error) {
      messageData.value = { error: true, content: '¡Ocurrio un error inesperado, intente de nuevo!' }
      console.error(`Error getting note data: ${String(error)}`)
    }
  }

  const editNote = async (): Promise<void> => {
    try {
      await router.push({
        name: 'home',
        query: { id: noteId.value, title: noteData.value?.title, content: noteData.value?.content },
      })
    } catch (error) {
      messageData.value = { error: true, content: '¡Ocurrio un error inesperado, intente de nuevo!' }
      console.error(`Error to change view: ${String(error)}`)
    }
  }

  const deleteNote = async (): Promise<void> => {
    const deletedAt = getCurrentTimestamp()

    try {
      const message = <MessageData>await noteService.deleteNote(noteId.value, deletedAt)
      await router.push({ name: 'home', query: { message: JSON.stringify(message) } })
    } catch (error) {
      messageData.value = { error: true, content: '¡Ocurrio un error inesperado, intente de nuevo!' }
      console.error(`Error deleting note data: ${String(error)}`)
    }
  }

  onMounted(async () => await getNoteData())
</script>

<template>
  <MainLayout>
    <template #default>
      <section class="flex justify-between items-center h-1/12 w-full bg-(--default-background) text-(--text-color) p-2">
        <div class="flex h-full w-1/2">
          <h1 class="text-xl text-(--text-color)">{{ noteData?.title }}</h1>
        </div>
        <div class="flex justify-end items-center h-full w-1/2 gap-2">
          <button
            class="bg-blue-500 hover:bg-blue-600 rounded-md cursor-pointer transition-colors duration-75 ease-in py-1 px-2"
            @click="editNote"
          >
            <v-icon
              name="md-modeedit"
              title="Editar"
            />
          </button>
          <button
            class="bg-red-500 hover:bg-red-600 rounded-md cursor-pointer transition-colors duration-75 ease-in py-1 px-2"
            @click="isOpenDeleteModal = true"
          >
            <v-icon
              name="md-delete"
              title="Eliminar"
            />
          </button>
        </div>
      </section>
      <section
        class="flex flex-col justify-start items-start h-11/12 w-full bg-(--default-background) text-(--text-color) p-2"
      >
        <div class="flex text-sm gap-1">
          <strong>Creado el:</strong>
          <p class="text-gray-400">{{ noteData?.created_at }}</p>
        </div>
        <div class="flex text-sm gap-1">
          <strong>Actualizado el: </strong>
          <p class="text-gray-400">{{ noteData?.updated_at ?? 'Nunca' }}</p>
        </div>
        <br />
        <h1>Contenido:</h1>
        <p class="text-(--text-color) overflow-y-auto">
          {{ noteData?.content }}
        </p>
      </section>
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

  <div
    v-show="isOpenDeleteModal"
    class="fixed inset-0 bg-black opacity-30 z-[999]"
  ></div>
  <ShowConfirmModal>
    <div
      v-show="isOpenDeleteModal"
      @close="isOpenDeleteModal = false"
      class="fixed top-1/2 left-1/2 -translate-1/2 flex flex-col justify-center items-center h-[125px] w-[400px] bg-(--detail-color) text-(--text-color) rounded-md shadow-black shadow-lg/45 gap-4 z-[1000]"
    >
      <p class="text-lg">¿Seguro que desea eliminar el registro?</p>
      <section class="flex justify-around items-center w-full">
        <button
          class="bg-gray-500 hover:bg-gray-600 cursor-pointer rounded-md transition-colors duration-75 ease-in py-2 px-4"
          @click="isOpenDeleteModal = false"
        >
          Cancelar
        </button>
        <button
          class="bg-red-500 hover:bg-red-600 cursor-pointer rounded-md transition-colors duration-75 ease-in py-2 px-4"
          @click="deleteNote"
        >
          Eliminar
        </button>
      </section>
    </div>
  </ShowConfirmModal>
</template>

<style scoped></style>

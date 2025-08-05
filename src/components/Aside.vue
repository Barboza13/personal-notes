<script lang="ts" setup>
import {useUser} from '@composables/useUser.ts'
import {Note} from '@interfaces/notes.ts'
import {onMounted, Ref, ref} from 'vue'
import NoteService from '@services/NoteService.ts'
import {MessageData} from '@interfaces/global.ts'
import NoteItem from '@components/NoteItem.vue'
import LoginService from '@services/LoginService.ts'
import {useRouter} from 'vue-router'

const router = useRouter()
const { userName, getUserId } = useUser()
const noteService = new NoteService()
const loginService = new LoginService()
const notes: Ref<Note[]> = ref([])
const messageData: Ref<MessageData> = ref({ error: false, content: '' })

/**
 * @description Get all notes in the `notes` array.
 *
 * @returns {Promise<void>} - This function does not return any value.
 */
const getNotes = async (): Promise<void> => {
  try {
    notes.value = await noteService.getAllNotes(getUserId() ?? 0) ?? []
  } catch (error) {
    messageData.value = {
      error: true,
      content: '¡Ocurrio un error inesperado, intente de nuevo!',
    }
    console.error(`Error getting notes: ${String(error)}`)
  }
}

/**
 * @description Try logout the current user.
 *
 * @returns {Promise<void>} - This method does not return any value.
 */
const logout = async (): Promise<void> => {
  loginService.logout()

  try {
    await router.push({ name: 'login' })
  } catch (error) {
    messageData.value = {
      error: true,
      content: '¡Ocurrio un error inesperado, intente de nuevo!',
    }
    console.error(`Error logout the current user: ${String(error)}`)
  }
}

onMounted(async () => await getNotes())
</script>

<template>
  <aside class="flex flex-col justify-start items-center bg-(--default-background) py-2 px-4">
    <section class="flex justify-around items-center border-b border-gray-500 h-1/12 w-full">
      <h1 class="text-(--text-color)">{{ userName }}</h1>
      <button class="bg-red-500 hover:bg-red-600 text-(--text-color) cursor-pointer rounded-md transition-colors duration-75 ease-in p-2" @click="logout">
        <v-icon name="co-account-logout" title="Cerrar sesion" />
      </button>
    </section>
    <section class="flex flex-col justify-center items-start w-full overflow-y-auto gap-2 py-2">
      <NoteItem v-if="notes.length > 0"
                v-for="note in notes"
                :key="note.id"
                :note-title="note.title"
                :note-id="note.id ?? 0"
      />
      <article v-else>No hay notas</article>
    </section>
  </aside>
</template>

<style scoped></style>

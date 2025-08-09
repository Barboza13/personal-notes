<script lang="ts" setup>
import {useUser} from '@composables/useUser.ts'
import type {Ref} from 'vue'
import {ref} from 'vue'
import type {MessageData} from '@interfaces/global.ts'
import LoginService from '@services/LoginService.ts'
import {useRouter} from 'vue-router'
import {useNote} from '@composables/useNote.ts'
import NoteItem from '@components/NoteItem.vue'

const router = useRouter()
const { userName } = useUser()
const { notes } = useNote()
const loginService = new LoginService()
const messageData: Ref<MessageData> = ref({ error: false, content: '' })

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
</script>

<template>
  <aside class="flex flex-col justify-start items-center h-full bg-(--default-background) py-2 px-4">
    <section class="flex justify-around items-center h-[4.6rem] w-full border-b border-gray-500">
      <h1 class="text-(--text-color)">{{ userName }}</h1>
      <button class="bg-red-500 hover:bg-red-600 text-(--text-color) cursor-pointer rounded-md transition-colors duration-75 ease-in p-2" @click="logout">
        <v-icon name="co-account-logout" title="Cerrar sesion" />
      </button>
    </section>
    <section class="flex flex-col justify-start items-start min-h-(calc(100% - 4.6rem)) w-full overflow-y-auto gap-2 py-2 pr-4">
      <NoteItem v-if="notes.length > 0"
                v-for="note in notes"
                :key="note.id"
                :note-title="note.title"
                :note-id="note.id ?? 0"
      />
      <article v-else class="text-center text-(--text-color) w-full mt-8">No hay notas</article>
    </section>
  </aside>
</template>

<style scoped></style>

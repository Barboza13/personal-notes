<script lang="ts" setup>
  import { useUser } from '@composables/useUser.ts'
  import type { Ref } from 'vue'
  import { ref } from 'vue'
  import type { MessageData } from '@interfaces/global.ts'
  import LoginService from '@services/LoginService.ts'
  import { useRouter } from 'vue-router'
  import { useNote } from '@composables/useNote.ts'
  import NoteItem from '@components/NoteItem.vue'
  import ShowConfirmModal from '@transitions/ShowConfirmModal.vue'

  const router = useRouter()
  const { userName } = useUser()
  const { notes } = useNote()
  const loginService = new LoginService()
  const isOpenLogoutModal: Ref<boolean> = ref(false)
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
      messageData.value = { error: true, content: '¡Ocurrio un error inesperado, intente de nuevo!' }
      console.error(`Error logout the current user: ${String(error)}`)
    }
  }
</script>

<template>
  <aside class="flex flex-col justify-start items-center h-full bg-(--default-background) px-4">
    <section class="flex justify-around items-center h-[1fr] w-full border-b border-gray-500 gap-2 py-2">
      <div class="flex justify-start items-center h-full w-1/2 text-(--text-color) gap-1">
        <v-icon
          name="fa-user-circle"
          scale="1.5"
        />
        <h1 class="text-(--text-color)">{{ userName }}</h1>
      </div>
      <div class="flex justify-end items-center h-full w-1/2">
        <v-icon
          class="bg-red-500 hover:bg-red-600 text-(--text-color) cursor-pointer rounded-md transition-colors duration-75 ease-in p-2"
          @click="isOpenLogoutModal = true"
          scale="2.1"
          name="co-account-logout"
          title="Cerrar sesion"
        />
      </div>
    </section>
    <section class="flex flex-col justify-start items-start min-h-(calc(100% - 1fr)) w-full overflow-y-auto gap-2 py-2 pr-4">
      <NoteItem
        v-if="notes.length > 0"
        v-for="note in notes"
        :key="note.id"
        :note-title="note.title"
        :note-id="note.id ?? 0"
      />
      <article
        v-else
        class="text-center text-(--text-color) w-full mt-8"
      >
        No hay notas
      </article>
    </section>

    <div
      v-show="isOpenLogoutModal"
      class="fixed inset-0 bg-black opacity-30 z-[999]"
    ></div>
    <ShowConfirmModal>
      <div
        v-show="isOpenLogoutModal"
        @close="isOpenLogoutModal = false"
        class="fixed top-1/2 left-1/2 -translate-1/2 flex flex-col justify-center items-center h-[125px] w-[400px] bg-(--detail-color) text-(--text-color) rounded-md shadow-black shadow-lg/45 gap-4 z-[1000]"
      >
        <p class="text-lg">¿Seguro que desea cerrar la sesion?</p>
        <section class="flex justify-around items-center w-full">
          <button
            class="bg-gray-500 hover:bg-gray-600 cursor-pointer rounded-md transition-colors duration-75 ease-in py-2 px-4"
            @click="isOpenLogoutModal = false"
          >
            Cancelar
          </button>
          <button
            class="bg-red-500 hover:bg-red-600 cursor-pointer rounded-md transition-colors duration-75 ease-in py-2 px-4"
            @click="logout"
          >
            Cerrar sesion
          </button>
        </section>
      </div>
    </ShowConfirmModal>
  </aside>
</template>

<style scoped></style>

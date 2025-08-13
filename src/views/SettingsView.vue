<script setup lang="ts">
import {useRouter} from 'vue-router'
import type {Ref} from 'vue'
import {ref} from 'vue'
import {useUser} from '@composables/useUser.ts'
import ShowConfirmModal from "@transitions/ShowConfirmModal.vue";
import UserService from "@services/UserService.ts";
import {MessageData} from "@interfaces/global.ts";
import {getCurrentTimestamp} from "@utils/utils.ts";
import ShowMessageDialog from "@transitions/ShowMessageDialog.vue";

const router = useRouter()
const userService = new UserService()
const {getUserId, userName, userEmail, userCreatedAt, userUpdatedAt} = useUser()
const name: Ref<string> = ref(userName)
const email: Ref<string> = ref(userEmail)
const createdAt: Ref<string> = ref(userCreatedAt)
const updatedAt: Ref<string> = ref(userUpdatedAt)
const isOpenDeleteModal: Ref<boolean> = ref(false)
const messageData: Ref<MessageData> = ref({error: false, content: ''})

const goBack = (): void => {
  router.back()
}

const showMessage = (message: MessageData): void => {
  messageData.value = message
  setTimeout(() => messageData.value = {error: false, content: ''}, 3000)
}

const deleteUser = async (): Promise<void> => {
  const deletedAt = getCurrentTimestamp()

  try {
    const message = <MessageData>await userService.deleteUser(getUserId() ?? 0, deletedAt)
    await router.push({
      name: 'login',
      query: {
        message: JSON.stringify(message)
      }
    })
  } catch (error) {
    showMessage({error: true, content: '¡Ocurrio un error inesperado, intente de nuevo!'})
    console.error(`Error deleting user: ${String(error)}`)
  }
}

const handleSubmit = async (): Promise<void> => {
}
</script>

<template>
  <header
      class="sticky top-0 flex justify-start items-center h-[50px] w-full bg-(--default-background) text-(--text-color) border-b border-b-gray-500 gap-2 px-2">
    <v-icon class="cursor-pointer" name="md-arrowbackios-round" title="Volver" @click="goBack"/>
    <h1>Configuracion</h1>
  </header>
  <main
      class="flex flex-col justify-between items-center h-full w-full bg-(--default-background) text-(--text-color) gap-20 py-4">
    <section class="w-full px-4">
      <h1 class="text-center">Datos de la cuenta</h1>
      <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
        <div class="flex flex-col justify-center items-start">
          <label>Nombre:</label>
          <input readonly class="h-[40px] w-full bg-gray-900 outline-none rounded-md px-2" type="text" v-model="name"/>
        </div>
        <div class="flex flex-col justify-center items-start">
          <label>Email:</label>
          <input readonly class="h-[40px] w-full bg-gray-900 outline-none rounded-md px-2" type="text" v-model="email"/>
        </div>
        <div class="flex flex-col justify-center items-start">
          <label>Creado el:</label>
          <input readonly class="h-[40px] w-full bg-gray-900 outline-none rounded-md px-2" type="text"
                 v-model="createdAt"/>
        </div>
        <div class="flex flex-col justify-center items-start">
          <label>Actualizado el:</label>
          <input readonly class="h-[40px] w-full bg-gray-900 outline-none rounded-md px-2" type="text"
                 v-model="updatedAt"/>
        </div>
        <div class="flex justify-end items-start">
          <button
              class="w-[200px] bg-green-500 hover:bg-green-700 rounded-md cursor-pointer transition-colors duration-75 ease-in p-2"
              type="submit">
            Actualizar datos
          </button>
        </div>
      </form>
    </section>
    <section class="flex justify-center items-center w-full px-4">
      <div
          class="flex flex-col justify-center items-start h-full w-full rounded-md bg-gray-900 border border-gray-900 hover:border-red-500 gap-4 p-4">
        <div class="flex flex-col justify-center items-start">
          <div class="flex justify-center items-center gap-2">
            <v-icon name="io-warning" fill="yellow"/>
            <h1>Zona roja</h1>
          </div>
          <p class="text-sm">¡Las acciones aqui pueden afectar permanentemente la cuenta!</p>
        </div>
        <button
            class="w-[200px] bg-red-500 hover:bg-red-700 rounded-md cursor-pointer transition-colors duration-75 ease-in p-2"
            @click="isOpenDeleteModal = true">
          Eliminar cuenta
        </button>
      </div>
    </section>
  </main>

  <div v-show="isOpenDeleteModal" class="fixed inset-0 bg-black opacity-30 z-[999]"></div>
  <ShowConfirmModal>
    <div v-show="isOpenDeleteModal" @close="isOpenDeleteModal = false"
         class="fixed top-1/2 left-1/2 -translate-1/2 flex flex-col justify-center items-center h-[125px] w-[400px] bg-(--detail-color) text-(--text-color) rounded-md shadow-black shadow-lg/45 gap-4 z-[1000]">
      <p class="text-lg">¿Seguro que desea eliminar la cuenta?</p>
      <section class="flex justify-around items-center w-full">
        <button
            class="bg-gray-500 hover:bg-gray-600 cursor-pointer rounded-md transition-colors duration-75 ease-in py-2 px-4"
            @click="isOpenDeleteModal = false">Cancelar
        </button>
        <button
            class="bg-red-500 hover:bg-red-600 cursor-pointer rounded-md transition-colors duration-75 ease-in py-2 px-4"
            @click="deleteUser">Eliminar
        </button>
      </section>
    </div>
  </ShowConfirmModal>

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

<style scoped></style>
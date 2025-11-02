<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import UserService from '@services/UserService'
  import { useUser } from '@composables/useUser'
  import ShowConfirmModal from '@transitions/ShowConfirmModal.vue'
  import ShowMessageDialog from '@transitions/ShowMessageDialog.vue'

  import type { Ref } from 'vue'
  import type { MessageData } from '@interfaces/global'

  const router = useRouter()
  const userService = new UserService()
  const { getUserId, userName, userEmail, userCreatedAt, userUpdatedAt } = useUser()
  const isOpenDeleteModal: Ref<boolean> = ref(false)
  const messageData: Ref<MessageData> = ref({ error: false, content: '' })

  const goBack = (): void => {
    router.back()
  }

  const showMessage = (message: MessageData): void => {
    messageData.value = message
    setTimeout(() => (messageData.value = { error: false, content: '' }), 3000)
  }

  const deleteUser = async (): Promise<void> => {
    try {
      const message = <MessageData>await userService.deleteUser(getUserId() ?? 0)
      await router.push({ name: 'login', query: { message: JSON.stringify(message) } })
    } catch (error) {
      showMessage({ error: true, content: '¡Ocurrio un error inesperado, intente de nuevo!' })
      console.error(`Error deleting user: ${String(error)}`)
    }
  }
</script>

<template>
  <header
    class="sticky top-0 flex justify-start items-center h-[50px] w-full bg-(--default-background) text-(--text-color) border-b border-b-gray-500 gap-2 px-2"
  >
    <v-icon
      class="cursor-pointer"
      name="md-arrowbackios-round"
      title="Volver"
      @click="goBack"
    />
    <h1>Configuracion</h1>
  </header>
  <main
    class="flex flex-col justify-between items-center min-h-[calc(100vh-50px)] w-full bg-(--default-background) text-(--text-color) gap-20 py-4"
  >
    <section class="flex flex-col w-full px-4 gap-4">
      <h1 class="text-center text-xl">Datos de la cuenta</h1>
      <div class="flex justify-start items-center h-[2.5rem] w-full text-md bg-gray-900 rounded-md px-2">
        Usuario: {{ userName }}
      </div>
      <div class="flex justify-start items-center h-[2.5rem] w-full text-md bg-gray-900 rounded-md px-2">
        Email: {{ userEmail }}
      </div>
      <div class="flex justify-start items-center h-[2.5rem] w-full text-md bg-gray-900 rounded-md px-2">
        Se creo el: {{ userCreatedAt }}
      </div>
      <div class="flex justify-start items-center h-[2.5rem] w-full text-md bg-gray-900 rounded-md px-2">
        Ultima actualizacion: {{ userUpdatedAt }}
      </div>
      <div class="flex justify-end items-center h-[2.5rem] w-full">
        <button
          class="text-center bg-green-500 hover:bg-green-700 rounded-md cursor-pointer transition-colors duration-75 ease-in p-2"
          @click="router.push({ name: 'update-user' })"
        >
          Actualizar datos
        </button>
      </div>
    </section>
    <section class="flex justify-center items-center w-full px-4">
      <div
        class="flex flex-col justify-center items-start h-full w-full rounded-md bg-gray-900 border border-gray-900 hover:border-red-500 gap-4 p-4"
      >
        <div class="flex flex-col justify-center items-start">
          <div class="flex justify-center items-center gap-2">
            <v-icon
              name="io-warning"
              fill="yellow"
            />
            <h1>Zona roja</h1>
          </div>
          <p class="text-sm">¡Las acciones aqui pueden afectar permanentemente la cuenta!</p>
        </div>
        <button
          class="w-[200px] bg-red-500 hover:bg-red-700 rounded-md cursor-pointer transition-colors duration-75 ease-in p-2"
          @click="isOpenDeleteModal = true"
        >
          Eliminar cuenta
        </button>
      </div>
    </section>
  </main>

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
      <p class="text-lg">¿Seguro que desea eliminar la cuenta?</p>
      <section class="flex justify-around items-center w-full">
        <button
          class="bg-gray-500 hover:bg-gray-600 cursor-pointer rounded-md transition-colors duration-75 ease-in py-2 px-4"
          @click="isOpenDeleteModal = false"
        >
          Cancelar
        </button>
        <button
          class="bg-red-500 hover:bg-red-600 cursor-pointer rounded-md transition-colors duration-75 ease-in py-2 px-4"
          @click="deleteUser"
        >
          Eliminar
        </button>
      </section>
    </div>
  </ShowConfirmModal>

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

<style scoped></style>

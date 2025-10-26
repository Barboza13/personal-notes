<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUser } from '@composables/useUser'
  import UserService from '@services/UserService'
  import { getCurrentTimestamp } from '@utils/utils'

  import type { Ref } from 'vue'
  import type { MessageData } from '@interfaces/global'

  const router = useRouter()
  const userService = new UserService()
  const { getUserId, userName, userEmail, setUser } = useUser()
  const name: Ref<string> = ref(userName.value)
  const email: Ref<string> = ref(userEmail.value)
  const messageData: Ref<MessageData> = ref({ error: false, content: '' })

  const goBack = (): void => {
    router.back()
  }

  const handleSubmit = async (): Promise<void> => {
    try {
      const result = await userService.updateUser(getUserId() ?? 0, {
        name: name.value,
        email: userEmail.value,
        updated_at: getCurrentTimestamp(),
      })

      if (result) {
        messageData.value = result
        const response = await userService.getUserById(getUserId() ?? 0)
        setUser(response!)
      }

      name.value = ''
      email.value = ''
    } catch (error) {
      messageData.value = { error: true, content: '¡Ocurrio un error inesperado, intente de nuevo!' }
      console.error(`Error updating user: ${String(error)}`)
    }

    setTimeout(() => (messageData.value = { error: false, content: '' }), 3000)
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
  <main class="flex flex-col justify-center items-center h-screen w-full bg-(--default-background)">
    <form
      class="flex flex-col justify-center items-center w-1/2 text-(--text-color) mb-3"
      @submit.prevent="handleSubmit"
    >
      <div
        v-show="messageData.content != ''"
        class="flex justify-center items-center w-full mb-3"
      >
        <p :class="messageData.error ? 'text-red-500' : 'text-green-500'">
          {{ messageData.content }}
        </p>
      </div>
      <div class="flex flex-col w-full mb-3">
        <label>Nombre de usuario:</label>
        <input
          class="bg-transparent border-b-2 border-b-(--detail-color) outline-none px-2 py-1"
          type="text"
          v-model="name"
          required
        />
      </div>
      <div class="flex flex-col w-full mb-3">
        <label>Email:</label>
        <input
          class="bg-transparent border-b-2 border-b-(--detail-color) outline-none px-2 py-1"
          type="email"
          v-model="email"
          required
        />
      </div>
      <div class="flex justify-center items-center w-full">
        <button
          class="w-1/2 bg-green-500 hover:bg-green-700 text-(--text-primary) cursor-pointer rounded-md transition-colors duration-75 ease-in-out p-2"
          type="submit"
        >
          Actualizar
        </button>
      </div>
    </form>
  </main>
</template>

<style scoped></style>

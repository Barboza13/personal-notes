<script setup lang="ts">
  import type { Ref } from 'vue'
  import { ref } from 'vue'
  import UserService from '@services/UserService.ts'
  import type { User } from '@interfaces/interfaces.ts'
  import type { MessageData } from '@interfaces/global.ts'

  const userService = new UserService()
  const userName: Ref<string> = ref('')
  const email: Ref<string> = ref('')
  const password: Ref<string> = ref('')
  const passwordConfirmation: Ref<string> = ref('')
  const messageData: Ref<MessageData> = ref({ error: false, content: '' })
  const handleSubmit = async (): Promise<void> => {
    if (password.value != passwordConfirmation.value) {
      messageData.value = {
        error: true,
        content: '¡Las contraseñas no coinciden!',
      }
      setTimeout(
        () => (messageData.value = { error: false, content: '' }),
        3000
      )
      return
    }

    try {
      const result = await userService.createUser({
        name: userName.value,
        email: email.value,
        password: password.value,
      } as User)

      if (result) {
        messageData.value = result
      }
    } catch (error) {
      console.error(`Error creating user: ${String(error)}`)
    }

    userName.value = ''
    email.value = ''
    password.value = ''
    passwordConfirmation.value = ''
    setTimeout(() => (messageData.value = { error: false, content: '' }), 3000)
  }
</script>

<template>
  <main
    class="flex flex-col justify-center items-center h-screen w-full bg-(--default-background)"
  >
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
          name="user_name"
          v-model="userName"
          required
        />
      </div>
      <div class="flex flex-col w-full text-(--text-primary) mb-3">
        <label>Email:</label>
        <input
          class="bg-transparent border-b-2 border-b-(--detail-color) outline-none px-2 py-1"
          type="email"
          name="email"
          v-model="email"
          required
        />
      </div>
      <div class="flex flex-col w-full text-(--text-primary) mb-3">
        <label>Contraseña:</label>
        <input
          class="bg-transparent border-b-2 border-b-(--detail-color) outline-none px-2 py-1"
          type="password"
          name="password"
          v-model="password"
          required
        />
      </div>
      <div class="flex flex-col w-full text-(--text-primary) mb-3">
        <label>Confirmar constraseña:</label>
        <input
          class="bg-transparent border-b-2 border-b-(--detail-color) outline-none px-2 py-1"
          type="password"
          name="password_confirmation"
          v-model="passwordConfirmation"
          required
        />
      </div>
      <div class="flex justify-center items-center w-full">
        <button
          class="w-1/2 bg-green-500 hover:bg-green-700 text-(--text-primary) cursor-pointer rounded-md transition-colors duration-75 ease-in-out p-2"
          type="submit"
        >
          Registrarse
        </button>
      </div>
    </form>
    <div>
      <RouterLink
        class="text-(--text-color) hover:text-gray-400 transition-colors duration-75 ease-in"
        :to="{ name: 'login' }"
      >
        Volver al login
      </RouterLink>
    </div>
  </main>
</template>

<style scoped></style>

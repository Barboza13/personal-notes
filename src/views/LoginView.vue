<script setup lang="ts">
import LoginService from '@services/LoginService.ts'
import type {Ref} from 'vue'
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useUser} from '@composables/useUser.ts'
import type {User, UserLogin} from '@interfaces/interfaces.ts'
import type {MessageData} from '@interfaces/global.ts'

const router = useRouter()
const { setUser } = useUser()
const loginService: LoginService = new LoginService()
const nameOrEmail: Ref<string> = ref('')
const password: Ref<string> = ref('')
const messageData: Ref<MessageData> = ref({ error: false, content: '' })

const handleSubmit = async (): Promise<void> => {
  try {
    const response = await loginService.login({
      nameOrEmail: nameOrEmail.value,
      password: password.value,
    } as UserLogin)

    if (response && typeof response === 'object' && 'error' in response) {
      messageData.value = response
      setTimeout(() => (messageData.value = { error: false, content: '' }),
          3000
        )
        return
      }

      setUser(response as User)
      await router.push({ name: 'home' })
    } catch (error) {
      messageData.value = {
        error: true,
        content: '¡Ocurrio un error inesperado, intente de nuevo!',
      }
      console.error(`Error login user: ${String(error)}`)
    }

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
      <div class="flex flex-col w-full gap-2 mb-3">
        <label>Usuario o Email:</label>
        <input
          class="bg-transparent border-b-2 border-b-(--detail-color) outline-none px-2 py-1"
          type="text"
          v-model="nameOrEmail"
        />
      </div>
      <div class="flex flex-col w-full gap-2 mb-3">
        <label>Contraseña:</label>
        <input
          class="bg-transparent border-b-2 border-b-(--detail-color) outline-none px-2 py-1"
          type="password"
          v-model="password"
        />
      </div>
      <div class="flex justify-center items-center w-full">
        <button
          class="w-1/2 bg-green-500 hover:bg-green-700 cursor-pointer rounded-md transition-colors duration-75 ease-in-out p-2"
          type="submit"
        >
          Iniciar Sesion
        </button>
      </div>
    </form>
    <div>
      <RouterLink
        class="text-(--text-color) hover:text-gray-400 transition-colors duration-75 ease-in"
        :to="{ name: 'register' }"
      >
        Crear cuenta
      </RouterLink>
    </div>
  </main>
</template>

<style scoped></style>

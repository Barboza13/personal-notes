<script setup lang="ts">
import {useRouter} from 'vue-router'
import type {Ref} from 'vue'
import {ref} from 'vue'
import {useUser} from '@composables/useUser.ts'

const router = useRouter()
const { userName, userEmail, userCreatedAt, userUpdatedAt } = useUser()
const name: Ref<string> = ref(userName)
const email: Ref<string> = ref(userEmail)
const createdAt: Ref<string> = ref(userCreatedAt)
const updatedAt: Ref<string> = ref(userUpdatedAt)

const goBack = (): void => {
  router.back()
}

const handleSubmit = async (): Promise<void> => {}
</script>

<template>
  <header class="sticky top-0 flex justify-start items-center h-[50px] w-full bg-(--default-background) text-(--text-color) border-b border-b-gray-500 gap-2 px-2">
    <v-icon class="cursor-pointer" name="md-arrowbackios-round" title="Volver" @click="goBack" />
    <h1>Configuracion</h1>
  </header>
  <main class="flex flex-col justify-between items-center h-full w-full bg-(--default-background) text-(--text-color) gap-20 py-4">
    <section class="w-full px-4">
      <h1 class="text-center">Datos de la cuenta</h1>
      <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
        <div class="flex flex-col justify-center items-start">
          <label>Nombre:</label>
          <input readonly class="h-[40px] w-full bg-gray-500 outline-none rounded-md px-2" type="text" v-model="name" />
        </div>
        <div class="flex flex-col justify-center items-start">
          <label>Email:</label>
          <input readonly class="h-[40px] w-full bg-gray-500 outline-none rounded-md px-2" type="text" v-model="email" />
        </div>
        <div class="flex flex-col justify-center items-start">
          <label>Creado el:</label>
          <input readonly class="h-[40px] w-full bg-gray-500 outline-none rounded-md px-2" type="text" v-model="createdAt" />
        </div>
        <div class="flex flex-col justify-center items-start">
          <label>Actualizado el:</label>
          <input readonly class="h-[40px] w-full bg-gray-500 outline-none rounded-md px-2" type="text" v-model="updatedAt" />
        </div>
        <div class="flex justify-end items-start">
          <button class="w-[200px] bg-green-500 hover:bg-green-700 rounded-md cursor-pointer transition-colors duration-75 ease-in p-2" type="submit">
            Actualizar datos
          </button>
        </div>
      </form>
    </section>
    <section class="flex justify-center items-center w-full px-4">
      <div class="flex flex-col justify-center items-start h-full w-full rounded-md bg-red-400 border border-red-500 gap-4 p-4">
        <div class="flex flex-col justify-center items-start">
          <div class="flex justify-center items-center gap-2">
            <v-icon name="io-warning" fill="yellow" />
            <h1>Zona roja</h1>
          </div>
          <p class="text-sm">¡Las acciones aqui pueden afectar permanentemente la cuenta!</p>
        </div>
        <button class="w-[200px] bg-red-500 hover:bg-red-700 rounded-md cursor-pointer transition-colors duration-75 ease-in p-2">
          Eliminar cuenta
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
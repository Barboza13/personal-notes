<script setup lang="ts">
// import UserService from "@services/UserService.ts"
</script>

<template>
<main class="flex flex-col justify-center items-center h-screen w-full bg-(--default-background)">
  <form class="flex flex-col justify-center items-center w-1/2 text-(--text-color) mb-3">
    <div class="flex flex-col w-full gap-2 mb-3">
      <label>Usuario o Email:</label>
      <input class="bg-transparent border-b-2 border-b-(--detail-color) outline-none px-2 py-1" type="text" name="name">
    </div>
    <div class="flex flex-col w-full gap-2 mb-3">
      <label>Contraseña:</label>
      <input class="bg-transparent border-b-2 border-b-(--detail-color) outline-none px-2 py-1" type="password" name="password">
    </div>
    <div class="flex justify-center items-center w-full">
      <button class="w-1/2 bg-green-500 hover:bg-green-700 cursor-pointer rounded-md transition-colors duration-75 ease-in-out p-2">
        Iniciar Sesion
      </button>
    </div>
  </form>
  <div>
    <RouterLink class="text-(--text-color) hover:text-gray-400 transition-colors duration-75 ease-in" :to="{ name: 'register' }">
      Crear cuenta
    </RouterLink>
  </div>
</main>
</template>

<style scoped></style>
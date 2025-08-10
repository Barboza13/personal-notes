<script setup lang="ts"></script>

<template>
  <transition
      enter-from-class="scale-0 opacity-0"
      enter-active-class="transition-all duration-300 ease-out"
      enter-to-class="scale-100 opacity-100"
      leave-from-class="scale-100 opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-to-class="scale-0 opacity-0"
  >
    <slot />
  </transition>
</template>

<style scoped></style>

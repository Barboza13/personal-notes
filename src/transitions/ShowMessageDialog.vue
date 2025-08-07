<script setup lang="ts"></script>

<template>
  <transition
      enter-from-class="translate-x-full opacity-0"
      enter-active-class="transition-all duration-300 ease-out"
      enter-to-class="translate-x-0 opacity-100"
      leave-from-class="translate-x-0 opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-to-class="translate-x-full opacity-0"
  >
    <slot/>
  </transition>
</template>

<style scoped></style>
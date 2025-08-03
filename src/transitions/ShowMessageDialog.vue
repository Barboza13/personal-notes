<script setup lang="ts"></script>

<template>
  <transition
      enter-from-class="translate-x-full"
      enter-active-class="transition-transform duration-75 ease-in"
      enter-to-class="translate-x-0"
      leave-from-class="translate-x-0"
      leave-active-class="transition-transform duration-75 ease-in"
      leave-to-class="translate-x-full"
  >
    <slot/>
  </transition>
</template>

<style scoped></style>
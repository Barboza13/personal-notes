<script setup lang="ts">
import MainLayout from "@layouts/MainLayout.vue";
import NoteService from "@services/NoteService.ts";
import {Note} from "@interfaces/notes.ts";
import {onMounted, ref, Ref} from "vue";
import {useRoute} from "vue-router";
import {MessageData} from "@interfaces/global.ts";

const { id } = useRoute().params
const noteId: number = parseInt(String(id) ?? '0')
const noteService = new NoteService()
const noteData: Ref<Note | null> = ref(null)
const messageData: Ref<MessageData> = ref({ error: false, content: '' })

const getNoteData = async (): Promise<void> => {
  try {
    noteData.value = await noteService.getNoteById(noteId) ?? null
    console.log(noteData.value)
  } catch (error) {
    messageData.value = {
      error: true,
      content: '¡Ocurrio un error inesperado, intente de nuevo!',
    }
    console.error(`Error getting note data: ${String(error)}`)
  }
}

onMounted(async () => await getNoteData())
</script>

<template>
  <MainLayout>
    <template #default>
      <h1>This is note detail! {{ noteData?.title }}</h1>
    </template>
  </MainLayout>
</template>

<style scoped></style>
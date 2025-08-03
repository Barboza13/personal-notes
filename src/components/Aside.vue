<script lang="ts" setup>
import {useUser} from "@composables/useUser.ts";
import {Note} from "@interfaces/notes.ts";
import {onMounted, Ref, ref} from "vue";
import NoteService from "@services/NoteService.ts";
import {MessageData} from "@interfaces/global.ts";
import NoteItem from "@components/NoteItem.vue";

const { userName, getUserId } = useUser()
const noteService = new NoteService()
const notes: Ref<Note[]> = ref([])
const messageData: Ref<MessageData> = ref({ error: false, content: '' })
const getNotes = async (): Promise<void> => {
  try {
    notes.value = await noteService.getAllNotes(getUserId() ?? 0) ?? []
  } catch (error) {
    messageData.value = {
      error: true,
      content: '¡Ocurrio un error inesperado, intente de nuevo!',
    }
    console.error(`Error getting notes: ${String(error)}`)
  }
}

onMounted(async () => await getNotes())
</script>

<template>
  <aside class="flex flex-col justify-start items-center bg-(--default-background) py-2 px-4">
    <section class="flex justify-center items-center border-b border-gray-500 h-1/12 w-full">
      <h1 class="text-(--text-color)">{{ userName }}</h1>
    </section>
    <section class="flex flex-col justify-center items-start w-full overflow-y-auto gap-2 py-2">
      <NoteItem v-if="notes.length > 0"
                v-for="note in notes"
                :key="note.id"
                :note-title="note.title"
                :note-id="note.id ?? 0"
      />
      <article v-else>No hay notas</article>
    </section>
  </aside>
</template>

<style scoped></style>

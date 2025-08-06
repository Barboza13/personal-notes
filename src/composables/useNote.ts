import {useUser} from '@composables/useUser.ts'
import type {Ref} from 'vue'
import {ref, watch} from 'vue'
import {Note} from '@interfaces/notes.ts'
import NoteService from '@services/NoteService.ts'

const noteService = new NoteService()
const { getUserId } = useUser()
const notes: Ref<Note[]> = ref([])

export function useNote() {
  const getNotes = async (): Promise<void> => {
    try {
      notes.value = await noteService.getAllNotes(getUserId() ?? 0) ?? []
    } catch (error) {
      console.error('Error getting notes: ' + error)
    }
  }

  (async () => {
    try {
      await getNotes()
    } catch (error) {
      console.error(error)
    }
  })();

  const addNote = (note: Note): void => {
    notes.value.unshift(note)
  }

  watch(notes, () => notes.value)

  return {notes, addNote}
}
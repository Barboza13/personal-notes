import DatabaseService from '@services/DatabaseService.ts'
import {Note} from '@interfaces/notes.ts'
import {MessageData} from '@interfaces/global.ts'
import {QueryResult} from '@tauri-apps/plugin-sql'

export default class NoteService {
  private dbService: DatabaseService

  constructor() {
    this.dbService = DatabaseService.getInstance()
  }

  async getAllNotes(userId: number): Promise<Note[] | undefined> {
    try {
      const db = await this.dbService.getDatabase()
      return await db.select(
        'SELECT * FROM notes WHERE user_id = $1 AND deleted_at IS NULL ORDER BY id DESC',
        [userId])
    } catch (error) {
      await Promise.reject(error)
    }
  }

  async getNoteById(id: number): Promise<Note | undefined> {
    try {
      const db = await this.dbService.getDatabase()
      const result: Note[] = await db.select('SELECT * FROM notes WHERE id = $1', [id])
      return result[0]
    } catch (error) {
      await Promise.reject(error)
    }
  }

  async createNote(note: Note): Promise<MessageData | undefined> {
    try {
      const db = await this.dbService.getDatabase()
      const result: QueryResult = await db.execute(
        'INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3)',
        [note.user_id, note.title, note.content]
      )

      if (!result) {
        return {
          error: true,
          content: '¡Ocurrio un error al guardar la nota, por favor intente de nuevo!'
        }
      }

      return { error: false, content: '¡Registro guardado exitosamente!' }
    } catch (error) {
      await Promise.reject(error)
    }
  }

  async updateNote(id: number, note: Note): Promise<MessageData | undefined> {
    try {
      const db = await this.dbService.getDatabase()
      const result: QueryResult = await db.execute(
        'UPDATE notes SET user_id = $1, title = $2, content = $3, updated_at = $4 WHERE id = $5',
        [note.user_id, note.title, note.content, note.updated_at, id])

      if (!result) {
        return {
          error: true,
          content: '¡Ocurrio un error al actualizar la nota, por favor intente de nuevo!'
        }
      }

      return { error: false, content: '¡Registro actualizado exitosamente!' }
    } catch (error) {
      await Promise.reject(error)
    }
  }

  async deleteNote(id: number, deletedAt: string): Promise<MessageData | undefined> {
    try {
      const db = await this.dbService.getDatabase()
      const result: QueryResult = await db.execute('UPDATE notes SET deleted_at = $1 WHERE id = $2',
        [deletedAt, id])

      if (!result) {
        return {
          error: true,
          content: '¡Ocurrio un error al eliminar la nota, por favor intente de nuevo!'
        }
      }

      return { error: false, content: '¡Registro eliminado exitosamente!' }
    } catch (error) {
      await Promise.reject(error)
    }
  }
}

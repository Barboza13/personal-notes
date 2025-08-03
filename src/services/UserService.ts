import {QueryResult} from '@tauri-apps/plugin-sql'
import DatabaseService from './DatabaseService'
import bcrypt from 'bcryptjs'
import type {User} from '@interfaces/users.ts'
import type {MessageData} from '@interfaces/global.ts'

export default class UserService {
  private dbService: DatabaseService

  constructor() {
    this.dbService = DatabaseService.getInstance()
  }

  async getAllUsers(): Promise<User[] | undefined> {
    try {
      const db = await this.dbService.getDatabase()
      return await db.select('SELECT * FROM users')
    } catch (error) {
      await Promise.reject(error)
    }
  }

  async getUserById(id: number): Promise<User | undefined> {
    try {
      const db = await this.dbService.getDatabase()
      return await db.select('SELECT * FROM users WHERE id = $1', [id])
    } catch (error) {
      await Promise.reject(error)
    }
  }

  async createUser(user: User): Promise<MessageData | undefined> {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 12)
      const db = await this.dbService.getDatabase()
      const result: QueryResult = await db.execute('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
        [user.name, user.email, hashedPassword])

      if (!result) {
        return {
          error: true,
          content: '¡Ocurrio un error al guardar el usuario, por favor intente de nuevo!'
        }
      }

      return { error: false, content: '¡Registro guardado exitosamente!' }
    } catch (error) {
      await Promise.reject(error)
    }
  }

  async updateUser(id: number, user: User): Promise<MessageData | undefined> {
    try {
      const db = await this.dbService.getDatabase()
      const result: QueryResult = await db.execute(
        'UPDATE users SET name = $1, email = $2, updated_at = $3 WHERE id = $4',
        [user.name, user.email, user.updatedAt, id])

      if (!result) {
        return {
          error: true,
          content: '¡Ocurrio un error al actualizar el usuario, por favor intente de nuevo!'
        }
      }

      return { error: false, content: '¡Registro actualizado exitosamente!' }
    } catch (error) {
      await Promise.reject(error)
    }
  }

  async deleteUser(id: number, deletedAt: string): Promise<MessageData | undefined> {
    try {
      const db = await this.dbService.getDatabase()
      const result: QueryResult = await db.execute('UPDATE users SET deleted_at = $1 WHERE id = $2',
        [deletedAt, id])

      if (!result) {
        return {
          error: true,
          content: '¡Ocurrio un error al eliminar el usuario, por favor intente de nuevo!'
        }
      }

      return { error: false, content: '¡Registro eliminado exitosamente!' }
    } catch (error) {
      await Promise.reject(error)
    }
  }
}
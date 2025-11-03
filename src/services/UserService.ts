import DatabaseService from './DatabaseService'
import bcrypt from 'bcryptjs'
import { useUser } from '@composables/useUser'
import { getCurrentTimestamp } from '@utils/utils'

import type { QueryResult } from '@tauri-apps/plugin-sql'
import type { User } from '@interfaces/users'
import type { MessageData } from '@interfaces/global'

const { userEmail } = useUser()

export default class UserService {
  private dbService: DatabaseService

  constructor() {
    this.dbService = DatabaseService.getInstance()
  }

  /**
   * Get all users.
   *
   * @returns {Promise<User[]>}
   */
  async getAllUsers(): Promise<User[]> {
    try {
      const db = await this.dbService.getDatabase()
      return await db.select('SELECT * FROM users WHERE deleted_at IS NULL')
    } catch (error) {
      throw error
    }
  }

  /**
   * Get a user by id.
   *
   * @param {number} id user id
   * @returns {Promise<User>}
   */
  async getUserById(id: number): Promise<User> {
    try {
      const db = await this.dbService.getDatabase()
      const results = await db.select<User[]>('SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL', [id])
      return results[0]
    } catch (error) {
      throw error
    }
  }

  /**
   * Create new user.
   *
   * @param {User} user User to save.
   * @returns
   */
  async createUser(user: User): Promise<MessageData> {
    try {
      const db = await this.dbService.getDatabase()

      if (await this.emailExists(user.email)) {
        return { error: true, content: '¡El correo electrónico ya existe!' }
      }

      const hashedPassword = await bcrypt.hash(user.password, 12)

      const result: QueryResult = await db.execute('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [
        user.name,
        user.email,
        hashedPassword,
      ])

      if (!result) {
        return { error: true, content: '¡Ocurrió un error al guardar el usuario, por favor intente de nuevo!' }
      }

      return { error: false, content: '¡Registro guardado exitosamente!' }
    } catch (error) {
      throw error
    }
  }

  /**
   * Update user data.
   *
   * @param {number} id user id.
   * @param {Omit<User, 'password'>} user new user data.
   * @returns {Promise<MessageData>}
   */
  async updateUser(id: number, user: Omit<User, 'password'>): Promise<MessageData> {
    try {
      const db = await this.dbService.getDatabase()

      if (user.email !== userEmail.value && (await this.emailExists(user.email))) {
        return { error: true, content: '¡El correo electrónico ya existe!' }
      }

      const result: QueryResult = await db.execute('UPDATE users SET name = $1, email = $2, updated_at = $3 WHERE id = $4', [
        user.name,
        user.email,
        user.updated_at,
        id,
      ])

      if (!result) {
        return { error: true, content: '¡Ocurrio un error al actualizar el usuario, por favor intente de nuevo!' }
      }

      return { error: false, content: '¡Registro actualizado exitosamente!' }
    } catch (error) {
      throw error
    }
  }

  /**
   * Delete user.
   *
   * @param {number} id user id.
   * @returns {Promise<MessageData>}
   */
  async deleteUser(id: number): Promise<MessageData> {
    const deletedAt = getCurrentTimestamp()

    try {
      const db = await this.dbService.getDatabase()
      const result: QueryResult = await db.execute('UPDATE users SET deleted_at = $1 WHERE id = $2', [deletedAt, id])

      if (!result) {
        return { error: true, content: '¡Ocurrio un error al eliminar el usuario, por favor intente de nuevo!' }
      }

      return { error: false, content: '¡La cuenta se elimino exitosamente!' }
    } catch (error) {
      throw error
    }
  }

  /**
   * Checks if an email already exists in the database.
   *
   * @param {string} email email to check.
   * @returns {Promise<boolean>}
   */
  private async emailExists(email: string): Promise<boolean> {
    const db = await this.dbService.getDatabase()

    type EmailExists = { email_exists: number }

    const [result] = await db.select<EmailExists[]>('SELECT EXISTS(SELECT 1 FROM users WHERE email = $1) AS email_exists', [
      email,
    ])

    return result?.email_exists === 1
  }
}

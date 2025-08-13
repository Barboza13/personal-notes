import DatabaseService from '@services/DatabaseService.ts'
import Database from '@tauri-apps/plugin-sql'
import {compare} from 'bcryptjs'
import type {User, UserLogin} from '@interfaces/users.ts'
import type {MessageData} from '@interfaces/global.ts'
import {useUser} from '@composables/useUser.ts'

const {clearUser} = useUser()

export default class LoginService {
  private dbService: DatabaseService

  constructor() {
    this.dbService = DatabaseService.getInstance()
  }

  /**
   * @description Login a user.
   *
   * @param {UserLogin} userLogin - User object with name or email and password.
   * @Returns {Promise<User | MessageData | undefined>}
   * - Returns User object if authentication is successful.
   * - Returns MessageData with error details if authentication fails.
   * - Returns undefined if an unexpected error occurs.
   * @throws {Error} - Rejects the promise if database connection or query fails.
   */
  async login(userLogin: UserLogin): Promise<User | MessageData | undefined> {
    let query: string = 'SELECT * FROM users WHERE name = $1 AND deleted_at IS NULL'

    if (this.isEmail(userLogin.nameOrEmail)) {
      query = 'SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL'
    }

    try {
      const db: Database = await this.dbService.getDatabase()
      const result: User[] = await db.select(query, [userLogin.nameOrEmail])
      const user: User = result[0]

      if (!user) {
        return {error: true, content: '¡Usuario no encontrado!'}
      }

      if (!await compare(userLogin.password, user.password)) {
        return {error: true, content: '¡Las credenciales no coinciden!'}
      }

      return user
    } catch (error) {
      await Promise.reject(error)
    }
  }

  /**
   * @description Logout current user.
   *
   * @returns {void} - This method does not return any value.
   */
  logout(): void {
    clearUser()
  }

  /**
   * @description Validate if a given string is a valid email.
   *
   * @param {string} email - The email string to validate.
   * @returns {boolean} - Returns true if the email format is valid, false otherwise.
   */
  isEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
}
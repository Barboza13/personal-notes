import DatabaseService from "@services/DatabaseService.ts"
import Database from "@tauri-apps/plugin-sql"
import {compare} from "bcryptjs"
import type {User, UserLogin} from "@interfaces/interfaces.ts"
import type {MessageData} from "@interfaces/global.ts"

export default class LoginService {
  private dbService: DatabaseService

  constructor() {
    this.dbService = DatabaseService.getInstance()
  }

  async login(userLogin: UserLogin): Promise<User | MessageData | undefined> {
    let query: string = 'SELECT * FROM users WHERE name = $1'

    if (this.isEmail(userLogin.nameOrEmail)) {
      query = 'SELECT * FROM users WHERE email = $1'
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

  async logout() {
    // TO DO
  }

  isEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
}
import Database, {QueryResult} from "@tauri-apps/plugin-sql";

import type {User} from "@types/index.ts"

export default class UserService {
    private db: Database

    async connection(): Promise<void> {
        try {
            this.db = await Database.load("sqlite:personalnotes.db")
        } catch (error) {
            await Promise.reject(error)
        }
    }

    async getAllUsers(): Promise<User[]> {
        await this.connection()

        try {
            return await this.db.select('SELECT * FROM users ORDER BY ASC')
        } catch (error) {
            await Promise.reject(error)
        }
    }

    async getUserById(id: number): Promise<User> {
        await this.connection()

        try {
            return await this.db.select('SELECT * FROM users WHERE id = $1', [id])
        } catch (error) {
            await Promise.reject(error)
        }
    }

    async createUser(user: User): Promise<QueryResult> {
        await this.connection()

        try {
            return await this.db.execute('INSERT INTO users VALUES ($1, $2, $3, $4)',
                [user.name, user.email, user.password, user.createdAt])
        } catch (error) {
            await Promise.reject(error)
        }
    }

    async updateUser(id: number, user: User): Promise<QueryResult> {
        await this.connection()

        try {
            return await this.db.execute(
                'UPDATE users SET name = $1, email = $2, updated_at = $3 WHERE id = $4',
                [user.name, user.email, user.updatedAt, id])
        } catch (error) {
            await Promise.reject(error)
        }
    }

    async deleteUser(id: number, deletedAt: string): Promise<QueryResult> {
        await this.connection()

        try {
            return await this.db.execute('UPDATE users SET deleted_at = $1 WHERE id = $2',
                [deletedAt, id])
        } catch (error) {
            await Promise.reject(error)
        }
    }
}
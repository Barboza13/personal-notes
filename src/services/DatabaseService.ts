import Database from "@tauri-apps/plugin-sql";

export default class DatabaseService {
  private static instance: DatabaseService
  private db: Database | null = null
  private isConnected: boolean = false

  private constructor() {}

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService()
    }
    return DatabaseService.instance
  }

  async connect(): Promise<void> {
    if (this.isConnected && this.db) {
      return
    }

    try {
      this.db = await Database.load("sqlite:personalnotes.db")
      this.isConnected = true
    } catch (error) {
      this.isConnected = false
      throw error
    }
  }

  async disconnect(): Promise<void> {
    if (this.db) {
      await this.db.close()
      this.db = null
      this.isConnected = false
    }
  }

  async getDatabase(): Promise<Database> {
    if (!this.isConnected || !this.db) {
      await this.connect()
    }
    return this.db!
  }
}
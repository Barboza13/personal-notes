export interface User {
  id?: number
  name: string
  email: string
  password: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}

export interface Note {
  id?: number
  userId: number
  title: string
  content: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}

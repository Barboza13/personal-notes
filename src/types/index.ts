export type User = {
  id?: number
  name: string
  email: string
  password: string
  createdAt: string
  updatedAt?: string
  deletedAt?: string
}

export type Note = {
  id?: number
  userId: number
  title: string
  content: string
  createdAt: string
  updatedAt?: string
  deletedAt?: string
}

export interface User {
  id?: number
  name: string
  email: string
  password: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
}

export interface UserLogin {
  nameOrEmail: string
  password: string
}
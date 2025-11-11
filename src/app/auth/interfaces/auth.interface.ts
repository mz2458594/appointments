export interface AuthResponse {
  token: string
  user: User
}

export interface User {
  email: string,
  password: string
  role: Role,
}

export type Role = 'admin' | 'client'

export type Status = 'checking' | 'authenticated' | 'not-authenticated'


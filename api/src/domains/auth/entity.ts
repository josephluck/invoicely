import { User } from '../user/entity'

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  invitationId: string
  name: string
  email: string
  avatar: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
}

import { LoginResponse, LoginRequest } from './entity'
import { AxiosInstance } from 'axios'

export function api(client: AxiosInstance) {
  return {
    login(data: LoginRequest): Promise<LoginResponse> {
      return client.post('/login', data).then(r => r.data)
    },
  }
}

export default api

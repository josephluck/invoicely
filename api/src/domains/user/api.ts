import { Result } from 'space-lift'
import { User } from './entity'
import { AxiosInstance } from 'axios'

export function api(client: AxiosInstance) {
  return {
    findAll(): Promise<User[]> {
      return client.get('/users').then(r => r.data)
    },
    findById(userId: string): Promise<Result<User, Error>> {
      return client.get(`/users/${userId}`).then(r => r.data)
    },
  }
}

export default api

import { Invitation, CreateInvitation } from './entity'
import { AxiosInstance } from 'axios'

export function api(client: AxiosInstance) {
  return {
    getAll(): Promise<Invitation[]> {
      return client.get('/invitations').then(r => r.data)
    },
    getById(inviteId: string): Promise<Invitation> {
      return client.get(`/invitations/${inviteId}`).then(r => r.data)
    },
    updateById(
      inviteId: string,
      data: CreateInvitation,
    ): Promise<Invitation> {
      return client
        .put(`/invitations/${inviteId}`, data)
        .then(r => r.data)
    },
    create(data: CreateInvitation): Promise<Invitation> {
      return client.post('/invitations', data).then(r => r.data)
    },
    deleteById(inviteId: string): Promise<Invitation> {
      return client
        .delete(`/invitations/${inviteId}`)
        .then(r => r.data)
    },
  }
}

export default api

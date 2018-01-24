import axios from 'axios'
import user from './user/api'
import auth from './auth/api'
import invitation from './invitation/api'

export function api(token?: string) {
  // TODO: Use dotenv in books project too
  console.log(process.env.API_BASE_URL)
  const authToken = token ? { Authorization: `Bearer ${token}` } : {}
  const client = axios.create({
    headers: { 'Content-Type': 'application/json', ...authToken },
    baseURL: 'http://localhost:2020',
  })

  return {
    user: user(client),
    auth: auth(client),
    invitation: invitation(client),
    setToken(token: string) {
      client.defaults.headers = {
        ...client.defaults.headers,
        Authorization: `Bearer ${token}`,
      }
    },
  }
}

export default api

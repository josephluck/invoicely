import axios from 'axios'
import user from './user/api'
import auth from './auth/api'

export function api(token?: string) {
  // TODO: Use dotenv in books project too
  console.log(process.env.API_BASE_URL)
  const authToken = token ? { Authorization: `Bearer ${token}` } : {}
  const client = axios.create({
    headers: { 'Content-Type': 'application/json', ...authToken },
    baseURL: process.env.API_BASE_URL,
  })

  return {
    user: user(client),
    auth: auth(client),
    setToken(token: string) {
      client.defaults.headers = {
        ...client.defaults.headers,
        Authorization: `Bearer ${token}`,
      }
    },
  }
}

export default api

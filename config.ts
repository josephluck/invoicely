export type Environments = 'local' | 'production'

export interface Config {
  apiPort: number
}

const config: Record<Environments, Config> = {
  local: {
    apiPort: 2020,
  },
  production: {
    apiPort: 2020,
  },
}

export default config

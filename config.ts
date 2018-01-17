export type Environments = 'local' | 'production'

export interface Config {
  apiPort: number
}

const config: Record<Environments, Config> = {
  local: {
    apiPort: 2020, // TODO: environment variable
  },
  production: {
    apiPort: 2020, // TODO: environment variable
  },
}

export default config

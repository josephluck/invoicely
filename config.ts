export type Environments = 'local' | 'production'

export interface Config {
  apiPort: number
  apiDomain: string
}

const config: Record<Environments, Config> = {
  local: {
    apiPort: 2020, // TODO: environment variable
    apiDomain: 'http://localhost:2020',
  },
  production: {
    apiPort: 2020, // TODO: environment variable
    apiDomain: 'http://localhost:2020',
  },
}

export default config

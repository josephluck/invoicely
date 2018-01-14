import config from '../../config'

import * as Hapi from 'hapi'
import validate from './utils/authentication'
import routes from './routes'

const db = {
  get: {
    users: () => ({
      john: {
        username: 'john',
        password:
          '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm', // 'secret'
        name: 'John Doe',
        id: '2133d32a',
      },
    }),
  },
}

const main = async () => {
  const server = Hapi.server({ port: config.local.apiPort })

  await validate(server, db)
  routes(server, db)

  await server.start()
  return server
}

main()
  .then(server =>
    console.log(`Server listening on ${server.info.uri}`),
  )
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

import * as HapiNowAuth from '@now-ims/hapi-now-auth'

export default async function(server: any, db: any) {
  // register hapi-now-auth plugin
  try {
    await server.register(HapiNowAuth)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }

  async function validate(request: any, token: any, h: any) {
    /**
     * we asked the plugin to verify the JWT
     * we will get back the decodedJWT as token.decodedJWT
     * and we will get the JWT as token.token
     */

    const credentials = token.decodedJWT

    /**
     * return the decodedJWT to take advantage of hapi's
     * route authentication options
     * https://hapijs.com/api#authentication-options
     */

    return {
      isValid: true,
      credentials,
    }
  }

  server.auth.strategy('jwt-strategy', 'hapi-now-auth', {
    verifyJWT: true,
    keychain: ['blah'],
    validate,
  })

  server.auth.default('jwt-strategy')
}

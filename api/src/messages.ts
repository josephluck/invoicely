export interface ApiMessage {
  type: 'error' | 'okay'
  code: number
  message: string
}

export default {
  notFound(entity: string): ApiMessage {
    return {
      type: 'error',
      code: 404,
      message: `${entity} not found`,
    }
  },
  successfullyDeleted(entity: string): ApiMessage {
    return {
      type: 'okay',
      code: 200,
      message: `${entity} deleted`,
    }
  },
}

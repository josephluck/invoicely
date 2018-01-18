import { Company } from './company/entity'
export { Company } from './company/entity'
import { User } from './user/entity'
export { User } from './user/entity'

export function all() {
  return [Company, User]
}

export default all

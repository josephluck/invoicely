import { CompanyEntity } from './company/entity'
export { CompanyEntity } from './company/entity'
import { UserEntity } from './user/entity'
export { UserEntity } from './user/entity'

export function all() {
  return [CompanyEntity, UserEntity]
}

export default all

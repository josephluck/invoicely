import { CompanyEntity } from './company/entity'
export { CompanyEntity } from './company/entity'
import { InvitationEntity } from './invitation/entity'
export { InvitationEntity } from './invitation/entity'
import { UserEntity } from './user/entity'
export { UserEntity } from './user/entity'

export function all() {
  return [CompanyEntity, InvitationEntity, UserEntity]
}

export default all

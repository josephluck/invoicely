import * as Router from 'koa-router'
import { Dependencies } from './'
import { compose } from 'ramda'
import user from './domains/user/routes'
import invitation from './domains/invitation/routes'
import auth from './domains/auth/routes'

export default function routes(deps: Dependencies) {
  const rts = compose(invitation(deps), user(deps), auth(deps))
  return rts(new Router())
}

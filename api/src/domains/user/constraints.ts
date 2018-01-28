import { CreateUser } from './entity'
import { ConstraintsFn } from '../../validation'

export const constraints: ConstraintsFn<
  CreateUser
> = fields => {
  return {
    name: { required: true },
    email: { required: true },
    password: { required: true },
    avatar: { required: false },
  }
}

export default constraints

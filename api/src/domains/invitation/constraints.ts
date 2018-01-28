import { CreateInvitation } from './entity'
import { ConstraintsFn } from '../../validation'

export const constraints: ConstraintsFn<
  CreateInvitation
> = fields => {
  return {
    name: { required: true },
    email: { required: true },
  }
}

export default constraints

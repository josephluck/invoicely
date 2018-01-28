import { CreateEmail } from './entity'
import { ConstraintsFn } from '../../validation'

export const constraints: ConstraintsFn<CreateEmail> = fields => {
  return {
    to: { required: true },
    from: { required: true },
    subject: { required: true },
    html: { required: true },
  }
}

export default constraints

import validate from './validator'

const constraints = {
  email: { email: true },
}

export default function(query: string): boolean {
  return !validate({ email: query }, constraints)
}

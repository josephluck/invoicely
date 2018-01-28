import mandle, { ValidationResult } from 'mandle'
import { Ok, Err, Result } from 'space-lift'

export interface AvailableConstraints {
  required?: boolean
  min?: number
  max?: number
}

export type ConstraintsFn<F> = (fields: F) => Constraints<F>

export type Constraints<F> = Record<keyof F, AvailableConstraints>

function isValid<F extends Record<string, any>>(
  errors: Record<keyof F, ValidationResult>,
): boolean {
  return Object.keys(errors).reduce((prev, key) => {
    return prev && errors[key].passes
  }, true)
}

export function validate<F>(
  fields: F,
  constraints: ConstraintsFn<F>,
): Result<Record<keyof F, ValidationResult>, F> {
  const validator = mandle()
  console.log(constraints(fields))
  const response = validator(constraints(fields), fields)
  return isValid(response) ? Ok(fields) : Err(response)
}

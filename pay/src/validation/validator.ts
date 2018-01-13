import nationalInsuranceNumber from './national-insurance-number'
import phoneNumber from './phone-number'
import sortCode from './sort-code'
const validate = require('validate.js')

validate.validators.phoneNumber = phoneNumber
validate.validators.sortCode = sortCode
validate.validators.nationalInsuranceNumber = nationalInsuranceNumber

export default validate

export type Constraints<F> = Partial<Record<keyof F, any>>
export type ValidatorResponse<F> =
  | Partial<Record<keyof F, string[]>>
  | undefined

export type Validator<F> = (
  fields: F,
  constraints: Constraints<F>,
) => ValidatorResponse<F>

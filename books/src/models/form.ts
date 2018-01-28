import { Helix } from 'helix-js'
import mandle, { ValidationResult } from 'mandle'
import { Err, Ok, Result } from 'space-lift'

interface ValidationError<F> {
  message: string
  type: 'validation_error'
  errors: Record<keyof F, ValidationResult>
}

export interface State<F extends any> {
  valid: boolean
  fields: F
  errors: Errors<F>
}

interface AvailableConstraints {
  required?: boolean
  min?: number
  max?: number
}

export type Errors<F> = Record<keyof F, ValidationResult>
export type Constraints<F> = (
  fields: F,
) => Record<keyof F, AvailableConstraints>

export interface Reducers<F extends any> {
  resetForm: Helix.Reducer0<State<F>>
  setFields: Helix.Reducer<State<F>, Partial<F>>
  initFields: Helix.Reducer<State<F>, Partial<F>>
  validateEntireForm: Helix.Reducer0<State<F>>
  validateFields: Helix.Reducer<State<F>, Array<keyof F>>
}

type V<F> = Result<ValidationError<F>, State<F>>
export interface Effects<F extends any> {
  validateOnSubmit: Helix.Effect0<State<F>, Actions<F>, V<F>>
}

export type Actions<F extends any> = Helix.Actions<
  Reducers<F>,
  Effects<F>
>

interface Opts<F> {
  constraints: Constraints<F>
  defaultForm: () => F
  onValidationError?: (errors: Errors<F>) => any
}

export function model<F extends any>({
  constraints,
  defaultForm,
  onValidationError = () => null,
}: Opts<F>): Helix.Model<State<F>, Reducers<F>, Effects<F>> {
  const fields = defaultForm()
  const emptyErrors = makeDefaultErrors<F>(constraints(fields))

  function initialState() {
    return {
      fields,
      errors: emptyErrors,
      valid: false,
      formShowing: null,
    }
  }

  return {
    scoped: true,
    state: initialState(),
    reducers: {
      resetForm() {
        return initialState()
      },
      initFields(state, fields) {
        return { fields: Object.assign({}, state.fields, fields) }
      },
      setFields(state, newFields) {
        const fields = Object.assign({}, state.fields, newFields)
        const newErrors = getErrorsForFields(newFields, constraints)
        const errors = Object.assign({}, state.errors, newErrors)
        const valid = isFormValid(fields, constraints)
        return { fields, errors, valid }
      },
      validateEntireForm(state) {
        const validate = mandle()
        const errors = validate(
          constraints(state.fields),
          state.fields,
        )
        return {
          ...state,
          errors: errors || emptyErrors,
          valid: isFormValid(state.fields, constraints),
        }
      },
      validateFields(state, fields) {
        const fieldsToValidate = fields.reduce((prev, key) => {
          return {
            ...prev,
            [key]: state.fields[key],
          }
        }, {})
        const newErrors = getErrorsForFields(
          fieldsToValidate,
          constraints,
        )
        const errors = Object.assign({}, state.errors, newErrors)
        return {
          errors,
          valid: isFormValid(state.fields, constraints),
        }
      },
    },
    effects: {
      validateOnSubmit(_state, send) {
        const state = send.validateEntireForm()
        if (!state.valid) {
          onValidationError(state.errors)
          return Err<ValidationError<F>>({
            type: 'validation_error',
            message: 'Invalid input',
            errors: state.errors,
          })
        } else {
          return Ok(state)
        }
      },
    },
  }
}

export function makeDefaultErrors<F>(
  constraints: Record<keyof F, any>,
): Errors<F> {
  const errors = Object.keys(constraints).reduce((prev, curr) => {
    return {
      ...prev,
      [curr]: [],
    }
  }, {})
  return errors as Errors<F>
}

export function getErrorsForFields<F>(
  fields: F,
  makeConstraints: Constraints<F>,
): Record<keyof F, ValidationResult> {
  const constraints = makeConstraints(fields)
  const initialErrors = Object.keys(fields).reduce(
    (prev, key) => ({ ...prev, [key]: [] }),
    {},
  )

  const filteredConstraints = Object.keys(fields).reduce(
    (prev, key: keyof F) => {
      return constraints[key]
        ? { ...prev, [key]: constraints[key] }
        : prev
    },
    {} as any,
  )

  const validate = mandle()
  const errors = (validate(filteredConstraints, fields) as any) || {}
  return { ...initialErrors, ...errors }
}

export function isFormValid<F>(
  fields: F,
  makeConstraints: Constraints<F>,
) {
  const errors = getErrorsForFields(fields, makeConstraints)
  const keys = Object.keys(errors) as (keyof F)[]
  return keys.reduce((prev, key) => {
    return prev && errors[key].passes
  }, true)
}

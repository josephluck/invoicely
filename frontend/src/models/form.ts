import { Helix } from 'helix-js'
import validate from '../validation/validator'
import { Err, Ok, Result } from 'space-lift'

interface ValidationError<F> {
  message: string
  type: 'validation_error'
  errors: Record<keyof F, string[]>
}

export interface State<F extends any> {
  valid: boolean
  fields: F
  errors: Errors<F>
}

export type Errors<F> = Record<keyof F, string[]>
export type ConstraintsObj<F> = Record<keyof F, any>
export type Constraints<F> = (fields: F) => Record<keyof F, any>
export type FormConstraints<F> = Constraints<F>

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
  constraints: FormConstraints<F>
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
        const errors = validate(
          state.fields,
          constraints(state.fields),
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
): Record<keyof F, string[]> {
  const constraints = makeConstraints(fields) || {}
  const keys = Object.keys(fields) as (keyof F)[]
  const initialErrors = keys.reduce(
    (prev, key) => ({ ...prev, [key]: [] }),
    {},
  )

  const filteredConstraints = keys.reduce((prev, key) => {
    return constraints[key]
      ? { ...prev, [key]: constraints[key] }
      : prev
  }, {})
  const errors = validate(fields, filteredConstraints) || {}
  return { ...initialErrors, ...errors }
}

export function isFormValid<F>(
  fields: F,
  makeConstraints: Constraints<F>,
) {
  const errors = getErrorsForFields(fields, makeConstraints)
  const keys = Object.keys(errors) as (keyof F)[]
  return keys.reduce((prev, key) => {
    return prev && !errors[key].length
  }, true)
}

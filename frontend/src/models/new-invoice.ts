import { Helix } from 'helix-js'
import * as Form from './form'

interface Fields {
  number: number
}

interface LocalState {}

export interface State extends LocalState {
  form: Form.State<Fields>
}

interface Reducers {}

interface Effects {}

type LocalActions = Helix.Actions<Reducers, Effects>

export interface Actions extends LocalActions {
  form: Form.Actions<Fields>
}

export const model: Helix.Model<LocalState, Reducers, Effects> = {
  state: {},
  reducers: {},
  models: {
    form: Form.model({
      constraints: fields => ({
        number: { presence: true },
      }),
      defaultForm: () => ({
        number: 0,
      }),
      onValidationError: () => null,
    }),
  },
}

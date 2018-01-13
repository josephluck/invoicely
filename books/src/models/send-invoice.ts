import { Helix } from 'helix-js'
import * as Form from './form'
// import { GlobalState, GlobalActions } from './index'

interface Fields {
  email: string
  notes: string
}

export interface LocalState {
  modalShowing: boolean
}

export interface State extends LocalState {
  form: Form.State<Fields>
}

interface Reducers {
  setModalShowing: Helix.Reducer<State, boolean>
}

interface Effects {}

export type LocalActions = Helix.Actions<Reducers, Effects>

export interface Actions extends LocalActions {
  form: Form.Actions<Fields>
}

function emptyState(): LocalState {
  return {
    modalShowing: false,
  }
}

export const model: Helix.Model<LocalState, Reducers, Effects> = {
  state: emptyState(),
  reducers: {
    setModalShowing: (state, modalShowing) => ({ modalShowing }),
  },
  effects: {},
  models: {
    form: Form.model<Fields>({
      constraints: () => ({
        email: { presence: true },
        notes: undefined,
      }),
      defaultForm: () => ({
        email: '',
        notes: '',
      }),
    }),
  },
}

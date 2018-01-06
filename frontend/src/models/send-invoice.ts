import { Helix } from 'helix-js'
// import { GlobalState, GlobalActions } from './index'

export interface State {
  modalShowing: boolean
}

interface Reducers {
  setModalShowing: Helix.Reducer<State, boolean>
}

interface Effects {}

export type Actions = Helix.Actions<Reducers, Effects>

function emptyState(): State {
  return {
    modalShowing: false,
  }
}

export const model: Helix.Model<State, Reducers, Effects> = {
  state: emptyState(),
  reducers: {
    setModalShowing: (state, modalShowing) => ({ modalShowing }),
  },
  effects: {},
}

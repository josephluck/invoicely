import { Helix } from 'helix-js'

export interface State {
  count: number
}

interface Reducers {
  increment: Helix.Reducer0<State>
}

interface Effects { }

export type Actions = Helix.Actions<Reducers, Effects>

export const model: Helix.Model<State, Reducers, Effects> = {
  state: {
    count: 0
  },
  reducers: {
    increment: (state) => ({ count: state.count + 1 }),
  }
}

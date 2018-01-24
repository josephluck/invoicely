import { Helix } from 'helix-js'

export interface State {
  expansionIndex: number | null
}

export interface Reducers {
  setExpansionIndex: Helix.Reducer<State, number | null>
}

export interface Effects {}

export type Actions = Helix.Actions<Reducers, Effects>

export function model(): Helix.Model<State, Reducers, Effects> {
  return {
    scoped: true,
    state: { expansionIndex: null },
    reducers: {
      setExpansionIndex(state, expansionIndex) {
        return { expansionIndex }
      },
    },
    effects: {},
  }
}

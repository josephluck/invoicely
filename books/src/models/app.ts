import { Helix } from 'helix-js'

export interface State {
  sidebarShowing: boolean
}

interface Reducers {
  setSidebarShowing: Helix.Reducer<State, boolean>
}

interface Effects {}

export type Actions = Helix.Actions<Reducers, Effects>

export const model: Helix.Model<State, Reducers, Effects> = {
  state: {
    sidebarShowing: false,
  },
  reducers: {
    setSidebarShowing: (state, sidebarShowing) => ({
      sidebarShowing,
    }),
  },
}

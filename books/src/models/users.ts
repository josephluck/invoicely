import { Helix } from 'helix-js'
import { Invitation } from 'api/src/domains/invitation/entity'
import {
  GlobalState,
  GlobalActions,
  ModelDependencies,
} from './index'
import * as ExpansionPanel from './expansion-panel'

export interface LocalState {
  invitations: Invitation[]
}

export interface State extends LocalState {
  expansionPanel: ExpansionPanel.State
}

interface Reducers {
  setInvitations: Helix.Reducer<State, Invitation[]>
}

interface Effects {
  fetch: Helix.Effect0<GlobalState, GlobalActions>
}

export type LocalActions = Helix.Actions<Reducers, Effects>

export interface Actions extends LocalActions {
  expansionPanel: ExpansionPanel.Actions
}

function emptyState(): LocalState {
  return {
    invitations: [],
  }
}

export function model(
  deps: ModelDependencies,
): Helix.Model<LocalState, Reducers, Effects> {
  return {
    state: emptyState(),
    reducers: {
      setInvitations: (state, invitations) => ({ invitations }),
    },
    effects: {
      async fetch(state, actions) {
        const invitations = await deps.api.invitation.getAll()
        actions.users.setInvitations(invitations)
      },
    },
    models: {
      expansionPanel: ExpansionPanel.model(),
    },
  }
}

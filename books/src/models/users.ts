import { Helix } from 'helix-js'
import { Invitation } from 'api/src/domains/invitation/entity'
import {
  GlobalState,
  GlobalActions,
  ModelDependencies,
} from './index'
import * as Form from './form'

interface InvitationFields {
  name: string
  email: string
}

export interface LocalState {
  invitations: Invitation[]
}

export interface State extends LocalState {
  invitationForm: Form.State<InvitationFields>
}

interface Reducers {
  setInvitations: Helix.Reducer<State, Invitation[]>
}

interface Effects {
  fetchInvitations: Helix.Effect0<GlobalState, GlobalActions>
  saveInvitation: Helix.Effect0<GlobalState, GlobalActions>
}

export type LocalActions = Helix.Actions<Reducers, Effects>

export interface Actions extends LocalActions {
  invitationForm: Form.Actions<InvitationFields>
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
      async fetchInvitations(state, actions) {
        const invitations = await deps.api.invitation.getAll()
        actions.users.setInvitations(invitations)
      },
      async saveInvitation(state, actions) {
        actions.users.invitationForm.validateOnSubmit().fold(
          () => null,
          async form => {
            await deps.api.invitation.saveNew(form.fields)
            actions.location.set('/users')
          },
        )
      },
    },
    models: {
      invitationForm: Form.model<InvitationFields>({
        defaultForm: () => ({ name: '', email: '' }),
        constraints: () => ({
          name: { presence: true },
          email: { presence: true },
        }),
      }),
    },
  }
}

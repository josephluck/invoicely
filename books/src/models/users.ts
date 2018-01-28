import { Helix } from 'helix-js'
import { Invitation } from 'api/src/domains/invitation/entity'
import { User } from 'api/src/domains/user/entity'
import constraints from 'api/src/domains/invitation/constraints'
import {
  GlobalState,
  GlobalActions,
  ModelDependencies,
} from './index'
import * as Form from './form'
import { Some, None, Option } from 'space-lift'

interface InvitationFields {
  name: string
  email: string
}

export interface LocalState {
  invitations: Invitation[]
  invitation: Option<Invitation>
  users: User[]
}

export interface State extends LocalState {
  invitationForm: Form.State<InvitationFields>
}

interface Reducers {
  setInvitations: Helix.Reducer<State, Invitation[]>
  setInvitation: Helix.Reducer<State, Invitation>
  setUsers: Helix.Reducer<State, User[]>
}

interface Effects {
  fetchInvitations: Helix.Effect0<GlobalState, GlobalActions>
  fetchInvitation: Helix.Effect<GlobalState, GlobalActions, string>
  deleteInvitation: Helix.Effect<GlobalState, GlobalActions, string>
  saveInvitation: Helix.Effect0<GlobalState, GlobalActions>
  fetchUsers: Helix.Effect0<GlobalState, GlobalActions>
  deleteUser: Helix.Effect<GlobalState, GlobalActions, string>
}

export type LocalActions = Helix.Actions<Reducers, Effects>

export interface Actions extends LocalActions {
  invitationForm: Form.Actions<InvitationFields>
}

function emptyState(): LocalState {
  return {
    invitations: [],
    invitation: None,
    users: [],
  }
}

export function model(
  deps: ModelDependencies,
): Helix.Model<LocalState, Reducers, Effects> {
  return {
    state: emptyState(),
    reducers: {
      setInvitations: (state, invitations) => ({ invitations }),
      setInvitation: (state, invitation) => ({
        invitation: Some(invitation),
      }),
      setUsers: (state, users) => ({ users }),
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
            state.location.params.invitationId
              ? await deps.api.invitation.updateById(
                  state.location.params.invitationId,
                  form.fields,
                )
              : await deps.api.invitation.create(form.fields)
            actions.location.set('/users')
          },
        )
      },
      async deleteInvitation(state, actions, invitationId) {
        await deps.api.invitation.deleteById(invitationId)
        actions.users.fetchInvitations()
      },
      async fetchInvitation(state, actions, invitationId) {
        const invitation = await deps.api.invitation.getById(
          invitationId,
        )
        actions.users.setInvitation(invitation)
        actions.users.invitationForm.setFields({
          email: invitation.email,
          name: invitation.name,
        })
      },
      async fetchUsers(state, actions) {
        const users = await deps.api.user.findAll()
        actions.users.setUsers(users)
      },
      async deleteUser(state, actions, userId) {
        await deps.api.user.deleteById(userId)
        actions.users.fetchUsers()
      },
    },
    models: {
      invitationForm: Form.model<InvitationFields>({
        defaultForm: () => ({ name: '', email: '' }),
        constraints,
      }),
    },
  }
}

import { Helix } from 'helix-js'
import * as Form from './form'
import { GlobalState, GlobalActions } from './index'
// import { GlobalState, GlobalActions } from './index'
import { User } from 'types'
import userFixture from 'fixtures/src/user'
import { Option, Some, None } from 'space-lift'

interface LoginFields {
  username: string
  password: string
}

interface LocalState {
  user: Option<User>
}

export interface State extends LocalState {
  loginForm: Form.State<LoginFields>
}

interface Reducers {
  resetState: Helix.Reducer0<State>
  setUser: Helix.Reducer<State, User>
}

interface Effects {
  check: Helix.Effect0<GlobalState, GlobalActions>
  login: Helix.Effect0<GlobalState, GlobalActions>
  logout: Helix.Effect0<GlobalState, GlobalActions>
}

type LocalActions = Helix.Actions<Reducers, Effects>

export interface Actions extends LocalActions {
  loginForm: Form.Actions<LoginFields>
}

function emptyState(): LocalState {
  return {
    user: None,
  }
}

export const model: Helix.Model<LocalState, Reducers, Effects> = {
  state: emptyState(),
  reducers: {
    resetState: emptyState,
    setUser(state, user) {
      return {
        user: Some(user),
      }
    },
  },
  effects: {
    check(state, actions) {
      return state.authentication.user.fold(() => {
        actions.location.set(
          `/login?redirect=${state.location.pathname}`,
        )
        return false
      }, () => true)
    },
    login(state, actions) {
      actions.authentication.loginForm.validateOnSubmit().fold(
        () => null,
        ({ fields }) => {
          actions.authentication.setUser(userFixture())
          actions.location.set(
            state.location.query.redirect || '/invoices',
          )
        },
      )
    },
    logout(state, actions) {
      actions.authentication.resetState()
      actions.location.set('/login')
    },
  },
  models: {
    loginForm: Form.model<LoginFields>({
      constraints: fields => ({
        username: { presence: true },
        password: { presence: true },
      }),
      defaultForm: () => ({
        username: '',
        password: '',
      }),
    }),
  },
}

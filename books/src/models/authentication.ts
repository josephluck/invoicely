import { Helix } from 'helix-js'
import * as Form from './form'
import { GlobalState, GlobalActions } from './index'
// import { GlobalState, GlobalActions } from './index'
import { User } from 'types'
import userFixture from 'fixtures/src/user'
import { Option, Some, None } from 'space-lift'

interface LoginFields {
  email: string
  password: string
}

interface RegisterFields {
  email: string
  name: string
  password: string
  passwordConfirmation: string
}

interface LocalState {
  user: Option<User>
}

export interface State extends LocalState {
  loginForm: Form.State<LoginFields>
  registerForm: Form.State<RegisterFields>
}

interface Reducers {
  resetState: Helix.Reducer0<State>
  setUser: Helix.Reducer<State, User>
}

interface Effects {
  check: Helix.Effect0<GlobalState, GlobalActions>
  login: Helix.Effect0<GlobalState, GlobalActions>
  register: Helix.Effect0<GlobalState, GlobalActions>
  logout: Helix.Effect0<GlobalState, GlobalActions>
}

type LocalActions = Helix.Actions<Reducers, Effects>

export interface Actions extends LocalActions {
  loginForm: Form.Actions<LoginFields>
  registerForm: Form.Actions<RegisterFields>
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
    register(state, actions) {
      actions.authentication.registerForm.validateOnSubmit().fold(
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
        email: { presence: true },
        password: { presence: true },
      }),
      defaultForm: () => ({
        email: '',
        password: '',
      }),
    }),
    registerForm: Form.model<RegisterFields>({
      constraints: fields => ({
        email: { presence: true },
        name: { presence: true },
        password: { presence: true },
        passwordConfirmation: { presence: true },
      }),
      defaultForm: () => ({
        email: '',
        name: '',
        password: '',
        passwordConfirmation: '',
      }),
    }),
  },
}

import { Helix } from 'helix-js'
import * as Form from './form'
import { GlobalState, GlobalActions } from './index'
import { User } from 'types'
import userFixture from 'fixtures/src/user'
import { Option, Some } from 'space-lift'

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

interface ForgotFields {
  email: string
}

interface ResetFields {
  password: string
  passwordConfirmation: string
}

interface LocalState {
  user: Option<User>
}

export interface State extends LocalState {
  loginForm: Form.State<LoginFields>
  registerForm: Form.State<RegisterFields>
  forgotForm: Form.State<ForgotFields>
  resetForm: Form.State<ResetFields>
}

interface Reducers {
  resetState: Helix.Reducer0<State>
  setUser: Helix.Reducer<State, User>
}

interface Effects {
  check: Helix.Effect0<GlobalState, GlobalActions>
  login: Helix.Effect0<GlobalState, GlobalActions>
  register: Helix.Effect0<GlobalState, GlobalActions>
  forgot: Helix.Effect0<GlobalState, GlobalActions>
  reset: Helix.Effect0<GlobalState, GlobalActions>
  logout: Helix.Effect0<GlobalState, GlobalActions>
}

type LocalActions = Helix.Actions<Reducers, Effects>

export interface Actions extends LocalActions {
  loginForm: Form.Actions<LoginFields>
  registerForm: Form.Actions<RegisterFields>
  forgotForm: Form.Actions<ForgotFields>
  resetForm: Form.Actions<ResetFields>
}

function emptyState(): LocalState {
  return {
    user: Some(userFixture()),
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
    forgot(state, actions) {
      actions.authentication.forgotForm.validateOnSubmit().fold(
        () => null,
        () => {
          console.log('submit forgot')
        },
      )
    },
    reset(state, actions) {
      actions.authentication.resetForm.validateOnSubmit().fold(
        () => null,
        () => {
          console.log('submit reset')
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
    forgotForm: Form.model<ForgotFields>({
      constraints: fields => ({
        email: { presence: true },
      }),
      defaultForm: () => ({
        email: '',
      }),
    }),
    resetForm: Form.model<ResetFields>({
      constraints: fields => ({
        password: { presence: true },
        passwordConfirmation: { presence: true },
      }),
      defaultForm: () => ({
        password: '',
        passwordConfirmation: '',
      }),
    }),
  },
}

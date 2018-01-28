import { Helix } from 'helix-js'
import { Option, Some, None } from 'space-lift'
import {
  GlobalState,
  GlobalActions,
  ModelDependencies,
} from './index'
import * as Form from './form'
import { User } from 'api/src/domains/user/entity'

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
  token: Option<string>
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

function emptyState(token: string | null): LocalState {
  return {
    user: None,
    token: Option(token),
  }
}

export function model(
  deps: ModelDependencies,
  token: string | null,
): Helix.Model<LocalState, Reducers, Effects> {
  return {
    state: emptyState(token),
    reducers: {
      resetState: () => emptyState(token),
      setUser(state, user) {
        return {
          user: Some(user),
        }
      },
    },
    effects: {
      check(state, actions) {
        function redirect() {
          console.log(
            'TODO: Attempt to log in again using a refresh token',
          )
          actions.location.set(
            `/login?redirect=${state.location.pathname}`,
          )
        }
        state.authentication.token.fold(redirect, token => {
          state.authentication.user.fold(async () => {
            const response = Option(await deps.api.auth.session())
            response.fold(redirect, actions.authentication.setUser)
          }, () => true)
        })
      },
      login(state, actions) {
        actions.authentication.loginForm.validateOnSubmit().fold(
          () => null,
          async ({ fields }) => {
            const response = await deps.api.auth.login({
              email: fields.email,
              password: fields.password,
            })
            deps.localStorage.setItem('auth-token', response.token)
            deps.api.setToken(response.token)
            console.log(await deps.api.user.findAll())
            actions.authentication.setUser(response.user)
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
        deps.localStorage.removeItem('auth-token')
        actions.location.set('/login')
      },
    },
    models: {
      loginForm: Form.model<LoginFields>({
        constraints: fields => ({
          email: { required: true },
          password: { required: true },
        }),
        defaultForm: () => ({
          email: '',
          password: '',
        }),
      }),
      registerForm: Form.model<RegisterFields>({
        constraints: fields => ({
          email: { required: true },
          name: { required: true },
          password: { required: true },
          passwordConfirmation: { required: true },
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
          email: { required: true },
        }),
        defaultForm: () => ({
          email: '',
        }),
      }),
      resetForm: Form.model<ResetFields>({
        constraints: fields => ({
          password: { required: true },
          passwordConfirmation: { required: true },
        }),
        defaultForm: () => ({
          password: '',
          passwordConfirmation: '',
        }),
      }),
    },
  }
}

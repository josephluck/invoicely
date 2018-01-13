import { Helix } from 'helix-js'
import * as Form from './form'
import { GlobalState, GlobalActions } from './index'
// import { GlobalState, GlobalActions } from './index'
import { User } from 'types'
import userFixture from 'fixtures/src/user'
import { Option, Some } from 'space-lift'

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

interface Reducers {}

interface Effects {
  login: Helix.Effect0<GlobalState, GlobalActions>
}

type LocalActions = Helix.Actions<Reducers, Effects>

export interface Actions extends LocalActions {
  loginForm: Form.Actions<LoginFields>
}

function emptyState(): LocalState {
  return {
    user: Some(userFixture()),
  }
}

export const model: Helix.Model<LocalState, Reducers, Effects> = {
  state: emptyState(),
  reducers: {},
  effects: {
    login(state, actions) {
      actions.authentication.loginForm.validateOnSubmit().fold(
        () => null,
        ({ fields }) => {
          console.log('Submit the login form with', fields)
        },
      )
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

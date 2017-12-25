import { Helix } from 'helix-js'
import * as dates from 'date-fns'
import * as Form from './form'

interface Fields {
  number: string
  dateCreated: string
  dateDue: string
}

interface LocalState {}

export interface State extends LocalState {
  form: Form.State<Fields>
}

interface Reducers {}

interface Effects {}

type LocalActions = Helix.Actions<Reducers, Effects>

export interface Actions extends LocalActions {
  form: Form.Actions<Fields>
}

export const model: Helix.Model<LocalState, Reducers, Effects> = {
  state: {},
  reducers: {},
  models: {
    form: Form.model<Fields>({
      constraints: fields => {
        return {
          number: { presence: true },
          dateCreated: { presence: true },
          dateDue: { presence: true },
        }
      },
      defaultForm: () => ({
        number: '',
        dateCreated: dates.format(new Date(), 'YYYY-MM-DD'),
        dateDue: dates.format(
          dates.addMonths(new Date(), 1),
          'YYYY-MM-DD',
        ),
      }),
      onValidationError: () => null,
    }),
  },
}

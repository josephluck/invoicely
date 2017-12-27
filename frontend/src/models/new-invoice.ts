import { Helix } from 'helix-js'
import * as dates from 'date-fns'
import * as Form from './form'
import { Row } from '../components/spreadsheet'

interface Fields {
  invoiceNumber: string
  dateCreated: string
  dateDue: string
  billingAddress: string
  companyAddress: string
}

interface LocalState {
  lineItems: Row[]
}

export interface State extends LocalState {
  form: Form.State<Fields>
}

interface Reducers {
  setLineItems: Helix.Reducer<State, Row[]>
}

interface Effects {}

type LocalActions = Helix.Actions<Reducers, Effects>

export interface Actions extends LocalActions {
  form: Form.Actions<Fields>
}

function emptyState(): LocalState {
  return {
    lineItems: [
      {
        description: 'Panda Egg Cup',
        quantity: 1,
        price: 12.5,
      },
      { description: 'Quail Eggs', quantity: 1, price: 11 },
      {
        description: 'Sourdough Bread',
        quantity: 1,
        price: 13.75,
      },
    ],
  }
}

export const model: Helix.Model<LocalState, Reducers, Effects> = {
  state: emptyState(),
  reducers: {
    setLineItems(state, lineItems) {
      return { lineItems }
    },
  },
  models: {
    form: Form.model<Fields>({
      constraints: fields => {
        return {
          invoiceNumber: { presence: true },
          billingAddress: { presence: true },
          companyAddress: { presence: true },
          dateCreated: { presence: true },
          dateDue: { presence: true },
        }
      },
      defaultForm: () => ({
        invoiceNumber: '1001',
        billingAddress: 'Acme Corp\n13 The Street\nThe Town\n19920',
        companyAddress: 'Apple Inc\nSilicon Roundabout\n17380',
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

import { Helix } from 'helix-js'
import * as Counter from './counter'
import * as NewInvoice from './new-invoice'
import * as Invoice from './invoice'

type Models = Helix.Models<{
  counter: Helix.ModelApi<Counter.State, Counter.Actions>
  newInvoice: Helix.ModelApi<NewInvoice.State, NewInvoice.Actions>
  invoice: Helix.ModelApi<Invoice.State, Invoice.Actions>
}>

export type GlobalState = Models['state']
export type GlobalActions = Models['actions']

const model: Helix.Model<any, any, any> = {
  state: {},
  models: {
    counter: Counter.model,
    newInvoice: NewInvoice.model,
    invoice: Invoice.model,
  },
}

export default model

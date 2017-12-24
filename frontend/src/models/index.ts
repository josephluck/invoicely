import { Helix } from 'helix-js'
import * as Counter from './counter'
import * as NewInvoice from './new-invoice'

type Models = Helix.Models<{
  counter: Helix.ModelApi<Counter.State, Counter.Actions>
  newInvoice: Helix.ModelApi<NewInvoice.State, NewInvoice.Actions>
}>

export type GlobalState = Models['state']
export type GlobalActions = Models['actions']

const model: Helix.Model<any, any, any> = {
  state: {},
  models: {
    counter: Counter.model,
    newInvoice: NewInvoice.model,
  },
}

export default model

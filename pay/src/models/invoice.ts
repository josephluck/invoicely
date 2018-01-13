import { Helix } from 'helix-js'
import { Invoice } from 'types'
// import { GlobalState, GlobalActions } from './index'
import invoiceFixture from '../fixtures/invoice'

export interface State {
  invoice: Invoice
}

interface Reducers {
  setInvoice: Helix.Reducer<State, Invoice>
}

interface Effects {}

export type Actions = Helix.Actions<Reducers, Effects>

function emptyState(): State {
  return {
    invoice: invoiceFixture(),
  }
}

export const model: Helix.Model<State, Reducers, Effects> = {
  state: emptyState(),
  reducers: {
    setInvoice: (state, invoice) => ({ invoice }),
  },
  effects: {},
}

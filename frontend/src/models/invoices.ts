import { Helix } from 'helix-js'
import { Invoice } from '../types'
// import { GlobalState, GlobalActions } from './index'
import invoiceFixture from '../fixtures/invoice'

export interface State {
  invoices: Invoice[]
}

interface Reducers {}

interface Effects {}

export type Actions = Helix.Actions<Reducers, Effects>

function emptyState(): State {
  return {
    invoices: [
      invoiceFixture(),
      invoiceFixture(),
      invoiceFixture(),
      invoiceFixture(),
      invoiceFixture(),
      invoiceFixture(),
      invoiceFixture(),
      invoiceFixture(),
      invoiceFixture(),
      invoiceFixture(),
    ],
  }
}

export const model: Helix.Model<State, Reducers, Effects> = {
  state: emptyState(),
  reducers: {},
  effects: {},
}

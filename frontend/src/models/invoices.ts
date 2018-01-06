import { Helix } from 'helix-js'
import { Invoice, InvoiceStatus } from '../types'
import { GlobalState, GlobalActions } from './index'
import invoiceFixture from '../fixtures/invoice'

export interface State {
  invoices: Invoice[]
  activeFilter: InvoiceStatus | null
}

interface Reducers {
  setInvoices: Helix.Reducer<State, Invoice[]>
  setActiveFilter: Helix.Reducer<State, InvoiceStatus | null>
}

interface Effects {
  filter: Helix.Effect<
    GlobalState,
    GlobalActions,
    InvoiceStatus | null
  >
}

export type Actions = Helix.Actions<Reducers, Effects>

function randomInvoices() {
  return [
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
  ]
}

function emptyState(): State {
  return {
    invoices: randomInvoices(),
    activeFilter: null,
  }
}

export const model: Helix.Model<State, Reducers, Effects> = {
  state: emptyState(),
  reducers: {
    setInvoices: (state, invoices) => ({ invoices }),
    setActiveFilter: (state, activeFilter) => ({ activeFilter }),
  },
  effects: {
    filter(state, actions, activeFilter) {
      actions.invoices.setActiveFilter(activeFilter)
      actions.invoices.setInvoices(
        activeFilter
          ? randomInvoices().filter(
              invoice => invoice.status === activeFilter,
            )
          : randomInvoices(),
      )
    },
  },
}

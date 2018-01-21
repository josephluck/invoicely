import { Helix } from 'helix-js'
import { Invoice, InvoiceStatus } from 'types'
import {
  GlobalState,
  GlobalActions,
  ModelDependencies,
} from './index'
import invoiceFixture from 'fixtures/src/invoice'

export interface State {
  invoices: Invoice[]
  activeFilter: InvoiceStatus | null
}

interface Reducers {
  setInvoices: Helix.Reducer<State, Invoice[]>
  setActiveFilter: Helix.Reducer<State, InvoiceStatus | null>
}

interface Effects {
  fetch: Helix.Effect0<GlobalState, GlobalActions>
  filter: Helix.Effect<
    GlobalState,
    GlobalActions,
    InvoiceStatus | null
  >
  startSendInvoice: Helix.Effect<GlobalState, GlobalActions, string>
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

export function model(
  deps: ModelDependencies,
): Helix.Model<State, Reducers, Effects> {
  return {
    state: emptyState(),
    reducers: {
      setInvoices: (state, invoices) => ({ invoices }),
      setActiveFilter: (state, activeFilter) => ({ activeFilter }),
    },
    effects: {
      async fetch(state, actions) {
        console.log(await deps.api.user.findAll())
      },
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
      startSendInvoice(state, actions, invoiceId) {
        const invoice = state.invoices.invoices.find(
          i => i.id === invoiceId,
        )
        if (invoice) {
          actions.invoice.setInvoice(invoice)
          actions.sendInvoice.setModalShowing(true)
        }
      },
    },
  }
}

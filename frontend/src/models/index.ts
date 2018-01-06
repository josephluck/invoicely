import { Helix } from 'helix-js'
import * as Counter from './counter'
import * as InvoiceForm from './invoice-form'
import * as Invoice from './invoice'
import * as Invoices from './invoices'

type Models = Helix.Models<{
  counter: Helix.ModelApi<Counter.State, Counter.Actions>
  invoiceForm: Helix.ModelApi<InvoiceForm.State, InvoiceForm.Actions>
  invoices: Helix.ModelApi<Invoices.State, Invoices.Actions>
  invoice: Helix.ModelApi<Invoice.State, Invoice.Actions>
}>

export type GlobalState = Models['state']
export type GlobalActions = Models['actions']

const model: Helix.Model<any, any, any> = {
  state: {},
  models: {
    counter: Counter.model,
    invoiceForm: InvoiceForm.model,
    invoice: Invoice.model,
    invoices: Invoices.model,
  },
}

export default model

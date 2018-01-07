import { Helix } from 'helix-js'
import * as App from './app'
import * as InvoiceForm from './invoice-form'
import * as Invoice from './invoice'
import * as Invoices from './invoices'
import * as SendInvoice from './send-invoice'
import * as Payments from './payments'

type Models = Helix.Models<{
  app: Helix.ModelApi<App.State, App.Actions>
  invoiceForm: Helix.ModelApi<InvoiceForm.State, InvoiceForm.Actions>
  invoices: Helix.ModelApi<Invoices.State, Invoices.Actions>
  invoice: Helix.ModelApi<Invoice.State, Invoice.Actions>
  sendInvoice: Helix.ModelApi<SendInvoice.State, SendInvoice.Actions>
  payments: Helix.ModelApi<Payments.State, Payments.Actions>
}>

export type GlobalState = Models['state']
export type GlobalActions = Models['actions']

const model: Helix.Model<any, any, any> = {
  state: {},
  models: {
    app: App.model,
    invoiceForm: InvoiceForm.model,
    invoice: Invoice.model,
    invoices: Invoices.model,
    sendInvoice: SendInvoice.model,
    payments: Payments.model,
  },
}

export default model

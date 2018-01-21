import { Helix } from 'helix-js'
import * as App from './app'
import * as InvoiceForm from './invoice-form'
import * as Invoice from './invoice'
import * as Invoices from './invoices'
import * as SendInvoice from './send-invoice'
import * as Payments from './payments'
import * as Authentication from './authentication'
import api from 'api/src/domains/api'

type Models = Helix.Models<{
  app: Helix.ModelApi<App.State, App.Actions>
  invoiceForm: Helix.ModelApi<InvoiceForm.State, InvoiceForm.Actions>
  invoices: Helix.ModelApi<Invoices.State, Invoices.Actions>
  invoice: Helix.ModelApi<Invoice.State, Invoice.Actions>
  sendInvoice: Helix.ModelApi<SendInvoice.State, SendInvoice.Actions>
  payments: Helix.ModelApi<Payments.State, Payments.Actions>
  authentication: Helix.ModelApi<
    Authentication.State,
    Authentication.Actions
  >
}>

export type GlobalState = Helix.HelixState<Models['state']>
export type GlobalActions = Helix.HelixActions<Models['actions']>

const dependencies = {
  api: api(window.localStorage.getItem('auth-token') || undefined),
  localStorage: window.localStorage,
}

export type ModelDependencies = typeof dependencies

const model: Helix.Model<any, any, any> = {
  state: {},
  models: {
    app: App.model,
    invoiceForm: InvoiceForm.model,
    invoice: Invoice.model,
    invoices: Invoices.model(dependencies),
    sendInvoice: SendInvoice.model,
    payments: Payments.model,
    authentication: Authentication.model(
      dependencies,
      dependencies.localStorage.getItem('auth-token'),
    ),
  },
}

export default model

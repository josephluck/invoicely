import invoiceForm from './invoice-form'
import invoices from './invoices'
// import previewInvoice from './preview-invoice'

const routes = {
  invoices: invoices,
  '/invoices/new': invoiceForm,
  '/invoices/:invoiceId/edit': invoiceForm,
}

export default routes

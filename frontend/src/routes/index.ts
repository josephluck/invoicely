import invoiceForm from './invoice-form'
import invoices from './invoices'
import previewInvoice from './preview-invoice'

const routes = {
  invoices: invoices,
  '/invoices/new': invoiceForm,
  '/invoices/:invoiceId/edit': invoiceForm,
  '/invoices/:invoiceId/preview': previewInvoice,
}

export default routes

import invoiceForm from './invoice-form'
import invoices from './invoices'
import previewInvoice from './preview-invoice'
import invoice from './invoice'
import payments from './payments'

const routes = {
  invoices: invoices,
  '/invoices/new': invoiceForm,
  '/invoices/:invoiceId': invoice,
  '/invoices/:invoiceId/edit': invoiceForm,
  '/invoices/:invoiceId/preview': previewInvoice,
  '/payments': payments,
}

export default routes

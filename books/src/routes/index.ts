import invoiceForm from './invoice-form'
import invoices from './invoices'
import previewInvoice from './preview-invoice'
import invoice from './invoice'
import payments from './payments'
import login from './login'

const routes = {
  invoices: invoices,
  '/invoices/new': invoiceForm,
  '/invoices/:invoiceId': invoice,
  '/invoices/:invoiceId/edit': invoiceForm,
  '/invoices/:invoiceId/preview': previewInvoice,
  '/payments': payments,
  '/login': login,
}

export default routes

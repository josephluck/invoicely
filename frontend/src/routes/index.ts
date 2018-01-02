import newInvoice from './new-invoice'
import previewInvoice from './preview-invoice'

const routes = {
  '/invoices/new': newInvoice,
  '/invoices/:invoiceId/preview': previewInvoice,
}

export default routes

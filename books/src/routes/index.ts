import invoiceForm from './invoice-form'
import invoices from './invoices'
import invoice from './invoice'
import payments from './payments'
import login from './login'
import register from './register'

const routes = {
  '/invoices': invoices,
  '/invoices/new': invoiceForm,
  '/invoices/:invoiceId': invoice,
  '/invoices/:invoiceId/edit': invoiceForm,
  '/payments': payments,
  '/login': login,
  '/register': register,
}

export default routes

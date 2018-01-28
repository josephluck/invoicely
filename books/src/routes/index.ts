import invoiceForm from './invoice-form'
import inviteForm from './invitation-form'
import users from './users'
import invoices from './invoices'
import invoice from './invoice'
import payments from './payments'
import login from './login'
import register from './register'
import forgot from './forgot'
import reset from './reset'

const routes = {
  '/users': users,
  '/users/new': inviteForm,
  '/users/invitations/:invitationId': inviteForm,
  '/invoices': invoices,
  '/invoices/new': invoiceForm,
  '/invoices/:invoiceId': invoice,
  '/invoices/:invoiceId/edit': invoiceForm,
  '/payments': payments,
  '/login': login,
  '/register/:invitationId': register,
  '/forgot': forgot,
  '/reset': reset,
}

export default routes

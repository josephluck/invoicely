import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import Layout, { Title as LayoutTitle } from './layout'
import ExpansionPanel from 'ui/src/expansion-panel'
import { humanizeDate } from '../utils/dates'
import Button from 'ui/src/button'
import PaymentDetails from 'ui/src/payment-details'
import { formatAsCurrency } from '../utils/invoice'

const page: Helix.Page<GlobalState, GlobalActions> = {
  view: (state, prev, actions) => {
    return (
      <Layout
        title={<LayoutTitle>Payments</LayoutTitle>}
        state={state}
        actions={actions}
        activeTab="payments"
      >
        <div className="flex-1 of-auto pa-5">
          <div className="mb-5 d-flex align-items-center">
            <div className="flex-1" />
            <Button href="/payments/new" size="small">
              New Payment
            </Button>
          </div>
          <ExpansionPanel
            cards={state.payments.payments.map(payment => {
              return {
                header: (isExpanded: boolean) => (
                  <div className="pl-5 pv-5 d-flex of-hidden align-items-center fs-small">
                    <a
                      href={`/payments/${payment.id}`}
                      className="flex-1 mr-4 fw-bold"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {humanizeDate(payment.dateCreated)}
                    </a>
                    <span
                      className={`flex-1 mr-4 truncate transition ${
                        isExpanded ? 'o-0' : 'o-100'
                      }`}
                    >
                      #{payment.id}
                    </span>
                    <span
                      className={`flex-2 mr-4 truncate transition ${
                        isExpanded ? 'o-0' : 'o-100'
                      }`}
                    >
                      {payment.invoice.companyAddress}
                    </span>
                    <span
                      className={`flex-1 mr-5 ta-r fw-bold fc-gray-600 transition ${
                        isExpanded ? 'o-0' : 'o-100'
                      }`}
                    >
                      {formatAsCurrency(payment.amount)}
                    </span>
                  </div>
                ),
                content: (
                  <div>
                    <PaymentDetails
                      payment={payment}
                      className="pa-5"
                    />
                    <div className="ph-5 pv-4 bt bc-gray-200 d-flex">
                      <div className="flex-1">
                        <Button
                          type="secondary"
                          size="small"
                          href={`/payments/${payment.id}`}
                          className="mr-3"
                        >
                          View Payment
                        </Button>
                        <Button
                          type="secondary"
                          size="small"
                          href={`/invoices/${payment.invoiceId}`}
                        >
                          View Invoice
                        </Button>
                      </div>
                      <div>
                        <Button type="secondary" size="small">
                          Download Receipt
                        </Button>
                        <Button className="ml-3" size="small">
                          Send Receipt
                        </Button>
                      </div>
                    </div>
                  </div>
                ),
              }
            })}
          />
        </div>
      </Layout>
    )
  },
}

export default page

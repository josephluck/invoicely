import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import Layout, { Title as LayoutTitle } from './layout'
import ExpansionPanel from '../components/expansion-panel'
import { humanize } from '../utils/dates'
import Button from '../components/button'
import Label from '../components/label'
import { formatAsCurrency } from '../utils/invoice'

const page: Helix.Page<GlobalState, GlobalActions> = {
  view: (state, prev, actions) => {
    return (
      <Layout
        title={<LayoutTitle>Payments</LayoutTitle>}
        state={state}
        actions={actions}
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
                      {humanize(payment.dateCreated)}
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
                    <div className="pa-5 d-flex">
                      <div className="flex-1 mr-3">
                        <Label className="d-ib mb-1">
                          Payment Number
                        </Label>
                        <div className="mb-4 lh-4">#{payment.id}</div>
                        <Label className="d-ib mb-1">
                          Invoice Number
                        </Label>
                        <div className="mb-4 lh-4">
                          #{payment.invoiceId}
                        </div>
                        <Label className="d-ib mb-1">Total</Label>
                        <div className="lh-4">
                          {formatAsCurrency(payment.amount)}
                        </div>
                      </div>
                      <div className="flex-1 ml-3">
                        <Label className="d-ib mb-1">From</Label>
                        <div className="lh-4">
                          {payment.invoice.companyAddress}
                        </div>
                      </div>
                    </div>
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

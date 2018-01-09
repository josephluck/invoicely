import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import Layout, { Title as LayoutTitle } from './layout'
import ExpansionPanel from '../components/expansion-panel'
import { humanizeDate } from '../utils/dates'
import Tag from '../components/tag'
import Button from '../components/button'
import InvoiceDetails from '../components/invoice-details'
import Toggle from '../components/toggle'
import SendInvoice from '../components/send-invoice'
import {
  calculateTotal,
  formatAsCurrency,
  humanizeInvoiceStatus,
  getInvoiceStatusColor,
} from '../utils/invoice'

const page: Helix.Page<GlobalState, GlobalActions> = {
  view: (state, prev, actions) => {
    return (
      <Layout
        title={<LayoutTitle>Invoices</LayoutTitle>}
        state={state}
        actions={actions}
      >
        <div className="flex-1 of-auto pa-5">
          <div className="mb-5 d-flex align-items-center">
            <div className="flex-1">
              <Toggle
                checked={state.invoices.activeFilter === null}
                onChange={() => actions.invoices.filter(null)}
                color="teal"
                className="mr-3"
              >
                All
              </Toggle>
              <Toggle
                checked={state.invoices.activeFilter === 'draft'}
                onChange={checked => {
                  if (checked) {
                    actions.invoices.filter('draft')
                  } else {
                    actions.invoices.filter(null)
                  }
                }}
                color={getInvoiceStatusColor('draft')}
                className="mr-3"
              >
                Not Sent
              </Toggle>
              <Toggle
                checked={state.invoices.activeFilter === 'sent'}
                onChange={checked => {
                  if (checked) {
                    actions.invoices.filter('sent')
                  } else {
                    actions.invoices.filter(null)
                  }
                }}
                color={getInvoiceStatusColor('sent')}
                className="mr-3"
              >
                Sent
              </Toggle>
              <Toggle
                checked={state.invoices.activeFilter === 'paid'}
                onChange={checked => {
                  if (checked) {
                    actions.invoices.filter('paid')
                  } else {
                    actions.invoices.filter(null)
                  }
                }}
                color={getInvoiceStatusColor('paid')}
                className="mr-3"
              >
                Paid
              </Toggle>
            </div>
            <Button href="invoices/new" size="small">
              New Invoice
            </Button>
          </div>
          <ExpansionPanel
            cards={state.invoices.invoices.map(invoice => {
              return {
                header: (isExpanded: boolean) => (
                  <div className="pl-5 pv-5 d-flex of-hidden align-items-center fs-small">
                    <a
                      href={`/invoices/${invoice.id}`}
                      className="flex-1 mr-4 fw-bold"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {humanizeDate(invoice.dateCreated)}
                    </a>
                    <span
                      className={`flex-1 mr-4 truncate transition ${
                        isExpanded ? 'o-0' : 'o-100'
                      }`}
                    >
                      #{invoice.id}
                    </span>
                    <span
                      className={`flex-2 mr-4 truncate transition ${
                        isExpanded ? 'o-0' : 'o-100'
                      }`}
                    >
                      {invoice.companyAddress}
                    </span>
                    <span
                      className={`flex-1 mr-5 ta-r fw-bold fc-gray-600 transition ${
                        isExpanded ? 'o-0' : 'o-100'
                      }`}
                    >
                      {formatAsCurrency(calculateTotal(invoice))}
                    </span>
                    <div className="mr-4 flex-1 ta-r">
                      <Tag
                        className="d-ib"
                        color={getInvoiceStatusColor(invoice.status)}
                      >
                        {humanizeInvoiceStatus(invoice.status)}
                      </Tag>
                    </div>
                  </div>
                ),
                content: (
                  <div>
                    <InvoiceDetails
                      className="pa-5"
                      invoice={invoice}
                    />
                    <div className="ph-5 pv-4 bt bc-gray-200 d-flex">
                      <div className="flex-1">
                        <Button
                          type="secondary"
                          size="small"
                          href={`/invoices/${invoice.id}`}
                        >
                          View Invoice
                        </Button>
                        {invoice.paymentId ? (
                          <Button
                            type="secondary"
                            size="small"
                            className="ml-3"
                            href={`/payments/${invoice.paymentId}`}
                          >
                            View Payment
                          </Button>
                        ) : null}
                      </div>
                      <div>
                        <Button type="secondary" size="small">
                          Download
                        </Button>
                        <Button
                          className="ml-3"
                          size="small"
                          onClick={() =>
                            actions.invoices.startSendInvoice(
                              invoice.id,
                            )
                          }
                        >
                          Send
                        </Button>
                      </div>
                    </div>
                  </div>
                ),
              }
            })}
          />
        </div>
        <SendInvoice state={state} actions={actions} />
      </Layout>
    )
  },
}

export default page

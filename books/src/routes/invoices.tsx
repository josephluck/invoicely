import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import Layout, { Title as LayoutTitle } from './layout'
import ExpansionPanel from 'ui/src/expansion-panel'
import { humanizeDate } from '../utils/dates'
import Tag from 'ui/src/tag'
import Button from 'ui/src/button'
import InvoiceDetails from 'ui/src/invoice-details'
import Toggle from 'ui/src/toggle'
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
        activeTab="invoices"
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
            <Button href="/invoices/123/edit" size="small">
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
                      <div className="flex-1" />
                      <div>
                        {invoice.status !== 'paid' ? (
                          <Button
                            type="secondary"
                            size="small"
                            onClick={() =>
                              actions.invoices.startSendInvoice(
                                invoice.id,
                              )
                            }
                          >
                            Send
                          </Button>
                        ) : null}
                        <Button
                          type="primary"
                          size="small"
                          className="ml-3"
                          href={`/invoices/${invoice.id}`}
                        >
                          View
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

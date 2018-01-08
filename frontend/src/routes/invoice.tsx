import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import Invoice from '../components/invoice'
import Layout, { Title as LayoutTitle } from './layout'
import Card from '../components/card'
import Message from '../components/message'
import { humanizeDate, humanizeTime } from '../utils/dates'
import {
  getLastSentDate,
  getInvoiceStatusColor,
} from '../utils/invoice'

const page: Helix.Page<GlobalState, GlobalActions> = {
  view: (state, prev, actions) => {
    const lastSent = getLastSentDate(state.invoice.invoice)
    return (
      <Layout
        title={
          <LayoutTitle>
            <a href="/invoices">Invoices</a> / #{
              state.invoice.invoice.id
            }
          </LayoutTitle>
        }
        state={state}
        actions={actions}
      >
        <div className="flex-1 of-auto pa-5">
          {state.invoice.invoice.status === 'draft' ? (
            <Message
              color={getInvoiceStatusColor(
                state.invoice.invoice.status,
              )}
              className="mb-5"
            >
              You haven't sent this invoice yet.
            </Message>
          ) : null}
          {state.invoice.invoice.status === 'sent' && lastSent ? (
            <Message
              color={getInvoiceStatusColor(
                state.invoice.invoice.status,
              )}
              className="mb-5"
            >
              This invoice hasn't been paid yet and was last sent on{' '}
              {humanizeDate(lastSent)} at {humanizeTime(lastSent)}.
            </Message>
          ) : null}
          {state.invoice.invoice.status === 'paid' ? (
            <Message
              color={getInvoiceStatusColor(
                state.invoice.invoice.status,
              )}
              className="mb-5"
            >
              This invoice was paid on{' '}
              {humanizeDate(state.invoice.invoice.dateCreated)} at{' '}
              {humanizeTime(state.invoice.invoice.dateCreated)}.
            </Message>
          ) : null}
          <Card
            header={
              <div className="pt-5 pb-5 pl-5 fw-bold">Invoice</div>
            }
            className="mb-5"
          >
            <Invoice
              className="pa-5"
              invoice={state.invoice.invoice}
            />
          </Card>
          <Card
            header={
              <div className="pt-5 pb-5 pl-5 fw-bold">Emails</div>
            }
          >
            <div className="d-flex align-items-center pv-4 bb bc-gray-200">
              <div className="flex-1 ml-5 mr-5 fs-small fw-bold fc-gray-700">
                Sent
              </div>
              <div className="flex-1 mr-5 fs-small fw-bold fc-gray-700">
                To
              </div>
              <div className="flex-1 mr-5 fs-small fw-bold fc-gray-700">
                Opened
              </div>
            </div>
            {state.invoice.invoice.emails.map((email, index) => {
              return (
                <div
                  key={email.id}
                  className={`fs-small pv-5 d-flex align-items-center ${
                    index > 0 ? 'bt bc-gray-200' : ''
                  }`}
                >
                  <div className="flex-1 ml-5 mr-5">
                    {humanizeDate(email.dateCreated)}
                  </div>
                  <div className="flex-1 mr-5">{email.to}</div>
                  <div className="flex-1 mr-5">
                    {email.dateOpened ? (
                      <div>Yes: {humanizeDate(email.dateOpened)}</div>
                    ) : (
                      <div>Not yet</div>
                    )}
                  </div>
                </div>
              )
            })}
          </Card>
        </div>
      </Layout>
    )
  },
}

export default page

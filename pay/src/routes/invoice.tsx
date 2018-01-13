import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import InvoiceDetails from 'ui/src/invoice-details'
import PaymentDetails from 'ui/src/payment-details'
import Layout, { Title as LayoutTitle } from './layout'
import Card from 'ui/src/card'
import Title from 'ui/src/title'
import EmailList from 'ui/src/email-list'
import Button from 'ui/src/button'
import InvoiceStatusMessage from 'ui/src/invoice-status-message'

const page: Helix.Page<GlobalState, GlobalActions> = {
  view: (state, prev, actions) => {
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
        activeTab="invoices"
      >
        <div className="flex-1 of-auto pa-5">
          <div className="mb-5 d-flex">
            <InvoiceStatusMessage
              invoice={state.invoice.invoice}
              className="flex-1"
            />
            {state.invoice.invoice.status === 'draft' ? (
              <Button className="ml-3" style="secondary">
                Edit
              </Button>
            ) : null}
            {state.invoice.invoice.status !== 'paid' ? (
              <Button className="ml-3">
                {state.invoice.invoice.status === 'draft'
                  ? 'Send'
                  : 'Resend'}
              </Button>
            ) : null}
          </div>

          <Title className="mb-3 ml-5">Invoice Details</Title>
          <Card className="mb-5 pa-5">
            <InvoiceDetails invoice={state.invoice.invoice} />
          </Card>

          {state.invoice.invoice.paymentId &&
          state.invoice.invoice.payment ? (
            <div>
              <Title className="mb-3 ml-5">Payment Details</Title>
              <Card className="mb-5 pa-5">
                <PaymentDetails
                  payment={state.invoice.invoice.payment}
                />
              </Card>
            </div>
          ) : null}

          {state.invoice.invoice.emails.length > 0 ? (
            <div>
              <Title className="mb-3 ml-5">Emails Sent</Title>
              <EmailList emails={state.invoice.invoice.emails} />
            </div>
          ) : null}
        </div>
      </Layout>
    )
  },
}

export default page

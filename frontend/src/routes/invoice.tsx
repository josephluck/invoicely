import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import InvoiceDetails from '../components/invoice-details'
import Layout, { Title as LayoutTitle } from './layout'
import Card from '../components/card'
import Title from '../components/title'
import EmailList from '../components/email-list'
import Button from '../components/button'
import InvoiceStatusMessage from '../components/invoice-status-message'

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
      >
        <div className="flex-1 of-auto pa-5">
          <div className="mb-5 d-flex">
            <InvoiceStatusMessage
              invoice={state.invoice.invoice}
              className="flex-1"
            />
            {state.invoice.invoice.status === 'draft' ? (
              <Button className="ml-3" type="secondary">
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

          {state.invoice.invoice.emails.length > 0 ? (
            <div>
              <Title className="mb-3 ml-5">Emails</Title>
              <EmailList emails={state.invoice.invoice.emails} />
            </div>
          ) : null}
        </div>
      </Layout>
    )
  },
}

export default page

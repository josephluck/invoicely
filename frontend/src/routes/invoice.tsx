import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import InvoiceDetails from '../components/invoice-details'
import Layout, { Title as LayoutTitle } from './layout'
import Card from '../components/card'
import { humanizeDate, humanizeTime } from '../utils/dates'
import ExpansionPanel from '../components/expansion-panel'
import Title from '../components/title'
import Tag from '../components/tag'
import Button from '../components/button'
import Label from '../components/label'
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
              <ExpansionPanel
                cards={state.invoice.invoice.emails.map(email => {
                  return {
                    header: (isExpanded: boolean) => (
                      <div className="pv-5 pl-5 d-flex">
                        <a className="flex-1 mr-5" href="">
                          {humanizeDate(email.dateCreated)}
                        </a>
                        <div
                          className={`flex-1 mr-5 truncate fc-gray-600 transition ${
                            isExpanded ? 'o-0' : 'o-100'
                          }`}
                        >
                          {email.to}
                        </div>
                        <div className="flex-1 ta-r">
                          <Tag
                            className="d-ib"
                            color={email.dateOpened ? 'green' : 'red'}
                          >
                            {email.dateOpened
                              ? 'Opened'
                              : 'Not Opened Yet'}
                          </Tag>
                        </div>
                      </div>
                    ),
                    content: (
                      <div>
                        <div className="pa-5 d-flex">
                          <div className="flex-1 mr-3">
                            <Label className="d-ib mb-1">
                              Sent To
                            </Label>
                            <div className="mb-4 lh-4">
                              {email.to}
                            </div>
                          </div>
                          <div className="flex-1 ml-3">
                            <Label className="d-ib mb-1">
                              Date Sent
                            </Label>
                            <div className="lh-4 mb-4">
                              {humanizeDate(email.dateCreated)} on{' '}
                              {humanizeTime(email.dateCreated)}
                            </div>
                            {email.dateOpened ? (
                              <div>
                                <Label className="d-ib mb-1">
                                  Date Opened
                                </Label>
                                <div className="lh-4">
                                  {humanizeDate(email.dateOpened)} on{' '}
                                  {humanizeTime(email.dateOpened)}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="ph-5 pv-4 bt bc-gray-200 d-flex">
                          <div className="flex-1">
                            <Button type="secondary" size="small">
                              View Email
                            </Button>
                          </div>
                          <div>
                            <Button className="ml-3" size="small">
                              Resend Email
                            </Button>
                          </div>
                        </div>
                      </div>
                    ),
                  }
                })}
              />
            </div>
          ) : null}
        </div>
      </Layout>
    )
  },
}

export default page

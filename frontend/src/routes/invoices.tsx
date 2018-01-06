import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import Layout, { Title as LayoutTitle } from './layout'
import ExpansionPanel from '../components/expansion-panel'
import { humanize } from '../utils/dates'
import Tag from '../components/tag'
import Button from '../components/button'
import Label from '../components/label'
import Toggle from '../components/toggle'
import {
  calculateTotal,
  formatAsCurrency,
  humanizeInvoiceStatus,
  getInvoiceStatusColor,
} from '../utils/invoice'

const page: Helix.Page<GlobalState, GlobalActions> = {
  view: (state, prev, actions) => {
    return (
      <Layout title={<LayoutTitle>Invoices</LayoutTitle>}>
        <div className="flex-1 of-auto pa-5">
          <div className="mb-5 d-flex align-items-center">
            <div className="flex-1">
              <Toggle
                checked={state.invoices.activeFilter === null}
                onChange={() => actions.invoices.filter(null)}
                color="blue"
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
                Draft
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
            <Button href="invoices/new">New Invoice</Button>
          </div>
          <ExpansionPanel
            cards={state.invoices.invoices.map(invoice => {
              return {
                header: (isExpanded: boolean) => (
                  <div className="pl-5 pv-5 fs-small d-flex of-hidden align-items-center">
                    <a
                      href={`/invoices/${invoice.id}`}
                      className="flex-1 mr-4 fw-bold"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {humanize(invoice.dateCreated)}
                    </a>
                    <span
                      className={`flex-1 mr-4 truncate transition ${
                        isExpanded ? 'o-0' : 'o-100'
                      }`}
                    >
                      {invoice.number}
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
                    <div className="pa-5 d-flex">
                      <div className="flex-1 mr-3">
                        <Label className="d-ib mb-1">
                          Invoice Number
                        </Label>
                        <div className="mb-4 lh-4">
                          {invoice.number}
                        </div>
                        <Label className="d-ib mb-1">
                          Date Created
                        </Label>
                        <div className="lh-4">
                          {humanize(invoice.dateCreated)}
                        </div>
                      </div>
                      <div className="flex-1 ml-3">
                        <Label className="d-ib mb-1">Total</Label>
                        <div className="mb-4 lh-4">
                          {formatAsCurrency(calculateTotal(invoice))}
                        </div>
                        <Label className="d-ib mb-1">To</Label>
                        <div className="lh-4">
                          {invoice.companyAddress}
                        </div>
                      </div>
                    </div>
                    <div className="ph-5 pv-4 bt bc-gray-200 d-flex">
                      <div className="flex-1">
                        <Button type="secondary" size="small">
                          View
                        </Button>
                      </div>
                      <div>
                        <Button type="secondary" size="small">
                          Download
                        </Button>
                        <Button className="ml-3" size="small">
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
      </Layout>
    )
  },
}

export default page

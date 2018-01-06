import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import Layout, { Title as LayoutTitle } from './layout'
import ExpansionPanel from '../components/expansion-panel'
import { humanize } from '../utils/dates'
import Tag from '../components/tag'
import Button from '../components/button'
import Label from '../components/label'
import { calculateTotal, formatAsCurrency } from '../utils/invoice'

const page: Helix.Page<GlobalState, GlobalActions> = {
  view: (state, prev, actions) => {
    return (
      <Layout title={<LayoutTitle>Invoices</LayoutTitle>}>
        <div className="flex-1 of-auto pa-5">
          <ExpansionPanel
            cards={state.invoices.invoices.map(invoice => {
              return {
                header: (isExpanded: boolean) => (
                  <div className="pl-5 pv-5 d-flex of-hidden align-items-center">
                    <div className="flex-1 fs-small d-flex of-hidden align-items-center">
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
                    </div>
                    <Tag className="mr-4">Draft</Tag>
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
                      <div className="flex-1" />
                      <div>
                        <Button type="secondary" size="small">
                          Save PDF
                        </Button>
                        <Button className="ml-3" size="small">
                          Email
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

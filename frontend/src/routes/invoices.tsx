import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import Layout, { Title as LayoutTitle } from './layout'
import ExpansionPanel from '../components/expansion-panel'
import { humanize } from '../utils/dates'
import Tag from '../components/tag'
import { calculateTotal, formatAsCurrency } from '../utils/invoice'

const page: Helix.Page<GlobalState, GlobalActions> = {
  view: (state, prev, actions) => {
    return (
      <Layout title={<LayoutTitle>Invoices</LayoutTitle>}>
        <div className="flex-1 of-auto pa-5">
          <ExpansionPanel
            cards={state.invoices.invoices.map(invoice => {
              return {
                header: (
                  <div className="pl-5 pv-5 d-flex of-hidden align-items-center">
                    <div className="flex-1 fs-small d-flex of-hidden align-items-center">
                      <a
                        href={`/invoices/${invoice.number}`}
                        className="flex-1 mr-4 fw-bold"
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        {humanize(invoice.dateCreated)}
                      </a>
                      <span className="flex-1 mr-4 truncate">
                        {invoice.number}
                      </span>
                      <span className="flex-2 mr-4 truncate">
                        {invoice.companyAddress}
                      </span>
                      <span className="flex-1 mr-5 ta-r fw-bold fc-gray-600">
                        {formatAsCurrency(calculateTotal(invoice))}
                      </span>
                    </div>
                    <Tag className="mr-4">Draft</Tag>
                  </div>
                ),
                content: <div className="pa-5">{invoice.id}</div>,
              }
            })}
          />
        </div>
      </Layout>
    )
  },
}

export default page

import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import Layout, { Title as LayoutTitle } from './layout'
import ExpansionPanel from '../components/expansion-panel'
import { humanize } from '../utils/dates'

const page: Helix.Page<GlobalState, GlobalActions> = {
  view: (state, prev, actions) => {
    return (
      <Layout title={<LayoutTitle>Invoices</LayoutTitle>}>
        <div className="flex-1 of-auto pa-5">
          <ExpansionPanel
            cards={state.invoices.invoices.map(invoice => {
              return {
                header: (
                  <div className="pa-5 d-flex align-items-center">
                    <div className="flex-1">
                      <a
                        href={`/invoices/${invoice.number}`}
                        className="mr-3 fw-bold"
                      >
                        {invoice.number}
                      </a>
                      <span>{humanize(invoice.dateCreated)}</span>
                    </div>
                    <span>Draft</span>
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

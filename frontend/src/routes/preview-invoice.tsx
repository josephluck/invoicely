import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import Invoice from '../components/invoice'

const page: Helix.Page<GlobalState, GlobalActions> = {
  view: (state, prev, actions) => {
    return (
      <div className="w-100 h-100 bg-gray-100 pa-5">
        <Invoice
          invoice={state.invoice.invoice}
          className="box-card bra-2"
        />
      </div>
    )
  },
}

export default page

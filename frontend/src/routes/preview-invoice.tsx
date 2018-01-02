import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import Invoice from '../components/invoice'

const page: Helix.Page<GlobalState, GlobalActions> = {
  view: (state, prev, actions) => {
    return (
      <div className="w-a4 h-a4">
        <Invoice invoice={state.invoice.invoice} />
      </div>
    )
  },
}

export default page

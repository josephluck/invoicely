import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import Layout, { Title as LayoutTitle } from './layout'
import Card from '../components/card'
import fieldChangeHandler from '../utils/field-change-handler'
import TextField from '../components/invoice/textfield'

const page: Helix.Page<GlobalState, GlobalActions> = {
  view: (state, prev, actions) => {
    const change = fieldChangeHandler(
      actions.newInvoice.form.setFields,
    )
    console.log(change)
    return (
      <Layout
        title={<LayoutTitle number="1">New Invoice</LayoutTitle>}
      >
        <Card className="ml-auto mr-auto w-a4 h-a4">
          <div className="d-flex">
            <img
              style={{ width: 'auto', height: '50mm' }}
              src="http://acmeitad.com/wp-content/uploads/2015/02/ACME-Corp-logo-large1.png"
            />
            <div className="flex-1 ta-r">
              <TextField
                id="company-address"
                type="textarea"
                className="mb-3"
                inputClassName="ta-r"
                onChange={change('companyAddress')}
                value={state.newInvoice.form.fields.companyAddress}
              />
              <TextField
                id="billing-address"
                label="Billed To"
                type="textarea"
                className="mb-3"
                inputClassName="ta-r"
                onChange={change('billingAddress')}
                value={state.newInvoice.form.fields.billingAddress}
              />
            </div>
          </div>
        </Card>
      </Layout>
    )
  },
}

export default page

import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import Layout, { Title as LayoutTitle } from './layout'
import Card from '../components/card'
import fieldChangeHandler from '../utils/field-change-handler'
import TextField from '../components/invoice/textfield'
import Spreadsheet from '../components/spreadsheet'

const page: Helix.Page<GlobalState, GlobalActions> = {
  view: (state, prev, actions) => {
    const change = fieldChangeHandler(
      actions.newInvoice.form.setFields,
    )
    return (
      <Layout
        title={<LayoutTitle number="1">New Invoice</LayoutTitle>}
      >
        <Card
          className={`ml-auto mr-auto h-a4 ${false ? 'w-a4' : ''}`}
        >
          <div className="d-flex align-items-center bb bbs-solid bc-gray-200 pb-3 mb-6">
            <div className="flex-1">
              <img
                style={{ width: '100%', height: 'auto' }}
                src="http://householdairfresheners.com/wp-content/uploads/2017/02/Best-Squarespace-Logo-Design-63-For-logo-design-online-with-Squarespace-Logo-Design-728x278.jpg"
              />
            </div>
            <div className="ml-3 h-100 w-50 d-flex">
              <div className="ml-2 ta-r flex-1">
                <TextField
                  id="company-address"
                  label="Company"
                  type="textarea"
                  inputClassName="ta-r"
                  onChange={change('companyAddress')}
                  value={state.newInvoice.form.fields.companyAddress}
                />
              </div>
              <div className="ml-2 ta-r flex-1">
                <TextField
                  id="billing-address"
                  label="Billed To"
                  type="textarea"
                  inputClassName="ta-r"
                  onChange={change('billingAddress')}
                  value={state.newInvoice.form.fields.billingAddress}
                />
              </div>
            </div>
          </div>
          <div>
            <Spreadsheet
              rows={state.newInvoice.lineItems}
              columns={[
                {
                  description: 'Description',
                  key: 'description',
                  type: 'string',
                  defaultValue: '',
                },
                {
                  description: 'Quantity',
                  key: 'quantity',
                  type: 'number',
                  textAlign: 'right',
                  defaultValue: 1,
                },
                {
                  description: 'Price',
                  key: 'price',
                  type: 'number',
                  textAlign: 'right',
                  defaultValue: 0,
                },
              ]}
              onChange={actions.newInvoice.setLineItems}
            />
          </div>
        </Card>
      </Layout>
    )
  },
}

export default page

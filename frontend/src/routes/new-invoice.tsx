import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import Layout, { Title as LayoutTitle } from './layout'
import Card from '../components/card'
import fieldChangeHandler from '../utils/field-change-handler'
import TextField from '../components/invoice/textfield'
import SpreadsheetConstructor from '../components/spreadsheet'
import MenuSection from '../components/menu-section'
import { LineItem } from '../models/new-invoice'
import Checkbox from '../components/checkbox'

class Spreadsheet extends SpreadsheetConstructor<LineItem> {}

const page: Helix.Page<GlobalState, GlobalActions> = {
  view: (state, prev, actions) => {
    const change = fieldChangeHandler(
      actions.newInvoice.form.setFields,
    )
    return (
      <Layout
        title={<LayoutTitle number="1">New Invoice</LayoutTitle>}
      >
        <div className="h-100 bg-white w-6">
          <MenuSection title="Line Item Settings">
            <Checkbox
              id="include-quantity"
              checked={state.newInvoice.form.fields.includeQuantity}
              onChange={visible =>
                actions.newInvoice.toggleLineItemColumnVisiblity({
                  name: 'quantity',
                  visible,
                })
              }
              label="Include Quantity"
              className="mb-4"
            />
            <Checkbox
              id="include-sub-total"
              checked={state.newInvoice.form.fields.includeSubTotal}
              onChange={visible =>
                actions.newInvoice.toggleLineItemColumnVisiblity({
                  name: 'sub-total',
                  visible,
                })
              }
              label="Include Sub Total"
              className="mb-4"
            />
          </MenuSection>
        </div>
        <div className="pa-5 h-100 of-auto">
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
                    value={
                      state.newInvoice.form.fields.companyAddress
                    }
                  />
                </div>
                <div className="ml-2 ta-r flex-1">
                  <TextField
                    id="billing-address"
                    label="Billed To"
                    type="textarea"
                    inputClassName="ta-r"
                    onChange={change('billingAddress')}
                    value={
                      state.newInvoice.form.fields.billingAddress
                    }
                  />
                </div>
              </div>
            </div>
            <div>
              <Spreadsheet
                rows={state.newInvoice.lineItems}
                columns={state.newInvoice.lineItemColumns}
                onChange={actions.newInvoice.setLineItems}
              />
            </div>
          </Card>
        </div>
      </Layout>
    )
  },
}

export default page

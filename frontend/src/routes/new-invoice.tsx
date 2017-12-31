import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import Layout, { Title as LayoutTitle } from './layout'
import Card from '../components/card'
import fieldChangeHandler from '../utils/field-change-handler'
import TextField from '../components/invoice/textfield'
import DatePicker from '../components/invoice/datepicker'
import Select from '../components/select'
import SpreadsheetConstructor from '../components/spreadsheet'
import {
  LineItem,
  calculateInvoiceTotal,
  calculateVat,
  formatAsCurrency,
} from '../models/new-invoice'
import Checkbox from '../components/checkbox'

class Spreadsheet extends SpreadsheetConstructor<LineItem> {}

const page: Helix.Page<GlobalState, GlobalActions> = {
  view: (state, prev, actions) => {
    const change = fieldChangeHandler(
      actions.newInvoice.form.setFields,
    )
    const subTotal = calculateInvoiceTotal(state.newInvoice.lineItems)
    const vat = calculateVat(
      subTotal,
      state.newInvoice.form.fields.includeVat
        ? state.newInvoice.form.fields.vatRate
        : 0,
    )
    const total = subTotal + vat
    return (
      <Layout title={<LayoutTitle>New Invoice</LayoutTitle>}>
        <div className="h-100 d-flex pa-5 flex-direction-column">
          <div className="flex-1">
            <div className="pb-5 mb-5 bb bbs-solid bc-gray-300">
              <Checkbox
                id="preview-mode"
                checked={state.newInvoice.previewMode}
                onChange={actions.newInvoice.togglePreviewMode}
                label="Preview"
              />
            </div>
            <div className="pb-5 mb-5 bb bbs-solid bc-gray-300">
              <Checkbox
                id="include-quantity"
                checked={
                  state.newInvoice.templateSettings.fields
                    .includeQuantity
                }
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
                checked={
                  state.newInvoice.templateSettings.fields
                    .includeSubTotal
                }
                onChange={visible =>
                  actions.newInvoice.toggleLineItemColumnVisiblity({
                    name: 'subTotal',
                    visible,
                  })
                }
                label="Include Total"
                className="mb-4"
              />
              <Checkbox
                id="include-labels"
                checked={
                  state.newInvoice.templateSettings.fields
                    .includeLabels
                }
                onChange={includeLabels =>
                  actions.newInvoice.templateSettings.setFields({
                    includeLabels,
                  })
                }
                label="Column Labels"
              />
            </div>
            <div className="pb-5 mb-5 bb bbs-solid bc-gray-300">
              <Checkbox
                id="include-vat"
                checked={state.newInvoice.form.fields.includeVat}
                onChange={change('includeVat')}
                label="Include VAT"
                className="mb-4"
              />
              {state.newInvoice.form.fields.includeVat ? (
                <Select
                  options={[
                    { label: '0%', value: 0 },
                    { label: '5%', value: 5 },
                    { label: '20%', value: 20 },
                  ]}
                  id="vat-rate"
                  value={state.newInvoice.form.fields.vatRate}
                  onChange={change('vatRate')}
                  errors={state.newInvoice.form.errors.vatRate}
                  inputClassName="bg-white"
                />
              ) : null}
            </div>
          </div>
          <div className="pa-5" />
        </div>
        <div className="pa-5 h-100 flex-1 of-auto">
          <Card
            className={`ml-auto mr-auto h-a4 pa-5 ${
              false ? 'w-a4' : ''
            }`}
          >
            <div className="d-flex align-items-center bb bbs-solid bc-gray-200 pb-6 mb-6">
              <div className="flex-1">
                <img
                  style={{ width: 'auto', height: '30mm' }}
                  src="https://static1.squarespace.com/static/ta/56c62d0df699bb9171a122bc/147/assets/logo-black.png"
                />
              </div>
              <div className="ml-3 h-100 w-50 ta-r">
                <TextField
                  id="company-address"
                  type="textarea"
                  onChange={change('companyAddress')}
                  inputClassName="ta-r"
                  value={state.newInvoice.form.fields.companyAddress}
                  disabled={state.newInvoice.previewMode}
                />
              </div>
            </div>
            <div className="d-flex mb-8 pb-6">
              <div className="flex-1">
                <TextField
                  id="invoice-number"
                  label="Invoice"
                  type="text"
                  className="w-100 mb-2"
                  onChange={change('invoiceNumber')}
                  value={state.newInvoice.form.fields.invoiceNumber}
                  disabled={state.newInvoice.previewMode}
                />
                <DatePicker
                  id="date-created"
                  label="Raised"
                  type="text"
                  className="w-100 mb-2"
                  onChange={change('dateCreated')}
                  value={state.newInvoice.form.fields.dateCreated}
                  disabled={state.newInvoice.previewMode}
                />
              </div>
              <div className="ml-2 flex-1">
                <TextField
                  id="billing-address"
                  label="To"
                  type="textarea"
                  onChange={change('billingAddress')}
                  value={state.newInvoice.form.fields.billingAddress}
                  disabled={state.newInvoice.previewMode}
                />
              </div>
              <div className="ml-2 flex-2">
                <TextField
                  id="notes"
                  label="Notes"
                  type="textarea"
                  onChange={change('notes')}
                  value={state.newInvoice.form.fields.notes}
                  disabled={state.newInvoice.previewMode}
                />
              </div>
            </div>
            <div>
              <Spreadsheet
                rows={state.newInvoice.lineItems}
                columns={state.newInvoice.lineItemColumns}
                showLabels={
                  state.newInvoice.templateSettings.fields
                    .includeLabels
                }
                onChange={actions.newInvoice.setLineItems}
                readOnly={state.newInvoice.previewMode}
                totals={
                  <div className="bts-solid bw-small bc-gray-200 mt-1">
                    {state.newInvoice.form.fields.includeVat ? (
                      <div className="d-flex bbs-dashed bw-small bc-gray-200 pv-4">
                        <div className="flex-1">VAT</div>
                        <div className="ta-r">
                          {formatAsCurrency(vat)}
                        </div>
                      </div>
                    ) : null}
                    <div className="d-flex bbs-solid bw-small bc-gray-200 pv-4">
                      <div className="fw-bold flex-1">Total</div>
                      <div className="fw-bold ta-r">
                        {formatAsCurrency(total)}
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          </Card>
        </div>
      </Layout>
    )
  },
}

export default page

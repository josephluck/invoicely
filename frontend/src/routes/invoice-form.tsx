import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import { LineItem } from '../types'
import Layout, { Title as LayoutTitle } from './layout'
import Card from '../components/card'
import Invoice from '../components/invoice'
import fieldChangeHandler from '../utils/field-change-handler'
import TextField from '../components/invoice/textfield'
import NormalTextField from '../components/textfield'
import DatePicker from '../components/invoice/datepicker'
import Select from '../components/select'
import Button from '../components/button'
import SpreadsheetConstructor from '../components/spreadsheet'
import { formatAsCurrency } from '../utils/invoice'
import Checkbox from '../components/checkbox'
import InvoiceTotals from '../components/invoice-totals'
import { sanitizeInvoice } from '../models/invoice-form'

class Spreadsheet extends SpreadsheetConstructor<LineItem> {}

const page: Helix.Page<GlobalState, GlobalActions> = {
  view: (state, prev, actions) => {
    const change = fieldChangeHandler(
      actions.invoiceForm.form.setFields,
    )
    const invoice = sanitizeInvoice(
      state.invoiceForm.form.fields,
      state.invoiceForm.lineItems,
    )
    return (
      <Layout title={<LayoutTitle>New Invoice</LayoutTitle>}>
        <div className="h-100 d-flex pa-5 flex-direction-column">
          <div className="flex-1">
            <div className="pv-5 mb-5 bb bt bbs-solid bts-solid bc-gray-300">
              <Checkbox
                id="preview-mode"
                checked={state.invoiceForm.previewMode}
                onChange={actions.invoiceForm.togglePreviewMode}
                label="Preview"
              />
            </div>
            <div className="pb-5 mb-5 bb bbs-solid bc-gray-300">
              <Checkbox
                id="include-quantity"
                checked={
                  state.invoiceForm.form.fields.includeQuantity
                }
                onChange={visible =>
                  actions.invoiceForm.toggleLineItemColumnVisiblity({
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
                  state.invoiceForm.form.fields.includeSubTotal
                }
                onChange={visible =>
                  actions.invoiceForm.toggleLineItemColumnVisiblity({
                    name: 'subTotal',
                    visible,
                  })
                }
                label="Include Total"
                className="mb-4"
              />
              <Checkbox
                id="include-labels"
                checked={state.invoiceForm.form.fields.includeLabels}
                onChange={includeLabels =>
                  actions.invoiceForm.form.setFields({
                    includeLabels,
                  })
                }
                label="Include Column Labels"
              />
            </div>
            <div className="pb-5 mb-5 bb bbs-solid bc-gray-300">
              <Checkbox
                id="include-vat"
                checked={state.invoiceForm.form.fields.includeTax}
                onChange={change('includeTax')}
                label="Include VAT"
              />
              {state.invoiceForm.form.fields.includeTax ? (
                <Select
                  options={[
                    { label: '0%', value: 0 },
                    { label: '5%', value: 5 },
                    { label: '20%', value: 20 },
                  ]}
                  id="vat-rate"
                  value={state.invoiceForm.form.fields.taxRate}
                  onChange={change('taxRate')}
                  errors={state.invoiceForm.form.errors.taxRate}
                  inputClassName="bg-white"
                  className="mt-4"
                />
              ) : null}
              <Checkbox
                id="include-discount"
                checked={
                  state.invoiceForm.form.fields.includeDiscount
                }
                onChange={change('includeDiscount')}
                label="Include Discount"
                className="mt-4"
              />
              {state.invoiceForm.form.fields.includeDiscount ? (
                <NormalTextField
                  id="discount"
                  value={state.invoiceForm.form.fields.discount}
                  onChange={change('discount')}
                  displayFormat={formatAsCurrency}
                  errors={state.invoiceForm.form.errors.discount}
                  inputClassName="bg-white"
                  className="mt-4"
                />
              ) : null}
            </div>
          </div>
          <div>
            <Button className="w-100 mb-3" type="secondary">
              Download
            </Button>
            <Button className="w-100">Send</Button>
          </div>
        </div>
        <div className="pa-5 h-100 flex-1 of-auto">
          {state.invoiceForm.previewMode ? (
            <Invoice
              invoice={invoice}
              className="box-card h-a4 ml-auto mr-auto"
            />
          ) : (
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
                    value={
                      state.invoiceForm.form.fields.companyAddress
                    }
                    disabled={state.invoiceForm.previewMode}
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
                    onChange={change('number')}
                    value={state.invoiceForm.form.fields.number}
                    errors={state.invoiceForm.form.errors.number}
                    disabled={state.invoiceForm.previewMode}
                  />
                  <DatePicker
                    id="date-created"
                    label="Raised"
                    type="text"
                    className="w-100 mb-2"
                    onChange={change('dateCreated')}
                    value={state.invoiceForm.form.fields.dateCreated}
                    disabled={state.invoiceForm.previewMode}
                  />
                </div>
                <div className="ml-2 flex-1">
                  <TextField
                    id="billing-address"
                    label="To"
                    type="textarea"
                    onChange={change('billingAddress')}
                    value={
                      state.invoiceForm.form.fields.billingAddress
                    }
                    disabled={state.invoiceForm.previewMode}
                  />
                </div>
                <div className="ml-2 flex-2">
                  <TextField
                    id="notes"
                    label="Notes"
                    type="textarea"
                    onChange={change('notes')}
                    value={state.invoiceForm.form.fields.notes}
                    disabled={state.invoiceForm.previewMode}
                  />
                </div>
              </div>
              <div>
                <Spreadsheet
                  rows={state.invoiceForm.lineItems}
                  columns={state.invoiceForm.lineItemColumns}
                  showLabels={
                    state.invoiceForm.form.fields.includeLabels
                  }
                  onChange={actions.invoiceForm.setLineItems}
                  readOnly={state.invoiceForm.previewMode}
                  totals={
                    <InvoiceTotals
                      includeDiscount={
                        state.invoiceForm.form.fields.includeDiscount
                      }
                      includeTax={
                        state.invoiceForm.form.fields.includeTax
                      }
                      discount={
                        state.invoiceForm.form.fields.discount
                      }
                      lineItems={state.invoiceForm.lineItems}
                      taxRate={state.invoiceForm.form.fields.taxRate}
                    />
                  }
                />
              </div>
            </Card>
          )}
        </div>
      </Layout>
    )
  },
}

export default page

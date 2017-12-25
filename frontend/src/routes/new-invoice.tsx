import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import Layout, { Title as LayoutTitle } from './layout'
import Card from '../components/card'
import TextField from '../components/textfield'
import fieldChangeHandler from '../utils/field-change-handler'

const page: Helix.Page<GlobalState, GlobalActions> = {
  view: (state, prev, actions) => {
    const change = fieldChangeHandler(
      actions.newInvoice.form.setFields,
    )
    return (
      <Layout
        title={<LayoutTitle number="1">New Invoice</LayoutTitle>}
      >
        <Card className="mb-5" title="Details" defaultOpen={true}>
          <TextField
            id="number"
            label="Invoice Number"
            onChange={change('number')}
            value={state.newInvoice.form.fields.number}
            errors={state.newInvoice.form.errors.number}
            className="mb-4"
          />
          <div className="d-flex mb-4">
            <TextField
              id="date-created"
              label="Date Created"
              onChange={change('dateCreated')}
              value={state.newInvoice.form.fields.dateCreated}
              errors={state.newInvoice.form.errors.dateCreated}
              type="date"
              className="flex-1 mr-2"
            />
            <TextField
              id="date-due"
              label="Date Due"
              onChange={change('dateDue')}
              value={state.newInvoice.form.fields.dateDue}
              errors={state.newInvoice.form.errors.dateDue}
              type="date"
              className="flex-1 ml-2"
            />
          </div>
          <TextField
            id="notes"
            label="Notes"
            onChange={change('number')}
            value={state.newInvoice.form.fields.number}
            errors={state.newInvoice.form.errors.number}
            type="textarea"
          />
        </Card>
        <Card
          className="mb-5"
          title="Your Address"
          defaultOpen={true}
        >
          <div className="d-flex mb-4">
            <TextField
              id="billing-address-line-1"
              label="Line 1"
              onChange={change('number')}
              value={state.newInvoice.form.fields.number}
              errors={state.newInvoice.form.errors.number}
              className="flex-1 mr-2"
            />
            <TextField
              id="billing-address-line-2"
              label="Line 2"
              onChange={change('number')}
              value={state.newInvoice.form.fields.number}
              errors={state.newInvoice.form.errors.number}
              className="flex-1 ml-2"
            />
          </div>
          <div className="d-flex mb-4">
            <TextField
              id="billing-address-line-3"
              label="Line 3"
              onChange={change('number')}
              value={state.newInvoice.form.fields.number}
              errors={state.newInvoice.form.errors.number}
              className="flex-1 mr-2"
            />
            <TextField
              id="billing-address-line-4"
              label="Line 4"
              onChange={change('number')}
              value={state.newInvoice.form.fields.number}
              errors={state.newInvoice.form.errors.number}
              className="flex-1 ml-2"
            />
          </div>
          <div className="d-flex">
            <TextField
              id="billing-address-country"
              label="Country"
              onChange={change('number')}
              value={state.newInvoice.form.fields.number}
              className="flex-1 mr-2"
            />
            <TextField
              id="billing-address-postcode"
              label="Postcode"
              onChange={change('number')}
              value={state.newInvoice.form.fields.number}
              errors={state.newInvoice.form.errors.number}
              className="flex-1 ml-2"
            />
          </div>
        </Card>
        <Card title="Recipient Address" defaultOpen={true}>
          <div className="d-flex mb-4">
            <TextField
              id="billing-address-line-1"
              label="Line 1"
              onChange={change('number')}
              value={state.newInvoice.form.fields.number}
              errors={state.newInvoice.form.errors.number}
              className="flex-1 mr-2"
            />
            <TextField
              id="billing-address-line-2"
              label="Line 2"
              onChange={change('number')}
              value={state.newInvoice.form.fields.number}
              errors={state.newInvoice.form.errors.number}
              className="flex-1 ml-2"
            />
          </div>
          <div className="d-flex mb-4">
            <TextField
              id="billing-address-line-3"
              label="Line 3"
              onChange={change('number')}
              value={state.newInvoice.form.fields.number}
              errors={state.newInvoice.form.errors.number}
              className="flex-1 mr-2"
            />
            <TextField
              id="billing-address-line-4"
              label="Line 4"
              onChange={change('number')}
              value={state.newInvoice.form.fields.number}
              errors={state.newInvoice.form.errors.number}
              className="flex-1 ml-2"
            />
          </div>
          <div className="d-flex">
            <TextField
              id="billing-address-country"
              label="Country"
              onChange={change('number')}
              value={state.newInvoice.form.fields.number}
              errors={state.newInvoice.form.errors.number}
              className="flex-1 mr-2"
            />
            <TextField
              id="billing-address-postcode"
              label="Postcode"
              onChange={change('number')}
              value={state.newInvoice.form.fields.number}
              errors={state.newInvoice.form.errors.number}
              className="flex-1 ml-2"
            />
          </div>
        </Card>
      </Layout>
    )
  },
}

export default page

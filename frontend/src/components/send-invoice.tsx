import * as React from 'react'
import { GlobalState, GlobalActions } from '../models'
import Modal from 'components/src/modal'
import Button from 'components/src/button'
import Title from 'components/src/title'
import Textfield from 'components/src/textfield'
import fieldChangeHandler from '../utils/field-change-handler'

interface Props {
  state: GlobalState
  actions: GlobalActions
}

export default function SendInvoice({ state, actions }: Props) {
  const change = fieldChangeHandler(
    actions.sendInvoice.form.setFields,
  )
  return (
    <Modal
      onClose={() => actions.sendInvoice.setModalShowing(false)}
      showing={state.sendInvoice.modalShowing}
      header={<Title>Send Invoice</Title>}
      footer={
        <div className="d-flex w-100">
          <div className="flex-1" />
          <Button
            size="small"
            type="secondary"
            onClick={() => actions.sendInvoice.setModalShowing(false)}
            className="ml-3"
          >
            Cancel
          </Button>
          <Button size="small" className="ml-3">
            Send
          </Button>
        </div>
      }
    >
      <div className="pa-5">
        <div className="mb-5 fs-small lh-4 fc-gray-800">
          To send invoice {state.invoice.invoice.id} by email, fill in
          the receipients emails address below, add a note if you want
          to and click send.
        </div>
        <div>
          <Textfield
            id="send-invoice-email"
            label="Email Address"
            className="mb-4"
            value={state.sendInvoice.form.fields.email}
            errors={state.sendInvoice.form.errors.email}
            onChange={change('email')}
          />
          <Textfield
            id="send-invoice-notes"
            label="Note (optional)"
            type="textarea"
            value={state.sendInvoice.form.fields.notes}
            errors={state.sendInvoice.form.errors.notes}
            onChange={change('notes')}
          />
        </div>
      </div>
    </Modal>
  )
}

import * as React from 'react'
import { GlobalState, GlobalActions } from '../models'
import Modal from './modal'
import Button from './button'

interface Props {
  state: GlobalState
  actions: GlobalActions
}

export default function SendInvoice({ state, actions }: Props) {
  return (
    <Modal
      onClose={() => actions.sendInvoice.setModalShowing(false)}
      showing={state.sendInvoice.modalShowing}
    >
      <div>
        <div className="pa-5">Send invoice</div>
        <div className="d-flex ph-5 pv-4 bt bc-gray-200">
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
      </div>
    </Modal>
  )
}

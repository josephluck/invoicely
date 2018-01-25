import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import Button from 'ui/src/button'
import Layout from './layout'
import Title from 'ui/src/title'
import Textfield from 'ui/src/textfield'
import Form from 'ui/src/form'
import fieldChangeHandler from '../utils/field-change-handler'

const page: Helix.Page<GlobalState, GlobalActions> = {
  view: (state, prev, actions) => {
    const change = fieldChangeHandler(
      actions.users.invitationForm.setFields,
    )
    return (
      <Layout
        title="Invite"
        activeTab="settings"
        state={state}
        actions={actions}
      >
        <div className="of-auto pa-5">
          <Form
            onSubmit={actions.users.saveInvitation}
            className="bg-white box-card mh-auto w-6 bra-2"
          >
            <div className="pv-4 ph-5 bb bc-gray-200">
              <Title>Invitation</Title>
            </div>
            <div className="pa-5">
              <Textfield
                id="name"
                label="Name"
                onChange={change('name')}
                value={state.users.invitationForm.fields.name}
                errors={state.users.invitationForm.errors.name}
                className="mb-5"
              />
              <Textfield
                id="email"
                label="Email"
                onChange={change('email')}
                value={state.users.invitationForm.fields.email}
                errors={state.users.invitationForm.errors.email}
              />
            </div>
            <div className="d-flex pa-5 bt bc-gray-200">
              <div className="flex-1" />
              <Button type="submit">Save</Button>
            </div>
          </Form>
        </div>
      </Layout>
    )
  },
}

export default page

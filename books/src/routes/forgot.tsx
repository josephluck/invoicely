import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import Button from 'ui/src/button'
import Layout from './layout-entry'
import Title from 'ui/src/title'
import Textfield from 'ui/src/textfield'
import Form from 'ui/src/form'
import fieldChangeHandler from '../utils/field-change-handler'

const page: Helix.Page<GlobalState, GlobalActions> = {
  view: (state, prev, actions) => {
    const change = fieldChangeHandler(
      actions.authentication.forgotForm.setFields,
    )
    return (
      <Layout>
        <div className="flex-1 d-flex align-items-center of-auto pa-5">
          <Form
            onSubmit={actions.authentication.forgot}
            className="bg-white box-card mh-auto w-6 bra-2"
          >
            <div className="pv-4 ph-5 bb bc-gray-200">
              <Title>Forgotten Password</Title>
            </div>
            <div className="pa-5">
              <Textfield
                id="email"
                label="Email Address"
                onChange={change('email')}
                value={state.authentication.forgotForm.fields.email}
                errors={state.authentication.forgotForm.errors.email}
                className="mb-5"
              />
            </div>
            <div className="pv-4 ph-5 d-flex align-items-center bt bc-gray-200">
              <div className="flex-1" />
              <Button className="ml-4" type="submit">
                Send Email
              </Button>
            </div>
          </Form>
        </div>
      </Layout>
    )
  },
}

export default page

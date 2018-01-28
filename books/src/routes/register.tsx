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
      actions.authentication.registerForm.setFields,
    )
    return (
      <Layout>
        <div className="flex-1 d-flex align-items-center of-auto pa-5">
          <Form
            onSubmit={actions.authentication.register}
            className="bg-white box-card mh-auto w-6 bra-2"
          >
            <div className="pv-4 ph-5 bb bc-gray-200">
              <Title>Register</Title>
            </div>
            <div className="pa-5">
              <Textfield
                id="email"
                label="Email Address"
                onChange={change('email')}
                value={state.authentication.registerForm.fields.email}
                errors={
                  state.authentication.registerForm.errors.email
                    .errors
                }
                className="mb-5"
              />
              <Textfield
                id="name"
                label="Your Name"
                onChange={change('name')}
                value={state.authentication.registerForm.fields.name}
                errors={
                  state.authentication.registerForm.errors.name.errors
                }
                className="mb-5"
              />
              <Textfield
                id="password"
                label="Password"
                type="password"
                onChange={change('password')}
                value={
                  state.authentication.registerForm.fields.password
                }
                errors={
                  state.authentication.registerForm.errors.password
                    .errors
                }
                className="mb-5"
              />
              <Textfield
                id="password-confirmation"
                label="Confirm Password"
                type="password"
                onChange={change('passwordConfirmation')}
                value={
                  state.authentication.registerForm.fields
                    .passwordConfirmation
                }
                errors={
                  state.authentication.registerForm.errors
                    .passwordConfirmation.errors
                }
              />
            </div>
            <div className="pv-4 ph-5 d-flex align-items-center bt bc-gray-200">
              <div className="flex-1" />
              <a href="/login">Got an Account?</a>
              <Button className="ml-4" type="submit">
                Register
              </Button>
            </div>
          </Form>
        </div>
      </Layout>
    )
  },
}

export default page

import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import Layout, { Title as LayoutTitle } from './layout'
import ExpansionPanel from 'ui/src/expansion-panel'
import Button from 'ui/src/button'

const page: Helix.Page<GlobalState, GlobalActions> = {
  onEnter(state, prev, actions) {
    actions.authentication.check()
    actions.users.fetch()
  },
  view: (state, prev, actions) => {
    return (
      <Layout
        title={<LayoutTitle>Users</LayoutTitle>}
        state={state}
        actions={actions}
        activeTab={null}
      >
        <div className="flex-1 of-auto pa-5">
          <ExpansionPanel
            expandedIndex={state.users.expansionPanel.expansionIndex}
            onExpand={actions.users.expansionPanel.setExpansionIndex}
            cards={state.users.invitations.map(invitation => {
              return {
                header: (isExpanded: boolean) => (
                  <div className="pl-5 pv-5 d-flex of-hidden align-items-center fs-small">
                    <span
                      className="flex-1 mr-4 fw-bold"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {invitation.name}
                    </span>
                    <span
                      className={`flex-1 mr-5 fw-bold fc-gray-600 transition ${
                        isExpanded ? 'o-0' : 'o-100'
                      }`}
                    >
                      {invitation.email}
                    </span>
                  </div>
                ),
                content: (
                  <div>
                    <div className="pa-5" />
                    <div className="ph-5 pv-4 bt bc-gray-200 d-flex">
                      <div className="flex-1" />
                      <div>
                        <Button
                          size="small"
                          style="secondary"
                          className="ml-3"
                        >
                          Edit
                        </Button>
                        <Button size="small" className="ml-3">
                          Send Reminder
                        </Button>
                      </div>
                    </div>
                  </div>
                ),
              }
            })}
          />
        </div>
      </Layout>
    )
  },
}

export default page

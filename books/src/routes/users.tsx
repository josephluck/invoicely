import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import Layout, { Title as LayoutTitle } from './layout'
import ExpansionPanel from 'ui/src/expansion-panel'
import Button from 'ui/src/button'
import Title from 'ui/src/title'
import Label from 'ui/src/label'
import NoResults from 'ui/src/no-results'
import formatDate from 'ui/src/format-date'

const page: Helix.Page<GlobalState, GlobalActions> = {
  onEnter(state, prev, actions) {
    actions.authentication.check()
    actions.users.fetchInvitations()
    actions.users.fetchUsers()
  },
  view: (state, prev, actions) => {
    return (
      <Layout
        title={<LayoutTitle>Users</LayoutTitle>}
        state={state}
        actions={actions}
        activeTab="settings"
      >
        <div className="flex-1 of-auto pa-5">
          <div className="d-flex align-items-center mb-4">
            <Title className="flex-1">Invitations</Title>
            <Button size="small" href="/users/new">
              New Invite
            </Button>
          </div>
          {state.users.invitations.length ? (
            <ExpansionPanel
              className="mb-6"
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
                      <div className="pa-5 d-flex">
                        <div className="flex-1 mr-3">
                          <Label className="d-ib mb-1">Name</Label>
                          <div className="lh-4 mb-4">
                            {invitation.name}
                          </div>
                          <Label className="d-ib mb-1">
                            Date Invited
                          </Label>
                          <div className="lh-4">
                            {formatDate(invitation.dateCreated)}
                          </div>
                        </div>
                        <div className="flex-1 ml-3">
                          <Label className="d-ib mb-1">
                            Email Address
                          </Label>
                          <div className="lh-4">
                            {invitation.email}
                          </div>
                        </div>
                      </div>
                      <div className="ph-5 pv-4 bt bc-gray-200 d-flex">
                        <div className="flex-1" />
                        <div>
                          <Button
                            size="small"
                            style="secondary"
                            className="ml-3"
                            onClick={() =>
                              actions.users.deleteInvitation(
                                invitation.id,
                              )
                            }
                          >
                            Delete
                          </Button>
                          <Button
                            size="small"
                            style="secondary"
                            className="ml-3"
                            href={`/users/invitations/${
                              invitation.id
                            }`}
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
          ) : (
            <NoResults className="mb-6">
              No open invitations
            </NoResults>
          )}
          <div className="d-flex align-items-center mb-4">
            <Title className="flex-1">Users</Title>
          </div>
          <ExpansionPanel
            cards={state.users.users.map(user => {
              return {
                header: (isExpanded: boolean) => (
                  <div className="pl-5 pv-5 d-flex of-hidden align-items-center fs-small">
                    <span
                      className="flex-1 mr-4 fw-bold"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {user.name}
                    </span>
                    <span
                      className={`flex-1 mr-5 fw-bold fc-gray-600 transition ${
                        isExpanded ? 'o-0' : 'o-100'
                      }`}
                    >
                      {user.email}
                    </span>
                  </div>
                ),
                content: (
                  <div>
                    <div className="pa-5 d-flex">
                      <div className="flex-1 mr-3">
                        <Label className="d-ib mb-1">Name</Label>
                        <div className="lh-4 mb-4">{user.name}</div>
                        <Label className="d-ib mb-1">
                          Date Registered
                        </Label>
                        <div className="lh-4">
                          {formatDate(user.dateCreated)}
                        </div>
                      </div>
                      <div className="flex-1 ml-3">
                        <Label className="d-ib mb-1">
                          Email Address
                        </Label>
                        <div className="lh-4">{user.email}</div>
                      </div>
                    </div>
                    <div className="ph-5 pv-4 bt bc-gray-200 d-flex">
                      <div className="flex-1" />
                      <div>
                        {state.authentication.user.fold(
                          () => null,
                          u => {
                            return u.id === user.id ? null : (
                              <Button
                                size="small"
                                style="secondary"
                                className="ml-3"
                                onClick={() =>
                                  actions.users.deleteUser(user.id)
                                }
                              >
                                Delete
                              </Button>
                            )
                          },
                        )}
                        <Button
                          size="small"
                          style="secondary"
                          className="ml-3"
                          href={`/users/users/${user.id}`}
                        >
                          Edit
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

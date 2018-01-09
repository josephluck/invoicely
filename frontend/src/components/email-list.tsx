import * as React from 'react'
import { Email } from '../types'
import Button from '../components/button'
import ExpansionPanel from '../components/expansion-panel'
import Tag from '../components/tag'
import Label from '../components/label'
import { humanizeDate, humanizeTime } from '../utils/dates'

interface Props {
  className?: string
  emails: Email[]
}

export default function EmailList({ className = '', emails }: Props) {
  return (
    <ExpansionPanel
      cards={emails.map(email => {
        return {
          header: (isExpanded: boolean) => (
            <div className="pv-5 pl-5 d-flex">
              <a className="flex-1 mr-5" href="">
                {humanizeDate(email.dateCreated)}
              </a>
              <div
                className={`flex-1 mr-5 truncate fc-gray-600 transition ${
                  isExpanded ? 'o-0' : 'o-100'
                }`}
              >
                {email.to}
              </div>
              <div className="flex-1 ta-r">
                <Tag
                  className="d-ib"
                  color={email.dateOpened ? 'green' : 'red'}
                >
                  {email.dateOpened ? 'Opened' : 'Not Opened Yet'}
                </Tag>
              </div>
            </div>
          ),
          content: (
            <div>
              <div className="pa-5 d-flex">
                <div className="flex-1 mr-3">
                  <Label className="d-ib mb-1">Sent To</Label>
                  <div className="mb-4 lh-4">{email.to}</div>
                </div>
                <div className="flex-1 ml-3">
                  <Label className="d-ib mb-1">Date Sent</Label>
                  <div className="lh-4 mb-4">
                    {humanizeDate(email.dateCreated)} on{' '}
                    {humanizeTime(email.dateCreated)}
                  </div>
                  {email.dateOpened ? (
                    <div>
                      <Label className="d-ib mb-1">Date Opened</Label>
                      <div className="lh-4">
                        {humanizeDate(email.dateOpened)} on{' '}
                        {humanizeTime(email.dateOpened)}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="ph-5 pv-4 bt bc-gray-200 d-flex">
                <div className="flex-1">
                  <Button type="secondary" size="small">
                    View Email
                  </Button>
                </div>
                <div>
                  <Button className="ml-3" size="small">
                    Resend Email
                  </Button>
                </div>
              </div>
            </div>
          ),
        }
      })}
    />
  )
}

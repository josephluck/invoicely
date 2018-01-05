import * as React from 'react'
import { LineItem } from '../types'
import Label from './label'
import { formatAsCurrency } from '../utils/invoice'

interface Props {
  lineItems: LineItem[]
  className?: string
  includeLabels: boolean
  includeQuantity: boolean
  includeSubTotal: boolean
}

export default function lineItems({
  lineItems,
  className = '',
  includeSubTotal,
  includeLabels,
  includeQuantity,
}: Props) {
  return (
    <div className={`${className}`}>
      <div className="d-flex mb-2">
        <div className="flex-1 bw-small bbs-solid bc-gray-200 pb-3">
          <Label>Description</Label>
        </div>
        {includeQuantity ? (
          <div className="flex-1 bw-small bbs-solid bc-gray-200 pb-3 ta-r">
            <Label>Quantity</Label>
          </div>
        ) : null}
        <div className="flex-1 bw-small bbs-solid bc-gray-200 pb-3 ta-r">
          <Label>Price</Label>
        </div>
        {includeSubTotal ? (
          <div className="flex-1 bw-small bbs-solid bc-gray-200 pb-3 ta-r">
            <Label>Total</Label>
          </div>
        ) : null}
      </div>
      <div>
        {lineItems.map((item, index) => {
          return (
            <div
              className="d-flex align-items-center pb-2 mt-2"
              key={index}
            >
              <div className="flex-1 lh-4 ba bg-transparent bc-transparent">
                {item.description}
              </div>
              {includeQuantity ? (
                <div className="flex-1 lh-4 ba bg-transparent bc-transparent ta-r">
                  {item.quantity}
                </div>
              ) : null}
              <div className="flex-1 lh-4 ba bg-transparent bc-transparent ta-r">
                {formatAsCurrency(item.price)}
              </div>
              {includeSubTotal ? (
                <div className="flex-1 lh-4 ba bg-transparent bc-transparent ta-r">
                  {formatAsCurrency(item.quantity * item.price)}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

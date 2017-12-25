import * as React from 'react'
import Label from './label'
import * as Collapser from 'react-collapse'

export function Errors({ errors }: { errors: string[] }) {
  return (
    <Collapser isOpened={true}>
      {errors.filter(err => err.length).map((errorText, index) => {
        return (
          <Label className="fc-danger mb-1" key={index}>
            {errorText}
          </Label>
        )
      })}
    </Collapser>
  )
}

export default Errors

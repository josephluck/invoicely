import * as React from 'react'
import * as Collapser from 'react-collapse'

export function Errors({ errors }: { errors: string[] }) {
  return (
    <Collapser isOpened={true}>
      {errors.filter(err => err.length).map((errorText, index) => {
        return (
          <span className="d-b fs-small fc-red pt-2" key={index}>
            {errorText}
          </span>
        )
      })}
    </Collapser>
  )
}

export default Errors

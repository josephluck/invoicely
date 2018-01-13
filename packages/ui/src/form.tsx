import * as React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  onSubmit?: () => any
}

export function Form({
  children,
  className = '',
  onSubmit = () => null,
}: Props) {
  return (
    <form
      className={className}
      onSubmit={e => {
        e.preventDefault()
        onSubmit()
      }}
    >
      {children}
    </form>
  )
}

export default Form

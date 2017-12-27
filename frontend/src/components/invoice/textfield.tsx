import * as React from 'react'
import ErrorsComponent from '../errors'
import Label from '../label'
import { Component } from 'react'
import TextArea from 'react-autosize-textarea'

export type InputType =
  | 'text'
  | 'number'
  | 'password'
  | 'email'
  | 'tel'
  | 'search'
  | 'date'
  | 'textarea'

export interface Props {
  type?: InputType
  label?: string
  id: string
  placeholder?: string
  className?: string
  errors?: Array<string>
  help?: string
  value?: any
  onInput?: (value: any) => any
  onChange?: (value: any) => any
  onblur?: (value: any) => any
  onfocus?: (value: any) => any
  disabled?: boolean
  autoFocus?: boolean
  min?: string
  max?: string
  inputClassName?: string
}

export interface State {
  value: any
}

export class TextField extends Component<Props, State> {
  private input: HTMLInputElement

  constructor(props: Props) {
    super(props)
    this.state = {
      value: props.value,
    }
    this.onChange = this.onChange.bind(this)
    this.emitChange = this.emitChange.bind(this)
  }

  componentWillReceiveProps(props: Props) {
    const hasFocus = document.activeElement === this.input
    if (this.state.value !== props.value && !hasFocus) {
      this.setState({
        value: props.value,
      })
    }
  }

  onChange(e: any) {
    const value = (e.target as any).value
    this.setState({
      value,
    })
    if (this.props.onInput) {
      this.props.onInput(value)
    }
    this.emitChange(e)
  }

  emitChange(e: any) {
    if (this.props.onChange) {
      this.props.onChange(e.target.value)
    }
  }

  render() {
    const {
      type = 'text',
      label = '',
      id = '',
      errors = [],
      placeholder = '',
      className = '',
      onfocus = (value: any) => value,
      help = '',
      disabled = false,
      autoFocus = false,
      min,
      max,
      inputClassName = '',
    } = this.props
    const inputProps = {
      ref: (el: any) => {
        if (el) {
          this.input = el
        }
      },
      onChange: this.onChange,
      name: id,
      className: `
        lh-4 w-100 ba input-reset transition
        ${disabled ? 'fc-gray-600' : 'bg-white bc-blue-f'}
        ${errors.length ? 'bc-red' : 'bc-transparent'}
        ${inputClassName}
      `,
      autoFocus,
      type,
      placeholder,
      value: this.state.value as any,
      id,
      onFocus: onfocus,
      onBlur: (e: any) => {
        if (this.props.onblur) {
          this.props.onblur(e.target.value)
        }
      },
      disabled,
      min,
      max,
    }
    return (
      <div className={className}>
        {label ? <Label id={id}>{label}</Label> : null}
        <div className="d-flex">
          <div className="pos-relative d-flex w-100">
            {type === 'textarea' ? (
              <TextArea {...inputProps} />
            ) : (
              <input {...inputProps} />
            )}
          </div>
        </div>
        {help && !errors.length ? <Label>{help}</Label> : null}
        <ErrorsComponent errors={errors} />
      </div>
    )
  }
}

export default function(props: Props) {
  return <TextField {...props} />
}

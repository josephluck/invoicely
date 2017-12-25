import * as React from 'react'
import ErrorsComponent from './errors'
import Label from './label'
import { Component } from 'react'

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

  componentDidMount() {
    this.bindOnChangeEvent()
  }

  componentDidUpdate() {
    this.bindOnChangeEvent()
  }

  bindOnChangeEvent() {
    const input = this.input
    input.removeEventListener('change', this.emitChange)
    input.addEventListener('change', this.emitChange)
  }

  componentWillReceiveProps(props: Props) {
    const hasFocus = document.activeElement === this.input
    if (this.state.value !== props.value && !hasFocus) {
      this.setState({
        value: props.value,
      })
    }
  }

  onChange(e: React.FormEvent<HTMLInputElement>) {
    const value = (e.target as any).value
    this.setState({
      value,
    })
    if (this.props.onInput) {
      this.props.onInput(value)
    }
  }

  emitChange(e: any) {
    if (this.props.onChange) {
      this.props.onChange(e.target.value)
    }
  }

  render() {
    const InputElement =
      this.props.type === 'textarea' ? 'textarea' : 'input'
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
    } = this.props
    return (
      <div className={className}>
        {label ? <Label className="mb-1">{label}</Label> : null}
        <div className="f-flex">
          <div className="pos-relative f-flex w-100">
            <InputElement
              ref={(el: any) => {
                if (el) {
                  this.input = el
                }
              }}
              className={`
                fs-medium ba bra-2 w-100 pa-2 input-reset oc-accent transition
                ${
                  disabled
                    ? 'fc-gray-600 bg-white'
                    : 'bg-gray-100 bg-white-h bg-white-f bc-blue-f'
                }
                ${errors.length ? 'bc-red' : 'bc-gray-200'}
              `}
              autoFocus={autoFocus}
              type={type}
              placeholder={placeholder}
              value={this.state.value as any}
              id={id}
              onFocus={onfocus}
              onChange={this.onChange}
              onBlur={(e: any) => {
                if (this.props.onblur) {
                  this.props.onblur(e.target.value)
                }
              }}
              disabled={disabled}
              min={min}
              max={max}
              rows="4"
            />
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

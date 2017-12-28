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
  onBlur?: (value: any) => any
  onFocus?: (value: any) => any
  disabled?: boolean
  autoFocus?: boolean
  min?: string
  max?: string
  inputClassName?: string
  inputStyle?: any
  displayFormat?: (value: any) => string
}

export interface State {
  value: any
  focussed: boolean
}

export class TextField extends Component<Props, State> {
  private input: HTMLInputElement
  constructor(props: Props) {
    super(props)
    this.state = {
      value: props.value,
      focussed: false,
    }
    this.onChange = this.onChange.bind(this)
    this.emitChange = this.emitChange.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }
  componentWillReceiveProps(props: Props) {
    const hasFocus = document.activeElement === this.input
    if (this.state.value !== props.value && !hasFocus) {
      this.setState({
        value: props.value,
      })
    }
  }
  onFocus(e: any) {
    this.setState({
      focussed: true,
    })
    if (this.props.onFocus) {
      this.props.onFocus(e.target.value)
    }
  }
  onBlur(e: any) {
    this.setState({
      focussed: false,
    })
    if (this.props.onBlur) {
      this.props.onBlur(e.target.value)
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
      help = '',
      disabled = false,
      autoFocus = false,
      min,
      max,
      inputClassName = '',
      inputStyle = {},
      displayFormat = (v: any) => v,
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
        lh-4 w-100 ba input-reset transition fc-black bg-transparent
        ${disabled ? '' : 'bc-blue-f'}
        ${errors.length ? 'bc-red' : 'bc-transparent'}
        ${inputClassName}
      `,
      autoFocus,
      type,
      placeholder,
      value: this.state.focussed
        ? (this.state.value as any)
        : displayFormat(this.state.value as any),
      id,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      disabled,
      min,
      max,
      style: inputStyle,
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

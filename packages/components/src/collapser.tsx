import * as Collapse from 'react-collapse'
import * as React from 'react'

export interface Props {
  header: (open: boolean) => React.ReactNode
  defaultOpen?: boolean
  children: React.ReactNode
  className?: string
}

export interface State {
  open: boolean
}

export class Collapser extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      open: this.props.defaultOpen ? this.props.defaultOpen : false,
    }
    this.closeMenu = this.closeMenu.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  closeMenu() {
    this.setState({
      open: false,
    })
  }

  toggleMenu() {
    this.setState({
      open: !this.state.open,
    })
  }

  render() {
    return (
      <div className={`pos-relative ${this.props.className}`}>
        <div onClick={this.toggleMenu}>
          {this.props.header(this.state.open)}
        </div>
        <Collapse hasNestedCollapse isOpened={this.state.open}>
          <div>{this.props.children}</div>
        </Collapse>
      </div>
    )
  }
}

export default Collapser

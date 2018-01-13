import * as Collapse from 'react-collapse'
import * as React from 'react'

export interface Props {
  content: React.ReactNode
  children: React.ReactNode
  className?: string
}

export interface State {
  open: boolean
}

export class Menu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      open: false,
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
      <div
        onClick={this.toggleMenu}
        className={`pos-relative ${this.props.className}`}
      >
        {this.props.children}
        <div
          className="pos-absolute"
          style={{
            right: 0,
            top: '100%',
            transformOrigin: 'top right',
          }}
        >
          <Collapse hasNestedCollapse isOpened={this.state.open}>
            <div
              className={`pt-1 transition ${
                this.state.open ? '0-100 scale-in' : 'o-0 scale-out'
              }`}
              onClick={this.closeMenu}
            >
              <div className="bg-white ba bc-gray-200 bra-3 box-card">
                {this.props.content}
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    )
  }
}

export default Menu

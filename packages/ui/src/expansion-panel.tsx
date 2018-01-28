import * as Collapse from 'react-collapse'
import * as React from 'react'

export interface State {
  expandedIndex: number | null
}

export interface Card {
  content: React.ReactNode
  header: (isExpanded: boolean) => React.ReactNode
}

export interface Props {
  cards: Card[]
  className?: string
  expandedIndex?: number | null
  onExpand?: (index: number | null) => any
}

const getBorderRadii = ({
  isExpanded,
  isFirst,
  isExactAfter,
  isLast,
  isExactBefore,
}: Record<string, boolean>) => {
  if (isExpanded || (isFirst && isLast)) {
    return 'bra-3'
  } else if (isFirst) {
    return isExactBefore ? 'bra-3' : 'btlr-3 btrr-3'
  } else if (isLast) {
    return isExactAfter ? 'bra-3' : 'bblr-3 bbrr-3'
  } else if (isExactAfter) {
    return 'btlr-3 btrr-3'
  } else if (isExactBefore) {
    return 'bblr-3 bbrr-3'
  } else {
    return ''
  }
}

export class ExpansionPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      expandedIndex:
        props.expandedIndex !== undefined
          ? props.expandedIndex
          : null,
    }
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.setNextExpansionIndex = this.setNextExpansionIndex.bind(this)
    this.setPreviousExpansionIndex = this.setPreviousExpansionIndex.bind(
      this,
    )
    this.clearExpansionIndex = this.clearExpansionIndex.bind(this)
    this.setExpansionIndex = this.setExpansionIndex.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyUp)
  }

  componentWillReceiveProps(props: Props) {
    if (
      props.expandedIndex !== undefined &&
      props.expandedIndex !== this.state.expandedIndex
    ) {
      this.setState({ expandedIndex: props.expandedIndex })
    } else if (props.cards.length !== this.props.cards.length) {
      this.setState({ expandedIndex: null })
    }
  }

  handleKeyUp(e: KeyboardEvent) {
    if (e.keyCode === 27) {
      // esc
      this.clearExpansionIndex()
    } else if (e.keyCode === 38) {
      // up
      this.setPreviousExpansionIndex()
    } else if (e.keyCode === 40) {
      // down
      this.setNextExpansionIndex()
    }
  }

  setNextExpansionIndex() {
    this.setExpansionIndex(
      this.state.expandedIndex === this.props.cards.length - 1
        ? this.state.expandedIndex
        : this.state.expandedIndex !== null
          ? this.state.expandedIndex + 1
          : null,
    )
  }

  setPreviousExpansionIndex() {
    this.setExpansionIndex(
      this.state.expandedIndex === 0
        ? 0
        : this.state.expandedIndex !== null
          ? this.state.expandedIndex - 1
          : 0,
    )
  }

  clearExpansionIndex() {
    this.setExpansionIndex(null)
  }

  setExpansionIndex(expandedIndex: number | null) {
    if (this.props.onExpand) {
      this.props.onExpand(expandedIndex)
    } else {
      this.setState({ expandedIndex })
    }
  }

  render() {
    const { expandedIndex } = this.state
    return (
      <div className={this.props.className || ''}>
        {this.props.cards.map((card, index) => {
          const isExpanded = expandedIndex === index
          const isFirst = index === 0
          const isLast = index === this.props.cards.length - 1
          const isExactBefore = index + 1 === expandedIndex
          const isExactAfter = index - 1 === expandedIndex
          const borderRadii = getBorderRadii({
            isExpanded,
            isFirst,
            isExactAfter,
            isLast,
            isExactBefore,
          })

          return (
            <div
              key={index}
              className={`
                transition
                ${isExpanded ? 'pb-5' : 'pb-0'}
                ${isExpanded && index !== 0 ? 'pt-5' : 'pt-0'}
              `}
            >
              <div
                className={`
                  bg-white bc-gray-200 transition bl br box-card
                  ${isFirst || isExactAfter ? 'bt' : ''}
                  ${isExpanded ? 'ba' : 'bb'}
                  ${borderRadii}
                `}
              >
                <div
                  onClick={() =>
                    this.setExpansionIndex(isExpanded ? null : index)
                  }
                >
                  <div className="d-flex align-items-center pr-5">
                    <div className="flex-1 mr-3 of-hidden">
                      {card.header(isExpanded)}
                    </div>
                    <i
                      className={`c-pointer fc-gray-600 ion-chevron-down transition ${
                        isExpanded ? 'rotate-0' : 'rotate-180'
                      }`}
                    />
                  </div>
                  {isExpanded ? (
                    <div className="bb bc-gray-200" />
                  ) : null}
                </div>
                <Collapse
                  hasNestedCollapse
                  isOpened={isExpanded}
                  springConfig={{ stiffness: 130, damping: 18 }}
                >
                  {card.content}
                </Collapse>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default ExpansionPanel

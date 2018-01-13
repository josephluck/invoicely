import * as React from 'react'
import Label from './label'
import TextField from './invoice-textfield'
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc'

export interface Column<R extends Row = any> {
  description: string
  key?: keyof R // Matches the key of the row
  type?: CellInputType
  defaultValue?: ValidValue
  textAlign?: CellTextAlign
  calculation?: (row: R) => number
  displayFormat?: (value: ValidValue) => string
  visible: boolean
}

type ValidValue = string | number | boolean
type CellInputType = 'string' | 'number' | 'boolean' | 'calculation'
type CellTextAlign = 'left' | 'center' | 'right'
export type Row = Record<string, ValidValue>

interface SpreadsheetCell<R extends Row> {
  value: ValidValue
  type: CellInputType
  key: keyof R
  textAlign: CellTextAlign
  displayFormat: (value: ValidValue) => string
}

function toString<T>(value: T): string {
  return value.toString()
}

function unzipRows<R extends Row>(
  columns: Column<R>[],
  rows: R[],
): SpreadsheetCell<R>[][] {
  return rows.map(row => {
    return columns.filter(column => column.visible).map(column => {
      const key = column.key! as any
      if (column.calculation) {
        return {
          value: column.calculation(row),
          type: 'calculation' as CellInputType,
          key: 'calculation' as any,
          textAlign: 'right' as CellTextAlign,
          displayFormat: column.displayFormat || toString,
        }
      } else {
        return {
          value: row[key],
          type: column.type || 'string',
          key: column.key!,
          textAlign: column.textAlign || 'left',
          displayFormat: column.displayFormat || toString,
        }
      }
    })
  })
}

function updateCell<R extends Row>(
  columns: Column<R>[],
  rows: R[],
  rowIndex: number,
  columnIndex: number,
  value: ValidValue,
): R[] {
  const key = columns[columnIndex].key
  return rows.map((row, rowI) => {
    return rowIndex === rowI
      ? { ...(row as any), [key!]: value }
      : row
  })
}

function makeNewRow<R extends Row>(columns: Column<R>[]) {
  return columns.reduce((prev, column) => {
    return {
      ...prev,
      [column.key!]: column.defaultValue,
    }
  }, {}) as R
}

interface Props<R extends Row> {
  columns: Column<R>[]
  rows: R[]
  onChange: (rows: R[]) => any
  showLabels?: boolean
  readOnly?: boolean
  totals?: React.ReactNode
}

interface State {}

interface SortableItemProps<R extends Row> {
  row: SpreadsheetCell<R>[]
  rowIndex: number
  showRemoveRow: boolean
  onCellChange: (
    rowIndex: number,
    cellIndex: number,
    value: string,
  ) => any
  removeRow: (rowIndex: number) => any
  readOnly: boolean
}

const SortableItem = SortableElement(
  ({ value }: { value: SortableItemProps<any> }) => {
    return (
      <div className="d-flex align-items-center pb-2 mt-2">
        {!value.readOnly ? (
          <a className="ion-more c-row-resize rotate-90 ta-c fc-blue d-b mr-1" />
        ) : null}
        {value.row.map((cell, cellIndex) => {
          if (cell.type === 'string' || cell.type === 'number') {
            return (
              <TextField
                key={`spreadsheet-input-${
                  value.rowIndex
                }-${cellIndex}`}
                id={`spreadsheet-input-${
                  value.rowIndex
                }-${cellIndex}`}
                inputStyle={{ textAlign: cell.textAlign }}
                value={cell.value}
                displayFormat={cell.displayFormat}
                className="flex-1"
                onChange={val =>
                  value.onCellChange(value.rowIndex, cellIndex, val)
                }
                disabled={value.readOnly}
              />
            )
          } else if (cell.type === 'calculation') {
            return (
              <TextField
                id={`spreadsheet-input-${
                  value.rowIndex
                }-${cellIndex}`}
                key={`spreadsheet-input-${
                  value.rowIndex
                }-${cellIndex}`}
                inputStyle={{ textAlign: cell.textAlign }}
                className="flex-1 lh-4 ba-0"
                value={cell.value.toString()}
                displayFormat={cell.displayFormat}
                disabled
              />
            )
          } else {
            return null
          }
        })}
        {!value.readOnly ? (
          <a
            href={!value.showRemoveRow ? undefined : ''}
            onClick={() => value.removeRow(value.rowIndex)}
            className={`ion-close-round ta-c transition d-b ml-3 ${
              !value.showRemoveRow ? 'fc-gray-300' : 'fc-blue'
            }`}
          />
        ) : null}
      </div>
    )
  },
)

interface SortableListProps<R extends Row> {
  items: SpreadsheetCell<R>[][]
  readOnly: boolean
  showRemoveRow: boolean
  onCellChange: (
    rowIndex: number,
    cellIndex: number,
    value: string,
  ) => any
  removeRow: (rowIndex: number) => any
}

const SortableList = SortableContainer(
  ({
    items,
    readOnly,
    showRemoveRow,
    onCellChange,
    removeRow,
  }: SortableListProps<any>) => {
    return (
      <div>
        {items.map((row, rowIndex) => {
          return (
            <SortableItem
              key={`spreadsheet-row-${rowIndex}`}
              value={{
                row,
                rowIndex,
                showRemoveRow: items.length > 1,
                onCellChange,
                removeRow,
                readOnly,
              }}
              index={rowIndex}
            />
          )
        })}
      </div>
    )
  },
)

class Spreadsheet<R extends Row> extends React.Component<
  Props<R>,
  State
> {
  constructor(props: any) {
    super(props)
    this.state = {}
    this.onCellChange = this.onCellChange.bind(this)
    this.addNewRow = this.addNewRow.bind(this)
    this.focusBottomLeftInput = this.focusBottomLeftInput.bind(this)
    this.removeRow = this.removeRow.bind(this)
    this.onSortEnd = this.onSortEnd.bind(this)
  }
  onCellChange(rowIndex: number, columnIndex: number, value: string) {
    const rows = updateCell(
      this.props.columns,
      this.props.rows,
      rowIndex,
      columnIndex,
      value,
    )
    this.props.onChange(rows)
  }
  addNewRow() {
    const rows = [...this.props.rows, makeNewRow(this.props.columns)]
    this.props.onChange(rows)
    setTimeout(() => {
      this.focusBottomLeftInput()
    }, 10)
  }
  focusBottomLeftInput() {
    const rowIndex = this.props.rows.length - 1
    const input = document.getElementById(
      `spreadsheet-input-${rowIndex}-0`,
    )
    if (input) {
      input.focus()
    }
  }
  removeRow(rowIndex: number) {
    if (this.props.rows.length > 1) {
      const rows = this.props.rows.filter((_, i) => i !== rowIndex)
      this.props.onChange(rows)
      setTimeout(() => {
        this.focusBottomLeftInput()
      }, 10)
    }
  }
  onSortEnd({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number
    newIndex: number
  }) {
    const rows = arrayMove(this.props.rows, oldIndex, newIndex)
    this.props.onChange(rows)
  }
  render() {
    const rows = unzipRows(this.props.columns, this.props.rows)
    const { showLabels = true, readOnly = false, totals } = this.props
    return (
      <div className="spreadsheet">
        <div className="d-flex mb-2">
          {!readOnly ? (
            <a
              className="ion-more pt-1 rotate-90 ta-c fc-blue d-b mr-1 o-0"
              style={{ pointerEvents: 'none' }}
            />
          ) : null}
          {showLabels
            ? this.props.columns
                .filter(column => column.visible)
                .map((column, columnIndex) => {
                  return (
                    <div
                      className="flex-1 bw-small bbs-solid bc-gray-200 pb-3"
                      key={columnIndex}
                      style={{
                        textAlign: column.textAlign || 'left',
                      }}
                    >
                      <Label>{column.description}</Label>
                    </div>
                  )
                })
            : null}
          {!showLabels ? (
            <div className="bb bbs-solid bc-gray-200 flex-1" />
          ) : null}
          {!readOnly ? (
            <i
              style={{ pointerEvents: 'none' }}
              className="ion-close-round d-b o-0 ml-3"
            />
          ) : null}
        </div>
        <div>
          <SortableList
            items={rows}
            readOnly={readOnly}
            onSortEnd={this.onSortEnd}
            showRemoveRow={rows.length > 1}
            onCellChange={this.onCellChange}
            removeRow={this.removeRow}
            lockAxis="y"
            lockToContainerEdges
          />
        </div>
        {totals}
        {!readOnly ? (
          <div className="d-flex">
            <a
              onClick={() => this.addNewRow()}
              href=""
              className="flex-1 pt-3 ta-c fc-blue bc-blue-h bc-blue-f transition d-b"
              style={{ textDecoration: 'none' }}
            >
              Add Another Line Item
            </a>
          </div>
        ) : null}
      </div>
    )
  }
}

export default Spreadsheet

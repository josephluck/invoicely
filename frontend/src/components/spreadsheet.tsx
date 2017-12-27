import * as React from 'react'
import Label from './label'
import Textfield from './invoice/textfield'

interface Column {
  description: string
  key: string // Matches the key of the row
  type: CellInputType
  defaultValue: ValidValue
  textAlign?: 'left' | 'center' | 'right'
}

type ValidValue = string | number | boolean
type CellInputType = 'string' | 'number' | 'boolean'
export type Row = Record<string, ValidValue>

interface SpreadsheetCell {
  value: ValidValue
  type: CellInputType
  key: string
  textAlign: 'left' | 'center' | 'right'
}

function unzipRows(
  columns: Column[],
  rows: Row[],
): SpreadsheetCell[][] {
  return rows.map(row => {
    return columns.map(column => {
      return {
        value: row[column.key],
        type: column.type,
        key: column.key,
        textAlign: column.textAlign || 'left',
      }
    })
  })
}

function updateCell(
  columns: Column[],
  rows: Row[],
  rowIndex: number,
  columnIndex: number,
  value: ValidValue,
): Row[] {
  const key = columns[columnIndex].key
  return rows.map((row, rowI) => {
    return rowIndex === rowI ? { ...row, [key]: value } : row
  })
}

function makeNewRow(columns: Column[]): Row {
  return columns.reduce((prev, column) => {
    return {
      ...prev,
      [column.key]: column.defaultValue,
    }
  }, {})
}

interface Props {
  columns: Column[]
  rows: Row[]
  onChange: (rows: Row[]) => any
}

interface State {}

class Spreadsheet extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {}
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
  render() {
    const rows = unzipRows(this.props.columns, this.props.rows)
    return (
      <div className="spreadsheet">
        <div className="d-flex bw-medium bbs-solid bc-gray-300 pb-2 mb-1">
          {this.props.columns.map((column, columnIndex) => {
            return (
              <div
                className="flex-1"
                key={columnIndex}
                style={{ textAlign: column.textAlign || 'left' }}
              >
                <Label>{column.description}</Label>
              </div>
            )
          })}
        </div>
        <div>
          {rows.map((row, rowIndex) => {
            return (
              <div
                className="d-flex bbs-solid bc-gray-200 pb-1 mt-1"
                key={rowIndex}
              >
                {row.map((cell, cellIndex) => {
                  return (
                    <div className="flex-1" key={cellIndex}>
                      {cell.type === 'string' ||
                      cell.type === 'number' ? (
                        <Textfield
                          id={`spreadsheet-input-${rowIndex}-${cellIndex}`}
                          inputStyle={{ textAlign: cell.textAlign }}
                          value={cell.value.toString()}
                          onChange={value =>
                            this.onCellChange(
                              rowIndex,
                              cellIndex,
                              value,
                            )
                          }
                        />
                      ) : null}
                    </div>
                  )
                })}
              </div>
            )
          })}
          <a
            onClick={() => this.addNewRow()}
            href=""
            className="bbs-solid bc-gray-200 pv-3 ta-c fc-blue bc-blue-h bc-blue-f transition d-b"
            style={{ textDecoration: 'none' }}
          >
            Add Another Line Item
          </a>
        </div>
      </div>
    )
  }
}

export default Spreadsheet

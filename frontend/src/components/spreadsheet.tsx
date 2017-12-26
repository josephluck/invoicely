import * as React from 'react'
import Label from './label'
// import Textfield from './textfield'

interface Column {
  description: string
  key: string // Matches the key of the row
  type: CellInputType
}

type ValidValue = string | number | boolean
type CellInputType = 'string' | 'number' | 'boolean'
export type Row = Record<string, ValidValue>

interface SpreadsheetCell {
  value: ValidValue
  type: CellInputType
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
  render() {
    const rows = unzipRows(this.props.columns, this.props.rows)
    return (
      <div>
        <div className="d-flex">
          {this.props.columns.map((column, columnIndex) => {
            return (
              <div className="flex-1" key={columnIndex}>
                <Label>{column.description}</Label>
              </div>
            )
          })}
        </div>
        <div>
          {rows.map((row, rowIndex) => {
            return (
              <div className="d-flex" key={rowIndex}>
                {row.map((cell, cellIndex) => {
                  return (
                    <div className="flex-1" key={cellIndex}>
                      {cell.type === 'string' ||
                      cell.type === 'number' ? (
                        <input
                          value={cell.value.toString()}
                          type={cell.type}
                          onChange={e =>
                            this.onCellChange(
                              rowIndex,
                              cellIndex,
                              e.target.value,
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
        </div>
      </div>
    )
  }
}

export default Spreadsheet

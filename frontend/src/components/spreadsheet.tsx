import * as React from 'react'
import Label from './label'
// import Textfield from './textfield'

interface Column {
  description: string
  key: string // Matches the key of the row
}

type ValidValue = string | number | boolean
type Row = Record<string, ValidValue>

interface SpreadsheetCell {
  value: ValidValue
}

function makeRows(
  columns: Column[],
  rows: Row[],
): SpreadsheetCell[][] {
  return rows.map(row => {
    return columns.map(column => {
      return {
        value: row[column.key],
      }
    })
  })
}

class Spreadsheet extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }
  render() {
    const props = {
      columns: [
        { description: 'Description', key: 'description' },
        { description: 'Quantity', key: 'quantity' },
        { description: 'Price', key: 'price' },
      ],
      rows: [
        { description: 'Panda Egg Cup', quantity: 1, price: 12.5 },
        { description: 'Quail Eggs', quantity: 1, price: 11 },
        { description: 'Sourdough Bread', quantity: 1, price: 13.75 },
      ],
    }
    const rows = makeRows(props.columns, props.rows)
    return (
      <div>
        <div className="d-flex">
          {props.columns.map((column, columnIndex) => {
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
                      {cell.value}
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

import { Helix } from 'helix-js'
import * as dates from 'date-fns'
import * as Form from './form'
import { Row, Column } from '../components/spreadsheet'
import { GlobalState, GlobalActions } from './index'

interface Fields {
  invoiceNumber: string
  dateCreated: string
  dateDue: string
  billingAddress: string
  companyAddress: string
  includeQuantity: boolean
  includeSubTotal: boolean
}

export interface LineItem extends Row {
  description: string
  quantity: number
  price: number
}

interface LocalState {
  lineItems: LineItem[]
  lineItemColumns: Column<LineItem>[]
}

export interface State extends LocalState {
  form: Form.State<Fields>
}

interface Reducers {
  setLineItems: Helix.Reducer<State, LineItem[]>
  setLineItemColumns: Helix.Reducer<State, Column<LineItem>[]>
}

interface Effects {
  toggleLineItemColumnVisiblity: Helix.Effect<
    GlobalState,
    GlobalActions,
    { name: 'quantity' | 'sub-total'; visible: boolean }
  >
}

type LocalActions = Helix.Actions<Reducers, Effects>

export interface Actions extends LocalActions {
  form: Form.Actions<Fields>
}

const columns: Record<string, Column<LineItem>> = {
  description: {
    description: 'Description',
    key: 'description',
    type: 'string',
    defaultValue: '',
  },
  quantity: {
    description: 'Quantity',
    key: 'quantity',
    type: 'number',
    textAlign: 'right',
    defaultValue: 1,
  },
  price: {
    description: 'Unit Price',
    key: 'price',
    type: 'number',
    textAlign: 'right',
    defaultValue: 0,
  },
  subTotal: {
    description: 'Sub Total',
    key: 'subTotal',
    textAlign: 'right',
    calculation(row) {
      return row.price * row.quantity
    },
  },
}

function emptyState(): LocalState {
  return {
    lineItems: [
      {
        description: 'Panda Egg Cup',
        quantity: 2,
        price: 12.5,
      },
      { description: 'Quail Eggs', quantity: 1, price: 11 },
      {
        description: 'Sourdough Bread',
        quantity: 1,
        price: 13.75,
      },
    ],
    lineItemColumns: [
      columns.description,
      columns.quantity,
      columns.price,
      columns.subTotal,
    ],
  }
}

function insert<A>(arr: A[], index: number, newItem: A): A[] {
  return [...arr.slice(0, index), newItem, ...arr.slice(index)]
}

export const model: Helix.Model<LocalState, Reducers, Effects> = {
  state: emptyState(),
  reducers: {
    setLineItems(state, lineItems) {
      return { lineItems }
    },
    setLineItemColumns(state, lineItemColumns) {
      return { lineItemColumns }
    },
  },
  effects: {
    toggleLineItemColumnVisiblity(state, actions, { name, visible }) {
      if (name === 'quantity') {
        actions.newInvoice.form.setFields({
          includeQuantity: visible,
        })
        if (visible === false) {
          actions.newInvoice.setLineItems(
            state.newInvoice.lineItems.map(item => {
              return {
                ...item,
                quantity: 1,
              }
            }),
          )
          actions.newInvoice.setLineItemColumns(
            state.newInvoice.lineItemColumns.filter(column => {
              return column.key !== 'quantity'
            }),
          )
        } else {
          const newColumns = insert(
            state.newInvoice.lineItemColumns,
            1,
            columns.quantity,
          )
          actions.newInvoice.setLineItemColumns(newColumns)
        }
      } else if (name === 'sub-total') {
        actions.newInvoice.form.setFields({
          includeSubTotal: visible,
        })
        if (visible === false) {
          actions.newInvoice.setLineItemColumns(
            state.newInvoice.lineItemColumns.filter(column => {
              return column.key !== 'subTotal'
            }),
          )
        } else {
          const newColumns = insert(
            state.newInvoice.lineItemColumns,
            3,
            columns.subTotal,
          )
          actions.newInvoice.setLineItemColumns(newColumns)
        }
      }
    },
  },
  models: {
    form: Form.model<Fields>({
      constraints: fields => {
        return {
          includeQuantity: undefined,
          includeSubTotal: undefined,
          invoiceNumber: { presence: true },
          billingAddress: { presence: true },
          companyAddress: { presence: true },
          dateCreated: { presence: true },
          dateDue: { presence: true },
        }
      },
      defaultForm: () => ({
        includeQuantity: true,
        includeSubTotal: true,
        invoiceNumber: '1001',
        billingAddress: 'Acme Corp\n13 The Street\nThe Town\n19920',
        companyAddress: 'Apple Inc\nSilicon Roundabout\n17380',
        dateCreated: dates.format(new Date(), 'YYYY-MM-DD'),
        dateDue: dates.format(
          dates.addMonths(new Date(), 1),
          'YYYY-MM-DD',
        ),
      }),
      onValidationError: () => null,
    }),
  },
}

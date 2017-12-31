import { Helix } from 'helix-js'
import * as dates from 'date-fns'
import * as Form from './form'
import { Row, Column } from '../components/spreadsheet'
import { GlobalState, GlobalActions } from './index'

interface Fields {
  invoiceNumber: string
  dateCreated: string
  billingAddress: string
  companyAddress: string
  notes: string
  includeVat: boolean
  vatRate: number
}

interface TemplateSettingsFields {
  includeLabels: boolean
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
  previewMode: boolean
}

export interface State extends LocalState {
  form: Form.State<Fields>
  templateSettings: Form.State<TemplateSettingsFields>
}

interface Reducers {
  setLineItems: Helix.Reducer<State, LineItem[]>
  setLineItemColumns: Helix.Reducer<State, Column<LineItem>[]>
  togglePreviewMode: Helix.Reducer0<State>
}

interface Effects {
  toggleLineItemColumnVisiblity: Helix.Effect<
    GlobalState,
    GlobalActions,
    { name: 'quantity' | 'subTotal'; visible: boolean }
  >
}

type LocalActions = Helix.Actions<Reducers, Effects>

export interface Actions extends LocalActions {
  form: Form.Actions<Fields>
  templateSettings: Form.Actions<TemplateSettingsFields>
}

export function formatAsCurrency(
  value: any = '',
  icon: string = '£',
): string {
  const num = parseFloat(value.toString().replace(/[^\d.-]/g, ''))
  const currency = num
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  return `${icon}${currency}`
}

export function calculateInvoiceTotal(rows: LineItem[]) {
  return rows.reduce((prev, curr) => {
    return prev + curr.quantity * curr.price
  }, 0)
}

export function calculateVat(total: number, rate: number = 0) {
  return total / 100 * rate
}

const columns: Record<string, Column<LineItem>> = {
  description: {
    description: 'Description',
    key: 'description',
    type: 'string',
    defaultValue: '',
    visible: true,
  },
  quantity: {
    description: 'Quantity',
    key: 'quantity',
    type: 'number',
    textAlign: 'right',
    defaultValue: 1,
    visible: true,
  },
  price: {
    description: 'Price',
    key: 'price',
    type: 'number',
    textAlign: 'right',
    defaultValue: 0,
    visible: true,
    displayFormat: formatAsCurrency,
  },
  subTotal: {
    description: 'Total',
    key: 'subTotal',
    textAlign: 'right',
    calculation(row) {
      return row.price * row.quantity
    },
    visible: true,
    displayFormat: formatAsCurrency,
  },
}

function emptyState(): LocalState {
  return {
    lineItems: [
      {
        description: 'User Research',
        quantity: 1,
        price: 300,
      },
      { description: 'Wireframes', quantity: 1, price: 900 },
      {
        description: 'Website Build',
        quantity: 1,
        price: 1200,
      },
    ],
    lineItemColumns: [
      columns.description,
      columns.quantity,
      columns.price,
      columns.subTotal,
    ],
    previewMode: false,
  }
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
    togglePreviewMode(state) {
      return { previewMode: !state.previewMode }
    },
  },
  effects: {
    toggleLineItemColumnVisiblity(state, actions, { name, visible }) {
      if (name === 'quantity') {
        actions.newInvoice.templateSettings.setFields({
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
        }
      } else if (name === 'subTotal') {
        actions.newInvoice.templateSettings.setFields({
          includeSubTotal: visible,
        })
      }
      const newColumns = state.newInvoice.lineItemColumns.map(
        column => {
          if (column.key === name) {
            return {
              ...column,
              visible: !column.visible,
            }
          } else {
            return column
          }
        },
      )
      actions.newInvoice.setLineItemColumns(newColumns)
    },
  },
  models: {
    templateSettings: Form.model<TemplateSettingsFields>({
      constraints: fields => {
        return {
          includeLabels: undefined,
          includeQuantity: undefined,
          includeSubTotal: undefined,
        }
      },
      defaultForm: () => ({
        includeLabels: true,
        includeQuantity: true,
        includeSubTotal: true,
      }),
      onValidationError: () => null,
    }),
    form: Form.model<Fields>({
      constraints: fields => {
        return {
          notes: undefined,
          includeVat: undefined,
          vatRate: fields.includeVat ? { presence: true } : undefined,
          invoiceNumber: { presence: true },
          billingAddress: { presence: true },
          companyAddress: { presence: true },
          dateCreated: { presence: true },
        }
      },
      defaultForm: () => ({
        notes:
          'Thank you for choosing Awake. Hopefully we can build you something beautiful again soon.',
        invoiceNumber: '1001',
        billingAddress: 'Techspace\n32 Leman Street\nLondon\nE2 3ND',
        companyAddress: 'Awake\nShoreditch\nLondon\nE1 2LB',
        dateCreated: dates.format(new Date(), 'YYYY-MM-DD'),
        includeVat: true,
        vatRate: 20,
      }),
      onValidationError: () => null,
    }),
  },
}

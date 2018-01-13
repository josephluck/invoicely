import { Helix } from 'helix-js'
import * as dates from 'date-fns'
import * as Form from './form'
import { LineItem, Invoice } from 'types'
import { Column } from 'ui/src/spreadsheet'
import { GlobalState, GlobalActions } from './index'
import { formatAsCurrency } from '../utils/invoice'

interface Fields {
  dateCreated: string
  billingAddress: string
  companyAddress: string
  notes: string
  includeTax: boolean
  taxRate: number
  includeDiscount: boolean
  discount: number
  includeLabels: boolean
  includeQuantity: boolean
  includeSubTotal: boolean
}

export function sanitizeInvoice(
  fields: Fields,
  lineItems: LineItem[],
): Invoice {
  return {
    status: 'draft',
    id: '123',
    dateCreated: fields.dateCreated,
    billingAddress: fields.billingAddress,
    companyAddress: fields.companyAddress,
    notes: fields.notes,
    includeTax: fields.includeTax,
    taxRate: fields.taxRate,
    includeDiscount: fields.includeDiscount,
    discount: fields.discount,
    includeLabels: fields.includeLabels,
    includeQuantity: fields.includeQuantity,
    includeSubTotal: fields.includeSubTotal,
    lineItems,
    emails: [],
  }
}

interface LocalState {
  lineItems: LineItem[]
  lineItemColumns: Column<LineItem>[]
  previewMode: boolean
}

export interface State extends LocalState {
  form: Form.State<Fields>
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
        actions.invoiceForm.form.setFields({
          includeQuantity: visible,
        })
        if (visible === false) {
          actions.invoiceForm.setLineItems(
            state.invoiceForm.lineItems.map(item => {
              return {
                ...item,
                quantity: 1,
              }
            }),
          )
        }
      } else if (name === 'subTotal') {
        actions.invoiceForm.form.setFields({
          includeSubTotal: visible,
        })
      }
      const newColumns = state.invoiceForm.lineItemColumns.map(
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
      actions.invoiceForm.setLineItemColumns(newColumns)
    },
  },
  models: {
    form: Form.model<Fields>({
      constraints: fields => {
        return {
          notes: undefined,
          includeTax: undefined,
          taxRate: fields.includeTax ? { presence: true } : undefined,
          includeDiscount: undefined,
          discount: fields.includeTax
            ? { presence: true }
            : undefined,
          number: { presence: true },
          billingAddress: { presence: true },
          companyAddress: { presence: true },
          dateCreated: { presence: true },
          includeLabels: undefined,
          includeQuantity: undefined,
          includeSubTotal: undefined,
        }
      },
      defaultForm: () => ({
        notes:
          'Thank you for choosing Awake. Hopefully we can build you something beautiful again soon.',
        number: '1001',
        billingAddress: 'Techspace\n32 Leman Street\nLondon\nE2 3ND',
        companyAddress: 'Awake\nShoreditch\nLondon\nE1 2LB',
        dateCreated: dates.format(new Date(), 'YYYY-MM-DD'),
        includeTax: true,
        taxRate: 20,
        includeDiscount: true,
        discount: 100,
        includeLabels: true,
        includeQuantity: true,
        includeSubTotal: true,
      }),
      onValidationError: () => null,
    }),
  },
}

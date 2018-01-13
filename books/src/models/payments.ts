import { Helix } from 'helix-js'
import { Payment } from 'types'
import paymentFixture from 'fixtures/src/payment'

export interface State {
  payments: Payment[]
}

interface Reducers {
  setPayments: Helix.Reducer<State, Payment[]>
}

interface Effects {}

export type Actions = Helix.Actions<Reducers, Effects>

function randomPayments() {
  return [
    paymentFixture(),
    paymentFixture(),
    paymentFixture(),
    paymentFixture(),
    paymentFixture(),
    paymentFixture(),
    paymentFixture(),
    paymentFixture(),
    paymentFixture(),
    paymentFixture(),
  ]
}

function emptyState(): State {
  return {
    payments: randomPayments(),
  }
}

export const model: Helix.Model<State, Reducers, Effects> = {
  state: emptyState(),
  reducers: {
    setPayments: (state, payments) => ({ payments }),
  },
  effects: {},
}

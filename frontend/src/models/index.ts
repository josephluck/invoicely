import { Helix } from 'helix-js'
import * as Counter from './counter'

type Models = Helix.Models<{
  counter: Helix.ModelApi<Counter.State, Counter.Actions>
}>

export type GlobalState = Models['state']
export type GlobalActions = Models['actions']

const model: Helix.Model<any, any, any> = {
  state: {},
  models: {
    counter: Counter.model
  }
}

export default model
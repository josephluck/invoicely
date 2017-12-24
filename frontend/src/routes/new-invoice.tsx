import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'

const page: Helix.Component<GlobalState, GlobalActions> = (state, prev, actions) => (
  <div>
    The count is:
    <p>{state.counter.count}</p>
    <button onClick={actions.counter.increment}>Increment</button>
  </div>
)

export default page

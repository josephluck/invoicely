import * as React from 'react';
import registerServiceWorker from './registerServiceWorker'
import helix, { Helix } from 'helix-js'
import log from 'twine-log'
import renderer from 'helix-js/lib/renderers/react'

interface State {
  count: number
}

interface Reducers {
  increment: Helix.Reducer0<State>
}

interface Effects { }

type Actions = Helix.Actions<Reducers, Effects>

const model: Helix.Model<State, Reducers, Effects> = {
  state: {
    count: 0
  },
  reducers: {
    increment: (state) => ({ count: state.count + 1 }),
  }
}

helix<State, Actions>({
  model,
  component: (state, prev, actions) => (
    <div>
      The count is:
      <p>{state.count}</p>
      <button onClick={actions.increment}>Increment</button>
    </div>
  ),
  render: renderer(document.getElementById('root')!),
  plugins: [log],
})

registerServiceWorker();

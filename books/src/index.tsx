import registerServiceWorker from './registerServiceWorker'
import helix from 'helix-js'
import log from 'twine-log'
import renderer from 'helix-js/lib/renderers/react'
import model, { GlobalState, GlobalActions } from './models'
import routes from './routes'
import css from './css'
require('./css/css.css')
require('./css/react-datepicker.css')

css.inject()

helix<GlobalState, GlobalActions>({
  model,
  routes,
  render: renderer(document.getElementById('root')!),
  plugins: [log],
})

registerServiceWorker()

if ((module as any).hot) {
  console.log('were hot yo')
  ;(module as any).hot.accept('./index', () => {
    console.log('did a thing')
    // dom.render(node(state, previous, actions), elm) // module or one of its dependencies was just updated
  })
}

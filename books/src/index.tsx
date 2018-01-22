import './env'
import registerServiceWorker from './registerServiceWorker'
import helix from 'helix-js'
import log from 'twine-log'
import renderer from 'helix-js/lib/renderers/react'
import model, { GlobalState, GlobalActions } from './models'
import routes from './routes'
import css from 'ui/src/css'
require('ui/src/css.css')
require('ui/src/react-datepicker.css')

css.inject()

helix<GlobalState, GlobalActions>({
  model,
  routes,
  render: renderer(document.getElementById('root')!),
  plugins: [log],
})

registerServiceWorker()

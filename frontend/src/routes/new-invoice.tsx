import * as React from 'react'
import { Helix } from 'helix-js'
import { GlobalState, GlobalActions } from '../models'
import Layout from './layout'
import Circle from '../components/circle'

const Title = (
  <div>
    <Circle>1</Circle>
    Details
  </div>
)

const page: Helix.Page<GlobalState, GlobalActions> = {
  view: (state, prev, actions) => <Layout title={Title}>Hello</Layout>,
}

export default page

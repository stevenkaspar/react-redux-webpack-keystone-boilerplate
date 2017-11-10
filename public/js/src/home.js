// globally import bootstrap
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './containers/App'

const home_elem = document.getElementById('Home')

const render = Component => {
  const NextApp = require('./containers/App').default
  ReactDOM.render(
    <AppContainer>
      <NextApp />
    </AppContainer>, home_elem
  )
}

render(App)

if(module.hot){
  module.hot.accept('./containers/App', () => { render(App) })
}
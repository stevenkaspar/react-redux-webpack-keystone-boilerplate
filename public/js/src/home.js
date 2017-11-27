// globally import bootstrap
import React from 'react'
import { hydrate } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import dataServices from './actions'

import App from './containers/App'

import style from '../../styles/src/site.scss'

// Grab the state from a global variable injected into the server-generated HTML
const preloaded_state = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

const middleware = [ thunk, ...dataServices ]
// if (process.env.NODE_ENV !== 'production') {
  // middleware.push(createLogger())
// }

const store = createStore(
  reducer,
  preloaded_state,
  applyMiddleware(...middleware)
)

// This is how you would trigger Ajax calls to fetch redux data
// store.dispatch({type: 'REQUEST_DOCUMENTS'})
// store.dispatch({type: 'REQUEST_USER'})
// store.dispatch({type: 'REQUEST_USERS'})

const render = Component => {
  const NextApp = require('./containers/App').default
  hydrate(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <NextApp store={store}/>
        </Router>
      </Provider>
    </AppContainer>, document.getElementById('Home')
  )
}

render(App)

if(module.hot){
  module.hot.accept('./containers/App', () => { render(App) })
}

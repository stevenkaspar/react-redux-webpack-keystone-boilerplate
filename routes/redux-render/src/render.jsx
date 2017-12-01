import React from 'react'
import ReactDOM from 'react-dom'
import { renderToString } from 'react-dom/server'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { StaticRouter as Router, Route, Switch, Link } from 'react-router-dom'
import reducer from '../../../public/js/src/reducers'
import thunk from 'redux-thunk'

import dataServices from '../../../public/js/src/actions'

import App from '../../../public/js/src/containers/App'

import style from '../../../public/styles/src/site.scss'

function handleRender(state, req, res, next) {
  // Create a new Redux store instance
  const store = createStore(
    reducer,
    state
  )

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <Router location={req.originalUrl} context={store}>
        <App store={store}/>
      </Router>
    </Provider>
  )


  // Grab the initial state from our Redux store
  const preloadedState = store.getState()

  // Send the rendered page back to the client
  res.locals.react_css = style.toString()
  res.locals.react_html = html
  res.locals.react_js = `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}`
  next()
}

module.exports = handleRender

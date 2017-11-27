// globally import bootstrap
import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import reducer from '../reducers'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import dataServices from '../actions'

import NavigationBar from './NavigationBar'
import Home from './Home'
import Admin from './Admin'

import style from '../../../styles/src/site.scss'

// Grab the state from a global variable injected into the server-generated HTML
const preloaded_state = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

export default class App extends React.Component {
  constructor(){
    super()


    const middleware = [ thunk, ...dataServices ]
    // if (process.env.NODE_ENV !== 'production') {
      // middleware.push(createLogger())
    // }

    this.store = createStore(
      reducer,
      preloaded_state,
      applyMiddleware(...middleware)
    )

    this.store.dispatch({type: 'REQUEST_DOCUMENTS'})
    this.store.dispatch({type: 'REQUEST_USER'})
    this.store.dispatch({type: 'REQUEST_USERS'})
  }

  render(){
    return (
      <Provider store={this.store}>
        <Router>
          <div>
            <NavigationBar store={this.store}/>
            <Route exact={true} path="/app" component={Home} />
            <Route path="/app/admin" component={Admin} />
          </div>
        </Router>
      </Provider>
    )
  }
}

// globally import bootstrap
import React from 'react'
import ReactDOM from 'react-dom'

import { Route } from 'react-router-dom'

import NavigationBar from './NavigationBar'
import Home from './Home'
import Admin from './Admin'

export default class App extends React.Component {
  constructor(){
    super()
  }

  render(){
    return (
      <div>
        <NavigationBar store={this.props.store}/>
        <Route exact={true} path="/app" component={Home} />
        <Route path="/app/admin" component={Admin} />
      </div>
    )
  }
}

import * as React from 'react'
import PropTypes from 'prop-types'

import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import AdminLanding from '../containers/Admin/AdminLanding'

export default class Admin extends React.Component {
  constructor(){
    super()
  }

  render(){
    if(Object.keys(this.props.user.user).length === 0 && this.props.user.is_fetching){
      return (
        <div className='container-fluid'>
          <div className='row pb-5'>
            <div className='col-12 pb-md-0'>
              Loading&nbsp;<i className='fa fa-spin fa-circle-o-notch'></i>
            </div>
          </div>
        </div>
      )
    }
    if(!this.props.user.user.is_admin){
      return (
        <div className='container-fluid'>
          <div className='row pb-5'>
            <div className='col-12 pb-md-0'>
              <div className='alert alert-danger'>
                You do not have access to this area
              </div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className='admin-container'>
        <div className='admin-wrapper'>
          <div className='admin-navigation'>
            <div className='section-header d-flex justify-content-between align-items-end'>
              <h4 className='section-label'>Navigation</h4>
            </div>
            <nav className='nav flex-column'>
              <Link className='nav-link' to='/app/admin'>Dashboard</Link>
            </nav>
          </div>
          <div className='admin-workspace'>
            <Switch>
              <Route exact={true} path="/app/admin" component={AdminLanding} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

Admin.propTypes = {
  user: PropTypes.object.isRequired
}

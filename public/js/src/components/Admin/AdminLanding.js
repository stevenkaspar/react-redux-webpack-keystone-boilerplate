import * as React from 'react'
import PropTypes from 'prop-types'

import AddNewUserForm from './AddNewUserForm'

export default class AdminLanding extends React.Component {
  constructor(){
    super()
  }
  render(){
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 pb-5'>
            <div className='section-header d-flex justify-content-between align-items-end'>
              <h4 className='section-label'>Admin</h4>
            </div>
            Do some admin stuff
            <AddNewUserForm />
          </div>
        </div>
      </div>
    )
  }
}


AdminLanding.propTypes = {
  user: PropTypes.object.isRequired
}

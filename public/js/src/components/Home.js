import * as React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

export default class Home extends React.Component {
  constructor(){
    super()

    this.state = {}
  }

  render(){
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 pb-5'>
            <div className='section-header d-flex justify-content-between align-items-end'>
              <h4 className='section-label'>Home</h4>
            </div>
            <span className='font-weight-bold'>Start building something</span> - this has Hot Module Replacement built in so start making changes and watch the magic
          </div>
        </div>
      </div>
    )
  }
}

Home.propTypes = {}

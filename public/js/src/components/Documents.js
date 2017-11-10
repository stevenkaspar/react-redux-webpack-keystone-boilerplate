import * as React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import DocumentList from './DocumentList'

export default class Documents extends React.Component {
  constructor(){
    super()
  }

  render(){
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 pb-2 pb-md-0'>
            <Link to='/app' className='text-muted'>back to Dashboard</Link>
            <hr/>
            <div className='section-header d-flex justify-content-between align-items-end'>
              <h4 className='section-label'>All Documents</h4>
            </div>
            <DocumentList documents={this.props.documents} max_items={Infinity}/>
          </div>
        </div>
      </div>
    )
  }
}


Documents.propTypes = {
  documents: PropTypes.object.isRequired
}

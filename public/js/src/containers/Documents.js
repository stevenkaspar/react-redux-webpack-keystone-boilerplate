import React, { Component } from 'react'
import { connect } from 'react-redux'

import DocumentsComponent from '../components/Documents'

class Documents extends Component {
  render() {
    return (
      <DocumentsComponent {...this.props}/>
    )
  }
}

const mapStateToProps = (state, props) => ({
  ...state,
  ...props
})

export default connect(mapStateToProps)(Documents)

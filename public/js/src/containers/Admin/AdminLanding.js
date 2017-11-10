import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import AdminLandingComponent from '../../components/Admin/AdminLanding'

class AdminLanding extends Component {
  render() {
    return (
      <AdminLandingComponent {...this.props}/>
    )
  }
}

const mapStateToProps = (state, props) => ({
  ...state,
  ...props
})

export default connect(mapStateToProps)(AdminLanding)

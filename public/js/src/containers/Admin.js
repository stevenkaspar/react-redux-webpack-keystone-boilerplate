import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import services from '../services'
import AdminComponent from '../components/Admin'

class Admin extends Component {
  constructor(){
    super()
  }

  render() {
    return (
      <AdminComponent {...this.props}/>
    )
  }
}

const mapStateToProps = (state, props) => ({
  ...state,
  ...props
})

export default connect(mapStateToProps)(Admin)

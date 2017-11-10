import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import HomeComponent from '../components/Home'

class Home extends Component {
  render() {
    return (
      <HomeComponent {...this.props}/>
    )
  }
}

const mapStateToProps = (state, props) => ({
  ...state,
  ...props
})

export default connect(mapStateToProps)(Home)

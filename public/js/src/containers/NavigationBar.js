import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Navbar, NavbarToggler, Collapse, Nav } from 'reactstrap'

import { Link } from 'react-router-dom'

class NavigationBar extends Component {
  constructor(){
    super()

    this.state = {
      is_open: false
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle(){
    this.setState({
      is_open: !this.state.is_open
    })
  }

  render() {
    return (
      <Navbar className='fixed-top' color="brand" dark expand="md">
        <Link className='navbar-brand' to='/app'>React Webpack HMR</Link>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.is_open} navbar>
          <Nav className="ml-auto" navbar>
            {
              this.props.user.user.is_admin ?
                <li className='nav-item'>
                  <Link className='nav-link' to='/app/admin'>admin</Link>
                </li>
              : null
            }
            {
              this.props.user.user._id ?
                <li className='nav-item'>
                  <a className='nav-link' href='/signout'>logout</a>
                </li>
              :
                <li className='nav-item'>
                  <a className='nav-link' href='/signin'>login</a>
                </li>
            }
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = (state, props) => ({
  ...state,
  ...props
})

export default connect(mapStateToProps)(NavigationBar)

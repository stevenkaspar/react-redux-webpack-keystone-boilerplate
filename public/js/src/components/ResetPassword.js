import * as React from 'react'
import PropTypes from 'prop-types'

import $ from 'jquery'

import FlashMessages from './FlashMessages'

export default class ResetPassword extends React.Component {
  constructor(){
    super()

    this.state = {
      password: '',
      is_submitting: false,
      submit_response: {
        error:   '',
        success: false,
        data:    {}
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFormSubmit  = this.handleFormSubmit.bind(this)
  }

  handleInputChange(event){
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  handleFormSubmit(event){
    event.preventDefault()

    this.setState({
      is_submitting: true
    })

    $.ajax({
      type: 'POST',
      url: '/api/reset-password',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        password: this.state.password,
        hash:     window.location.href.split('/').pop()
      }),
      success: (data, status, xhr) => {
        this.setState({
          is_submitting: false,
          submit_response: { ...data }
        })
        if(data.success){
          window.location.href = '/'
        }
      },
      error: (data, status, xhr) => {
        let response = JSON.parse(data.responseText)
        this.setState({
          is_submitting: false,
          submit_response: { ...response }
        })
      }
    })

  }

  render(){
    return (
      <div className='signin-form-container'>
        <div className='signin-form-wrapper'>
          <FlashMessages />
          <form onSubmit={this.handleFormSubmit}>
            {
              this.state.submit_response.error.length > 0 ?
                <div className='bg-danger text-white p-1'>
                  {this.state.submit_response.error}
                </div>
              : null
            }
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input className='form-control' value={this.state.password} onChange={this.handleInputChange} name='password' type='password' />
            </div>
            <button type='submit' className='btn btn-block btn-brand' disabled={this.state.is_submitting}>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}


ResetPassword.propTypes = {}

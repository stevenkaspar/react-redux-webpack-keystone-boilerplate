import * as React from 'react'
import PropTypes from 'prop-types'

import $ from 'jquery'

export default class ResetPasswordForm extends React.Component {
  constructor(){
    super()

    this.state = {
      email: '',
      message: '',
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
      url: `/api/users/reset_password?email=${this.state.email}`,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        email:    this.state.email
      }),
      success: (data, status, xhr) => {
        let update = {
          is_submitting: false,
          submit_response: { ...data }
        }
        if(data.success){
          update.message = 'Check your email. You should have received your link to reset your password'
        }
        this.setState(update)
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
      <form onSubmit={this.handleFormSubmit}>
        {
          this.state.submit_response.error.length > 0 ?
            <div className='bg-danger text-white p-1'>
              {this.state.submit_response.error}
            </div>
          : null
        }
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input className='form-control' value={this.state.email} onChange={this.handleInputChange} name='email' type='email' />
        </div>
        <button type='submit' className='btn btn-block btn-brand' disabled={this.state.is_submitting}>Reset</button>
        {
          this.state.message.length > 0 ?
            <div className='p-1'>{this.state.message}</div>
          : null
        }
      </form>
    )
  }
}


ResetPasswordForm.propTypes = {}

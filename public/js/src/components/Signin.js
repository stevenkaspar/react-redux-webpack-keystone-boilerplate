import * as React from 'react'
import PropTypes from 'prop-types'

import $ from 'jquery'

import FlashMessages from './FlashMessages'
import ResetPasswordForm from './ResetPasswordForm'

export default class Signin extends React.Component {
  constructor(){
    super()

    this.state = {
      show_forgot_form: false,
      email: '',
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
    this.toggleForm        = this.toggleForm.bind(this)
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
      url: '/api/signin',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        email:    this.state.email,
        password: this.state.password
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

  toggleForm(){
    this.setState({
      show_forgot_form: !this.state.show_forgot_form
    })
  }

  render(){
    return (
      <div className='signin-form-container'>
        <div className='signin-form-wrapper'>
          <FlashMessages />
          {
            this.state.show_forgot_form ?
              <ResetPasswordForm />
            :
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
                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <input className='form-control' value={this.state.password} onChange={this.handleInputChange} name='password' type='password' />
                </div>
                <button type='submit' className='btn btn-block btn-brand' disabled={this.state.is_submitting}>Signin</button>
              </form>
          }
          <div className='py-2 text-right'>
            <button className='btn btn-link text-muted px-0' onClick={this.toggleForm}>
              { this.state.show_forgot_form ? 'Back to sign in' : 'Forgot Password?' }
            </button>
          </div>
        </div>
      </div>
    )
  }
}


Signin.propTypes = {}

import * as React from 'react'
import PropTypes from 'prop-types'

import { Alert } from 'reactstrap'

import services from '../../services'

export default class AddNewUserForm extends React.Component {
  constructor({edit_user_id, users}){
    super()

    let user = edit_user_id ? users.items.find(user => user._id === edit_user_id) : null

    this.state = {
      is_submitting: false,
      submit_error:  '',
      submit_user: {},
      form: this.getFormValues(user),
      editing_user: user,
      show_success_alert: false
    }

    this.setFormField       = this.setFormField.bind(this)
    this.clearForm          = this.clearForm.bind(this)
    this.handleSubmit       = this.handleSubmit.bind(this)
    this.toggleSuccessAlert = this.toggleSuccessAlert.bind(this)
    this.sendResetPasswordLink = this.sendResetPasswordLink.bind(this)
  }

  getFormValues(user = this.state.editing_user){
    return {
      fname:        user ? user.name.first : '',
      lname:        user ? user.name.last : '',
      email:        user ? user.email : '',
      password:     '',
      confirm_password: '',
      active: user ? user.active : true,
    }
  }

  setFormField(event){
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
      }
    })
  }

  handleSubmit(event){
    if(event) event.preventDefault()


    this.setState({
      is_submitting: true
    })

    const data = {
      name: {
        first: this.state.form.fname,
        last:  this.state.form.lname
      },
      email:    this.state.form.email,
      password: this.state.form.password,
      active:   this.state.form.active
    }

    if(this.props.edit_user_id){
      services.users.update(this.props.edit_user_id, data).then(user => {
        this.setState({
          is_submitting: false,
          submit_user: user,
          show_success_alert: true,
          success_message: `User has been updated - (${user._id})`
        })
      }).catch(error => {
        this.setState({
          is_submitting: false,
          submit_error:  error,
          show_success_alert: false
        })
      })
    }
    else {
      services.users.create(data).then(user => {
        this.setState({
          is_submitting: false,
          submit_user: user,
          show_success_alert: true,
          success_message: `User has been added - (${user._id})`
        })
      }).catch(error => {
        this.setState({
          is_submitting: false,
          submit_error:  error,
          show_success_alert: false
        })
      })
    }
  }

  clearForm(event){
    if(event) event.preventDefault()

    this.setState({
      submit_error: '',
      submit_user: {},
      form: {
        ...this.state.form,
        ...this.getFormValues()
      }
    })
  }

  passwordsDoNotMatch(){
    return (this.state.form.confirm_password.length > 0 && this.state.form.confirm_password !== this.state.form.password)
  }

  disabledForm(){
    return (this.state.is_submitting || (this.state.submit_user._id && !this.props.edit_user_id))
  }

  toggleSuccessAlert(){
    this.setState({
      show_success_alert: !this.state.show_success_alert
    })
  }

  sendResetPasswordLink(){
    this.setState({
      is_submitting: true
    })
    services.users.resetPassword(this.state.editing_user.email).then(success => {
      this.setState({
        is_submitting: false,
        show_success_alert: true,
        success_message: `User will receive link to reset password (${this.state.editing_user.email})`
      })
    }).catch(error => {
      this.setState({
        is_submitting: false,
        submit_error:  error,
        show_success_alert: false
      })
    })
  }

  render(){
    const disabled_form     = this.disabledForm()
    const password_required = !this.props.edit_user_id
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {
            this.state.submit_error.length > 0 ?
              <div className='bg-danger p-1 text-white'>{this.state.submit_error}</div>
            : null
          }
          <div className='form-row'>
            <div className='col-6 form-group'>
              <label htmlFor='fname'>First Name</label>
              <input name='fname' value={this.state.form.fname} onChange={this.setFormField} className='form-control' disabled={disabled_form} required={true}/>
            </div>
            <div className='col-6 form-group'>
              <label htmlFor='lname'>Last Name</label>
              <input name='lname' value={this.state.form.lname} onChange={this.setFormField} className='form-control' disabled={disabled_form} required={true}/>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input name='email' value={this.state.form.email} onChange={this.setFormField} className='form-control' disabled={disabled_form} type='email' required={true}/>
          </div>
          <div className='form-row'>
            <div className='col-6 form-group'>
              <label htmlFor='password'>Password</label>
              <input name='password' value={this.state.form.password} onChange={this.setFormField} className='form-control' disabled={disabled_form} type='password' required={password_required}/>
            </div>
            <div className='col-6 form-group'>
              <label htmlFor='confirm_password'>Confirm Password</label>
              <input name='confirm_password' value={this.state.form.confirm_password} onChange={this.setFormField} className={`form-control ${(this.passwordsDoNotMatch()) ? 'text-danger' : ''}`} disabled={disabled_form} type='password' required={password_required}/>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='active'>Active</label>
            <input name='active' checked={this.state.form.active} onChange={this.setFormField} className='form-control' disabled={disabled_form} type='checkbox'/>
          </div>
          <Alert color='success' isOpen={this.state.show_success_alert} toggle={this.toggleSuccessAlert}>
            {this.state.success_message}
          </Alert>
          <div className='py-2'>
            {
              (this.state.submit_user._id && !this.props.edit_user_id) ?
                <button className='btn btn-block btn-brand' onClick={this.clearForm}>Restart</button>
              :
                <div className='d-flex justify-content-between'>
                  {
                    this.props.edit_user_id ?
                      <button className='btn btn-secondary' onClick={this.sendResetPasswordLink} disabled={disabled_form} type='button'>Reset Password</button>
                    : <button className='btn btn-secondary' onClick={this.clearForm} disabled={disabled_form} type='button'>Clear</button>
                  }
                  <button className='btn btn-brand' type='submit' disabled={disabled_form}>Save</button>
                </div>
            }
          </div>
        </form>
      </div>
    )
  }
}

AddNewUserForm.propTypes = {
  edit_user_id: PropTypes.string
}

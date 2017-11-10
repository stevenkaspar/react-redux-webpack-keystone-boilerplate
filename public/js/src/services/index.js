import $ from 'jquery'

let getUsersDocuments = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'get',
      url: '/api/documents',
      dataType: 'json',
      success: (data, status, xhr) => {
        if(data.success){
          resolve(data.data.documents)
        }
      },
      error: (data, status, xhr) => errorHandler(data, status, xhr, reject)
    })
  })
}
let getLoggedInUser = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'get',
      url: '/api/user',
      dataType: 'json',
      success: (data, status, xhr) => {
        if(data.success){
          resolve(data.data.user)
        }
      },
      error: (data, status, xhr) => errorHandler(data, status, xhr, reject)
    })
  })
}
let getUsers = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'get',
      url: '/api/users',
      dataType: 'json',
      success: (data, status, xhr) => {
        if(data.success){
          resolve(data.data.users)
        }
      },
      error: (data, status, xhr) => errorHandler(data, status, xhr, reject)
    })
  })
}
let createUser = data => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'post',
      url: '/api/users',
      data: data,
      dataType: 'json',
      success: (data, status, xhr) => {
        if(data.success){
          resolve(data.data.user)
        }
      },
      error: (data, status, xhr) => errorHandler(data, status, xhr, reject)
    })
  })
}
let updateUser = (user_id, data) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'put',
      url: `/api/users/${user_id}`,
      data: data,
      dataType: 'json',
      success: (data, status, xhr) => {
        if(data.success){
          resolve(data.data.user)
        }
      },
      error: (data, status, xhr) => errorHandler(data, status, xhr, reject)
    })
  })
}
let resetPassword = user_email => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'post',
      url: `/api/users/reset_password?email=${user_email}`,
      data: {},
      dataType: 'json',
      success: (data, status, xhr) => {
        if(data.success){
          resolve(data.data.success)
        }
      },
      error: (data, status, xhr) => errorHandler(data, status, xhr, reject)
    })
  })
}
let errorHandler = (data, status, xhr, reject) => {
  let response = JSON.parse(data.responseText)

  if(data.status === 403){
    const alert_elem = document.createElement('div')
    alert_elem.innerHTML = `
      <div style='position: fixed; top: 0; right: 0; bottom: 0; left: 0; background: rgba(10,10,10,.5); z-index: 10000; display: flex; justify-content: center; align-items: center'>
        <div class='p-4 bg-white text-center'>You are no longer signed in. Redirecting to sign in page...</div>
      </div>
    `
    document.body.appendChild(alert_elem)

    setTimeout(() => { window.location.href = '/' }, 3000)
  }
  else {
    reject(response.error)
  }
}


export const services = {
  documents: {
    getUsersDocuments
  },
  user: {
    getLoggedInUser
  },
  users: {
    get: getUsers,
    create: createUser,
    update: updateUser,
    resetPassword: resetPassword
  }
}

export default services

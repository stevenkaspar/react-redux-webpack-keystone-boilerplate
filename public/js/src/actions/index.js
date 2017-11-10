import services from '../services'

/* DOCUMENTS */
export const REQUEST_DOCUMENTS = 'REQUEST_DOCUMENTS'
export const RECEIVE_DOCUMENTS = 'RECEIVE_DOCUMENTS'

export const receiveDocuments = data => ({
  type: RECEIVE_DOCUMENTS,
  data
})

const fetchDocuments = store => next => action => {
  next(action)
  if(action.type === REQUEST_DOCUMENTS){
    services.documents.getUsersDocuments().then(data => {
      next(receiveDocuments(data))
    })
  }
}

/* USER */
export const REQUEST_USER = 'REQUEST_USER'
export const RECEIVE_USER = 'RECEIVE_USER'

export const receiveUser = data => ({
  type: RECEIVE_USER,
  data
})

const fetchUser = store => next => action => {
  next(action)
  if(action.type === REQUEST_USER){
    services.user.getLoggedInUser().then(data => {
      next(receiveUser(data))
    })
  }
}

/* USERS */
export const REQUEST_USERS = 'REQUEST_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'

export const receiveUsers = data => ({
  type: RECEIVE_USERS,
  data
})

const fetchUsers = store => next => action => {
  next(action)
  if(action.type === REQUEST_USERS){
    services.users.get().then(data => {
      next(receiveUsers(data))
    })
  }
}

export default [
  fetchDocuments,
  fetchUser,
  fetchUsers
]

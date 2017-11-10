import { combineReducers } from 'redux'
import {
  REQUEST_DOCUMENTS,
  RECEIVE_DOCUMENTS,
  REQUEST_USER,
  RECEIVE_USER,
  REQUEST_USERS,
  RECEIVE_USERS
} from '../actions'

const documents = (state = {
  is_fetching: false,
  is_invalid: false,
  items: []
}, action) => {
  switch (action.type) {
    case REQUEST_DOCUMENTS:
      return {
        ...state,
        is_fetching: true,
        is_invalid: false
      }
    case RECEIVE_DOCUMENTS:
      return {
        ...state,
        is_fetching: false,
        is_invalid: false,
        items: action.data
      }
    default:
      return state
  }
}

const user = (state = {
  is_fetching: false,
  is_invalid: false,
  user: {}
}, action) => {
  switch (action.type) {
    case REQUEST_USER:
      return {
        ...state,
        is_fetching: true,
        is_invalid: false
      }
    case RECEIVE_USER:
      return {
        ...state,
        is_fetching: false,
        is_invalid: false,
        user: action.data
      }
    default:
      return state
  }
}

const users = (state = {
  is_fetching: false,
  is_invalid: false,
  items: []
}, action) => {
  switch (action.type) {
    case REQUEST_USERS:
      return {
        ...state,
        is_fetching: true,
        is_invalid: false
      }
    case RECEIVE_USERS:
      return {
        ...state,
        is_fetching: false,
        is_invalid: false,
        items: action.data
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  documents:         documents,
  user:              user,
  users:             users
})

export default rootReducer

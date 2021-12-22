// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import dataTables from '@src/views/tables/data-tables/store/reducer'
import users from '@src/views/manageSystem/users/store/reducer'
import lookups from '@src/views/manageSystem/Lookups/store/reducer/Index'
import roles from '@src/views/manageSystem/Roles/store/reducer/index'

const rootReducer = combineReducers({
  auth,
  users,
  navbar,
  layout,
  dataTables,
  lookups,
  roles
})

export default rootReducer

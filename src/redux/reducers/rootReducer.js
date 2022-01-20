// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import users from '@src/views/manageSystem/users/store/reducer'
import lookups from '@src/views/manageSystem/Lookups/store/reducer/Index'
import roles from '@src/views/manageSystem/Roles/store/reducer/index'
import indicators from '@src/views/manageIndicator/indicators/store/reducer/index'
import sources from '@src/views/manageIndicator/sources/store/reducer/index'
import units from '@src/views/manageIndicator/units/store/reducer/index'

const rootReducer = combineReducers({
    auth,
    users,
    navbar,
    layout,
    lookups,
    roles,
    indicators,
    sources,
    units
})

export default rootReducer

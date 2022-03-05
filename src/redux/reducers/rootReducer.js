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
import periodicities from '@src/views/manageIndicator/periodicities/store/reducer/index'
import units from '@src/views/manageIndicator/units/store/reducer/index'
import dimensions from '@src/views/manageDimension/dimensions/store/reducer/index'
import dimensionValues from '@src/views/manageDimension/dimensions/dimensionValues/store/reducer/index'
import dimensionLevels from '@src/views/manageDimension/dimensions/dimensionLevels/store/reducer/index'
import datasets from '@src/views/dataset/store/reducer/index'
import classifications from '@src/views/manageClassification/classifications/store/reducer/index'
import classificationValues from '@src/views/manageClassification/classifications/classificationValues/store/reducer/index'
import researcherIndicators from '@src/views/indicator/store/reducer/index'
import documentIssues from '@src/views/managePublication/documentIssue/store/reducer/index'

const rootReducer = combineReducers({
    auth,
    users,
    navbar,
    layout,
    lookups,
    roles,
    indicators,
    sources,
    periodicities,
    units,
    dimensions,
    dimensionValues,
    dimensionLevels,
    datasets,
    classifications,
    classificationValues,
    researcherIndicators,
    documentIssues
})

export default rootReducer

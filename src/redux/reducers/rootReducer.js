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
import oldIndicators from '../../views/manageIndicator/oldIndicators/store/reducer/index'
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
import definitions from '@src/views/systemServices/Definitions/store/reducer/index'
import providers from '@src/views/systemServices/providers/store/reducer/index'
import webResources from '@src/views/systemServices/webResources/store/reducer/index'
import documentLibraries from '@src/views/managePublication/documentLibrary/store/reducer/index'
import inquiries from  '@src/views/manageInquiry/Inquiry/store/reducer/index'
import inquiryProcedures from '@src/views/manageInquiry/InquiryProcedures/store/reducer/index'
import documentLibrary from '../../views/documentLibrary/store/reducer'
import userNotifications from '@src/views/notification/store/reducer/index'
import indicatorDetails from '@src/views/indicator/indicatorDetails/store/reducer/index'


const rootReducer = combineReducers({
    auth,
    users,
    navbar,
    layout,
    lookups,
    roles,
    indicators,
    oldIndicators,
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
    documentIssues,
    definitions,
    providers,
    webResources,
    documentLibraries,
    inquiries,
    inquiryProcedures,
    documentLibrary,
    userNotifications,
    indicatorDetails
})

export default rootReducer

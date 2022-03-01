// ** Navigation sections imports
import apps from './apps'
import manageDataset from './manageDataset'
import manageClassifications from './manageClassifications'
import manageIndicators from './manageIndicators'
import manageDimensions from './manageDimensions'

import managePublications from './managePublications'
import manageInquiries from './manageInquiries'
import manageComments from './manageComments'
import manageNotifications from './manageNotifications'
import manageSystem from './manageSystem'
import dashboard from './dashboard'
import researcherServices from './researcherServices'


// ** Merge & Export
export default [
    ...apps,
    // ...researcherServices,
    // ...dashboard,
    // ...manageDataset,
    // ...manageClassifications,
    ...manageIndicators,
    // ...manageDimensions,
    ...managePublications,
    ...manageInquiries,
    // ...manageComments,
    // ...manageNotifications,
    ...manageSystem
    //, ...dashboards,  ...pages, ...uiElements, ...forms, ...tables, ...chartsAndMaps, ...others
]

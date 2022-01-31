// ** Navigation sections imports
import apps from './apps'
import manageSystem from './manageSystem'
import pages from './pages'
import forms from './forms'
import tables from './tables'
import others from './others'
import dashboards from './dashboards'
import uiElements from './ui-elements'
import chartsAndMaps from './charts-maps'
import manageIndicators from './manageIndicators'
import manageDimensions from './manageDimensions'
import manageDataset from './manageDataset'
import managePublications from './managePublications'
import manageInquiries from './manageInquiries'
import manageComments from './manageComments'
import manageNotifications from './manageNotifications'


// ** Merge & Export
export default [
    ...apps,
    ...manageDataset,
    ...manageIndicators,
    ...manageDimensions,
    ...managePublications,
    ...manageInquiries,
    ...manageComments,
    ...manageNotifications,
    ...manageSystem
    //, ...dashboards,  ...pages, ...uiElements, ...forms, ...tables, ...chartsAndMaps, ...others
]

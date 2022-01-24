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

// ** Merge & Export
export default [
    ...apps,
    ...manageIndicators,
    ...manageDimensions,
    ...manageSystem
    //, ...dashboards,  ...pages, ...uiElements, ...forms, ...tables, ...chartsAndMaps, ...others
]

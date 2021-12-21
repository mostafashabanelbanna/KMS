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

// ** Merge & Export
export default [
    ...apps,
    ...manageSystem
    //, ...dashboards,  ...pages, ...uiElements, ...forms, ...tables, ...chartsAndMaps, ...others
]

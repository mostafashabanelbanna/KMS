// ** Routes Imports
import AppRoutes from './Apps'
import PagesRoutes from './Pages'
import UiElementRoutes from './UiElements'
import PageLayoutsRoutes from './PageLayouts'
import ManageSystemRoutes from './ManageSystem'
import ManageIndicatorRoutes from './ManageIndicator'
import ManageDimensionsRoutes from './ManageDimensions'
import ManageDatasetRoutes from './ManageDataset'
import ManageClassificationsRoutes from './ManageClassifications'
import ManagePublications from './ManagePublications'
import SystemServices from './SystemServices'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/homepage'

// ** Merge Routes
const Routes = [
  ...AppRoutes,
  ...PagesRoutes,
  ...UiElementRoutes,
  ...PageLayoutsRoutes,
  ...ManageSystemRoutes,
  ...ManageIndicatorRoutes,
  ...ManageDimensionsRoutes,
  ...ManageDatasetRoutes,
  ...ManageClassificationsRoutes,
  ...ManagePublications,
  ...SystemServices
]

export { DefaultRoute, TemplateTitle, Routes }

// ** Routes Imports
import AppRoutes from './Apps'
import PagesRoutes from './Pages'
import UiElementRoutes from './UiElements'
import PageLayoutsRoutes from './PageLayouts'
import ManageSystemRoutes from './ManageSystem'
import ManageIndicatorRoutes from './ManageIndicator'
import ManageDimensionsRoutes from './ManageDimensions'

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
  ...ManageDimensionsRoutes
]

export { DefaultRoute, TemplateTitle, Routes }

import { lazy } from 'react'

const SystemServicesRoutes = [
  {
    path: '/providers',
    component: lazy(() => import('../../views/systemServices/providers'))
  },
  {
    path: '/web-resources',
    component: lazy(() => import('../../views/systemServices/webResources'))
  },
  {
    path: '/Definitions',
    component: lazy(() => import('../../views/systemServices/Definitions'))
  }
]

export default SystemServicesRoutes

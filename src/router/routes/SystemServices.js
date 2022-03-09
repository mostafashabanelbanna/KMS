import { lazy } from 'react'

const SystemServicesRoutes = [
  {
    path: '/providers',
    component: lazy(() => import('../../views/systemServices/providers'))
  }
]

export default SystemServicesRoutes

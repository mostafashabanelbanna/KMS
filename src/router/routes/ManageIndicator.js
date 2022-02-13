import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const ManageIndicatorRoutes = [
  {
    path: '/indicators',
    component: lazy(() => import('../../views/manageIndicator/indicators'))
  },
  {
    path: '/sources',
    component: lazy(() => import('../../views/manageIndicator/sources'))
  },
  {
    path: '/units',
    component: lazy(() => import('../../views/manageIndicator/units'))
  },
  {
    path: '/periodicities',
    component: lazy(() => import('../../views/manageIndicator/periodicities'))
  }
]

export default ManageIndicatorRoutes

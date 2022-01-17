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
  }
]

export default ManageIndicatorRoutes

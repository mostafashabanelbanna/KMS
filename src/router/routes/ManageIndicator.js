import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const ManageIndicatorRoutes = [
  {
    path: '/indicators',
    component: lazy(() => import('../../views/manageIndicator/indicators'))
  }
]

export default ManageIndicatorRoutes

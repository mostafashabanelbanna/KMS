import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const ManageIndicatorRoutes = [
  {
    path: '/dashboard',
    component: lazy(() => import('../../views/apps/dashboard'))
  }
]

export default ManageIndicatorRoutes

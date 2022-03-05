import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const ManageIndicatorRoutes = [
  {
    path: '/dashboard',
    component: lazy(() => import('../../views/apps/dashboard'))
  },
  {
    path: '/publication',
    component: lazy(() => import('../../views/managePublication/documentIssue/index'))
  }
]

export default ManageIndicatorRoutes

import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const ManageIndicatorRoutes = [
  {
    path: '/dimensions',
    component: lazy(() => import('../../views/manageDimension/dimensions'))
  }
]

export default ManageIndicatorRoutes

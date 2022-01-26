import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const ManageIndicatorRoutes = [
  {
    path: '/dimensions',
    component: lazy(() => import('../../views/manageDimension/dimensions'))
  },
  {
    path: '/dimension-levels',
    component: lazy(() => import('../../views/manageDimension/dimensions/dimensionLevels'))
  },
  {
    path: '/dimension-values',
    component: lazy(() => import('../../views/manageDimension/dimensions/dimensionValues'))
  }
]

export default ManageIndicatorRoutes

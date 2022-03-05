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
  },
  {
    path: '/indicator/classification/:classificationId/:parentId',
    component: lazy(() => import('../../views/indicator/classification'))
  },
  {
    path: '/indicator/classification/:classificationId',
    component: lazy(() => import('../../views/indicator/classification'))
  },
  {
    path: '/indicator/classification',
    component: lazy(() => import('../../views/indicator/classification'))
  },
  {
    path: '/indicator/periodicity',
    component: lazy(() => import('../../views/indicator/periodicity'))
  },
  {
    path: '/indicator/search',
    component: lazy(() => import('../../views/indicator/search'))
  },
  {
    path: '/indicator/indicatorDetails',
    component: lazy(() => import('../../views/indicator/indicatorDetails'))
  }
]

export default ManageIndicatorRoutes

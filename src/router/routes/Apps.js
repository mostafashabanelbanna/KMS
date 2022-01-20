import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const AppRoutes = [
  {
    path: '/homepage',
    exact: true,
    appLayout: true,
    className: 'd-block',
    component: lazy(() => import('../../views/apps/homepage'))
  }
]

export default AppRoutes

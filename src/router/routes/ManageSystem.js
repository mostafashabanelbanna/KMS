import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const ManageSystemRoutes = [
  {
    path: '/user/list',
    component: lazy(() => import('../../views/manageSystem/user/list'))
  },
  {
    path: '/Lookups',
    component: lazy(() => import('../../views/apps/Lookups/Index'))
  }
]

export default ManageSystemRoutes

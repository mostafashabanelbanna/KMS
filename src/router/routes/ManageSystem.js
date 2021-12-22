import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const ManageSystemRoutes = [
  {
    path: '/users',
    component: lazy(() => import('../../views/manageSystem/users'))
  },
  {
    path: '/Lookups',
    component: lazy(() => import('../../views/manageSystem/Lookups/Index'))
  }
]

export default ManageSystemRoutes

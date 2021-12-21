import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const ManageSystemRoutes = [
  {
    path: '/user/list',
    component: lazy(() => import('../../views/manageSystem/user/list'))
  }
]

export default ManageSystemRoutes

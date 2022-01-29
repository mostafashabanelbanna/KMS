import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const ManageDatasetRoutes = [
  {
    path: '/indicatorDimensions',
    component: lazy(() => import('../../views/dataset/indicatorDimensions'))
  }
]

export default ManageDatasetRoutes

import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const ManageDatasetRoutes = [
  {
    path: '/indicatorDimensions',
    component: lazy(() => import('../../views/dataset/indicatorDimensions'))
  },
  {
    path: '/dataset/using-excel/export',
    component: lazy(() => import('../../views/dataset/usingExcel/ExportExcel.js'))
  },
  {
    path: '/dataset/using-excel/import',
    component: lazy(() => import('../../views/dataset/usingExcel/ImportExcel.js'))
  },
  {
    path: '/dataset/using-excel',
    component: lazy(() => import('../../views/dataset/usingExcel/index'))
  },
  {
    path: '/dataset/using-system',
    component: lazy(() => import('../../views/dataset/usingSystem'))
  }
]

export default ManageDatasetRoutes

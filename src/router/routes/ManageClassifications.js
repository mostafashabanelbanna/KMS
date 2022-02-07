import { lazy } from 'react'

const ManageClassificationRoutes = [
  {
    path: '/classifications',
    component: lazy(() => import('../../views/manageClassification/classifications'))
  },
  {
    path: '/classification-values',
    component: lazy(() => import('../../views/manageClassification/classifications/classificationValues'))
  }
]

export default ManageClassificationRoutes

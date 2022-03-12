import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const ManageInquiryRoutes = [
  {
    path: '/inquiry',
    component: lazy(() => import('../../views/manageInquiry/Inquiry/index'))
  },
  {
    path: '/inquiryProcedure',
    component: lazy(() => import('../../views/manageInquiry/InquiryProcedures/index'))
  }
]

export default ManageInquiryRoutes

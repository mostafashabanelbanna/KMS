import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const FrontRoutes = [
    {
        path: '/indicator/landingPage',
        component: lazy(() => import('../../views/indicator/indicatorList/landingPage'))
    },
    {
        path: '/indicator/indicatorDetails/:Id',
        component: lazy(() => import('../../views/indicator/indicatorDetails/index'))
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
        path: '/indicator/indicatorDetails/:indicatorId',
        component: lazy(() => import('../../views/indicator/indicatorDetails'))
    },
    {
        path: '/Researcher/Inquiry/InquiryDetails/:inquiryId',
        component: lazy(() => import('../../views/Inquiry/InquiryDetails'))
    },
    {
      path: '/Researcher/Inquiry',
      component: lazy(() => import('../../views/Inquiry/index'))
    },
    {
        path: '/document/landingPage',
        component: lazy(() => import('../../views/documentLibrary/documentIssueList/landingPage'))
    }
  ]
  
  export default FrontRoutes
  
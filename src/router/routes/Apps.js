import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const AppRoutes = [
  {
    path: '/homepage',
    exact: true,
    appLayout: true,
    className: 'd-block',
    component: lazy(() => import('../../views/apps/homepage'))
  },
  {
    path: '/apps/email',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email'))
  },
  {
    path: '/apps/email/:folder',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/apps/email'
    }
  },
  {
    path: '/apps/email/label/:label',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/apps/email'
    }
  },
  {
    path: '/apps/email/:filter',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/apps/email'
    }
  },
  {
    path: '/apps/chat',
    appLayout: true,
    className: 'chat-application',
    component: lazy(() => import('../../views/apps/chat'))
  },
  {
    path: '/apps/calendar',
    component: lazy(() => import('../../views/apps/calendar'))
  },
  {
    path: '/Lookups',
    component: lazy(() => import('../../views/apps/Lookups/Index'))
  }
  // {
  //   path: '/apps/user/edit',
  //   exact: true,
  //   component: () => <Redirect to='/apps/user/edit/1' />
  // },
  // {
  //   path: '/apps/user/edit/:id',
  //   component: lazy(() => import('../../views/apps/user/edit')),
  //   meta: {
  //     navLink: '/apps/user/edit'
  //   }
  // },
  // {
  //   path: '/apps/user/view',
  //   exact: true,
  //   component: () => <Redirect to='/apps/user/view/1' />
  // },
  // {
  //   path: '/apps/user/view/:id',
  //   component: lazy(() => import('../../views/apps/user/view')),
  //   meta: {
  //     navLink: '/apps/user/view'
  //   }
  // }
]

export default AppRoutes

import { lazy } from 'react'

const ExtensionsRoutes = [

  {
    path: '/extensions/swiper',
    component: lazy(() => import('../../views/extensions/swiper/index'))
  }
]

export default ExtensionsRoutes

import { lazy } from 'react'

const UiElementRoutes = [
 
  {
    path: '/icons/reactfeather',
    component: lazy(() => import('../../views/ui-elements/icons'))
  }
]

export default UiElementRoutes

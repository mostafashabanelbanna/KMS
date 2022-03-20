import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const ResearcherRoutes = [
  {
    path: '/Researcher/Favorite',
    component: lazy(() => import('../../views/researcher/favoriteIndicators.js'))
  }
]

export default ResearcherRoutes

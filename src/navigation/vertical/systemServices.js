import { User, BookOpen } from 'react-feather'

export default [
  {
    header: 'System Services'
  },
  {
    id: 'providers',
    title: 'Providers',
    icon: <User size={20} />,
    navLink: '/providers'
  },
  {
    id: 'webResources',
    title: 'WebResources',
    icon: <User size={20} />,
    navLink: '/web-resources'
  },
  {
    id: 'Definitions',
    title: 'Definitions',
    icon: <BookOpen size={20} />,
    navLink: '/Definitions'
  }
]

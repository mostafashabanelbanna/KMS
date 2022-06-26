import { User, BookOpen } from 'react-feather'

export default [
  {
    header: 'System Services'
  },
  {
    id: 'Provider',
    title: 'Providers',
    icon: <User size={20} />,
    admin: true,
    navLink: '/providers'
  },
  {
    id: 'WebResource',
    title: 'WebResources',
    icon: <User size={20} />,
    admin: true,
    navLink: '/web-resources'
  },
  {
    id: 'Definition',
    title: 'Definitions',
    icon: <BookOpen size={20} />,
    admin: true,
    navLink: '/Definitions'
  }
]

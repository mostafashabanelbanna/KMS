import { User, Columns } from 'react-feather'

export default [
  {
    header: 'Manage System'
  },
  {
    id: 'users',
    title: 'Manage Users',
    icon: <User size={20} />,
    navLink: '/users'
  },
  {
    id: 'lookups',
    title: 'Lookups',
    icon: <Columns size={20} />,
    navLink: '/lookups'
  },
  {
    id: 'roles',
    title: 'Manage Roles',
    icon: <Columns size={20} />,
    navLink: '/roles'
  }
]

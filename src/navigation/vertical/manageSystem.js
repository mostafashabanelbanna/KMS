import { User } from 'react-feather'

export default [
  {
    header: 'Manage System'
  },
  {
    id: 'users',
    title: 'Manage Users',
    icon: <User size={20} />,
    navLink: '/user/list'
  }
]

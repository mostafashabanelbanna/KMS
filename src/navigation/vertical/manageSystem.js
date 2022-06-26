import { User, Columns, Users } from 'react-feather'
import { isAdmin } from '../../utility/Utils'

export default [
  {
    header: 'Manage System'
  },
  {
    id: 'User',
    title: 'Manage Users',
    icon: <User size={20} />,
    admin:true,
    navLink: '/users'
  },

  {
    id: 'Role',
    title: 'Manage Roles',
    icon: <Users size={20} />,
    admin:true,
    navLink: '/roles'
  }
]

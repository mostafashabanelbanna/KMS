import { User, Columns, Users } from 'react-feather'
import { isAdmin } from '../../utility/Utils'

export default isAdmin() ? [
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
    id: 'roles',
    title: 'Manage Roles',
    icon: <Users size={20} />,
    navLink: '/roles'
  }
] : []

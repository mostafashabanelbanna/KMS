
// import { CgPerformance, CgPathUnite }  from "react-icons/cg"
import { FaNewspaper, FaRegBell } from "react-icons/fa"
import { Home, Circle } from 'react-feather'

export default [
  {
    header: 'مركز المعرفة'
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <Home size={20} />,
    // href: 'http://41.128.217.155/reports/powerbi/DBUnit/balance_paymen_iconnneed'
    navLink: '/dashboard'
  
  },
  {
    id: '/publication',
    title: 'Publication',
    icon: <FaNewspaper size={20} />,
    navLink: '/publication'
  },
  {
    id: '/notifications',
    title: 'Notifications',
    icon: <FaRegBell size={20} />,
    navLink: '/notifications'
  }
]

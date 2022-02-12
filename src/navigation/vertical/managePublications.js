
// import { CgPerformance, CgPathUnite }  from "react-icons/cg"
import { FaNewspaper, FaRegBell } from "react-icons/fa"

export default [
  {
    header: 'مركز المعرفة'
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


import { CgPerformance, CgPathUnite }  from "react-icons/cg"

export default [
  {
    header: 'Manage Indicators'
  },
  {
    id: '/idicators',
    title: 'Indicators',
    icon: <CgPerformance size={20} />,
    navLink: '/indicators'
  },
  {
    id: '/sources',
    title: 'Sources',
    icon: <CgPerformance size={20} />,
    navLink: '/sources'
  },
  {
    id: '/units',
    title: 'Units',
    icon: <CgPathUnite size={20} />,
    navLink: '/units'
  }
]

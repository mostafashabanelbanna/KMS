
import { CgPerformance, CgPathUnite }  from "react-icons/cg"
import { VscTypeHierarchy }  from "react-icons/vsc"

export default [
  {
    header: 'Manage Indicators'
  },
  {
    id: '/indicators',
    title: 'Indicators',
    icon: <CgPerformance size={20} />,
    navLink: '/indicators'
  },
  {
    id: '/sources',
    title: 'Sources',
    icon: <VscTypeHierarchy size={20} />,
    navLink: '/sources'
  },
  {
    id: '/units',
    title: 'Units',
    icon: <CgPathUnite size={20} />,
    navLink: '/units'
  },
  {
    id: '/periodicities',
    title: 'Periodicities',
    icon: <CgPathUnite size={20} />,
    navLink: '/periodicities'
  }
]

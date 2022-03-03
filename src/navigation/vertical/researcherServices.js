
import { CgPerformance }  from "react-icons/cg"
import {HiOutlineSearchCircle} from 'react-icons/hi'

export default [
  {
    header: 'Researchers Services'
  },
  {
    id: 'indicators',
    title: 'Indicators And Datasets',
    icon: <CgPerformance size={20} />,
    children: [
      {
        id: '/classifications',
        title: 'Search by classifications',
        icon: <HiOutlineSearchCircle size={20} />,
        navLink: '/indicator/classification'
      },
      {
        id: '/periodicities',
        title: 'Search by periodicities',
        icon: <HiOutlineSearchCircle size={20} />,
        navLink: '/indicator/periodicity'
      },
      {
        id: '/generalSearch',
        title: 'General search',
        icon: <HiOutlineSearchCircle size={20} />,
        navLink: '/indicator/search'
      }
     
    ]
  }
]

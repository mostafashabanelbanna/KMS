
import { CgPerformance }  from "react-icons/cg"
import {HiOutlineSearchCircle} from 'react-icons/hi'
import { FaHeart } from "react-icons/fa"

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
  },
  {
    id:"Favorites",
    title:"Favorites",
    icon: <FaHeart size={20} />,
    navLink: '/Researcher/Favorite'
  },
  {
    id:"Document Library",
    title:"Document Library",
    icon: <FaHeart size={20} />,
    navLink: '/Researcher/DocumentLibrary'
  }
]

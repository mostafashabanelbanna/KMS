import { CgPerformance } from "react-icons/cg"
import { HiOutlineSearchCircle } from "react-icons/hi"
import { FaHeart, FaNewspaper, FaInfoCircle } from "react-icons/fa"
import { User } from 'react-feather'

export default [
  {
    header: "Researchers Services"
  },
  {
    id: "indicators",
    title: "Indicators And Datasets",
    icon: <CgPerformance size={20} />,
    navLink: "/indicator/landingPage"
    // children: [
    //   {
    //     id: '/classifications',
    //     title: 'Search by classifications',
    //     icon: <HiOutlineSearchCircle size={20} />,
    //     navLink: '/indicator/classification'
    //   },
    //   {
    //     id: '/periodicities',
    //     title: 'Search by periodicities',
    //     icon: <HiOutlineSearchCircle size={20} />,
    //     navLink: '/indicator/periodicity'
    //   },
    //   {
    //     id: '/generalSearch',
    //     title: 'General search',
    //     icon: <HiOutlineSearchCircle size={20} />,
    //     navLink: '/indicator/search'
    //   }

    // ]
  },
  // {
  //   id: "Favorites",
  //   title: "Favorites",
  //   icon: <FaHeart size={20} />,
  //   children: [
  //     {
  //       id: "FavoritesIndicators",
  //       title: "FavoritesIndicators",
  //       icon: <HiOutlineSearchCircle size={20} />,
  //       navLink: "/Researcher/Favorite"
  //     },
  //     {
  //       id: "FavoritesDocuments",
  //       title: "FavoritesDocuments",
  //       icon: <HiOutlineSearchCircle size={20} />,
  //       navLink: "/Researcher/FavoritesDocuments"
  //     }
  //   ]
  // },
  {
    id: "Document Library",
    title: "Document Library",
    icon: <FaNewspaper size={20} />,
    navLink: "/document/landingPage"
  },
  {
    id: "Inquiry",
    title: "Inquiry",
    icon: <FaInfoCircle size={20} />,
    navLink: "/Researcher/Inquiry"
  },
  {
    id: "WebResources",
    title: "WebResources",
    icon: <User size={20} />,
    navLink: "/webResources/index"
  },
  {
    id: "Favorites",
    title: "Favorites",
    icon: <FaHeart size={20} />,
    navLink: "/Favorite"
  }
]

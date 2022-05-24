import { CgPerformance } from "react-icons/cg"
import { HiOutlineSearchCircle } from "react-icons/hi"
import { FaHeart, FaNewspaper, FaInfoCircle } from "react-icons/fa"
import { User, BookOpen } from 'react-feather'
import { FiLayers, FiLayout, FiDatabase, FiHelpCircle } from 'react-icons/fi'

export default [
  // {
  //   header: "Researchers Services"
  // },
  {
    id: "indicators",
    title: "Indicators",
    icon: <FiDatabase size={20} />,
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
    id: "Dashboards",
    title: "Dashboards",
    icon: <FiLayout size={20} />,
    navLink: "/Dashboards/landingPage"
  },
  {
    id: "Definitions",
    title: "Definitions",
    icon: <FiHelpCircle size={20} />,
    navLink: "/Definitionss/landingPage"
  },
  {
    id: "WebResources",
    title: "WebResources",
    icon: <FiLayers  size={20} />,
    navLink: "/webResources/index"
  },
  {
    id: "Inquiry",
    title: "Inquiry",
    icon: <FaInfoCircle size={20} />,
    navLink: "/Researcher/Inquiry"
  },
  {
    id: "Favorites",
    title: "Favorites",
    icon: <FaHeart size={20} />,
    navLink: "/Favorite"
  }
]

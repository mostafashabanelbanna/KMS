
import { CgPerformance, CgPathUnite }  from "react-icons/cg"
import { VscTypeHierarchy }  from "react-icons/vsc"
import { FaBuromobelexperte } from "react-icons/fa"
import { User, Columns, Users,  FileText, Circle } from 'react-feather'
import { AiOutlineApartment } from "react-icons/ai"

export default [
  {
    header: 'Manage Indicators'
  },
  {
    id: '/indicators',
    title: 'Indicators And Datasets',
    icon: <CgPerformance size={20} />,
    navLink: '/indicators'
  },
  {
    id: 'dataset',
    title: 'إدخال عناصر البيانات',
    icon: <FileText size={20} />,
    children: [
      // {
      //   id: 'usingSystem',
      //   title: 'باستخدام النظام',
      //   icon: <Circle size={12} />,
      //   navLink: '/dataset/using-system'
      // },
      {
        id: 'usingExcel',
        title: 'باستخدام إكسيل',
        icon: <Circle size={12} />,
        navLink: '/dataset/using-excel'
      }
    ]
  },
  {
    id: '/classifications',
    title: 'Classifications',
    icon: <AiOutlineApartment size={20} />,
    navLink: '/classifications'
  },
  
  {
    id: '/dimensions',
    title: 'Dimensions',
    icon: <FaBuromobelexperte size={20} />,
    navLink: '/dimensions'
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
    id: 'lookups',
    title: 'Lookups',
    icon: <Columns size={20} />,
    navLink: '/lookups'
  }
]

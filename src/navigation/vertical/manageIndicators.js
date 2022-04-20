
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
    id: 'Indicator',
    title: 'Indicators And Datasets',
    icon: <CgPerformance size={20} />,
    admin: true,
    navLink: '/indicators'
  },
  {
    id: 'Dataset',
    title: 'إدخال عناصر البيانات',
    icon: <FileText size={20} />,
    admin: true,
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
    id: 'Classification',
    title: 'Classifications',
    icon: <AiOutlineApartment size={20} />,
    admin: true,
    navLink: '/classifications'
  },
  
  {
    id: 'Dimension',
    title: 'Dimensions',
    icon: <FaBuromobelexperte size={20} />,
    admin: true,
    navLink: '/dimensions'
  },
  {
    id: 'Source',
    title: 'Sources',
    icon: <VscTypeHierarchy size={20} />,
    admin: true,
    navLink: '/sources'
  },
  {
    id: 'UnitMeasure',
    title: 'Units',
    icon: <CgPathUnite size={20} />,
    admin: true,
    navLink: '/units'
  },
  {
    id: 'Periodicity',
    title: 'Periodicities',
    icon: <CgPathUnite size={20} />,
    admin: true,
    navLink: '/periodicities'
  },
  {
    id: 'Lookups',
    title: 'Lookups',
    icon: <Columns size={20} />,
    admin: true,
    navLink: '/lookups'
  }
]

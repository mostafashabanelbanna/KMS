
import { CgPerformance, CgPathUnite }  from "react-icons/cg"
import { VscTypeHierarchy }  from "react-icons/vsc"
import { FaBuromobelexperte, FaNewspaper, FaInfoCircle } from "react-icons/fa"
import { User, Columns, Users,  FileText, Circle, BookOpen, Settings } from 'react-feather'
import { AiOutlineApartment } from "react-icons/ai"


export default [
  {
    // header: 'Manage Indicators'
    header: 'Manage System'
  },
  {
    id: 'Indicator',
    title: 'إدارة عناصر البيانات',
    icon: <CgPerformance size={20} />,
    admin: true,
    children: [
      {
        id: 'usingSystem',
        title: 'Indicators',
        icon: <CgPerformance size={18} />,
        navLink: '/indicators'
      },
      {
        id: 'usingExcel',
        title: 'إدخال باستخدام إكسيل',
        icon: <Circle size={18} />,
        navLink: '/dataset/using-excel'
      }
    ]
  },
  {
    id: 'DocumentIssue',
    title: 'Publication',
    icon: <FaNewspaper size={20} />,
    admin: true,
    navLink: '/publication'
  },
  {
    id: 'Inquiry',
    title: 'Inquiries',
    icon: <FaInfoCircle size={20} />,
    admin: true,
    navLink: '/inquiry'
  },
  {
    id: 'WebResource',
    title: 'WebResources',
    icon: <User size={20} />,
    admin: true,
    navLink: '/web-resources'
  },
  {
    id: 'Definition',
    title: 'Definitions',
    icon: <BookOpen size={20} />,
    admin: true,
    navLink: '/Definitions'
  },
  // {
  //   id: 'Dataset',
  //   title: 'إدخال عناصر البيانات',
  //   icon: <FileText size={20} />,
  //   admin: true,
  //   children: [
  //     // {
  //     //   id: 'usingSystem',
  //     //   title: 'باستخدام النظام',
  //     //   icon: <Circle size={12} />,
  //     //   navLink: '/dataset/using-system'
  //     // },
  //     {
  //       id: 'usingExcel',
  //       title: 'باستخدام إكسيل',
  //       icon: <Circle size={12} />,
  //       navLink: '/dataset/using-excel'
  //     }
  //   ]
  // },
 
  {
    id: 'Lookups',
    title: 'إدارة الجداول الملحقة',
    icon: <Columns size={20} />,
    admin: true,
    children: [
      {
        id: 'Classification',
        title: 'Classifications',
        icon: <AiOutlineApartment size={18} />,
        navLink: '/classifications'
      },
      {
        id: 'Dimension',
        title: 'Dimensions',
        icon: <FaBuromobelexperte size={18} />,
        navLink: '/dimensions'
      },
      {
        id: 'Source',
        title: 'Sources',
        icon: <VscTypeHierarchy size={18} />,
        navLink: '/sources'
      },
      {
        id: 'Provider',
        title: 'Providers',
        icon: <User size={18} />,
        navLink: '/providers'
      },
      {
        id: 'UnitMeasure',
        title: 'Units',
        icon: <CgPathUnite size={18} />,
        navLink: '/units'
      },
      {
        id: 'Periodicity',
        title: 'Periodicities',
        icon: <CgPathUnite size={18} />,
        navLink: '/periodicities'
      },
      {
        id: 'Lookups',
        title: 'Lookups',
        icon: <Columns size={18} />,
        navLink: '/lookups'
      }
    ]
  },
  {
    id: 'User',
    title: 'إدارة الصلاحيات',
    icon: <Settings size={20} />,
    admin: true,
    children: [
      {
        id: 'User',
        title: 'Manage Users',
        icon: <User size={18} />,
        admin: true,
        navLink: '/users'
      },
    
      {
        id: 'Role',
        title: 'Manage Roles',
        icon: <Users size={18} />,
        admin: true,
        navLink: '/roles'
      }
    ]
  }

]

import {  FileText, Circle } from 'react-feather'

export default [
  {
    header: 'Manage Dataset'
  },
  {
    id: 'dataset',
    title: 'إدخال عناصر البيانات',
    icon: <FileText size={20} />,
    children: [
      {
        id: 'usingSystem',
        title: 'باستخدام النظام',
        icon: <Circle size={12} />,
        navLink: '/dataset/using-system'
      },
      {
        id: 'usingExcel',
        title: 'باستخدام إكسيل',
        icon: <Circle size={12} />,
        navLink: '/dataset/using-excel'
      }
    ]
  }
]

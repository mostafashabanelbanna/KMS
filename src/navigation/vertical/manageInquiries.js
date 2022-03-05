
// import { CgPerformance, CgPathUnite }  from "react-icons/cg"
import { FaCommentDots, FaInfoCircle } from "react-icons/fa"

export default [
  {
    header: 'خدمات الباحثين'
  },
  {
    id: '/inquiries',
    title: 'Inquiries',
    icon: <FaInfoCircle size={20} />,
    navLink: '/inquiries'
  },
  {
    id: '/comments',
    title: 'Comments',
    icon: <FaCommentDots size={20} />,
    navLink: '/comments'
  }
]

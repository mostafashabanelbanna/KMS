
// import { CgPerformance, CgPathUnite }  from "react-icons/cg"
import { FaCommentDots, FaInfoCircle } from "react-icons/fa"

export default [
  {
    header: 'خدمات الباحثين'
  },
  {
    id: 'Inquiry',
    title: 'Inquiries',
    icon: <FaInfoCircle size={20} />,
    admin: true,
    navLink: '/inquiry'
  },
  {
    id: 'Comment',
    title: 'Comments',
    icon: <FaCommentDots size={20} />,
    navLink: '/comments'
  }
]

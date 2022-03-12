import { useContext } from 'react'
// ** Third Party Components
import { useIntl } from 'react-intl'

// ** User List Component
import Breadcrumbs from '@components/breadcrumbs'
import Table from './Table'


// ** Styles
import '@styles/react/apps/app-users.scss'

const InquiryProcedureList = (props) => {

  const intl = useIntl()
  
  return (
    <div className='app-user-list'>
      <Breadcrumbs breadCrumbTitle={intl.formatMessage({id: "ManageInquiry"})} breadCrumbParent={intl.formatMessage({id: "InquiryProcedure"})} breadCrumbActive={intl.formatMessage({id: "ManageInquiry"})} breadCrumbRoot={intl.formatMessage({id: "Homepage"})} />
      <Table inquiryId={props.location.state.id} />
    </div>
  )
}

export default InquiryProcedureList

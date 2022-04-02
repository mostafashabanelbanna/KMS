import { useContext } from 'react'
// ** Third Party Components
import { useIntl } from 'react-intl'

// ** User List Component
import Breadcrumbs from '@components/breadcrumbs'
import Table from './Table'


// ** Styles
import '@styles/react/apps/app-users.scss'

const InquiryList = () => {

  const intl = useIntl()
  
  return (
    <div className='app-user-list'>
        <Breadcrumbs breadCrumbTitle="طلبات البيانات" breadCrumbParent="خدمات الباحثين" breadCrumbActive="طلبات البيانات" breadCrumbRoot={intl.formatMessage({id: "Homepage"})} />
      <Table />
    </div>
  )
}

export default InquiryList

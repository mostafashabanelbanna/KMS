import { useContext } from 'react'
// ** Third Party Components
import { useIntl } from 'react-intl'

// ** User List Component
import Breadcrumbs from '@components/breadcrumbs'
import Table from './Table'


// ** Styles
import '@styles/react/apps/app-users.scss'

const RolesList = () => {

  const intl = useIntl()
  
  return (
    <div className='app-user-list'>
      <Breadcrumbs breadCrumbTitle={intl.formatMessage({id: "Manage Roles"})} breadCrumbParent={intl.formatMessage({id: "Manage System"})} breadCrumbActive={intl.formatMessage({id: "Manage Roles"})} breadCrumbRoot={intl.formatMessage({id: "Homepage"})} />
      <Table />
    </div>
  )
}

export default RolesList

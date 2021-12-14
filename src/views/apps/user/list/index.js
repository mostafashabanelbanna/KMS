import { useContext } from 'react'
// ** Third Party Components
import { FormattedMessage, useIntl } from 'react-intl'

// ** User List Component
import Breadcrumbs from '@components/breadcrumbs'
import Table from './Table'


// ** Styles
import '@styles/react/apps/app-users.scss'

const UsersList = () => {

  const intl = useIntl()
  
  return (
    <div className='app-user-list'>
      <Breadcrumbs breadCrumbTitle={intl.formatMessage({id: "List"})} breadCrumbParent={intl.formatMessage({id: "User"})} breadCrumbActive={intl.formatMessage({id: "List"})} breadCrumbRoot={intl.formatMessage({id: "Homepage"})} />
      <Table />
    </div>
  )
}

export default UsersList

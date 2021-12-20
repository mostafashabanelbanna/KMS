import { useContext } from 'react'
// ** Third Party Components
import { FormattedMessage, useIntl } from 'react-intl'

// ** User List Component
import Breadcrumbs from '@components/breadcrumbs'
import Table from './Table'


// ** Styles
//import '@styles/react/apps/app-users.scss'

const LookupsView = () => {

  const intl = useIntl()
  
  return (
    <div className='app-user-list'>
      <Breadcrumbs breadCrumbParent={intl.formatMessage({id: "Lookups"})} breadCrumbRoot={intl.formatMessage({id: "Homepage"})} />
      <Table />
    </div>
  )
}

export default LookupsView
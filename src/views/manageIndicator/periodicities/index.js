// ** Third Party Components
import { useIntl } from 'react-intl'

// ** User List Component
import Breadcrumbs from '@components/breadcrumbs'
import Table from './Table'


// ** Styles
import '@styles/react/apps/app-users.scss'

const IndictorsList = () => {

  const intl = useIntl()
  
  return (
    <div className='app-user-list'>
      <Breadcrumbs breadCrumbTitle={intl.formatMessage({id: "Periodicities"})} breadCrumbParent={intl.formatMessage({id: "Indicators"})} breadCrumbActive={intl.formatMessage({id: "Periodicities"})} breadCrumbRoot={intl.formatMessage({id: "Homepage"})} />
      <Table />
    </div>
  )
}

export default IndictorsList

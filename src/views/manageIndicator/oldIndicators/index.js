import { useContext } from 'react'
// ** Third Party Components
import { useIntl } from 'react-intl'

// ** User List Component
import Breadcrumbs from '@components/breadcrumbs'
import Table from './Table'


// ** Styles
import '@styles/react/apps/app-users.scss'

const OldIndictorsList = (props) => {

  const intl = useIntl()
  
  return (
    <div className='app-user-list'>
      <Breadcrumbs breadCrumbTitle={intl.formatMessage({id: "OldIndicators"})} breadCrumbParent={intl.formatMessage({id: "Indicators"})} breadCrumbActive={intl.formatMessage({id: "OldIndicators"})} breadCrumbRoot={intl.formatMessage({id: "Homepage"})} />
      <Table indicatorId={props.location.state.indicatorId}/>
    </div>
  )
}

export default OldIndictorsList

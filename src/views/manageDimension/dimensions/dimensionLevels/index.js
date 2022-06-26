// ** Third Party Components
import { useIntl } from 'react-intl'

// ** User List Component
import Breadcrumbs from '@components/breadcrumbs'
import Table from './Table'


// ** Styles
import '@styles/react/apps/app-users.scss'

const dimensionValueList = (props) => {
  const intl = useIntl()
  
  return (
    <div className='app-user-list'>
      <Breadcrumbs breadCrumbTitle={intl.formatMessage({id: "DimensionLevels"})} breadCrumbParent={intl.formatMessage({id: "Dimensions"})} breadCrumbActive={intl.formatMessage({id: "DimensionLevels"})} breadCrumbRoot={intl.formatMessage({id: "Homepage"})} />
      <Table dimensionId={props.location.state.id} />
    </div>
  )
}

export default dimensionValueList

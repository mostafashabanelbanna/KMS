import { useContext } from 'react'
// ** Third Party Components
import { useIntl } from 'react-intl'

// ** User List Component
import Breadcrumbs from '@components/breadcrumbs'
import Table from './Table'


// ** Styles
import '@styles/react/apps/app-users.scss'

const ClassificationValuesList = (props) => {

  const intl = useIntl()
  
  return (
    <div className='app-user-list'>
      <Breadcrumbs  breadCrumbTitle={intl.formatMessage({id: "Classification Values"})} breadCrumbParent={intl.formatMessage({id: "Classifications"})} breadCrumbActive={intl.formatMessage({id: "Classification Values"})} breadCrumbRoot={intl.formatMessage({id: "Homepage"})} />
      <Table classificationId={props.location.state.id}/>
    </div>
  )
}

export default ClassificationValuesList

import { useContext } from 'react'
// ** Third Party Components
import { useIntl } from 'react-intl'

// ** User List Component
import Breadcrumbs from '@components/breadcrumbs'
import Table from './Table'


// ** Styles
import '@styles/react/apps/app-users.scss'

const DocumentLibraryList = (props) => {

  const intl = useIntl()
  
  return (
    <div className='app-user-list'>
      <Breadcrumbs breadCrumbTitle={intl.formatMessage({id: "ManageDocumentIssues"})} breadCrumbParent={intl.formatMessage({id: "Attachments"})} breadCrumbActive={intl.formatMessage({id: "ManageDocumentIssues"})} breadCrumbRoot={intl.formatMessage({id: "Homepage"})} />
      <Table documentIssueId={props.location.state.id} />
    </div>
  )
}

export default DocumentLibraryList
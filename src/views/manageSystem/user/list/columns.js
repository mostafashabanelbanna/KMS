// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { getUser, deleteUser } from '../store/action'
import { store } from '@store/storeConfig/store'

// ** Third Party Components
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'
import { FormattedMessage } from 'react-intl'

export const columns =  [
  {
    name: <FormattedMessage id="Name" />,
    selector: 'normalizedName',
    sortable: true,
    minWidth: '225px'
  },
  {
    name: <FormattedMessage id="Email" />,
    selector: 'email',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: <FormattedMessage id="Username" />,
    selector: 'normalizedUserName',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: <FormattedMessage id="Job Title" />,
    selector: 'jobTitle',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: <FormattedMessage id="Phone Number" />,
    selector: 'phoneNumber',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: <div className="justify-content-center"><FormattedMessage id="Actions" /></div>,
    width: '100px',
    center: true,
    cell: row => (
      <UncontrolledDropdown className="">
        <DropdownToggle tag='div' className='btn btn-sm'>
          <MoreVertical size={14} className='cursor-pointer'/>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            tag={Link}
            to={`/apps/user/edit/${row.id}`}
            className='w-100'
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <Archive size={14} className='mr-50' />
            <span className='align-middle'><FormattedMessage id="Edit" /></span>
          </DropdownItem>
          <DropdownItem className='w-100' onClick={() => store.dispatch(deleteUser(row.id))}>
            <Trash2 size={14} className='mr-50' />
            <span className='align-middle'><FormattedMessage id="Delete" /></span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
]
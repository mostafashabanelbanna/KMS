// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Invoice List Sidebar
import Sidebar from './Sidebar'

// ** Third Party Components
import {   MoreVertical, FileText, Trash2, Archive } from 'react-feather'
import { Link } from 'react-router-dom'
import { Card, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import CustomDataTable from '../../../../containers/data-table/CustomDataTable'

const formItems =  [
  {
    fieldType: 'text',
    label:"name", 
    colSizeLg: 4,
    attr: "name",
    dropdownArr: [], 
    multiple: true, 
    radioArr: [] 
  },
  {
    fieldType: 'text',
    label:"email", 
    colSizeLg: 4, 
    attr: "email", 
    dropdownArr: [], 
    multiple: true,
    radioArr: [] 
  }
]
const columns = [
  {
    name: 'Name',
    selector: 'normalizedName',
    sortable: true,
    minWidth: '225px'
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'User Name',
    selector: 'normalizedUserName',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Job Title',
    selector: 'jobTitle',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Phone Number',
    selector: 'phoneNumber',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <UncontrolledDropdown>
        <DropdownToggle tag='div' className='btn btn-sm'>
          <MoreVertical size={14} className='cursor-pointer' />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            tag={Link}
            to={`/apps/user/view/${row.id}`}
            className='w-100'
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <FileText size={14} className='mr-50' />
            <span className='align-middle'>Details</span>
          </DropdownItem>
          <DropdownItem
            tag={Link}
            to={`/apps/user/edit/${row.id}`}
            className='w-100'
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <Archive size={14} className='mr-50' />
            <span className='align-middle'>Edit</span>
          </DropdownItem>
          <DropdownItem className='w-100' onClick={() => store.dispatch(deleteUser(row.id))}>
            <Trash2 size={14} className='mr-50' />
            <span className='align-middle'>Delete</span>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
]
const UsersList = () => {

  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <Fragment>
       <Card>
        <div className="p-2 d-flex justify-content-end">
          <Button.Ripple color='primary' onClick={toggleSidebar}>
            Add New User
          </Button.Ripple>
        </div>
      </Card>
      <Card>
    
        <CustomDataTable url="/User/GetUsers" columns={columns} formItems={formItems}/>
      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>
  )
}

export default UsersList

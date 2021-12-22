// ** React Imports
import { Fragment, useState, useEffect } from 'react'
//import Sidebar from './Sidebar'

// ** Store & Actions
import {  getData, deleteRole, getRole } from './store/action'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import swal from "sweetalert"

import { Link, Redirect} from 'react-router-dom'

import ReactPaginate from 'react-paginate'
import { ChevronDown, MoreVertical,  Trash2, Archive } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card,  Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { useIntl, FormattedMessage } from 'react-intl'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'


// helper function
import {isAuthorized} from '../../../utility/Utils'

const RolesList = () => {
    // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.roles)

  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const [pageNumber, setPageNumber] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const toggleSidebar = (Submit) => {
    if (sidebarOpen && Submit !== 1) {
      swal("are you sure you want to close?", {
        buttons: {
          cancel: "cancel",
          catch: {
            text: "ok",
            value: "ok"
          }
        }
      })
      .then((value) => {
        switch (value) {
          case "ok":
            setSidebarOpen(!sidebarOpen)
            break
  
          default:
            setSidebarOpen(true)
        }
      })
    } else {
      setSidebarOpen(!sidebarOpen)
    }
  
  }
  
  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getData({
        pageNumber,
        rowsPerPage,
        active: true
      })
    )
  }, [dispatch, store.data.length])
  const addRole = () => {
    dispatch({type: "GET_ROLE", selectedRole:{}})
    toggleSidebar()
}
  const updateRole = id => {
    dispatch(getRole(id))
    toggleSidebar()
  }
  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getData(
        {
          ...searchData,
          pageNumber: page.selected + 1,
          rowsPerPage
        }
      )
    )
    setPageNumber(page.selected + 1)
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = store.totalPages

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={pageNumber !== 0 ? pageNumber - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
      />
    )
  }


  // ** Table data to render
  const dataToRender = () => {
    if (store.data.length > 0 && !store.error) {
      return store.data
    } 
  }

  // useIntl
  const intl = useIntl()

  const columns =  [
    {
      name: <FormattedMessage id="Name" />,
      selector: 'name',
      sortable: true,
      minWidth: '225px'
    },
    {
        name: <FormattedMessage id="Description" />,
        selector: 'description',
        sortable: true,
        minWidth: '225px'
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
              className='w-100'
              onClick={() => updateRole(row.id)}
            >
              <Archive size={14} className='mr-50' />
              <span className='align-middle'><FormattedMessage id="Edit" /></span>
            </DropdownItem>
            <DropdownItem className='w-100' onClick={() => dispatch(deleteRole(row.id))}>
              <Trash2 size={14} className='mr-50' />
              <span className='align-middle'><FormattedMessage id="Delete" /></span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }
  ]
 

  return (
      <Fragment>
          {isAuthorized(store.error) ? <Redirect to='/misc/not-authorized' /> : (
              <>
                <div className="my-1">
                    <Button.Ripple color='primary' onClick={addRole} >
                        <FormattedMessage id="Add" />
                    </Button.Ripple>
                </div>
                <Card>
                    <DataTable
                        noHeader
                        pagination
                        responsive
                        paginationServer
                        columns={columns}
                        sortIcon={<ChevronDown />}
                        className='react-dataTable'
                        paginationComponent={CustomPagination}
                        data={dataToRender()}
                    />
                </Card>
                {/* <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} selectedRole={store.selectedRole} /> */}
              </>
          )}
      </Fragment>

  )

}

export default RolesList
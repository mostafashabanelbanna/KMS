// ** React Imports
import { Fragment, useState, useEffect } from 'react'

import Sidebar from './Sidebar'

// ** Store & Actions
import {  getData, deleteRole, getRole, getRolePermission } from './store/action'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import swal from "sweetalert"

import { Link, Redirect} from 'react-router-dom'

import ReactPaginate from 'react-paginate'
import { ChevronDown, MoreVertical,  Trash2, Archive } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card,  Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { useIntl, FormattedMessage } from 'react-intl'
import { toast } from 'react-toastify'
import Toastr from '../../../containers/toastr/Toastr'
import { FaUserLock } from 'react-icons/fa'
import ExpandedRowDetails from '../../../containers/expanded-row-details/expandedRowDetails'
import ComponentSpinner from '../../../@core/components/spinner/Fallback-spinner'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'


// helper function
import {confirmDelete, isAuthorized} from '../../../utility/Utils'

const RolesList = () => {
    // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.roles)
  const layoutStore = useSelector(state => state.layout)

  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const [pageNumber, setPageNumber] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

    // useIntl
    const intl = useIntl()

    // Toastr notify function
    const notify = (type, message) => {
        return toast.success(
        <Toastr type={type} message={message} />,
        { position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true 
        })
    }

  const toggleSidebar = (Submit) => {
    if (sidebarOpen && Submit !== 1) {
      swal(intl.formatMessage({id: "CloseSidebar"}), {
        buttons: {
          catch: {
            text: intl.formatMessage({id: "Yes"}),
            value: "ok"
          },
          cancel: intl.formatMessage({id: "No"})
        
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

  useEffect(() => {
    if (store.getResponse.statusCode !== 200 && store.getResponse.statusCode !== 0) {
      notify('error', `${intl.formatMessage({id: "InternalServerError"})} `)
    }
    dispatch({type:"RESET_ROLE_GET_RESPONSE"})
  }, [store.getResponse.statusCode])

  useEffect(() => {
    if (store.deleteResponse.statusCode === 2) {
      notify('error', `${intl.formatMessage({id: "DeleteFailed"})} `)
    } else if (store.deleteResponse.statusCode === 500) {
      notify('error', `${intl.formatMessage({id: "InternalServerError"})} `)
    } else if (store.deleteResponse.statusCode === 6) {
      notify('error', `${intl.formatMessage({id: store.deleteResponse.errors[0]})} `)
    } else if (store.deleteResponse.statusCode === 200) {
      notify('success', `${intl.formatMessage({id: "DeletedSuccess"})} `)
      const Pages = Math.ceil((store.data.length - 1) / rowsPerPage)
      if (Pages <= 0) {
         setPageNumber(store.totalPages - 1)
      } else {
        dispatch(getData({
          pageNumber,
          rowsPerPage,
          active: true
        }))
      }
    }
    dispatch({type:"RESET_ROLE_DELETE_RESPONSE"})
  }, [store.deleteResponse.statusCode])

  const addRole = () => {
    dispatch({type: "GET_ROLE", selectedRole:{}})
    toggleSidebar()
}
  const updateRole = id => {
    dispatch({type: "GET_ROLE", selectedRole:{}})
    dispatch({type:"RESET_ROLE_UPDATE_RESPONSE"})
    dispatch(getRole(id))
    toggleSidebar()
  }
  // ** Function in get data on page change
  const handlePagination = page => {
    setPageNumber(page.selected + 1)
  }
  useEffect(() => {
    dispatch(getData({
      pageNumber,
      rowsPerPage,
      active: true
    }))
  }, [pageNumber])
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
            {/* <DropdownItem className='w-100' onClick={() => dispatch(getRolePermission(row.id))} tag={Link} to='/permissions' > */}
            <DropdownItem className='w-100' tag={Link} to={{ pathname: `/permissions/${row.name}`, state: { id : row.id, name: row.name}}} >
              <FaUserLock size={14} className='mr-50'/>
              <span className='align-middle'>{intl.formatMessage({id: "SpecifyPermissions"})}</span>
            </DropdownItem>
            <DropdownItem
              className='w-100'
              onClick={() => updateRole(row.id)}
            >
              <Archive size={14} className='mr-50' />
              <span className='align-middle'><FormattedMessage id="Edit" /></span>
            </DropdownItem>
            <DropdownItem className='w-100' onClick={() => { confirmDelete(deleteRole, row.id) }}>
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
          {isAuthorized(store.errorCode) ? <Redirect to='/misc/not-authorized' /> : (
              <>
                <div className="my-1">
                    <Button.Ripple color='primary' onClick={addRole} >
                        <FormattedMessage id="Add" />
                    </Button.Ripple>
                </div>
                <Card>
                    <DataTable
                        noDataComponent={<FormattedMessage id="NoData" />}
                        progressPending={layoutStore.loading}
                        progressComponent={<ComponentSpinner/>}
                        expandableRows
                        expandableRowsComponent={<ExpandedRowDetails  columns={columns} />}
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
                <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} selectedRole={store.selectedRole} />
              </>
          )}
      </Fragment>

  )

}

export default RolesList
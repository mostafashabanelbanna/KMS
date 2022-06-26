// ** React Imports
import { Fragment, useState, useEffect } from 'react'

import Sidebar from './Sidebar'

// ** Store & Actions
import {  getData, deleteClassification, getClassification } from './store/action'
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
import { BsUiRadiosGrid } from "react-icons/bs"
import ExpandedRowDetails from '../../../containers/expanded-row-details/expandedRowDetails'
import ComponentSpinner from '../../../@core/components/spinner/Fallback-spinner'
import axios from '../../../axios'


// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'


// helper function
import {confirmDelete, isAuthorized, isNotLightSkin, convertSelectArr, isPermitted} from '../../../utility/Utils'
import SearchForm from '../../../containers/search-form/SearchForm/SearchForm'

const RolesList = () => {
    // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.classifications)
  const layoutStore = useSelector(state => state.layout)
  
  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const [pageNumber, setPageNumber] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [owners, setOwners] = useState([])
  const [searchData, setSearchData] = useState({
    id: null,
    ownerId: null,
    name: "",
    active: null
  })

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

  const getOwners = async () => {
    await axios.get(`/User/GetAllUsers`)
    .then(response => {
        const result = response.data.data
        setOwners(result)
        })
        .catch(error => {
    })
  }

  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getData({
        pageNumber,
        pageSize: rowsPerPage,
        ...searchData
      })
    )
    getOwners()
  }, [dispatch, store.data.length])

  useEffect(() => {
    if (store.getResponse.statusCode !== 200 && store.getResponse.statusCode !== 0) {
      notify('error', `${intl.formatMessage({id: "InternalServerError"})} `)
    }
    dispatch({type:"RESET_CLASSIFICATION_GET_RESPONSE"})
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
          ...searchData,
          pageNumber,
          pageSize: rowsPerPage
        }))
      }
    }
    dispatch({type:"RESET_CLASSIFICATION_DELETE_RESPONSE"})
  }, [store.deleteResponse.statusCode])

  const addClassification = () => {
    dispatch({type: "GET_CLASSIFICATION", selectedClassification:{}})
    toggleSidebar()
}
  const updateClassification = id => {
    dispatch({type: "GET_CLASSIFICATION", selectedClassification:{}})
    dispatch({type:"RESET_CLASSIFICATION_UPDATE_RESPONSE"})
    dispatch(getClassification(id))
    toggleSidebar()
  }

  // ** Function in get data on page change
  const handlePagination = page => {
    setPageNumber(page.selected + 1)
  }

  useEffect(() => {
    dispatch(getData({
      ...searchData,
      pageNumber,
      pageSize: rowsPerPage
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

  // Search Form Items we need to pass to Search Form container
  const formItems =  [
    {
      fieldType: 'text',
      label: `${intl.formatMessage({id: "Code"})}`, 
      colSizeLg: 4,
      attr: "id",
      dropdownArr: [], 
      multiple: false, 
      radioArr: [] 
    },
    {
      fieldType: 'text',
      label: `${intl.formatMessage({id: "Name"})}`, 
      colSizeLg: 4,
      attr: "name",
      dropdownArr: [], 
      multiple: true, 
      radioArr: [] 
    },
    {
      fieldType: 'select',
      label: `المالك`, 
      colSizeLg: 4, 
      attr: "ownerId", 
      dropdownArr: convertSelectArr(owners),
      multiple: false,
      radioArr: [] 
    },
    {
      fieldType: 'select',
      label: `${intl.formatMessage({id: "Active"})}`, 
      colSizeLg: 4, 
      attr: "active", 
      dropdownArr: [{label: intl.formatMessage({id: "All"}), value: null}, {label: intl.formatMessage({id: "Active"}), value: true}, {label: intl.formatMessage({id: "Inactive"}), value: false}], 
      multiple: true,
      radioArr: [] 
    }
  ]

  const handleSearch = (value, attrName) => {
    setSearchData({...searchData, [attrName] : (value !== undefined && value !== '' ? value : null) })
  } 

  const handlSubmit = () => {
    setPageNumber(1)
    dispatch(
      getData({
        pageNumber,
        pageSize: rowsPerPage,
        ...searchData
      })
    )
  }

  const columns =  [
    {
      name: <FormattedMessage id="Code" />,
      selector: 'id',
      sortable: true,
      minWidth: '50px',
      maxWidth: '60px'
    },
    {
      name: <FormattedMessage id="Name" />,
      selector: 'name_A',
      sortable: true,
      minWidth: '225px'
    },
    {
        name: <FormattedMessage id="Description" />,
        selector: 'description_A',
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
          {isPermitted("ClassificationValue", "List") &&
            <DropdownItem className='w-100' tag={Link} to={{ pathname: `/classification-values/${row.id}`, state: { id : row.id, name: row.name_A}}} >
              <BsUiRadiosGrid size={14} className='mr-50'/>
              <span className='align-middle'>{intl.formatMessage({id: "Classification Values"})}</span>
            </DropdownItem>}
            {isPermitted("Classification", "Update") && row.update &&
            <DropdownItem
              className='w-100'
              onClick={() => updateClassification(row.id)}
            >
              <Archive size={14} className='mr-50' />
              <span className='align-middle'><FormattedMessage id="Edit" /></span>
            </DropdownItem>}
            {isPermitted("Classification", "Delete") && row.delete &&
            <DropdownItem className='w-100' onClick={() => { confirmDelete(deleteClassification, row.id) }}>
              <Trash2 size={14} className='mr-50' />
              <span className='align-middle'><FormattedMessage id="Delete" /></span>
            </DropdownItem>}
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }
  ]

  return (
      <Fragment>
          {isAuthorized(store.errorCode) ? <Redirect to='/misc/not-authorized' /> : (
              <>
               
                <Card>
                    <DataTable
                        progressPending={layoutStore.loading}
                        progressComponent={<ComponentSpinner/>}
                        expandableRows
                        expandableRowsComponent={<ExpandedRowDetails  columns={columns} />}
                        noHeader
                        pagination
                        subHeader
                        responsive
                        paginationServer
                        columns={columns}
                        sortIcon={<ChevronDown />}
                        className='react-dataTable'
                        paginationComponent={CustomPagination}
                        data={dataToRender()}
                        subHeaderComponent={
                          <div className='w-100'>
                          <div className="rounded" style={{backgroundColor: isNotLightSkin() ? "#343d55" : "#f3f2f7"}}>
                          <SearchForm  display='inline' searchHandler={handleSearch} submitHandler={handlSubmit} formConfig={formItems} btnText={intl.formatMessage({id: "Search"})}/>
        
                          </div>
                          <div className="my-1 d-flex justify-content-end">
                          {isPermitted("Classification", "Create") &&
                            <Button.Ripple color='primary' onClick={addClassification} >
                              <FormattedMessage id="Add" />
                            </Button.Ripple>}
                          </div>
                        </div>
                      }
                    />
                </Card>
                <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} selectedClassification={store.selectedClassification} />
              </>
          )}
      </Fragment>

  )

}

export default RolesList
// ** React Imports
import { Fragment, useState, useEffect } from 'react'

import Sidebar from './Sidebar'

import SearchForm from '../../../containers/search-form/SearchForm/SearchForm'

// ** Store & Actions
import {  getData, getInquiry, resetCreateResponse, resetUpdateResponse, deleteInquiry, resetDeleteResponse} from './store/action'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import swal from "sweetalert"

import { Link, Redirect} from 'react-router-dom'

import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { ChevronDown, MoreVertical,  Trash2, Archive, File, Settings } from 'react-feather'
import DataTable from 'react-data-table-component'
import { selectThemeColors } from '@utils'
import { Card,  Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { useIntl, FormattedMessage } from 'react-intl'
import { toast } from 'react-toastify'
import Toastr from '../../../containers/toastr/Toastr'
import * as moment from "moment"
import "moment/locale/ar"
import ExpandedRowDetails from '../../../containers/expanded-row-details/expandedRowDetails'
import ComponentSpinner from '../../../@core/components/spinner/Fallback-spinner'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import axios from '../../../axios'
// helper function
import {isAuthorized, isNotLightSkin, convertSelectArr, confirmDelete, isPermitted} from '../../../utility/Utils'


const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.inquiries)
  const layoutStore = useSelector(state => state.layout)

  // ** States
  const [departments, setDepartments] = useState([])
  const [providers, setProviders] = useState([])
  const [classifications, setClassifications] = useState([])
  const [classificationValues, setClassificationValues] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [owners, setOwners] = useState([])
  const [status, setStatus] = useState([])
  const [searchData, setSearchData] = useState({
    id: null,
    name: "",
    periodicityId: null,
    departmentId: null,
    ownerId: null,
    classificationValueId: null,
    sourceId: null,
    Active: true,
    isCurrentUser:false
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

    const getOwners = async () => {
      await axios.get(`/User/GetAllUsers`)
      .then(response => {
          const result = response.data.data
          setOwners(result)
          })
          .catch(error => {
      })
    }
    const getDepartments = async () => {
      await axios.post(`/Lookups/GetLookupValues`, {lookupName: 'Department'})
      .then(response => {
          setDepartments(response.data.data)
         })
         .catch(error => {
      })
    }
    const getStatus = async () => {
      await axios.post(`/Lookups/GetLookupValues`, {lookupName: 'InquiryStatus'})
      .then(response => {
          setStatus(response.data.data)
         })
         .catch(error => {
      })
    }
    const getProviders = async () => {
      await axios.get(`/Provider/GetProviders`)
      .then(response => {
          setProviders(response.data.data)
         })
         .catch(error => {})
    }
    const getClassifications = async () => {
      await axios.post(`/Classification/GetClassifications`, {focus: null})
      .then(response => {
          setClassifications(response.data.data)
          dispatch({type:"SET_INQUIRY_ALL_CLASSIFICATIONS", allClassifications: response.data.data})
         })
         .catch(error => {})
    }
    const getClassificationValues = async (id) => {
      await axios.get(`/ClassificationValue/GetClassificationValues/${id}`)
      .then(response => {
          setClassificationValues(response.data.data)
         })
         .catch(error => {})
    }

 // ** Function to toggle sidebar

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
        ...searchData
      })
    )
    getDepartments()
    getProviders()
    getClassifications()
    getOwners()
    getStatus()
  }, [dispatch, store.data.length])

  useEffect(() => {
    if (store.getResponse.statusCode !== 200 && store.getResponse.statusCode !== 0) {
      notify('error', `${intl.formatMessage({id: "InternalServerError"})}`)
    }
    dispatch({type:"RESET_INQUIRY_GET_RESPONSE"})
  }, [store.getResponse.statusCode])

  useEffect(() => {
    if (store.deleteResponse.statusCode === 2) {
      notify('error', `${intl.formatMessage({id: "DeleteFailed"})} `)
    } else if (store.deleteResponse.statusCode === 500) {
      notify('error', `${intl.formatMessage({id: "InternalServerError"})} `)
    } else if (store.deleteResponse.statusCode === 200) {
      notify('success', `${intl.formatMessage({id: "DeletedSuccess"})} `)
      const Pages = Math.ceil((store.data.length - 1) / rowsPerPage)
      if (Pages <= 0) {
         setPageNumber(store.totalPages - 1)
         
      } else {
        dispatch(getData({
          ...searchData,
          pageNumber,
          rowsPerPage
        }))
      }
    }
    dispatch(resetDeleteResponse())

  }, [store.deleteResponse.statusCode])


  const addInquiry = () => {
    dispatch({type:"SET_INQUIRY_SELECTED_CLASSIFICATION_VALUES", selectedClassificationValues: [{classificationValues: []}]})
    dispatch({type: "GET_INQUIRY", selectedInquiry:{}})
    toggleSidebar()
  }
  
  const updateInquiry = id => {
    dispatch({type:"SET_INQUIRY_SELECTED_CLASSIFICATION_VALUES", selectedClassificationValues: [{classificationValues: []}]})
    dispatch({type: "GET_INQUIRY", selectedInquiry:{}})
    dispatch(resetUpdateResponse())
    dispatch(getInquiry(id))
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
      rowsPerPage
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
      label: `${intl.formatMessage({id: "Id"})}`, 
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
      multiple: false, 
      radioArr: [] 
    },
    {
        fieldType: 'select',
        label: `مزود بيانات`, 
        colSizeLg: 4, 
        attr: "providerId", 
        dropdownArr: convertSelectArr(providers),
        multiple: false,
        radioArr: [] 
    },
    {
        fieldType: 'select',
        label: `الأدارة`, 
        colSizeLg: 4, 
        attr: "departmentId", 
        dropdownArr: convertSelectArr(departments),
        multiple: false,
        radioArr: [] 
    },
    {
      fieldType: 'select',
      label: `التصنيف`, 
      colSizeLg: 4, 
      attr: "classificationId", 
      dropdownArr: convertSelectArr(classifications),
      multiple: false,
      radioArr: [] 
    },
    {
      fieldType: 'select',
      label: `قيم التصنيف`, 
      colSizeLg: 4, 
      attr: "classificationValueId", 
      dropdownArr: convertSelectArr(classificationValues),
      multiple: false,
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
    if (attrName === 'classificationId') {
      getClassificationValues(value)
    }
  } 

  const handlSubmit = () => {
    setPageNumber(1)
    dispatch(
        getData({
          pageNumber,
          rowsPerPage,
          ...searchData
        })
    )
  }
  
 const columns =  [
    {
      name: <FormattedMessage id="Id" />,
      selector: 'id',
      sortable: true,
      minWidth: '10px'
    },
    {
      name: <FormattedMessage id="Name" />,
      selector: 'name',
      sortable: true,
      minWidth: '400px'
    },
    {
      name: <FormattedMessage id="Provider" />,
      selector: (row, idx) => { return (<> {row.provider ? row.provider.name : ""} </>) },
      sortable: true,
      minWidth: '250px'
    },
    {
        name: <FormattedMessage id="CreateDate" />,
        selector: (row, idx) => { return (<> {moment(row.createDate).locale("ar").format("LL")} </>) },
        sortable: true,
        minWidth: '250px'
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
          {isPermitted("Inquiry", "Update") && row.update &&
            <DropdownItem
              className='w-100'
              onClick={() => updateInquiry(row.id)}
            >
              <Archive size={14} className='mr-50' />
              <span className='align-middle'><FormattedMessage id="Edit" /></span>
            </DropdownItem>}
            {isPermitted("InquiryProcedure", "List") &&
            <DropdownItem className='w-100' tag={Link} to={{ pathname: `/inquiryProcedure/${row.id}`, state: { id : row.id, name: row.name_A}}} >
              <Settings size={14} className='mr-50' />
              <span className='align-middle'><FormattedMessage id="InquiryProcedure" /></span>
            </DropdownItem>}
            {isPermitted("Inquiry", "Delete") && row.delete &&
            <DropdownItem className='w-100' onClick={() => { confirmDelete(deleteInquiry, row.id) }} >
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
      { isAuthorized(store.errorCode) ? <Redirect to='/misc/not-authorized' /> : (
        <>
          <Card>
            <DataTable
              noDataComponent={<FormattedMessage id="NoData" />}
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
              subHeaderWrap={false}
              subHeaderComponent={
                <div className='w-100'>
                  <div className="rounded" style={{backgroundColor: isNotLightSkin() ? "#343d55" : "#f3f2f7"}}>

                    <SearchForm display='inline'  searchHandler={handleSearch} submitHandler={handlSubmit} formConfig={formItems} btnText={intl.formatMessage({id: "Search"})}/>
                  </div>
                  <div className="my-1 d-flex justify-content-end">
                  {isPermitted("Inquiry", "Create") &&
                    <Button.Ripple color='primary' onClick={addInquiry} >
                      <FormattedMessage id="Add" />
                    </Button.Ripple>}
                  </div>
                </div>
              }
            />
          </Card>
          <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} selectedInquiry={store.selectedInquiry} departments={departments} providers={providers} users={owners} status={status} classifications={classifications} />
        </>
      )}
    </Fragment>
  )
}

export default UsersList

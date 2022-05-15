// ** React Imports
import { Fragment, useState, useEffect } from 'react'

import Sidebar from './Sidebar'

// ** Store & Actions
import {  getData, getInquiry, resetCreateResponse, resetUpdateResponse, deleteInquiry, resetDeleteResponse} from '../manageInquiry/Inquiry/store/action'
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
import Toastr from '../../containers/toastr/Toastr'
import * as moment from "moment"
import "moment/locale/ar"
import ExpandedRowDetails from '../../containers/expanded-row-details/expandedRowDetails'
import ComponentSpinner from '../../@core/components/spinner/Fallback-spinner'
import InquiryCard from './InquiryListCard'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import axios from '../../axios'
// helper function
import {isAuthorized, isNotLightSkin, convertSelectArr, confirmDelete} from '../../utility/Utils'


const InquiryList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.inquiries)
  const layoutStore = useSelector(state => state.layout)

  // ** States
  const [departments, setDepartments] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchData, setSearchData] = useState({
    id: null,
    name: "",
    periodicityId: null,
    departmentId: null,
    ownerId: null,
    classificationValueId: null,
    sourceId: null,
    Active: true,
    isCurrentUser:true
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
    const getDepartments = async () => {
      await axios.post(`/Lookups/GetLookupValues`, {lookupName: 'Department'})
      .then(response => {
          setDepartments(response.data.data)
         })
         .catch(error => {
      })
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
  }, [dispatch, store.data.length])

  useEffect(() => {
    if (store.getResponse.statusCode !== 200 && store.getResponse.statusCode !== 0) {
      notify('error', `${intl.formatMessage({id: "InternalServerError"})}`)
    }
    dispatch({type:"RESET_INQUIRY_GET_RESPONSE"})
  }, [store.getResponse.statusCode])


  const addInquiry = () => {
    dispatch({type: "GET_INQUIRY", selectedInquiry:{}})
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
  
 const columns =  [
    {
      name: <FormattedMessage id="Name" />,
      selector: (row, idx) => { return (<> <h5> {row.name} </h5> <span style={{ color: "#ccc" }}>{ row.departmentName }</span> </>) },
      sortable: true,
      minWidth: '300px'
    },
    {
      name: "الملف المرفق",
      selector: "attachment",
      sortable: true,
      minWidth: '250px'
    },
    {
        name: <FormattedMessage id="startDate" />,
        selector: (row, idx) => { return (<> { row.startDate ? moment(row.startDate).locale("ar").format("LL") : ""} </>) },
        sortable: true,
        minWidth: '250px'
    },
    {
      name: "الحالة",
      selector: "status",
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

          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }
  ]

  return (
    <Fragment>
      { isAuthorized(store.errorCode) ? <Redirect to='/misc/not-authorized' /> : (
        <div className='w-100'>
          <div className='row mx-0'>
            <div className='col-md-12'>
              <div className="mb-2 d-flex justify-content-between">
                <div className="my-1">
                    <Button.Ripple color='primary' onClick={addInquiry} >
                      <FormattedMessage id="Add" />
                    </Button.Ripple>
                </div>
                <div>
                  {store.data.length > 0 &&
                    <ReactPaginate
                      previousLabel={''}
                      nextLabel={''}
                      pageCount={store.totalPages || 1}
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
                  }
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
              <div className='col-md-12'>
                {layoutStore.loading === true && <ComponentSpinner/>}
                {layoutStore.loading === false && store.data.map((item, idx) => (
                  <InquiryCard key={idx} item={item}/>
                ))}
              </div>
          </div>
          <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} selectedInquiry={store.selectedInquiry} departments={departments} />
        </div>
      )}
    </Fragment>
  )
}

export default InquiryList

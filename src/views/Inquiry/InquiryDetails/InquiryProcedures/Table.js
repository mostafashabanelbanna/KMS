// ** React Imports
import { Fragment, useState, useEffect } from 'react'

import Sidebar from './Sidebar'

// ** Store & Actions
import {  getData, deleteInquiryProcedure, getInquiryProcedure } from './store/action'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import swal from "sweetalert"

import { Link, Redirect} from 'react-router-dom'

import ReactPaginate from 'react-paginate'
import { ChevronDown, MoreVertical,  Trash2, Archive } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card,  Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { useIntl, FormattedMessage } from 'react-intl'
import * as moment from "moment"
import "moment/locale/ar"
import ExpandedRowDetails from '../../../../containers/expanded-row-details/expandedRowDetails'
import ComponentSpinner from '../../../../@core/components/spinner/Fallback-spinner'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'


// helper function
import {confirmDelete, isAuthorized, isNotLightSkin, isPermitted} from '../../../../utility/Utils'

const InquiryProcedureList = ({inquiryId}) => {
    // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.inquiryProcedures)
  const layoutStore = useSelector(state => state.layout)

  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const [pageNumber, setPageNumber] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchData, setSearchData] = useState({
    inquiryId,
    active: true
  })

    // useIntl
    const intl = useIntl()

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
        pageSize: rowsPerPage,
        ...searchData,
        inquiryId
      })
    )
  }, [dispatch, store.data.length])

  const addInquiryProcedure = () => {
    dispatch({type: "GET_INQUIRYPROCEDURE", selectedInquiryProcedure:{}})
    toggleSidebar()
  }

  // ** Function in get data on page change
  const handlePagination = page => {
    setPageNumber(page.selected + 1)
  }

  useEffect(() => {
    dispatch(getData({
      ...searchData,
      inquiryId,
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

  const columns =  [
    {
      name: <FormattedMessage id="Id" />,
      selector: 'id',
      sortable: true,
      minWidth: '50px'
    },
    {
      name: <FormattedMessage id="Provider" />,
      selector: (row, idx) => { return (<> {row.provider ? row.provider.name : ""} </>) },
      sortable: true,
      minWidth: '200px'
    },
    {
      name: <FormattedMessage id="Name" />,
      selector: 'name',
      sortable: true,
      minWidth: '150px'
    },
    {
        name: <FormattedMessage id="CreateDate" />,
        selector: (row, idx) => { return (<> {moment(row.createDate).locale("ar").format("LL")} </>) },
        sortable: true,
        minWidth: '150px'
    }
  ]
  return (
      <Fragment>
          {isAuthorized(store.errorCode) ? <Redirect to='/misc/not-authorized' /> : (
              <>
                <Card>
                    <DataTable
                        noDataComponent={<FormattedMessage id="NoData" />}
                        progressPending={layoutStore.loading}
                        progressComponent={<ComponentSpinner/>}
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
                          <div className="my-1 d-flex justify-content-end">
                          {isPermitted("InquiryProcedure", "Create") &&
                            <Button.Ripple color='primary' onClick={addInquiryProcedure} >
                              <FormattedMessage id="Add" />
                            </Button.Ripple>}
                          </div>
                        </div>
                      }
                    />
                </Card>
                <Sidebar inquiryId={inquiryId} open={sidebarOpen} toggleSidebar={toggleSidebar} selectedInquiryProcedure={store.selectedInquiryProcedure} />
              </>
          )}
      </Fragment>
  )

}

export default InquiryProcedureList
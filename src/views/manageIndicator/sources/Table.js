// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Invoice List Sidebar
import Sidebar from './Sidebar'
// ** Invoice List SearchForm
import SearchForm from '../../../containers/search-form/SearchForm/SearchForm'

// ** Store & Actions
import {  getData, deleteSource, getSource, resetUpdateResponse } from './store/action'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import swal from "sweetalert"

import { Link, Redirect} from 'react-router-dom'

import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { ChevronDown, MoreVertical,  Trash2, Archive } from 'react-feather'
import DataTable from 'react-data-table-component'
import { selectThemeColors } from '@utils'
import { Card,  Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { useIntl, FormattedMessage } from 'react-intl'
import { toast } from 'react-toastify'
import Toastr from '../../../containers/toastr/Toastr'
import ExpandedRowDetails from '../../../containers/expanded-row-details/expandedRowDetails'
import ComponentSpinner from '../../../@core/components/spinner/Fallback-spinner'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'


// helper function
import {isAuthorized, isNotLightSkin} from '../../../utility/Utils'

const IndictorList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.sources)
  const layoutStore = useSelector(state => state.layout)

  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const [pageNumber, setPageNumber] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchData, setSearchData] = useState({
    name: "",
    isNational: null,
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
          // dispatch()
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
        ...searchData
      })
    )
  }, [dispatch, store.data.length])

  useEffect(() => {
    if (store.getResponse.statusCode !== 200 && store.getResponse.statusCode !== 0) {
      notify('error', `${intl.formatMessage({id: "InternalServerError"})}`)
    }
    dispatch({type:"RESET_GET_SOURCE_RESPONSE"})
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
          pageSize: rowsPerPage
        }))
      }
    }
    dispatch({type:" RESET_SOURCE_DELETE_RESPONSE"})

  }, [store.deleteResponse.statusCode])

  useEffect(() => {
    if (store.errorCode !== 0 && store.errorCode !== 200 && store.errorCode !== 401 && store.errorCode !== 403) {
      notify('error', `${intl.formatMessage({id: "InternalServerError"})} `)

    }
  }, [store.errorCode])


  const addSource = () => {
    dispatch({type: "GET_SOURCE", selectedSource:{}})
    dispatch({type: "RESET_CREATE_SOURCE_RESPONSE"})
    toggleSidebar()
  }
  
  const updateSource = id => {
    dispatch({type: "GET_SOURCE", selectedSource:{}})
    dispatch(resetUpdateResponse())
    dispatch(getSource(id))
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
      label: `${intl.formatMessage({id: "Name"})}`, 
      colSizeLg: 4,
      attr: "name",
      dropdownArr: [], 
      multiple: true, 
      radioArr: [] 
    },
    {
      fieldType: 'select',
      label: `${intl.formatMessage({id: "Active"})}`, 
      colSizeLg: 4, 
      attr: "active", 
      dropdownArr: [{label: 'all', value: null}, {label:'active', value: true}, {label:'notActive', value: false}], 
      multiple: true,
      radioArr: [] 
    },
    {
      fieldType: 'select',
      label: `${intl.formatMessage({id: "National"})}`, 
      colSizeLg: 4, 
      attr: "isNational", 
      dropdownArr: [{label: 'all', value: null}, {label: 'national', value: true}, {label:' notNational', value: false}], 
      multiple: true,
      radioArr: [] 
    }
  ]

  const handleSearch = (value, attrName) => {
    setSearchData({...searchData, [attrName] : value })
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
            <DropdownItem
              className='w-100'
              onClick={() => updateSource(row.id)}
            >
              <Archive size={14} className='mr-50' />
              <span className='align-middle'><FormattedMessage id="Edit" /></span>
            </DropdownItem>
            <DropdownItem className='w-100' onClick={() => dispatch(deleteSource(row.id))}>
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
                     <SearchForm  searchHandler={handleSearch} submitHandler={handlSubmit} formConfig={formItems} btnText={intl.formatMessage({id: "Search"})}/>

                  </div>
                  <div className="my-1 d-flex justify-content-end">
                    <Button.Ripple color='primary' onClick={addSource} >
                      <FormattedMessage id="Add" />
                    </Button.Ripple>
                  </div>
                </div>
              }
            />
          </Card>
          <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} selectedSource={store.selectedSource} />
        </>
      )}
    </Fragment>
  )
}

export default IndictorList

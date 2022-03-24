// ** React Imports
import { Fragment, useState, useEffect } from 'react'

import Sidebar from './Sidebar'
// ** Invoice List SearchForm
import SearchForm from '../../../containers/search-form/SearchForm/SearchForm'

// ** Store & Actions
import {  getData, getDocumentIssue, resetCreateResponse, resetUpdateResponse, deleteDocumentIssue, resetDeleteResponse} from './store/action'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import swal from "sweetalert"

import { Link, Redirect} from 'react-router-dom'

import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { ChevronDown, MoreVertical,  Trash2, Archive, File } from 'react-feather'
import DataTable from 'react-data-table-component'
import { selectThemeColors } from '@utils'
import { Card,  Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { useIntl, FormattedMessage } from 'react-intl'
import { toast } from 'react-toastify'
import Toastr from '../../../containers/toastr/Toastr'
import * as moment from "moment"
import "moment/locale/ar"
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import axios from '../../../axios'
import ExpandedRowDetails from '../../../containers/expanded-row-details/expandedRowDetails'
import ComponentSpinner from '../../../@core/components/spinner/Fallback-spinner'

// helper function
import {isAuthorized, isNotLightSkin, convertSelectArr, confirmDelete} from '../../../utility/Utils'


const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.documentIssues)
  const layoutStore = useSelector(state => state.layout)

  // ** States
  const [sources, setSources] = useState([])
  const [periodicities, setPeriodicities] = useState([])
  const [classifications, setClassifications] = useState([])
  const [classificationValues, setClassificationValues] = useState([])
  const [owners, setOwners] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchData, setSearchData] = useState({
    id: null,
    name: "",
    periodicityId: null,
    sourceId: null,
    ownerId: null,
    classificationValueId: null,
    active: true
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

    const getAllDropDowns = async () => {
        await axios.get(`/Indicator/GetSearchDropdownListsForIndicator`)
        .then(response => {
            const result = response.data.data
            setSources(result.sources)
            setPeriodicities(result.periodicities)
            setClassifications(result.classifications)
           })
           .catch(error => {
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
    getAllDropDowns()
    getOwners()
  }, [dispatch, store.data.length])

  useEffect(() => {
    if (store.getResponse.statusCode !== 200 && store.getResponse.statusCode !== 0) {
      notify('error', `${intl.formatMessage({id: "InternalServerError"})}`)
    }
    dispatch({type:"RESET_DOCUMENTISSUE_GET_RESPONSE"})
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


  const addDocumentIssue = () => {
    dispatch({type:"SET_DOCUMENTISSUE_SELECTED_CLASSIFICATION_VALUES", selectedClassificationValues: [{classificationValues: []}]})
    dispatch({type: "GET_DOCUMENTISSUE", selectedDocumentIssue:{}})
    toggleSidebar()
  }
  
  const updateDocumentIssue = id => {
    dispatch({type:"SET_DOCUMENTISSUE_SELECTED_CLASSIFICATION_VALUES", selectedClassificationValues: [{classificationValues: []}]})
    dispatch({type: "GET_DOCUMENTISSUE", selectedDocumentIssue:{}})
    dispatch(resetUpdateResponse())
    dispatch(getDocumentIssue(id))
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
        label: `المصدر`, 
        colSizeLg: 4, 
        attr: "sourceId", 
        dropdownArr: convertSelectArr(sources),
        multiple: false,
        radioArr: [] 
    },
    {
        fieldType: 'select',
        label: `الدورية`, 
        colSizeLg: 4, 
        attr: "periodicityId", 
        dropdownArr: convertSelectArr(periodicities),
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
    console.log(searchData)
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
      name: <FormattedMessage id="Code" />,
      selector: 'id',
      sortable: true,
      minWidth: '50px',
      maxWidth: '60px'
    },
    {
      name: <FormattedMessage id="Name" />,
      selector: 'name',
      sortable: true,
      minWidth: '300px',
      maxWidth: '150px'
    },
    {
      name: <FormattedMessage id="Periodicity" />,
      selector: (row, idx) => { return (<> {row.periodicity ? row.periodicity.name : ""} </>) },
      sortable: true,
      minWidth: '150px'
    },
    {
      name: <FormattedMessage id="Source" />,
      selector: (row, idx) => { return (<> {row.source ? row.source.name : ""} </>) },
      sortable: true,
      minWidth: '150px'
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
            <DropdownItem
              className='w-100'
              onClick={() => updateDocumentIssue(row.id)}
            >
              <Archive size={14} className='mr-50' />
              <span className='align-middle'><FormattedMessage id="Edit" /></span>
            </DropdownItem>
            <DropdownItem className='w-100' tag={Link} to={{ pathname: `/documentLibrary/${row.id}`, state: { id : row.id, name: row.name_A}}} >
              <File size={14} className='mr-50' />
              <span className='align-middle'><FormattedMessage id="Attachments" /></span>
            </DropdownItem>
            <DropdownItem className='w-100' onClick={() => { confirmDelete(deleteDocumentIssue, row.id) }} >
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

                    <SearchForm display='inline'  searchHandler={handleSearch} submitHandler={handlSubmit} formConfig={formItems} btnText={intl.formatMessage({id: "Search"})}/>
                  </div>
                  <div className="my-1 d-flex justify-content-end">
                    <Button.Ripple color='primary' onClick={addDocumentIssue} >
                      <FormattedMessage id="Add" />
                    </Button.Ripple>
                  </div>
                </div>
              }
            />
          </Card>
          <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} selectedDocumentIssue={store.selectedDocumentIssue} periodicities={periodicities} sources={sources} classifications={classifications} />
        </>
      )}
    </Fragment>
  )
}

export default UsersList

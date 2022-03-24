// ** React Imports
import { Fragment, useState, useEffect, useContext, useRef } from 'react'


import Sidebar from './Sidebar'
import Toastr from '../../../containers/toastr/Toastr'


// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getLookupValue, deleteLookupValue, getData, getLookups } from './store/action/Index'

// ** Third Party Components
import swal from "sweetalert"

import { Link, Redirect} from 'react-router-dom'

import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { ChevronDown, Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive  } from 'react-feather'
import DataTable from 'react-data-table-component'
import { selectThemeColors } from '@utils'
import { Card,  Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import AppCollapse from '@components/app-collapse'
import { ThemeColors } from '@src/utility/context/ThemeColors'
import { toast } from 'react-toastify'
import Row from 'reactstrap/lib/Row'
import {useIntl, FormattedMessage } from 'react-intl'
import ExpandedRowDetails from '../../../containers/expanded-row-details/expandedRowDetails'
import ComponentSpinner from '../../../@core/components/spinner/Fallback-spinner'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'


// helper function
import {isAuthorized} from '../../../utility/Utils'


const LookupsView = () => {

    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.lookups)
    const layoutStore = useSelector(state => state.layout)


    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [selectedLookup, setSelectedLookup] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [searchData, setSearchData] = useState({
      name: ""
    })
    const [currentLookupName, setCurrentLookupName] = useState('EmptyString')
    
    // useIntl
    const intl = useIntl()

    const myRef = useRef(null)

    const executeScroll = () => myRef.current.scrollIntoView()    
    
  // Toastr notify function
  const notify = (type, message) => {
    return toast.success(
      <Toastr type={type} message={message} />,
      { position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true 
      })
    }

   
    const handlePagination = page => {
        setPageNumber(page.selected + 1)
    }
    useEffect(() => {
      dispatch(getData({
        ...searchData,
        pageNumber,
        rowsPerPage,
        lookupName: selectedLookup
      }))
    }, [pageNumber])
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

    useEffect(() => {
        dispatch(
            getLookups()
        )
        dispatch(
          getData({lookupName: '', pageNumber : 1, rowsPerPage, ...searchData})
        )

      }, [dispatch, store.allLookups.length])

    const addLookup = () => {
        dispatch({type: "GET_LOOKUP", selectedLookup:{}})
        toggleSidebar()
    }
    const updateLookup = id => {
        dispatch(getLookupValue(id))
        toggleSidebar()
    }

    useEffect(() => {
      if (store.deleteResponse.statusCode !== 0) {
        if (store.deleteResponse.statusCode === 2) {
          notify('error', `${intl.formatMessage({id: "DeleteFailed"})} `)
        } else if (store.deleteResponse.statusCode === 500) {
          notify('error', `${intl.formatMessage({id: "InternalServerError"})} `)
        } else if (store.deleteResponse.statusCode === 7) {
          notify('error', intl.formatMessage({id: store.deleteResponse.errors[0]}))
        } else if (store.deleteResponse.statusCode === 200) {
          notify('success', `${intl.formatMessage({id: "DeletedSuccess"})} `)
          const Pages = Math.ceil((store.data.length - 1) / rowsPerPage)
          if (Pages <= 0) {
             setPageNumber(store.totalPages - 1)
          } else {
            dispatch(getData({
              ...searchData,
              pageNumber,
              rowsPerPage,
              lookupName: selectedLookup
            }))
          }
        }
        dispatch({type:"RESET_DELETE_LOOKUP_RESPONSE"})
      }
    }, [store.deleteResponse.statusCode])

    const isNotLightSkin = () => {
      // get current skin 
      const currentSkin = JSON.parse(localStorage.getItem("skin")) 
      // wether skin is light or not
      return currentSkin !== "light" 
    }

    const setActiveCard = event => {
      // get all card nodelist and convert to array
      const myNodeList = [...document.querySelectorAll(".card.displayName")]
      // reset all cards to original color
      myNodeList.map((item) => {
        item.style.background = isNotLightSkin() ? "#283046" : "#fff"
        item.style.color = isNotLightSkin() ? "#b4b7bd" : "#6e6b7b"
      })
      // highlit active card
      event.target.style.background = "linear-gradient(-118deg, #7367f0, rgba(115, 103, 240, 0.7))"
      event.target.style.color = '#fff'
    }

    const getLookupValues = (e, lookupName) => {
        setActiveCard(e)
        setSelectedLookup(lookupName)
        setPageNumber(1)
        dispatch(
            getData({lookupName, pageNumber : 1, rowsPerPage, ...searchData})
        )
    }


    function RenderLookups() {
        const lkps = []
        if (store.allLookups && store.allLookups.length > 0) {
            for (let i = 0; i < store.allLookups.length; i++) {
                const content = (store.allLookups[i].items.map((obj, idx) => {
                    return (
                              <Card 
                                className="displayName" 
                                key={idx} 
                                style={{cursor: "pointer", padding: '8px'}} 
                                onClick={(e) => {
                                  executeScroll()
                                  setCurrentLookupName(obj.name)
                                  return getLookupValues(e, obj.name)
                                }}
                                >
                                <FormattedMessage id={obj.displayName} />

                              </Card>
                            )
                  }
                ))
                lkps.push({title: intl.formatMessage({id: store.allLookups[i].name}), content})
            }
        }
        return lkps
    }

    const columns = [
        {
          name: <FormattedMessage id="Code" />,
          selector: 'id',
          sortable: true,
          minWidth: '50px',
          maxWidth: '60px'
        },
        {
            name: intl.formatMessage({id: "Name"}),
            selector: 'name_A',
            sortable: true,
            minWidth: '225px'
        },
        {
            name: intl.formatMessage({id: "Actions"}),
            maxWidth: '50px',
            cell: row => (
              <UncontrolledDropdown>
                <DropdownToggle tag='div' className='btn btn-sm'>
                  <MoreVertical size={14} className='cursor-pointer' />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    className='w-100'
                    onClick={() => updateLookup(row.id)}
                  >
                    <Archive size={14} className='mr-50' />
                    <span className='align-middle'>{intl.formatMessage({id: "Edit"})}</span>
                  </DropdownItem>
                  <DropdownItem className='w-100'  onClick={() => dispatch(deleteLookupValue(currentLookupName, row.id))}>
                    <Trash2 size={14} className='mr-50' />
                    <span className='align-middle'>{intl.formatMessage({id: "Delete"})}</span>
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
                <div className='row'>
                    <div className='col-md-4'>
                        <AppCollapse  data={RenderLookups()} type='margin' accordion />
                    </div>
                    <div ref={myRef} className='col-md-8 mt-1'>
                        <div className='mb-1 d-flex justify-content-between align-items-center'>
                            <h4><FormattedMessage id={currentLookupName} /></h4>
                            <Button.Ripple color='primary' onClick={addLookup} disabled={!store.lookupName}>
                              {intl.formatMessage({id: "Add"})}
                            </Button.Ripple>
                        </div> 

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
                            data={store.data}
                            subHeaderWrap={false}
                            noDataComponent={<FormattedMessage id="NoData" />}
                            />
                        </div>
                    </div>
                <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} SelectedLookup={store.selectedLookup} />
            </>
            )}
        </Fragment>
    )
}

export default LookupsView

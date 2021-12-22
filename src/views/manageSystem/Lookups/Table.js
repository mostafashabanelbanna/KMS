// ** React Imports
import { Fragment, useState, useEffect } from 'react'


import Sidebar from './Sidebar'


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

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import SearchForm from '../../../containers/search-form/SearchForm/SearchForm'


// helper function
import {isAuthorized} from '../../../utility/Utils'
import Row from 'reactstrap/lib/Row'
import {useIntl, FormattedMessage } from 'react-intl'

const LookupsView = () => {

    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.lookups)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [selectedLookup, setSelectedLookup] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [searchData, setSearchData] = useState({
      name: ""
    })

// useIntl
const intl = useIntl()
   
    const handlePagination = page => {
        dispatch(
            getData(
            {
                ...searchData,
                pageNumber: page.selected + 1,
                rowsPerPage,
                lookupName: selectedLookup
            }
            )
        )
        setPageNumber(page.selected + 1)
    }

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

    useEffect(() => {
        dispatch(
            getLookups()
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

    const getLookupValues = lookupName => {
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
                const content = (store.allLookups[i].items.map((obj, idx) => <Card key={idx} style={{cursor: "pointer", padding: '8px'}} onClick={() => getLookupValues(obj.name)}><FormattedMessage id={obj.displayName} /></Card>))
                lkps.push({title: intl.formatMessage({id: store.allLookups[i].name}), content})
            }
        }
        return lkps
    }

    const columns = [
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
                  <DropdownItem className='w-100' onClick={() => dispatch(deleteLookupValue(row.id))}>
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
                    <div className='col-4'>
                        <AppCollapse  data={RenderLookups()} type='margin' accordion />
                    </div>
                    <div className='col-8 mt-1'>
                    <div className='mb-2'>
                        <Button.Ripple color='primary' onClick={addLookup} disabled={!store.lookupName}>
                        {intl.formatMessage({id: "Add"})}
                        </Button.Ripple>
                    </div> 

                    <DataTable
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

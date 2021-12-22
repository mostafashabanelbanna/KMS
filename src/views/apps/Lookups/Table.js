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

const columns = [
    {
        name: 'Name',
        selector: 'name_A',
        sortable: true,
        minWidth: '225px'
    },
    {
        name: 'Actions',
        maxWidth: '50px',
        cell: row => (
          <UncontrolledDropdown>
            <DropdownToggle tag='div' className='btn btn-sm'>
              <MoreVertical size={14} className='cursor-pointer' />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                tag={Link}
                to={`/apps/user/edit/${row.id}`}
                className='w-100'
                onClick={() => store.dispatch(getLookupValue(row.id))}
              >
                <Archive size={14} className='mr-50' />
                <span className='align-middle'>Edit</span>
              </DropdownItem>
              <DropdownItem className='w-100' onClick={() => store.dispatch(deleteLookupValue(row.id))}>
                <Trash2 size={14} className='mr-50' />
                <span className='align-middle'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        )
      }
]

const LookupsView = () => {

    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.lookups)

    // State
    console.log(store)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [searchData, setSearchData] = useState({
      name: ""
    })

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


    const getLookupValues = lookupName => {
        dispatch(
            getData({lookupName, pageNumber, rowsPerPage, ...searchData})
        )
    }

    function RenderLookups() {
        const lkps = []
        if (store.allLookups && store.allLookups.length > 0) {
            for (let i = 0; i < store.allLookups.length; i++) {
                const content = (store.allLookups[i].items.map((obj) => <Card style={{cursor: "pointer", padding: '8px'}} onClick={() => getLookupValues(obj.name)}>{obj.displayName}</Card>))
                lkps.push({title: store.allLookups[i].name, content})
            }
        }
        return lkps
    }

    return (
        <Fragment>
            {isAuthorized(store.error) ? <Redirect to='/misc/not-authorized' /> : (
            <>
                <div className='row'>
                    <div className='col-4'>
                        <AppCollapse data={RenderLookups()} type='margin' accordion />
                    </div>
                    <div className='col-8'>
                    <div className='mb-2'>
                        <Button.Ripple color='primary' onClick={toggleSidebar} disabled={!store.lookupName}>
                            Add
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
                <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
            </>
            )}
        </Fragment>
    )
}

export default LookupsView

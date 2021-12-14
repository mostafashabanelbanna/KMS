// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Invoice List Sidebar
import Sidebar from './Sidebar'

// ** Columns
import { columns } from './columns'

// ** Store & Actions
import {  getData } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import swal from "sweetalert"

import { Link, Redirect} from 'react-router-dom'

import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { selectThemeColors } from '@utils'
import { Card,  Button } from 'reactstrap'


// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import SearchForm from '../../../../containers/search-form/SearchForm/SearchForm'

// helper function
import {isAuthorized} from '../../../../utility/Utils'


const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.users)

  // ** States
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const [pageNumber, setPageNumber] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(2)
  const [searchData, setSearchData] = useState({
    name: "",
    email: "",
    rolles: []
  })

 // ** Function to toggle sidebar
 const toggleSidebar = () => {
  if (sidebarOpen) {
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

  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getData({
        pageNumber,
        rowsPerPage,
        ...searchData
      })
    )
  }, [dispatch, store.data.length])
  
  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getData(
        {
          ...searchData,
          pageNumber: page.selected + 1,
          rowsPerPage
        }
      )
    )
    setPageNumber(page.selected + 1)
  }

  // ** Function in get data on rows per page
  // const handlePerPage = e => {
  //   const value = parseInt(e.currentTarget.value)
  //   dispatch(
  //     getData({
  //       ...searchData,
  //       [pageNumber]: page.selected + 1,
  //       [rowsPerPage]: rowsPerPage
  //     })
  //   )
  //   setData(response.data)
  //   setTotal(response.total)
  //   setRowsPerPage(parseInt(e.target.value))
  // }

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
    // else if (store.data.length === 0 && isFiltered) {
    //   return []
    // } else {
    //   return store.allData.slice(0, rowsPerPage)
    // }
  }

  // Search Form Items we need to pass to Search Form container
  const formItems =  [
    {
      fieldType: 'text',
      label:"name", 
      colSizeLg: 4,
      attr: "name",
      dropdownArr: [], 
      multiple: true, 
      radioArr: [] 
    },
    {
      fieldType: 'text',
      label:"email", 
      colSizeLg: 4, 
      attr: "email", 
      dropdownArr: [], 
      multiple: true,
      radioArr: [] 
    }
  ]

  const handleSearch = (value, attrName) => {
    setSearchData({...searchData, [attrName] : value })
  } 

  const handlSubmit = () => {
    setCurrentPage(1)
    dispatch(
      getData({
        pageNumber: currentPage,
        rowsPerPage,
        ...searchData
      })
    )
  }
  return (
    
    <Fragment>
      { isAuthorized(store.error) ? <Redirect to='/misc/not-authorized' /> : (
        <>
      <Card>
        <div>
          <Button.Ripple color='primary' onClick={toggleSidebar}>
            Add New User
           </Button.Ripple>
        </div> 
      </Card>
      <Card>
        <DataTable
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
              <SearchForm  searchHandler={handleSearch} submitHandler={handlSubmit} formConfig={formItems}/>
            </div>
          }
        />
      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
        </>
      )}
  
    </Fragment>
  )
}

export default UsersList

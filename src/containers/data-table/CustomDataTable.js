// ** React Imports
import { Fragment, useState, useEffect } from 'react'
// ** Table Columns
import { serverSideColumns } from '../../views/tables/data-tables/data'

// ** Store & Actions
import { getData } from './DataTableFunctions'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import SearchForm from '../search-form/SearchForm/SearchForm'
import Container from 'reactstrap/lib/Container'

const CustomDataTable = (props) => {

  // Search Form Items 

//  const formItems =  [
//                       {fieldType: 'text', label:"Email", colSizeLg: 4, attr: "mail", dropdownArr: [], multiple: true, radioArr: [] },
//                       {fieldType: 'radio', label:"Email", colSizeLg: 4, attr: "name", dropdownArr: [], multiple: true, radioArr: ['active', 'inactive'] },
//                       {fieldType: 'select', label:"select", colSizeLg: 4, attr: "mail", dropdownArr: [], multiple: true, radioArr: [] },
//                       {fieldType: 'checkbox', label:"checkbox", colSizeLg: 4, attr: "checkbox", dropdownArr: [], multiple: true, radioArr: [] } 
//                     ]


  // ** States
  const [pageNumber, setPageNumber] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchData, setSearchData] = useState({
    name: "",
    email: "",
    rolles: []
  })
  const [total, setTotal] = useState(0)
  const [data, setData] = useState([])

  const getDataResult = async () => {
    const response = await getData(props.url, {
      pageNumber,
      rowsPerPage,
      ...searchData
    })
    if (response) {
      setData(response.data.items)
      setTotal(response.data.totalCount)
    }
  } 

  // ** Get data on mount
  useEffect(() => {
    getDataResult()
  }, [])

  // Search Form handle

  const handleSearch = (value, attrName) => {
    setSearchData({...searchData, [attrName] : value })
  } 

  const handlSubmit = () => {
    setPageNumber(1)
    getDataResult()
  }

  // ** Function to handle Pagination and get data
  const handlePagination = page => {
    const response = getData(props.url, {
        ...searchData,
        [pageNumber]: page.selected + 1,
        [rowsPerPage]: rowsPerPage
      })
    setData(response.data)
    setTotal(response.total)
    setPageNumber(page.selected + 1)
  }

  // ** Function to handle per page
  const handlePerPage = e => {
    const response = getData(props.url, {
        ...searchData,
        [pageNumber]: page.selected + 1,
        [rowsPerPage]: rowsPerPage
      })
    setData(response.data)
    setTotal(response.total)
    setRowsPerPage(parseInt(e.target.value))
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number((total / rowsPerPage).toFixed(0))

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        breakLabel='...'
        pageCount={count || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName='active'
        forcePage={pageNumber !== 0 ? pageNumber - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName={
          'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
        }
      />
    )
  }

  return (
    <Fragment>
      <Container fluid>
        <SearchForm searchHandler={handleSearch} submitHandler={handlSubmit} formConfig={props.formItems}/>
      </Container>

      <DataTable
          noHeader
          pagination
          paginationServer
          className='react-dataTable'
          columns={props.columns}
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
          data={data}
        />
    </Fragment>
  )
}


export default CustomDataTable

// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'

// ** Table Columns
import { serverSideColumns } from '../data'

// ** Store & Actions
import { getData } from './DataTableFunctions'
import { useSelector, useDispatch } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitle, Input, Label, Row, Col } from 'reactstrap'

const DataTableServerSide = (props) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.dataTables)

  // ** States
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchData, setSearchData] = useState({})
  const [total, setTotal] = useState(0)
  const [data, setData] = useState([])


  // ** Get data on mount
  useEffect(() => {
    let response = getData({
        ...searchData,
        currentPage: currentPage,
        rowsPerPage: rowsPerPage,
      });
      setData(response.data);
      setTotal(response.total);
  }, [])

  // ** Function to handle filter
//   const handleFilter = e => {
//     setSearchValue(e.target.value)

//     dispatch(
//       getData({
//         page: currentPage,
//         perPage: rowsPerPage,
//         q: e.target.value
//       })
//     )
//   }

  // ** Function to handle Pagination and get data
  const handlePagination = page => {
    let response = getData({
        ...searchData,
        currentPage: page.selected + 1,
        rowsPerPage: rowsPerPage,
      })
    setData(response.data);
    setTotal(response.total);
    setCurrentPage(page.selected + 1)
  }

  // ** Function to handle per page
  const handlePerPage = e => {
    let response = getData({
        ...searchData,
        currentPage: page.selected + 1,
        rowsPerPage: rowsPerPage,
      })
    setData(response.data);
    setTotal(response.total);
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
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
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
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>{props.cardHeader}</CardTitle>
        </CardHeader>
        {/* <Row className='mx-0 mt-1 mb-50'>
          <Col sm='6'>
            <div className='d-flex align-items-center'>
              <Label for='sort-select'>show</Label>
              <Input
                className='dataTable-select'
                type='select'
                id='sort-select'
                value={rowsPerPage}
                onChange={e => handlePerPage(e)}
              >
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </Input>
              <Label for='sort-select'>entries</Label>
            </div>
          </Col>
          <Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='6'>
            <Label className='mr-1' for='search-input'>
              Search
            </Label>
            <Input
              className='dataTable-filter'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row> */}
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
      </Card>
    </Fragment>
  )
}

export default memo(DataTableServerSide)

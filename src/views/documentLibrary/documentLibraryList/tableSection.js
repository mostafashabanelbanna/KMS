// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Store & Actions
import {  getDocumentLibrariesFront } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'

import { Redirect } from 'react-router-dom'

import ReactPaginate from 'react-paginate'
import { ChevronDown, Download } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card } from 'reactstrap'
import { useIntl, FormattedMessage } from 'react-intl'
import ComponentSpinner from '../../../@core/components/spinner/Fallback-spinner'
import * as moment from "moment"
import "moment/locale/ar"
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'


// helper function
import { isAuthorized} from '../../../utility/Utils'

const InquiryProcedureList = ({Id, searchData}) => {
    // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.FrontDocumentIssues)
  const layoutStore = useSelector(state => state.layout)


  // ** States
  
  const [pageNumber, setPageNumber] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

    // useIntl
    const intl = useIntl()
  
  // ** Get data on mount

  useEffect(() => {
    dispatch(
        getDocumentLibrariesFront({
        documentIssueId: Id,
        pageNumber,
        pageSize: rowsPerPage,
        ...searchData
      })
    )
  }, [dispatch, store?.tableData?.length, searchData])

  console.log("store?.tableData", store?.tableData)

//   {
//     "documentIssueId": 0,
//     "title": "string",
//     "fromDate": "2022-05-10T08:47:37.882Z",
//     "toDate": "2022-05-10T08:47:37.882Z",
//     "pageNumber": 0,
//     "pageSize": 0
//   }

  // ** Function in get data on page change
  const handlePagination = page => {
    setPageNumber(page.selected + 1)
  }

  useEffect(() => {
    dispatch(getDocumentLibrariesFront({
    documentIssueId: Id,
      ...searchData,
      pageNumber,
      pageSize: rowsPerPage
    }))
  }, [pageNumber, searchData])

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
    if (store?.tableData?.length > 0 && !store.error) {
      return store.tableData
    } 
  }

  const columns =  [
    // {
    //   name: <FormattedMessage id="Id" />,
    //   selector: 'id',
    //   sortable: true,
    //   minWidth: '50px'
    // },
    {
        name: <FormattedMessage id="date of registration" />,
        selector: (row, idx) => { return (<> {row.publishDate ? moment(row.publishDate).locale("ar").format("LL") : ""} </>) },
        sortable: true,
        minWidth: '150px'
    },
    {
      name: <FormattedMessage id="Name" />,
      selector: 'title',
      sortable: true,
      minWidth: '150px'
    },
    {
        name: <FormattedMessage id="attachment" />,
        selector: 'attachment',
        sortable: true,
        minWidth: '150px'
    },
    {
        selector: () => <Download style={{ cursor: "pointer"}} className="text-success"/>,
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
                        responsive
                        paginationServer
                        columns={columns}
                        sortIcon={<ChevronDown />}
                        className='react-dataTable'
                        paginationComponent={CustomPagination}
                        data={dataToRender()}
                    />
                </Card>
              </>
          )}
      </Fragment>
  )

}

export default InquiryProcedureList
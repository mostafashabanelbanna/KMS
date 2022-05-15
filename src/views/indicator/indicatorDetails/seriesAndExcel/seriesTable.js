// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Store & Actions

import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import swal from "sweetalert"

import { Link, Redirect} from 'react-router-dom'

import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import { ChevronDown, ArrowLeftCircle, Plus, Download } from 'react-feather'
import DataTable from 'react-data-table-component'
import { selectThemeColors } from '@utils'
import { Card,  Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { useIntl, FormattedMessage } from 'react-intl'
import * as moment from "moment"
import "moment/locale/ar"
import ComponentSpinner from '../../../../@core/components/spinner/Fallback-spinner'
import { ArrowsIcon, SignalIcon, StatsIcon } from "../../indicatorList/icons"

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
// helper function
import {isAuthorized, isNotLightSkin, convertSelectArr, confirmDelete} from '../../../../utility/Utils'
import { getSeriesData, ExportSeriesData } from '../store/action'


const SeriesTable = ({toggleTable}) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.indicatorDetails)
  const layoutStore = useSelector(state => state.layout)

  // ** States
  const [pageNumber, setPageNumber] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // useIntl
  const intl = useIntl()

  // ** Function in get data on page change
  const handlePagination = page => {
    setPageNumber(page.selected + 1)
  }

  useEffect(() => {
    dispatch(getSeriesData(pageNumber, rowsPerPage))
  }, [pageNumber])
  const DownloadSeries = () => {
      dispatch(ExportSeriesData())
  }
  // ** Custom Pagination
  const CustomPagination = () => {
    const count = store.seriesDataTotalPages
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
    if (store.seriesData.length > 0) {
      return store.seriesData
    } 
  }
  
 const columns =  [
    {
        name: "التاريخ",
        selector: (row, idx) => { return (<> { row.insertionDate ? moment(row.insertionDate).locale("ar").format("L") : ""} </>) },
        sortable: true,
        maxWidth: '150px'
    },
    {
        name: "القيمة",
        selector: "value",
        sortable: true,
        maxWidth: '110px'
    },
    {
      name: "الوحدة",
      selector: "unitMeasure",
      sortable: true,
      maxWidth: '150px'
    },
    {
        name: "التوزيعات",
        selector: (row, idx) => {
            return (<>
                <div className='d-flex '>
                    {row.dimensionValueNames.map((item, index) => (
                        <div key={index} className="d-flex align-items-center">
                            <ArrowsIcon className='mx-1'/>
                            <span className='mr-2'>{item.dimensionName}</span>
                            <span style={{
                                        backgroundColor: "lightGray",
                                        padding: "0.5rem",
                                        borderRadius: 16,
                                        minWidth: '60px'
                                    }} className='mr-2 text-center'>{item.dimensionValueName}</span>
                        </div>
                    ))}
                  
                </div>
            </>)
        },
        sortable: true,
        minWidth: '400px'
    }
  ]

  return (
    <Fragment>
      {(
        <>
          <Card className='p-2'>
              <div className='d-flex align-items-center justify-content-around'>
                  <div>
                    <span className='mx-1'>من </span> <spna className='mr-2'>{moment(store.seriesDateFrom).locale("ar").format("L")}</spna>
                    <span className='mx-1'>إلى </span> <spna>{moment(store.seriesDateTo).locale("ar").format("L")}</spna>
                  </div>
                  <div className='ml-2 d-flex align-items-center'>
                      <ArrowsIcon className='mx-1'/>
                      {store.seriesDimensions.map((item, idx) => (
                          <div key={idx}>
                            <span className='mx-1' >{item.name}</span>
                            {store.seriesDimensions.length !== idx + 1 && <span style={{borderLeft: '1px solid'}}></span>}
                          </div>
                          
                      ))}
                  </div>
                  <div className='mr-3 ml-2'>
                    <Button.Ripple color='primary' size="sm" style={{height: '40px'}} onClick={() => toggleTable(1)}>
                       الأبعاد المتاحة   <Plus className="mx-1" /> 
                    </Button.Ripple>
                  </div>
                  <div className='ml-5'>
                      <Download style={{cursor: "pointer"}} className='text-success' onClick={DownloadSeries}/>
                  </div>
              </div>
          </Card>
          {layoutStore.loading && <ComponentSpinner/>}
          {!layoutStore.loading && store.seriesData.length > 0 && <Card>
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
              subHeaderWrap={false}
              
            />
          </Card> }
          {store.seriesData.length === 0 && !layoutStore.loading &&
            <Card className='p-2 text-center'>
                <h2>لا يوجد بيانات فى هذه الفترة</h2>
            </Card>
        }

        </>
      )}
    </Fragment>
  )
}

export default SeriesTable

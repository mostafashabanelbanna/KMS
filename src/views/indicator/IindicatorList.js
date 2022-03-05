import DataTable from 'react-data-table-component'
import { useIntl, FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Card,  Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { ChevronDown, MoreVertical,  Trash2, Archive } from 'react-feather'
import ReactPaginate from 'react-paginate'
import * as moment from "moment"

import { BiShow} from   "react-icons/bi"


import "moment/locale/ar"
import { Link } from 'react-router-dom'

const IndicatorList = ({indicators, pageNumber, handlePagination, count}) => {

  // ** Custom Pagination
  const CustomPagination = () => {
    // const count = store.totalPages

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

      
 const parentColumns =  [
    {
      name: <FormattedMessage id="Code" />,
      selector: 'id',
      sortable: true,
      minWidth: '225px'
    },
    {
      name: <FormattedMessage id="Name" />,
      selector: 'name',
      sortable: true,
      minWidth: '250px'
    }
  ]
  
  const childrenColumns =  [
    {
      name: <FormattedMessage id="Periodicity" />,
      selector: 'periodicityName',
      sortable: true,
      minWidth: '225px'
    },
    {
      name: <FormattedMessage id="Source" />,
      selector: 'sourceName',
      sortable: true,
      minWidth: '250px'
    },
    {
      name: <FormattedMessage id="Time Line" />,
      selector: (row, index) => {
          return (<>
                     <span> من :  {' '} </span> 
                     <span style={{color: '#7367f0'}}>
                        {moment(row.from)
                            .locale("ar")
                            .format("LL")
                        }
                    </span> 
                    <br />
                    <span> إلى : {' '} </span> 
                    <span style={{color: '#7367f0'}}>
                        {moment(row.from)
                            .locale("ar")
                            .format("LL")
                        }
                    </span> 
                </>)
      },
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
              tag={Link}
              className='w-100'
              to="/indicator/indicatorDetails"
              // onClick={() => updateUser(row.id)}
            >
              <BiShow size={14} className='mr-50' />
              <span className='align-middle'><FormattedMessage id="Show" /></span>
            </DropdownItem>
            {/* <DropdownItem className='w-100' onClick={() => dispatch(deleteUser(row.id))}>
              <Trash2 size={14} className='mr-50' />
              <span className='align-middle'><FormattedMessage id="Delete" /></span>
            </DropdownItem> */}
          </DropdownMenu>
        </UncontrolledDropdown>
      )
    }
  ]
  const parentCustomStyles = 
  { headRow: {
        style: {
            borderTopWidth: 'none',
            borderBottomWidth: 'none'
            }
        },
        cells: {
            borderBottomWidth: '0'

        },
     
        expanderRow: {
            style: {
                backgroundColor: 'rgba(0,0,0,.12)'
            }
        }
    }
  const customStyles = {
        headRow: {
            style: {
                backgroundColor: '#e2f2fb'
            }
        },
        rows: {
        highlightOnHoverStyle: {
                backgroundColor: 'rgb(230 244 244 / 50%)',
                borderRadius: '8px'
            }
        }
    }

  const ExpandedComponent = ({ data }) => (
    data.indicatorSourcesAndPeriodicities.length > 0 ? (
        <Card className='m-2' style={{boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'}}>
            <DataTable
                    border
                    noHeader
                    responsive
                    columns={childrenColumns}
                    sortIcon={<ChevronDown />}
                    className='react-dataTable'
                    data={data.indicatorSourcesAndPeriodicities}
                    subHeaderWrap={false}
                    customStyles={customStyles}
                    highlightOnHover
                    pointerOnHover
                    borderedCells
                /> 
    </Card>
    ) : null
   
  )
    return (
        <>
            <Card>
            <DataTable
                expandableRows 
                expandableRowExpanded={row => {
                    row.defaultExpanded = true
                    return row.defaultExpanded 
                }}
                expandableRowsComponent={<ExpandedComponent/>}
                customStyles={parentCustomStyles}
                noHeader
                pagination
                subHeader
                responsive
                paginationServer
                columns={parentColumns}
                sortIcon={<ChevronDown />}
                className='react-dataTable'
                paginationComponent={CustomPagination}
                data={indicators}
                subHeaderWrap={false}
               
            />
            </Card>
      </>
    )
}

export default IndicatorList
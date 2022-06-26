// ** React Imports
import { Fragment, useState, useEffect } from 'react'


// ** Store & Actions
import {  getData } from './store/action'
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
import Toastr from '../../containers/toastr/Toastr'
import * as moment from "moment"
import "moment/locale/ar"
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import ExpandedRowDetails from '../../containers/expanded-row-details/expandedRowDetails'
import ComponentSpinner from '../../@core/components/spinner/Fallback-spinner'

// helper function
import {isAuthorized, isNotLightSkin, convertSelectArr, confirmDelete} from '../../utility/Utils'
import CardBody from 'reactstrap/lib/CardBody'


const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.userNotifications)
  const layoutStore = useSelector(state => state.layout)

  // ** States
  const [pageNumber, setPageNumber] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

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

  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getData({
        pageNumber,
        rowsPerPage
      })
    )
  }, [dispatch, store.data.length])

  // ** Function in get data on page change
  const handlePagination = page => {
    setPageNumber(page.selected + 1)
  }

  useEffect(() => {
    dispatch(getData({
      pageNumber,
      rowsPerPage
    }))
  }, [pageNumber])


  // ** Table data to render
  const dataToRender = () => {
    if (store.data.length > 0 && !store.error) {
      return store.data
    } 
  }

  return (
    <Fragment>
      { isAuthorized(store.errorCode) ? <Redirect to='/misc/not-authorized' /> : (
        <>
            <div className='row'>
                <div className='col-md-12'>
                        {layoutStore.loading === true && <ComponentSpinner/>}
                        {layoutStore.loading === false && store.data && store.data.length > 0 && store.data.map((item, indx) => (
                            <Card className='mb-2' key={indx}>
                                <CardBody>
                                    <div className='d-flex align-items-start mb-2'>
                                        <div className='profile-user-info w-100'>
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <h5 className='mb-0'>{item.title}</h5>
                                                <span className='mt-0 mb-0'>{moment(item.creationDate)
                                                .locale("ar")
                                                .format("LL")}</span>
                                            </div>
                                            <small>{item.message}</small>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                            
                        ))}
                </div>
            </div>
            
          <div className='row'>
                <div className='col-md-12 text-left'>
                    <ReactPaginate
                        previousLabel={''}
                        nextLabel={''}
                        pageCount={store.totalPages || 1}
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
                </div>
            </div>
        </>
      )}
    </Fragment>
  )
}

export default UsersList

import { useIntl } from "react-intl"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { clearIndicatorID, getDashboardData, setIndicatorID } from '../store/action/index'
import ComponentSpinner from '../../../../@core/components/spinner/Fallback-spinner'
import ReactPaginate from 'react-paginate'
import DashboardCard from '../../../dashboard/dashboardListCard'
import { Card } from 'reactstrap'

const DashboardList = ({id}) => {
  // redux states
  const dispatch = useDispatch()
  const store = useSelector(state => state.indicatorDetails)
  const layoutStore = useSelector(state => state.layout)

  const [pageNumber, setPageNumber] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const intl = useIntl()


  const getIndicators = (pNumber, rPerPage) => {

    const submitedData = {
      pageNumber: pNumber,
      pageSize: rPerPage,
      name: "",
      indicatorIds: [id]
    }
    dispatch(getDashboardData(submitedData))
  }

  useEffect(() => {
    getIndicators(1, rowsPerPage)
  }, [id])

  const handlePagination = page => {
    setPageNumber(page.selected + 1)
  }

  useEffect(() => {
    getIndicators(pageNumber, rowsPerPage)
  }, [pageNumber, id])

  console.log(store)

  if (store?.dashboards?.length) {
        return (
            <>
            <div className="d-flex">
                <div className="d-flex flex-column col-12">
                <div className="d-flex flex-lg-row flex-column-reverse">
                    <div className="col-12 px-0">
                    {layoutStore.loading === true && <ComponentSpinner />}
                    {layoutStore.loading === false && store?.dashboards?.map((item, idx) => (
                        <DashboardCard key={idx} item={item} />
                    ))}

                    </div>
                </div>

                <div className="d-flex mb-2">
                    <div className={`d-flex justify-content-end col-12`}>
                    {store?.dashboards?.length > 0 &&
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
                    }
                    </div>
                </div>
                </div>
            </div>
            </>
        )
    } else {
        return (
            <Card className='p-2 text-center col-9'>
                <h2>لا يوجد لوحات معلوماتية</h2>
            </Card>
        )
    }
}
export default DashboardList

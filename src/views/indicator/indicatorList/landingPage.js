import { useIntl } from "react-intl"
import { useEffect, useState } from "react"
import Breadcrumbs from "@components/breadcrumbs"
import IndicatorCard from "./indicatorListCard"
import SearchParamsCard from "./searchParamsCard"
import SearchSection from "./searchSeaction"
import { faSliders } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from 'react-redux'
import { getData } from './../store/action/index'
import ComponentSpinner from '../../../@core/components/spinner/Fallback-spinner'
import ReactPaginate from 'react-paginate'
import { useParams } from "react-router-dom"


const LandingPage = () => {
  // redux states
  const dispatch = useDispatch()
  const store = useSelector(state => state.frontIndicators)
  const layoutStore = useSelector(state => state.layout)

  const { Id } = useParams()

  const [showSearchParams, setShowSearchParams] = useState(false)
  const [showSearchSection, setShowSearchSection] = useState(true)
  // const [pageNumber, setPageNumber] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const intl = useIntl()

  const getIndicators = (pNumber, rPerPage) => {
    const periods = []
    const srcs = []
    const _classificationValues = []

    store.periodicities.forEach(element => {
      periods.push(element.id)
    })

    store.sources.forEach(element => {
      srcs.push(element.id)
    })

    store.sectors.forEach(element => {
      _classificationValues.push(element.id)
    })

    store.categories.forEach(element => {
      _classificationValues.push(element.id)
    })

    const submitedData = {
      pageNumber: pNumber,
      rowsPerPage: rPerPage,
      name: store.name,
      periodicities: Id && window.location.href.includes('periodicities') ? [parseInt(Id), ...periods] : periods,
      sources: srcs,
      classificationValues: Id && (window.location.href.includes('sectors') || window.location.href.includes('categories')) ? [parseInt(Id), ..._classificationValues] : _classificationValues,
      startDate: store.dateFrom,
      endDate: store.dateTo
    }

    console.log("submitedData", submitedData)
    dispatch(getData(submitedData))
  }

  const handleSearchSubmit = () => {
    // setPageNumber(1)
    // dispatch('SET_INDICATOR_PAGE_NUMBER', {pageNumber:1})

    dispatch({type:'SET_INDICATOR_PAGE_NUMBER', pageNumber:  1})
    getIndicators(1, rowsPerPage)
  }

  useEffect(() => {
    getIndicators(1, rowsPerPage)
    return () => {
      if (Id) {
        dispatch({type: "SET_FRONT_INDICATOR_PERIODICITY", periodicities: []})
        dispatch({type: "SET_FRONT_INDICATOR_SOURCE", sources: []})
        dispatch({type: "SET_FRONT_INDICATOR_SECTOR", sectors: []})
        dispatch({type: "SET_FRONT_INDICATOR_CATEGORY", categories: []})
        dispatch({type: "SET_FRONT_INDICATOR_NAME", name: ''})
      } 
    }
  }, [])

  const handlePagination = page => {
    dispatch({type:'SET_INDICATOR_PAGE_NUMBER', pageNumber: page.selected + 1})

    // setPageNumber(page.selected + 1)
  }

  useEffect(() => {
    getIndicators(store.pageNumber, rowsPerPage)
  }, [store.pageNumber])

  return (
    <>
      <Breadcrumbs
        breadCrumbTitle={intl.formatMessage({ id: "Indicators And Datasets" })}
        breadCrumbActive={intl.formatMessage({ id: "Indicators And Datasets" })}
        breadCrumbParent={intl.formatMessage({ id: "Researchers Services" })}
        breadCrumbRoot={intl.formatMessage({ id: "Homepage" })}
      />
      <div className="d-flex">
        <div className="d-flex flex-column col-lg-8 col-12">
          <div className="d-flex mb-2 align-items-center">
            {!showSearchParams ? (
              <>
                <div className="d-flex flex-column col-6">
                  <p className="mb-0">?????????? ?????????? :  {store.totalCount}  ??????????</p>
                  <p
                    className="mb-0 text_green"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setShowSearchParams(!showSearchParams)
                    }}
                  >
                    ?????? ?????????? ??????????
                  </p>
                </div>
                <div className="d-flex justify-content-end col-6">
                  {/* {store.data.length > 0 &&
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
                  } */}

                  <div className="d-flex d-lg-none">
                    <FontAwesomeIcon icon={faSliders} color={"#496193"} style={{ cursor: "pointer" }} fontSize={17} onClick={() => {
                      setShowSearchSection(!showSearchSection)
                    }} />
                  </div>
                </div>
              </>
            ) : (
              <SearchParamsCard
                setShowSearchParams={setShowSearchParams}
                showSearchParams={showSearchParams}
              />
            )}
          </div>

          {showSearchSection === true ? <div className="d-flex flex-lg-row flex-column-reverse">
            <div className="col-12 px-0">
              {layoutStore.loading === true && <ComponentSpinner />}
              {layoutStore.loading === false && store.data.map((item, idx) => {
                console.log(item)
                return <IndicatorCard key={idx} item={item} />
              })}

            </div>
          </div> : <div className="d-block d-lg-none col-12">
            <SearchSection searchId={Id} handleSearch={handleSearchSubmit} />
          </div>}

          <div className="d-flex mb-2">
            {showSearchParams && (
              <div className="d-flex justify-content-start col-6">
                <p className="mb-0">?????????? ?????????? :  {store.totalCount}  ??????????</p>
              </div>
            )}
            <div className={`d-flex justify-content-end ${showSearchParams ? "col-6" : "col-12"}`}>
              {store.data.length > 0 &&
                <ReactPaginate
                  previousLabel={''}
                  nextLabel={''}
                  pageCount={store.totalPages || 1}
                  activeClassName='active'
                  forcePage={store.pageNumber !== 0 ? store.pageNumber - 1 : 0}
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

        <div className="d-none d-lg-block col-lg-4 col-12">
          <SearchSection searchId={Id} handleSearch={handleSearchSubmit} />
        </div>
      </div>
    </>
  )
}
export default LandingPage

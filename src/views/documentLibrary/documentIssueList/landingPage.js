import { useIntl } from "react-intl"
import { useEffect, useState } from "react"
import Breadcrumbs from "@components/breadcrumbs"
import DocumentIssueCard from "./documentIssueListCard"
import SearchParamsCard from "./searchParamsCard"
import SearchSection from "./searchSeaction"
import { faSliders } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from 'react-redux'
import { getData } from './../store/action/index'
import ComponentSpinner from '../../../@core/components/spinner/Fallback-spinner'
import ReactPaginate from 'react-paginate'


const LandingPage = () => {
   // redux states
   const dispatch = useDispatch()
   const store = useSelector(state => state.FrontDocumentIssues)
   const layoutStore = useSelector(state => state.layout)

  const [showSearchParams, setShowSearchParams] = useState(false)
  const [showSearchSection, setShowSearchSection] = useState(true)
  const [pageNumber, setPageNumber] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const intl = useIntl()

  const getDocumentIssues = (pNumber, rPerPage) => {
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
      pageSize: rPerPage,
      name: store.name,
      periodicities: periods,
      sources: srcs,
      classificationValues: _classificationValues
    }
    dispatch(getData(submitedData))
  }

  const handleSearchSubmit = () => {
    setPageNumber(1)
    getDocumentIssues(1, rowsPerPage) 
  }

  useEffect(() => {
    getDocumentIssues(1, rowsPerPage)
  }, [])

  const handlePagination = page => {
    setPageNumber(page.selected + 1)
  }

  useEffect(() => {
    getDocumentIssues(pageNumber, rowsPerPage)
  }, [pageNumber])

  return (
    <>
      <Breadcrumbs
        breadCrumbTitle={intl.formatMessage({ id: "Document Library" })}
        breadCrumbActive={intl.formatMessage({ id: "Document Library" })}
        breadCrumbParent="خدمات الباحثين"
        breadCrumbRoot={intl.formatMessage({ id: "Homepage" })}
      />
      <div className="d-flex">
        <div className="d-flex flex-column col-lg-8 col-xl-9 col-12">
          <div className="d-flex mb-2 align-items-center">
            {!showSearchParams ? (
              <>
                <div className="d-flex flex-column col-6">
                  <p className="mb-0">نتائج البحث :  {store.totalCount}  نتيجة</p>
                  <p
                    className="mb-0 text_green"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setShowSearchParams(!showSearchParams)
                    }}
                  >
                    عرض عناصر البحث
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
              {layoutStore.loading === true && <ComponentSpinner/>}
              {layoutStore.loading === false && store.data.map((item, idx) => (
                 <DocumentIssueCard key={idx} item={item}/>
              ))}
             
            </div>
          </div> : <div className="d-block d-lg-none col-lg-5 col-12">
          <SearchSection showSearchSection={showSearchSection} setShowSearchSection={setShowSearchSection} handleSearch={handleSearchSubmit}/>
        </div>}
        <div className="d-flex mb-2">
              {showSearchParams && (
              <div className="d-flex justify-content-start col-6">
                <p className="mb-0">نتائج البحث :  {store.totalCount}  نتيجة</p>
              </div>
              )}
              <div className={`d-flex justify-content-end ${showSearchParams ? "col-6" : "col-12"}`}>
                {store.data.length > 0 &&
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

        <div className="d-none d-lg-block col-lg-4 col-xl-3 col-12">
          <SearchSection handleSearch={handleSearchSubmit}/>
        </div>
      </div>
    </>
  )
}
export default LandingPage

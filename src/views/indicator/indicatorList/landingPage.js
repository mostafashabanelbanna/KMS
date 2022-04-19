import { useIntl } from "react-intl"
import { useState } from "react"
import Breadcrumbs from "@components/breadcrumbs"
import IndicatorCard from "./indicatorListCard"
import SearchParamsCard from "./searchParamsCard"
import SearchSection from "./searchSeaction"
import { faSliders } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const LandingPage = () => {
  const [showSearchParams, setShowSearchParams] = useState(false)
  const [showSearchSection, setShowSearchSection] = useState(false)
  const intl = useIntl()
  return (
    <>
      <Breadcrumbs
        breadCrumbTitle={intl.formatMessage({ id: "Indicators And Datasets" })}
        breadCrumbActive={intl.formatMessage({ id: "Indicators And Datasets" })}
        breadCrumbParent={intl.formatMessage({ id: "Researchers Services" })}
        breadCrumbRoot={intl.formatMessage({ id: "Homepage" })}
      />
      <div className="d-flex">
        <div className="d-flex flex-column col-lg-7 col-12">
          <div className="d-flex mb-2 align-items-center">
            {!showSearchParams ? (
              <>
                <div className="d-flex flex-column col-6">
                  <p className="mb-0">نتائج البحث : 2015 نتيجة</p>
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
                  {/* <ReactPaginate
              pageCount={10}
              nextLabel={''}
              breakLabel={'...'}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              activeClassName={'active'}
              pageClassName={'page-item'}
              previousLabel={''}
              breakClassName='page-item'
              breakLinkClassName='page-link'
              nextLinkClassName={'page-link'}
              nextClassName={'page-item next-item'}
              previousClassName={'page-item prev-item'}
              previousLinkClassName={'page-link'}
              pageLinkClassName={'page-link'}
              containerClassName={'pagination react-paginate no-navigation'}
              /> */}
              <div className="d-flex d-lg-none">
              <FontAwesomeIcon icon={faSliders} color={"#496193"} style={{cursor: "pointer"}} fontSize={17} onClick={() => {
                setShowSearchSection(!showSearchSection)
              }}/>
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

          {showSearchSection === false ? <div className="d-flex flex-lg-row flex-column-reverse">
            <div className="col-12 px-0">
              {/* map here on this card ==> */}
              <IndicatorCard />
            </div>
          </div> : <div className="d-block d-lg-none col-lg-5 col-12">
          <SearchSection showSearchSection={showSearchSection} setShowSearchSection={setShowSearchSection}/>
        </div>}
          {showSearchParams && (
            <div className="d-flex mb-2">
              <div className="d-flex justify-content-start col-6">
                <p className="mb-0">نتائج البحث : 2015 نتيجة</p>
              </div>
              <div className="d-flex justify-content-end col-6">
                {/* <ReactPaginate
              pageCount={10}
              nextLabel={''}
              breakLabel={'...'}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              activeClassName={'active'}
              pageClassName={'page-item'}
              previousLabel={''}
              breakClassName='page-item'
              breakLinkClassName='page-link'
              nextLinkClassName={'page-link'}
              nextClassName={'page-item next-item'}
              previousClassName={'page-item prev-item'}
              previousLinkClassName={'page-link'}
              pageLinkClassName={'page-link'}
              containerClassName={'pagination react-paginate no-navigation'}
              /> */}
              </div>
            </div>
          )}
        </div>

        <div className="d-none d-lg-block col-lg-5 col-12">
          <SearchSection />
        </div>
      </div>
    </>
  )
}
export default LandingPage

import { useIntl } from "react-intl"
import { useState, useEffect, useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AlignJustify, Rss, Info, Image, Users, Edit } from "react-feather"
import { RiDatabase2Fill } from "react-icons/ri"
import { Link } from "react-router-dom"
import IndicatorHeader from "./header"
import axios from "../../axios"
import { tabEnum } from "./tabEnum"
import IndicatorList from "./IindicatorList"
import Badge from "reactstrap/lib/Badge"
import Breadcrumbs from "@components/breadcrumbs"
import IndicatorCard from "./indicatorListCard"
import SearchParamsCard from "./searchParamsCard"
import SearchSection from "./searchSeaction"

const LandingPage = () => {
  const [showSearchParams, setShowSearchParams] = useState(false)
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
        <div className="d-flex flex-column col-lg-7 col-12 ">
          <div className="d-flex mb-2">
            {!showSearchParams ? (
              <>
                <div className="d-flex flex-column col-6">
                  <p className="mb-0">نتائج البحث : 2015 نتيجة</p>
                  <p
                    className="mb-0"
                    style={{ color: "#47cdbf", cursor: "pointer" }}
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
                </div>
              </>
            ) : (
              <SearchParamsCard
                setShowSearchParams={setShowSearchParams}
                showSearchParams={showSearchParams}
              />
            )}
          </div>
          <div className="d-flex flex-lg-row flex-column-reverse">
            <div className="col-12 px-0">
              {/* map here on this card ==> */}
              <IndicatorCard />
            </div>
          </div>
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

        <div className="col-lg-5 col-12">
          <SearchSection />
        </div>
      </div>
    </>
  )
}
export default LandingPage

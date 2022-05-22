import { useContext, useState } from 'react'
// ** Third Party Components
import { useIntl } from 'react-intl'

// ** User List Component
import Breadcrumbs from '@components/breadcrumbs'
import Table from './Table'


// ** Styles
import '@styles/react/apps/app-users.scss'
import { useSelector, useDispatch } from 'react-redux'
import SearchSection from './searchSeaction'
import { faSliders } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {getInquiriesFront, getParams}  from '../manageInquiry/Inquiry/store/action/index'

const InquiryList = () => {
  const [showSearchSection, setShowSearchSection] = useState(true)
  const dispatch = useDispatch()
  const store = useSelector(state => state.inquiries)
  const intl = useIntl()
  const handleSearchSubmit = () => {
    dispatch(
      getInquiriesFront(getParams({
        ...store.frontParams
      }))
    )
  }
  return (
    <div className='app-user-list'>
      <Breadcrumbs breadCrumbTitle="طلبات البيانات" breadCrumbParent="خدمات الباحثين" breadCrumbActive="طلبات البيانات" breadCrumbRoot={intl.formatMessage({ id: "Homepage" })} />
      <div className="d-flex col-12 justify-content-end mt-2 d-lg-none">
        <FontAwesomeIcon icon={faSliders} color={"#496193"} style={{ cursor: "pointer" }} fontSize={17} onClick={() => {
          setShowSearchSection(!showSearchSection)
        }} />
      </div>
      <div className='d-flex w-100'>
        {showSearchSection === true ? <div className='d-flex flex-column col-lg-8 col-12'>
          <Table />
        </div> : <div className="d-block d-lg-none col-12">
          <SearchSection  handleSearch={handleSearchSubmit}/>
          {/* handleSearch={handleSearchSubmit} /> */}
        </div>}
        <div className="d-none d-lg-block col-lg-4 col-12">
          <SearchSection handleSearch={handleSearchSubmit} />
          {/* handleSearch={handleSearchSubmit} /> */}
        </div>
      </div>
    </div>
  )
}

export default InquiryList

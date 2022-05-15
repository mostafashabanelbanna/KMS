import { useContext, useState } from 'react'
// ** Third Party Components
import { useIntl } from 'react-intl'

// ** User List Component
import Breadcrumbs from '@components/breadcrumbs'
import Table from './Table'


// ** Styles
import '@styles/react/apps/app-users.scss'
import { useSelector } from 'react-redux'
import SearchSection from './searchSeaction'
import { faSliders } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const InquiryList = () => {
  const [showSearchSection, setShowSearchSection] = useState(true)

  const intl = useIntl()

  return (
    <div className='app-user-list'>
      <Breadcrumbs breadCrumbTitle="طلبات البيانات" breadCrumbParent="خدمات الباحثين" breadCrumbActive="طلبات البيانات" breadCrumbRoot={intl.formatMessage({ id: "Homepage" })} />
      <div className="d-flex col-12 justify-content-end mt-2 d-lg-none">
        <FontAwesomeIcon icon={faSliders} color={"#496193"} style={{ cursor: "pointer" }} fontSize={17} onClick={() => {
          setShowSearchSection(!showSearchSection)
        }} />
      </div>
      <div className='d-flex w-100'>
        {showSearchSection === true ? <div className='d-flex flex-column col-lg-8 col-xl-9 col-12'>
          <Table />
        </div> : <div className="d-block d-lg-none col-12">
          <SearchSection />
          {/* handleSearch={handleSearchSubmit} /> */}
        </div>}
        <div className="d-none d-lg-block col-lg-4 col-xl-3 col-12">
          <SearchSection />
          {/* handleSearch={handleSearchSubmit} /> */}
        </div>
      </div>
    </div>
  )
}

export default InquiryList

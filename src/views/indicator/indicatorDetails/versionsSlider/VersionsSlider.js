import { Swiper, SwiperSlide } from 'swiper/react'
import { Card, CardHeader, CardTitle, CardBody, Col, Row } from 'reactstrap'
import { Play, DollarSign, HelpCircle, FileText, Archive } from 'react-feather'
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap/lib'
import { useState } from "react"
import Tabs from '../seriesAndExcel/Tabs'
import { useDispatch, useSelector } from 'react-redux'
import {getSeriesData} from '../store/action/index'
import * as moment from "moment"
import "moment/locale/ar"
import Search from '../seriesAndExcel/Search'

const SwiperCenterSlidesStyle = ({ isRtl, avilableCopies, id }) => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.indicatorDetails)

  console.log("from versions", id)

  const toggle = (periodicityId, sourceId) => {
    dispatch({type: "SET_INDICATOR_DETAILS_PERIODICITY", periodicity: periodicityId })
    dispatch({type: "SET_INDICATOR_DETAILS_SOURCE", source: sourceId })
    dispatch(getSeriesData(1, 10))
  }
  const params = {
    className: 'swiper-centered-slides px-1 mb-4 d-flex justify-content-end m-0',
    slidesPerView: 'auto',
    // spaceBetween: 30,
    centeredSlides: false,
    navigation: true,
    slideToClickedSlide: true
  }

  const [showSearch, setShowSearch] = useState(true) 

  const handleSearchToggle = (val) => {
    setShowSearch(val)
  }

  return (
    <Card className='bg-transparent shadow-none available'>
      <CardHeader>
        <CardTitle tag='h4'>النسخ المتوفرة</CardTitle>
      </CardHeader>
      <CardBody className="px-0">
      <>
        <Nav tabs className="indicator_version_tabs">
          {avilableCopies && avilableCopies.length > 0 && 
            // <Swiper dir={isRtl ? 'rtl' : 'ltr'} {...params}>
            <>
                {avilableCopies.map((item, idx) => (
                  // <SwiperSlide key={idx} className='rounded swiper-shadow mx-3'>
                      <NavItem className="mb-2 mr-1" style={{minWidth: "300px"}}>
                        <NavLink
                          active={item.sourceId === store.selectedSource && item.periodicityId === store.selectedPeriodicity}
                          onClick={() => {
                            toggle(item.periodicityId, item.sourceId)
                          }}
                          className="flex-column py-1" //align-items-start"
                        >
                          {/* <Play size={28} /> */}
                          <h4>{item.periodicityName} - {item.sourceName}</h4>
                          <p className='mb-0'>{`${moment(item.from).locale("ar").format("L")} - ${moment(item.to).locale("ar").format("L")}`}</p>
                        </NavLink>
                      </NavItem>
                  // </SwiperSlide>
                ))}
                </>
            // </Swiper>
          }
          
        </Nav>
        <Row>
          <Col md={9}>
            <Tabs id={id} toggleSearchHandler={handleSearchToggle}/>
          </Col>
          {showSearch && 
             <Col md={3} className="mt-5 ">
                <Search indicatorId={id}/>
             </Col>
          }
         
        </Row>
       
        {/* <TabContent className='py-50' activeTab='1'>
          <TabPane tabId='1'>
          
          </TabPane>
          <TabPane tabId='2'>
            إنشاء توزيع احصائي
          </TabPane>
        </TabContent> */}
      </>
      
      </CardBody>
    </Card>
  )
}

export default SwiperCenterSlidesStyle

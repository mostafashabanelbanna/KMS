import { Swiper, SwiperSlide } from 'swiper/react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { Play, DollarSign, HelpCircle, FileText, Archive } from 'react-feather'
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap/lib'
import { useState } from "react"
import Tabs from '../seriesAndExcel/Tabs'
import { useDispatch, useSelector } from 'react-redux'
import {getSeriesData} from '../store/action/index'

const SwiperCenterSlidesStyle = ({ isRtl, avilableCopies }) => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.indicatorDetails)


  const toggle = (periodicityId, sourceId) => {
    dispatch({type: "SET_INDICATOR_DETAILS_PERIODICITY", periodicity: periodicityId })
    dispatch({type: "SET_INDICATOR_DETAILS_SOURCE", source: sourceId })
    dispatch(getSeriesData(1, 10))
  }
  const params = {
    className: 'swiper-centered-slides p-1',
    slidesPerView: 'auto',
    spaceBetween: 30,
    centeredSlides: false,
    navigation: true,
    slideToClickedSlide: true
  }

  return (
    <Card className='bg-transparent shadow-none available'>
      <CardHeader>
        <CardTitle tag='h4'>النسخ المتوفرة</CardTitle>
      </CardHeader>
      <CardBody>
      <>
        <Nav tabs className="indicator_version_tabs">
          {avilableCopies && avilableCopies.length > 0 && 
            <Swiper dir={isRtl ? 'rtl' : 'ltr'} {...params}>
                {avilableCopies.map((item, idx) => (
                  <SwiperSlide key={idx} className='rounded swiper-shadow'>
                      <NavItem>
                        <NavLink
                          active={item.sourceId === store.selectedSource && item.periodicityId === store.selectedPeriodicity}
                          onClick={() => {
                            toggle(item.periodicityId, item.sourceId)
                          }}
                          className="flex-column align-items-start"
                        >
                          <Play size={28} />
                          <h4>دورية {item.periodicityName}</h4>
                          <p>{item.sourceName}</p>
                        </NavLink>
                      </NavItem>
                  </SwiperSlide>
                ))}
            </Swiper>
          }
          
        </Nav>
        <Tabs/>
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

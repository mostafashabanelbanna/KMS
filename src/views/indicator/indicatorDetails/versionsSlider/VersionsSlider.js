import { Swiper, SwiperSlide } from 'swiper/react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { Play, DollarSign, HelpCircle, FileText, Archive } from 'react-feather'
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap/lib'
import { useState } from "react"
import Tabs from '../seriesAndExcel/Tabs'

const SwiperCenterSlidesStyle = ({ isRtl }) => {
  const [active, setActive] = useState('1')

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
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
          <Swiper dir={isRtl ? 'rtl' : 'ltr'} {...params}>
            <SwiperSlide className='rounded swiper-shadow'>
              <NavItem>
                <NavLink
                  active={active === '1'}
                  onClick={() => {
                    toggle('1')
                  }}
                  className="flex-column align-items-start"
                >
                  <Play size={28} />
                  <h4>دورية سنوية</h4>
                  <p>الجهاز المركزى للتعبئة والإحصاء</p>
                </NavLink>
              </NavItem>
            </SwiperSlide>
            <SwiperSlide className='rounded swiper-shadow'>
              <NavItem>
                <NavLink
                  active={active === '2'}
                  onClick={() => {
                    toggle('2')
                  }}
                  className="flex-column align-items-start"
                >
                  <Play size={28} />
                  <h4>دورية سنوية</h4>
                  <p>الجهاز المركزى للتعبئة والإحصاء</p>
                </NavLink>
              </NavItem>
            </SwiperSlide>
            <SwiperSlide className='rounded swiper-shadow'>
              <NavItem>
                <NavLink
                  active={active === '3'}
                  onClick={() => {
                    toggle('3')
                  }}
                  className="flex-column align-items-start"
                >
                  <Play size={28} />
                  <h4>دورية سنوية</h4>
                  <p>الجهاز المركزى للتعبئة والإحصاء</p>
                </NavLink>
              </NavItem>
            </SwiperSlide>
            <SwiperSlide className='rounded swiper-shadow'>
              <NavItem>
                <NavLink
                  active={active === '4'}
                  onClick={() => {
                    toggle('4')
                  }}
                  className="flex-column align-items-start"
                >
                  <Play size={28} />
                  <h4>دورية سنوية</h4>
                  <p>الجهاز المركزى للتعبئة والإحصاء</p>
                </NavLink>
              </NavItem>
            </SwiperSlide>
          </Swiper>
        </Nav>
        <TabContent className='py-50' activeTab={active}>
          <TabPane tabId='1'>
          <Tabs/>
          </TabPane>
          <TabPane tabId='2'>
          إنشاء توزيع احصائي
          </TabPane>
        </TabContent>
      </>
      
      </CardBody>
    </Card>
  )
}

export default SwiperCenterSlidesStyle

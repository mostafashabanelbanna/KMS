import React, {useEffect, useState} from 'react'
import { useRTL } from '@hooks/useRTL'
import Breadcrumbs from '@components/breadcrumbs'
import { Row, Col } from 'reactstrap'
import { useIntl } from 'react-intl'

import ExtensionsHeader from '@components/extensions-header'
import SwiperCenterSlidesStyle from './versionsSlider/VersionsSlider'
import SwiperCore, {
  Navigation,
  Pagination,
  EffectFade,
  EffectCube,
  EffectCoverflow,
  Autoplay,
  Lazy,
  Virtual
} from 'swiper'

// ** Styles
import '@styles/react/libs/swiper/swiper.scss'
import '@styles/react/apps/app-users.scss'
import Tabs from './seriesAndExcel/Tabs'
import { useDispatch, useSelector } from 'react-redux'
import { getIndicatorDetails } from './store/action'

SwiperCore.use([Navigation, Pagination, EffectFade, EffectCube, EffectCoverflow, Autoplay, Lazy, Virtual])

const indicatorDetails = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.indicatorDetails)

  const [isRtl, setIsRtl] = useRTL()
  const intl = useIntl()

  useEffect(() => {
    getIndicatorDetails(1)
  }, [dispatch])


  return (
    <>
      <Breadcrumbs breadCrumbTitle={intl.formatMessage({id: "Indicartor Details"})} breadCrumbParent={intl.formatMessage({id: "Indicators And Datasets"})} breadCrumbActive={intl.formatMessage({id: "Indicartor Details"})} breadCrumbRoot={intl.formatMessage({id: "Homepage"})} />
      <Row>
        <Col sm='12'>
          <h2 className='px-3'>إجمالى عدد السكان</h2>
        </Col>
      </Row>
      <Row>
        <Col sm='9'>
            <SwiperCenterSlidesStyle  isRtl={isRtl} />
            {/* <Tabs/> */}
        </Col>
      </Row>
    </>
  )
}

export default indicatorDetails
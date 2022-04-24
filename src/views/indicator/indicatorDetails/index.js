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
import ComponentSpinner from '../../../@core/components/spinner/Fallback-spinner'

SwiperCore.use([Navigation, Pagination, EffectFade, EffectCube, EffectCoverflow, Autoplay, Lazy, Virtual])

const indicatorDetails = (props) => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.indicatorDetails)

  const [isRtl, setIsRtl] = useRTL()
  const intl = useIntl()

  useEffect(() => {
    dispatch(getIndicatorDetails(props.location.state.Id))
    dispatch({type: "SET_INDICATOR_DETAILS_SERIES_DIMENSIONS", dimensions: []})
    dispatch({type: "SET_INDICATOR_DETAILS_SERIES_DIMENSION_VALUES", dimensionValues: []})
  }, [dispatch])

  return (
    <>
      <Breadcrumbs breadCrumbTitle={intl.formatMessage({id: "Indicartor Details"})} breadCrumbParent={intl.formatMessage({id: "Indicators And Datasets"})} breadCrumbActive={intl.formatMessage({id: "Indicartor Details"})} breadCrumbRoot={intl.formatMessage({id: "Homepage"})} />
      {!store.indicatorDetails && <ComponentSpinner/>}
      {store.indicatorDetails && 
        <>
          <Row>
            <Col sm='12'>
              <h2 className='px-3'>{store.indicatorDetails.name_A}</h2>
            </Col>
          </Row>
          <Row>
            <Col sm='9'>
                <SwiperCenterSlidesStyle  isRtl={isRtl} avilableCopies={store.indicatorDetails.indicatorAvilableCopies} />
                {/* <Tabs/> */}
            </Col>
          </Row>
        </>
      }
    </>
  )
}

export default indicatorDetails
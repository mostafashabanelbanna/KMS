import React, {useEffect, useState} from 'react'
import { useRTL } from '@hooks/useRTL'
import Breadcrumbs from '@components/breadcrumbs'
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap'
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
import { X, ArrowDown } from 'react-feather'

SwiperCore.use([Navigation, Pagination, EffectFade, EffectCube, EffectCoverflow, Autoplay, Lazy, Virtual])

const indicatorDetails = (props) => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.indicatorDetails)

  const [isRtl, setIsRtl] = useRTL()
  const [descriptionCardIsOpen, setDescriptionCardIsOpen] = useState(true)
  const intl = useIntl()

  useEffect(() => {
    dispatch(getIndicatorDetails(props.location.state.Id))
    dispatch({type: "SET_INDICATOR_DETAILS_SERIES_DIMENSIONS", dimensions: []})
    dispatch({type: "SET_INDICATOR_DETAILS_SERIES_DIMENSION_VALUES", dimensionValues: []})
  }, [dispatch])

  const ToggleDescriptionCard = (val) => {
    if (val === 1) {
      setDescriptionCardIsOpen(true)
    } else {
      setDescriptionCardIsOpen(false)
    }
  }

  return (
    <>
      <Breadcrumbs breadCrumbTitle={intl.formatMessage({id: "Indicartor Details"})} breadCrumbParent={intl.formatMessage({id: "Indicators And Datasets"})} breadCrumbActive={intl.formatMessage({id: "Indicartor Details"})} breadCrumbRoot={intl.formatMessage({id: "Homepage"})} />
      {!store.indicatorDetails && <ComponentSpinner/>}
      {store.indicatorDetails && 
        <>
          <Row>
            <Col sm='9'>
              <h2 className='px-3'>{store.indicatorDetails.name_A}</h2>
            </Col>
            {!descriptionCardIsOpen && <Col sm={3}>
              <div >
                <Card>
                  <CardHeader>
                    <div>
                      بيانات العنصر
                    </div>
                    <div>
                      <ArrowDown onClick={() => ToggleDescriptionCard(1)}/>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </Col> }
          </Row>
          <Row>
            <Col sm={descriptionCardIsOpen ? '9' : '12'}>
                <SwiperCenterSlidesStyle  isRtl={isRtl} avilableCopies={store.indicatorDetails.indicatorAvilableCopies} />
                {/* <Tabs/> */}
            </Col>
            {descriptionCardIsOpen && 
            <Col sm={3}>
              <div>
                <Card>
                  <CardHeader className='d-flex justify-content-between'>
                    <div>
                      بيانات العنصر
                    </div>
                    <div>
                      <X style={{color: 'red'}} onClick={() => ToggleDescriptionCard(0)}/>
                    </div>
                  </CardHeader>
                  <CardBody>
                    {store.indicatorDetails && store.indicatorDetails.description_A && <div>
                      <h5 style={{color: '#5853B2'}}>الوصف</h5>
                      <p>
                        {store.indicatorDetails.description_A}
                      </p>
                    </div>}
                    {store.indicatorDetails && store.indicatorDetails.acquisition_A && <div>
                      <h5 style={{color: '#5853B2'}}>طريقة التجميع</h5>
                      <p>
                        {store.indicatorDetails.acquisition_A}
                      </p>
                    </div>}

                    {store.indicatorDetails && store.indicatorDetails.indicatorPeriodicities && store.indicatorDetails.indicatorPeriodicities.length > 0 &&  <div>
                      <h5 style={{color: '#5853B2'}}> الدوريات</h5>
                      <div className='row mb-3'>
                        {store.indicatorDetails.indicatorPeriodicities.map((item, idx) => (
                           <div
                              key={idx}
                              className="ml-2 d-flex align-items-center col-5 mb-1"
                              style={{
                                  backgroundColor: "lightGray",
                                  padding: "3px",
                                  borderRadius: 10
                              }}>
                            <p className="mb-0 mx-1">{item.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>}

                    {store.indicatorDetails && store.indicatorDetails.indicatorSources && store.indicatorDetails.indicatorSources.length > 0 && <div>
                      <h5 style={{color: '#5853B2'}}> المصادر</h5>
                      <div className='row mb-2'>
                        {store.indicatorDetails.indicatorSources.map((item, idx) => (
                           <div
                              key={idx}
                              className="ml-2 d-flex align-items-center col-5 mb-1"
                              style={{
                                  backgroundColor: "lightGray",
                                  padding: "3px",
                                  borderRadius: 10
                              }}>
                            <p className="mb-0 mx-1">{item.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>}

                    {store.indicatorDetails && store.indicatorDetails.indicatorClassificationValues && store.indicatorDetails.indicatorClassificationValues.length > 0 && <div>
                      <h5 style={{color: '#5853B2'}}> التصنيفات</h5>
                      <div className='row'>
                        {store.indicatorDetails.indicatorClassificationValues.map((item, idx) => (
                           <div
                              key={idx}
                              className="ml-2 d-flex align-items-center col-5 mb-1"
                              style={{
                                  backgroundColor: "lightGray",
                                  padding: "3px",
                                  borderRadius: 10
                              }}>
                            <p className="mb-0 mx-1">{item.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>}

                  </CardBody>
                </Card>
              </div>
            </Col>}
          </Row>
        </>
      }
    </>
  )
}

export default indicatorDetails
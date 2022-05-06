import { useContext, useEffect, useState } from 'react'
// ** Third Party Components
import { useIntl } from 'react-intl'

// ** User List Component
import Breadcrumbs from '@components/breadcrumbs'
import Table from './InquiryProcedures/Table'
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap'
import axios from '../../../axios'
import { X, ArrowDown } from 'react-feather'
import * as moment from "moment"
import "moment/locale/ar"


// ** Styles
import '@styles/react/apps/app-users.scss'

const InquiryDetails = (props) => {
  const [inquiry, setInquiry] = useState({})
  const [descriptionCardIsOpen, setDescriptionCardIsOpen] = useState(true)

  const intl = useIntl()

  const getInquiryDetails = async () => {
    await axios.get(`/Inquiry/GetInquiry/${props.location.state.id}`)
    .then(response => {
        setInquiry(response.data.data)
    })
  }
  const ToggleDescriptionCard = (val) => {
    if (val === 1) {
      setDescriptionCardIsOpen(true)
    } else {
      setDescriptionCardIsOpen(false)
    }
  }
  useEffect(() => {
      getInquiryDetails()
  }, [])
  return (
    <div className='app-user-list'>
      <Breadcrumbs breadCrumbTitle="طلبات البيانات" breadCrumbParent="خدمات الباحثين" breadCrumbActive="أجراءات طلبات البيانات" breadCrumbRoot={intl.formatMessage({id: "Homepage"})} />
      <Row>
          <Col md={9}>
            <h2 className='px-3'>{inquiry.name}</h2>
          </Col>
          {!descriptionCardIsOpen && <Col md={3}>
              <Card>
                  <CardHeader>
                        <div>
                            بيانات الطلب   
                        </div>
                        <div>
                            <ArrowDown  onClick={() => ToggleDescriptionCard(1)}/>
                        </div>
                  </CardHeader>
              </Card>
          </Col>}
      </Row> 
      <Row>
          <Col md={descriptionCardIsOpen ? 9 : 12}>
            <Table inquiryId={props.location.state.id} />
          </Col>
          {descriptionCardIsOpen && <Col md={3}>
              <Card>
                  <CardHeader>
                        <div>
                            بيانات الطلب   
                        </div>
                        <div>
                            <X style={{color: 'red'}} onClick={() => ToggleDescriptionCard(0)}/>
                        </div>
                  </CardHeader>
                  <CardBody>
                    {
                        inquiry.description && <div>
                        <h5>الوصف</h5>
                        <p>
                            {inquiry.description}
                        </p>
                        </div>
                    }
                       

                    <div className='row mb-2'>
                    {inquiry.status && <div className="col-md-6">
                        <h5>الحالة</h5>
                        <div
                            
                            style={{
                                backgroundColor: "lightGray",
                                padding: "3px",
                                borderRadius: 10
                            }}>
                            <p className="mb-0 mx-1">{inquiry.status.name}</p>
                        </div>
                    </div>}
                    {inquiry.expectedPeriod && <div className="col-md-6">
                        <h5>الفترة المتوقعة</h5>
                        <div
                            className='d-flex justify-content-around'
                            style={{
                                backgroundColor: "lightGray",
                                padding: "3px",
                                borderRadius: 10
                            }}>
                        <p className="mb-0 mx-1">{inquiry.expectedPeriod} </p>
                        <span> يوم</span>
                        </div>
                    </div>}
                    </div>

                    <div className='row mb-2'>
                        {inquiry.startDate && <div className="col-md-6">
                            <h5>تاريخ البدء</h5>
                            <div
                                
                                style={{
                                    backgroundColor: "lightGray",
                                    padding: "3px",
                                    borderRadius: 10
                                }}>
                                <p className="mb-0 mx-1">{moment(inquiry.startDate).locale("ar").format("L")}</p>
                            </div>
                        </div>}
                        {inquiry.actualEndDate && <div className="col-md-6">
                            <h5>تاريخ الانتهاء</h5>
                            <div
                                
                                style={{
                                    backgroundColor: "lightGray",
                                    padding: "3px",
                                    borderRadius: 10
                                }}>
                                <p className="mb-0 mx-1">{moment(inquiry.actualEndDate).locale("ar").format("L")}</p>
                            </div>
                        </div>}
                    </div>

                    <div className='row mb-2'>
                        {inquiry.user && <div className="col-md-12 mb-2">
                            <h5>طالب البيانات</h5>
                            <div
                                
                                style={{
                                    backgroundColor: "lightGray",
                                    padding: "3px",
                                    borderRadius: 10
                                }}>
                                <p className="mb-0 mx-1">{inquiry.user.name}</p>
                            </div>
                        </div>}
                        {inquiry.provider && <div className="col-md-12">
                            <h5>مزود البيانات</h5>
                            <div
                                
                                style={{
                                    backgroundColor: "lightGray",
                                    padding: "3px",
                                    borderRadius: 10
                                }}>
                                <p className="mb-0 mx-1">{inquiry.provider.name}</p>
                            </div>
                        </div>}
                    </div>
                    <div className='row'>
                        {inquiry.department && <div className="col-md-12">
                            <h5>الادارة</h5>
                            <div
                                
                                style={{
                                    backgroundColor: "lightGray",
                                    padding: "3px",
                                    borderRadius: 10
                                }}>
                                <p className="mb-0 mx-1">{inquiry.department.name}</p>
                            </div>
                        </div>}
                    </div>
                    {inquiry.inquiryClassifications && inquiry.inquiryClassifications.length > 0 && 
                    <div className='mt-2'>
                      <h5> التصنيفات</h5>
                      <div className='row'>
                        {inquiry.inquiryClassifications.map((item, idx) => (
                            item.classificationValues.length > 0 && item.classificationValues.map((item1, index) => (
                            <div
                                key={idx}
                                className="ml-2 d-flex align-items-center col-5 mb-1"
                                style={{
                                    backgroundColor: "lightGray",
                                    padding: "3px",
                                    borderRadius: 10
                                }}>
                              <p className="mb-0 mx-1">{item1.name}</p>
                            </div>
                            ))
                          
                        ))}
                      </div>
                    </div>}
                  </CardBody>
              </Card>
          </Col>}
      </Row>
      
    </div>
  )
}

export default InquiryDetails

import React from 'react'
import { Card, CardTitle, CardBody, CardSubtitle, CardText, Button, Badge, Col, Row, CardLink } from 'reactstrap'
import testImg from '../../assets/images/pages/card-image-5.jpg'

const ListingVertical = ({item}) => {

  return (
    <Col sm={12} md={6}>
      <Card className='v-card' >
        <CardBody>
          <Row>
            <Col sm={3}>
              <img src={testImg} className="img-fluid"/>
            </Col>
            <Col sm={9} className="d-flex flex-column justify-content-between">
              <div>
                <CardTitle className="mt-1 mt-sm-0" tag='h4'>{item.name}</CardTitle>
                <CardSubtitle className='text-muted'>{item.lastDocumentDate}</CardSubtitle>
                <CardText className='my-2'>
                  {item.description}
                </CardText>
              </div>
              <div>
                <Button.Ripple color='primary' >
                    Go Somewhere
                </Button.Ripple>
                <Button.Ripple className="mx-1" color='primary' outline>
                  Go Somewhere else
                </Button.Ripple>
              </div>
            
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ListingVertical
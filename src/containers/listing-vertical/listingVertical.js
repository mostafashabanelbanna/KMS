import React from 'react'
import { Card, CardTitle, CardBody, CardSubtitle, CardText, Button, Badge, Col, Row, CardLink } from 'reactstrap'
import testImg from '../../assets/images/pages/card-image-5.jpg'

const ListingVertical = () => {

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
                <CardTitle className="mt-1 mt-sm-0" tag='h4'>Card Title</CardTitle>
                <CardSubtitle className='text-muted'>Support card subtitle</CardSubtitle>
                <CardText className='my-2'>
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                  Some quick example text to build on the card title and make up the bulk of the card's content.
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
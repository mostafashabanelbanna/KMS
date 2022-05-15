import { useContext, useEffect, useState } from 'react'
// ** Third Party Components
import { useIntl } from 'react-intl'

import classnames from 'classnames'
import Avatar from '@components/avatar'
import { Heart, MessageSquare, Share2 } from 'react-feather'
import { Card, CardBody, CardText, Row, Col, UncontrolledTooltip, Input, Label, Button } from 'reactstrap'
import axios from './../../axios'
import * as moment from "moment"
import "moment/locale/ar"
import {notify} from '../../utility/Utils'

// ** Styles
import '@styles/react/apps/app-users.scss'

const Feedback = ({objectId, objectName}) => {
    const [allFeedback, setAllFeedback] = useState([])
    const intl = useIntl()

    const getFeedbacks = async () => {
        await axios.post(`/Feedback/GetFeedbacks`, {objectId, objectName})
        .then(response => {
            console.log(response)
            setAllFeedback(response.data.data)
           })
           .catch(error => {
            setAllFeedback([])
        })
    }
    useEffect(() => {
        getFeedbacks()
    }, [])

    const AddComment = async () => {
        const comment = document.getElementById("addComment").value
        document.getElementById("addComment").value = ""
        if (!comment) {
            notify("error", "برجاء اضافة تعليق")
        } else {
            await axios.post(`/Feedback/CreateFeedback`, {objectId, objectName, description: comment})
            .then(response => {
                console.log(response)
                getFeedbacks()
            }).catch(error => {
            })
        }
        
    }

    return (
        <div className='app-user-list'>
            <Card>
                <CardBody>
                    {allFeedback &&  allFeedback.map((feedback, indx) => (
                    <div key={indx} className='d-flex align-items-start mb-2'>
                        <Avatar img={feedback.UserPhoto} className='mt-25 mr-75' imgHeight='34' imgWidth='34' />
                        <div className='profile-user-info w-100'>
                        <div className='d-flex align-items-center justify-content-between'>
                            <h5 className='mb-0'>{feedback.username}</h5>
                            <span className='mt-0 mb-0'>{moment(feedback.createDate)
                            .locale("ar")
                            .format("LL")}</span>
                        </div>
                        <small>{feedback.description}</small>
                        </div>
                    </div>
                ))}
                <fieldset className='form-label-group mb-50'>
                <Input id='addComment' type='textarea' rows='3' placeholder='أضافة تعليق' />
                <Label className='mt-1'>أضافة تعليق</Label>
                </fieldset>
                <Row>
                    <Col md={12} className="text-right">
                        <Button.Ripple color='primary' size='sm' onClick={AddComment}>
                             أضافة تعليق
                        </Button.Ripple>
                    </Col>
                </Row>
                
                </CardBody>
            </Card>
           
        </div>
    )
}

export default Feedback

import { Award } from 'react-feather'
import Avatar from '@components/avatar'
import { Card, CardBody, CardText, Row, Col, Container } from 'reactstrap'
import { FormattedMessage, useIntl } from 'react-intl'
import { FaFileDownload, FaFileUpload } from "react-icons/fa"
import Breadcrumbs from '@components/breadcrumbs'
import { Link, Redirect} from 'react-router-dom'

const datasetUsingExcel = () => {
    const intl = useIntl()
    return (
        <div className='app-user-list'>
        <Breadcrumbs breadCrumbTitle={intl.formatMessage({id: "By Excel"})} breadCrumbParent={intl.formatMessage({id: "Manage Dataset"})} breadCrumbActive={intl.formatMessage({id: "By Excel"})} breadCrumbRoot={intl.formatMessage({id: "Homepage"})} />
        <Container fluid className="py-5">
            <Row className="py-5 justify-content-center">
                <Col md={4}>
                    <Card className='card-congratulations py-3' exact tag={Link} to={{ pathname: `/dataset/using-excel/export`}}>
                        <CardBody className='text-center'>
                            <Avatar icon={<FaFileDownload size={28} />} className='shadow' color='primary' size='xl' />
                            <div className='text-center'>
                            <h1 className='mb-1 text-white'><FormattedMessage id="Export" /></h1>
                            <CardText className='m-auto w-75'>
                                إستخراج ملف إكسيل
                            </CardText>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className='card-congratulations py-3' exact tag={Link} to={{ pathname: `/dataset/using-excel/import`}}>
                        <CardBody className='text-center'>
                            <Avatar icon={<FaFileUpload size={28} />} className='shadow' color='primary' size='xl' />
                            <div className='text-center'>
                            <h1 className='mb-1 text-white'><FormattedMessage id="Import" /></h1>
                            <CardText className='m-auto w-75'>
                                إستيراد ملف إكسيل
                            </CardText>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default datasetUsingExcel
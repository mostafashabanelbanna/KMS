import React from 'react'
import { useIntl } from 'react-intl'

// ** User List Component
import Breadcrumbs from '@components/breadcrumbs'

import ListingVertical from '../../containers/listing-vertical/listingVertical'
import { Row } from 'reactstrap'

const LandingPage = () => {
  const intl = useIntl()
    return (
        <div className='app-user-list'>
            <Breadcrumbs breadCrumbTitle={intl.formatMessage({id: "Document Library"})} breadCrumbParent={intl.formatMessage({id: 'Researchers Services'})} breadCrumbActive={intl.formatMessage({id: "Document Library"})} breadCrumbRoot={intl.formatMessage({id: "Homepage"})} />
            <Row>
                <ListingVertical />
                <ListingVertical />
                <ListingVertical />
                <ListingVertical />
                <ListingVertical />
            </Row>
        </div>
    )
}

export default LandingPage
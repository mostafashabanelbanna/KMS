import { useContext, useEffect, useState } from 'react'
// ** Third Party Components
import { useIntl } from 'react-intl'

import classnames from 'classnames'
import Avatar from '@components/avatar'
import { Heart, MessageSquare, Share2 } from 'react-feather'
import { Card, CardBody, CardText, Row, Col, UncontrolledTooltip, Input, Label, Button,  TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import axios from './../../axios'
import * as moment from "moment"
import "moment/locale/ar"
import {notify} from '../../utility/Utils'
import Breadcrumbs from '@components/breadcrumbs'
import ComponentSpinner from '../../@core/components/spinner/Fallback-spinner'
import IndicatorCard from '../indicator/indicatorList/indicatorListCard'
import DocumentIssueCard from '../documentLibrary/documentIssueList/documentIssueListCard'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { isLoading, isNotLoading } from '../../redux/actions/layout'

// ** Styles
import '@styles/react/apps/app-users.scss'

const Favorite = () => {
    const intl = useIntl()
    const dispatch = useDispatch()
    const layoutStore = useSelector(state => state.layout)

    const [indicators, setIndicators] = useState([])
    const [documentIssues, setDocumentIssues] = useState([])
    const [indicatorsTotalPages, setIndicatorTotalPages] = useState(0)
    const [indicatorsTotalCount, setIndicatorTotalCount] = useState(0)
    const [documentIssueTotalPages, setDocumentIssueTotalPages] = useState(0)
    const [documentIssueTotalCount, setDocumentIssueTotalCount] = useState(0)
    const [indicatorPageNumber, setindIcatorPageNumber] = useState(1)
    const [documentIssuePageNumber, setDocumentIssuePageNumber] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const getIndicatorData = async (params) => {
          dispatch(isLoading())
          await axios.post('/Indicator/GetAdvancedSearchIndicators', params).then(response => {
            console.log(response.data.data.items)
            setIndicators(response.data.data.items)
            setIndicatorTotalPages(response.data.data.totalPages)
            setIndicatorTotalCount(response.data.data.totalCount)
            dispatch(isNotLoading())
      
          }).catch(error => {
            dispatch(isNotLoading())
          })
        }
      const getDocumentIssueData = async (params) => {
        dispatch(isLoading())
        await axios.post('/DocumentIssue/GetDocumentIssuesFront', params).then(response => {
          setDocumentIssues(response.data.data.items)
          setDocumentIssueTotalPages(response.data.data.totalPages)
          setDocumentIssueTotalPages(response.data.data.totalCount)
          dispatch(isNotLoading())
    
        }).catch(error => {
          dispatch(isNotLoading())
        })
      }
    const [active, setActive] = useState('1')
    const toggle = tab => {
      if (active !== tab) {
        setActive(tab)
      }
    }
    const handleIndicatorPaginationPagination = page => {
      setindIcatorPageNumber(page.selected + 1)
    }

    const handleDocumentIssuePaginationPagination = page => {
      setDocumentIssuePageNumber(page.selected + 1)
    }

    useEffect(() => {
      getIndicatorData({pageNumber: indicatorPageNumber, rowsPerPage, isFav: true})
    }, [indicatorPageNumber])

    useEffect(() => {
      getDocumentIssueData({pageNumber: documentIssuePageNumber, rowsPerPage, isFav: true})
    }, [documentIssuePageNumber])

    useEffect(() => {
      getIndicatorData({pageNumber: indicatorPageNumber, rowsPerPage, isFav: true})
      getDocumentIssueData({pageNumber: indicatorPageNumber, rowsPerPage, isFav: true})
    }, [])

    return (
        <div>
            <Breadcrumbs breadCrumbTitle="المفضلة" breadCrumbParent="خدمات الباحثين" breadCrumbActive="المفضلة" breadCrumbRoot={intl.formatMessage({id: "Homepage"})} />
            <Nav tabs className="indicator_Details_tabs">
                <NavItem style={{ width: "50%" }}>
                    <NavLink
                    active={active === '1'}
                    onClick={() => {
                        toggle('1')
                    }}
                    >
                        <h4 className='mb-0'>عناصر البيانات</h4> 
                    </NavLink>
                </NavItem>
                <NavItem style={{ width: "50%" }}>
                    <NavLink
                    active={active === '2'}
                    onClick={() => {
                        toggle('2')
                    }}
                    >
                        <h4 className='mb-0'>الأصدارات</h4>
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent className='py-50' activeTab={active}>
                <TabPane tabId='1'>
                    <div className="d-flex flex-lg-row flex-column-reverse">
                        <div className="col-12 px-0">
                            {layoutStore.loading === true && <ComponentSpinner />}
                            {layoutStore.loading === false && indicators.map((item, idx) => (
                                <IndicatorCard key={idx} item={item} />
                            ))}
                           <ReactPaginate
                              previousLabel={''}
                              nextLabel={''}
                              pageCount={indicatorsTotalPages || 1}
                              activeClassName='active'
                              forcePage={indicatorPageNumber !== 0 ? indicatorPageNumber - 1 : 0}
                              onPageChange={page => handleIndicatorPaginationPagination(page)}
                              pageClassName={'page-item'}
                              nextLinkClassName={'page-link'}
                              nextClassName={'page-item next'}
                              previousClassName={'page-item prev'}
                              previousLinkClassName={'page-link'}
                              pageLinkClassName={'page-link'}
                              containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
                            />
                        </div>
                    </div> 
                </TabPane>
                <TabPane tabId='2'>
                <div className="d-flex flex-lg-row flex-column-reverse">
                        <div className="col-12 px-0">
                            {layoutStore.loading === true && <ComponentSpinner />}
                            {layoutStore.loading === false && documentIssues.map((item, idx) => (
                                <DocumentIssueCard key={idx} item={item} />
                            ))}
                        </div>
                        <div className='col-12'>
                        {indicators.length > 0 &&
                            <ReactPaginate
                              previousLabel={''}
                              nextLabel={''}
                              pageCount={documentIssueTotalPages || 1}
                              activeClassName='active'
                              forcePage={documentIssuePageNumber !== 0 ? documentIssuePageNumber - 1 : 0}
                              onPageChange={page => handleDocumentIssuePaginationPagination(page)}
                              pageClassName={'page-item'}
                              nextLinkClassName={'page-link'}
                              nextClassName={'page-item next'}
                              previousClassName={'page-item prev'}
                              previousLinkClassName={'page-link'}
                              pageLinkClassName={'page-link'}
                              containerClassName={'pagination react-paginate justify-content-end my-2 pr-1'}
                            />
                          }
                        </div>
                    </div> 
                </TabPane>
            </TabContent>
        </div>
    )
}

export default Favorite
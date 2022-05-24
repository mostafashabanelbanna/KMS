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
import DashboardCard from './../dashboard/dashboardListCard'
import DefinitionsCard from './../definitions/definitionsCard'
import WebResourcesCard from './../webResources/webResourcesListCard'
import InquiryCard from './../Inquiry/InquiryListCard'

const Favorite = () => {
    const intl = useIntl()
    const dispatch = useDispatch()
    const layoutStore = useSelector(state => state.layout)

    const [indicators, setIndicators] = useState([])
    const [indicatorsTotalPages, setIndicatorTotalPages] = useState(0)
    const [indicatorsTotalCount, setIndicatorTotalCount] = useState(0)
    const [indicatorPageNumber, setindIcatorPageNumber] = useState(1)
    
    const [documentIssues, setDocumentIssues] = useState([])
    const [documentIssueTotalPages, setDocumentIssueTotalPages] = useState(0)
    const [documentIssueTotalCount, setDocumentIssueTotalCount] = useState(0)
    const [documentIssuePageNumber, setDocumentIssuePageNumber] = useState(1)

    const [dashboard, setDashboard] = useState([])
    const [dashboardTotalPages, setDashboardTotalPages] = useState(0)
    const [dashboardTotalCount, setDashboardTotalCount] = useState(0)
    const [dashboardPageNumber, setDashboardPageNumber] = useState(1)

    const [definitions, setDefinitions] = useState([])
    const [definitionsTotalPages, setDefinitionsTotalPages] = useState(0)
    const [definitionsTotalCount, setDefinitionsTotalCount] = useState(0)
    const [definitionsPageNumber, setDefinitionsPageNumber] = useState(1)

    const [webResources, setWebResources] = useState([])
    const [webResourcesTotalPages, setWebResourcesTotalPages] = useState(0)
    const [webResourcesTotalCount, setWebResourcesTotalCount] = useState(0)
    const [webResourcesPageNumber, setWebResourcesPageNumber] = useState(1)

    const [inquiries, setInquiries] = useState([])
    const [inquiriesTotalPages, setInquiriesTotalPages] = useState(0)
    const [inquiriesTotalCount, setInquiriesTotalCount] = useState(0)
    const [inquiriesPageNumber, setInquiriesPageNumber] = useState(1)
    
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
          setDocumentIssueTotalCount(response.data.data.totalCount)
          dispatch(isNotLoading())
    
        }).catch(error => {
          dispatch(isNotLoading())
        })
    }

    const getDashboardData = async (params) => {
      dispatch(isLoading())
      await axios.post('/WebResource/GetDashboardsFront', params).then(response => {
        setDashboard(response.data.data.items)
        setDashboardTotalPages(response.data.data.totalPages)
        setDashboardTotalCount(response.data.data.totalCount)
        dispatch(isNotLoading())
  
      }).catch(error => {
        dispatch(isNotLoading())
      })
    }

    const getDefinitionsData = async (params) => {
      dispatch(isLoading())
      await axios.post('/Definition/GetDefinitionsFront', params).then(response => {
        setDefinitions(response.data.data.items)
        setDefinitionsTotalPages(response.data.data.totalPages)
        setDefinitionsTotalCount(response.data.data.totalCount)
        dispatch(isNotLoading())

      }).catch(error => {
        dispatch(isNotLoading())
      })
    }

    const getWebResourcesData = async (params) => {
      dispatch(isLoading())
      await axios.post('/WebResource/GetWebResourcesFront', params).then(response => {
        setWebResources(response.data.data.items)
        setWebResourcesTotalPages(response.data.data.totalPages)
        setWebResourcesTotalCount(response.data.data.totalCount)
        dispatch(isNotLoading())

      }).catch(error => {
        dispatch(isNotLoading())
      })
    }

    const getInquiryData = async (params) => {
      dispatch(isLoading())
      await axios.post('/Inquiry/GetInquiriesWithPaginationFront', params).then(response => {
        setInquiries(response.data.data.items)
        setInquiriesTotalPages(response.data.data.totalPages)
        setInquiriesTotalCount(response.data.data.totalCount)
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

    const handleDashboardPagination = page => {
      setDashboardPageNumber(page.selected + 1)
    }

    const handleDefinitionsPagination = page => {
      setDefinitionsPageNumber(page.selected + 1)
    }

    const handleWebResourcesPagination = page => {
      setWebResourcesPageNumber(page.selected + 1)
    }

    const handleInquiryPagination = page => {
      setInquiriesPageNumber(page.selected + 1)
    }

    useEffect(() => {
      getIndicatorData({pageNumber: indicatorPageNumber, rowsPerPage, isFav: true})
    }, [indicatorPageNumber])

    useEffect(() => {
      getDocumentIssueData({pageNumber: documentIssuePageNumber, rowsPerPage, isFav: true})
    }, [documentIssuePageNumber])

    useEffect(() => {
      getDashboardData({pageNumber: dashboardPageNumber, rowsPerPage, isFav: true})
    }, [dashboardPageNumber])

    useEffect(() => {
      getDefinitionsData({pageNumber: definitionsPageNumber, rowsPerPage, isFav: true})
    }, [definitionsPageNumber])

    useEffect(() => {
      getWebResourcesData({pageNumber: webResourcesPageNumber, rowsPerPage, isFav: true})
    }, [webResourcesPageNumber])

    useEffect(() => {
      getInquiryData({pageNumber: inquiriesPageNumber, rowsPerPage, isFav: true})
    }, [inquiriesPageNumber])

    // useEffect(() => {
    //   getIndicatorData({pageNumber: indicatorPageNumber, rowsPerPage, isFav: true})
    //   getDocumentIssueData({pageNumber: documentIssuePageNumber, rowsPerPage, isFav: true})
    //   getDashboardData({pageNumber: dashboardPageNumber, rowsPerPage, isFav: true})
    //   getDefinitionsData({pageNumber: definitionsPageNumber, rowsPerPage, isFav: true})
    //   getWebResourcesData({pageNumber: webResourcesPageNumber, rowsPerPage, isFav: true})
    //   getInquiryData({pageNumber: inquiriesPageNumber, rowsPerPage, isFav: true})
    // }, [])

    return (
        <div>
            <Breadcrumbs breadCrumbTitle="المفضلة" breadCrumbParent="خدمات الباحثين" breadCrumbActive="المفضلة" breadCrumbRoot={intl.formatMessage({id: "Homepage"})} />
            
            <Nav tabs className="indicator_Details_tabs">
                <NavItem style={{ width: "16.25%" }}>
                    <NavLink
                    active={active === '1'}
                    onClick={() => {
                        toggle('1')
                    }}
                    >
                        <h4 className='mb-0'>عناصر البيانات</h4> 
                    </NavLink>
                </NavItem>
                <NavItem style={{ width: "16.25%" }}>
                    <NavLink
                    active={active === '2'}
                    onClick={() => {
                        toggle('2')
                    }}
                    >
                        <h4 className='mb-0'>الإصدارات</h4>
                    </NavLink>
                </NavItem>
                <NavItem style={{ width: "16.25%" }}>
                    <NavLink
                    active={active === '3'}
                    onClick={() => {
                        toggle('3')
                    }}
                    >
                        <h4 className='mb-0'>اللوحات المعلوماتية</h4>
                    </NavLink>
                </NavItem>
                <NavItem style={{ width: "16.25%" }}>
                    <NavLink
                    active={active === '4'}
                    onClick={() => {
                        toggle('4')
                    }}
                    >
                        <h4 className='mb-0'>التعريفات</h4>
                    </NavLink>
                </NavItem>
                <NavItem style={{ width: "16.25%" }}>
                    <NavLink
                    active={active === '5'}
                    onClick={() => {
                        toggle('5')
                    }}
                    >
                        <h4 className='mb-0'>مصادر على الويب</h4>
                    </NavLink>
                </NavItem>
                <NavItem style={{ width: "16.25%" }}>
                    <NavLink
                    active={active === '6'}
                    onClick={() => {
                        toggle('6')
                    }}
                    >
                        <h4 className='mb-0'>طلبات البيانات</h4>
                    </NavLink>
                </NavItem>
            </Nav>
            
            <TabContent className='py-50' activeTab={active}>
                
                <TabPane tabId='1'>
                    <div className="d-flex flex-column-reverse">
                        <div className="col-12 px-0">
                            {layoutStore.loading === true && <ComponentSpinner />}
                            {layoutStore.loading === false && indicators.map((item, idx) => (
                                <IndicatorCard key={idx} item={item} />
                            ))}
                            {indicators.length > 0 &&
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
                            />}
                        </div>
                    </div> 
                </TabPane>

                <TabPane tabId='2'>
                <div className="d-flex flex-column">
                        <div className="col-12 px-0">
                            {layoutStore.loading === true && <ComponentSpinner />}
                            {layoutStore.loading === false && documentIssues.map((item, idx) => (
                                <DocumentIssueCard key={idx} item={item} />
                            ))}
                        </div>
                        <div className='col-12'>
                        {documentIssues.length > 0 &&
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

                <TabPane tabId='3'>
                <div className="d-flex flex-column">
                        <div className="col-12 px-0">
                            {layoutStore.loading === true && <ComponentSpinner />}
                            {layoutStore.loading === false && dashboard.map((item, idx) => (
                                <DashboardCard key={idx} item={item} />
                            ))}
                        </div>
                        <div className='col-12'>
                        {dashboard.length > 0 &&
                            <ReactPaginate
                              previousLabel={''}
                              nextLabel={''}
                              pageCount={dashboardTotalPages || 1}
                              activeClassName='active'
                              forcePage={dashboardPageNumber !== 0 ? dashboardPageNumber - 1 : 0}
                              onPageChange={page => handleDashboardPagination(page)}
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

                <TabPane tabId='4'>
                <div className="d-flex flex-column">
                        <div className="col-12 px-0">
                            {layoutStore.loading === true && <ComponentSpinner />}
                            {layoutStore.loading === false && definitions.map((item, idx) => (
                                <DefinitionsCard key={idx} item={item} />
                            ))}
                        </div>
                        <div className='col-12'>
                        {definitions.length > 0 &&
                            <ReactPaginate
                              previousLabel={''}
                              nextLabel={''}
                              pageCount={definitionsTotalPages || 1}
                              activeClassName='active'
                              forcePage={definitionsPageNumber !== 0 ? definitionsPageNumber - 1 : 0}
                              onPageChange={page => handleDefinitionsPagination(page)}
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

                <TabPane tabId='5'>
                <div className="d-flex flex-column">
                        <div className="col-12 px-0">
                            {layoutStore.loading === true && <ComponentSpinner />}
                            {layoutStore.loading === false && webResources.map((item, idx) => (
                                <WebResourcesCard key={idx} item={item} />
                            ))}
                        </div>
                        <div className='col-12'>
                        {webResources.length > 0 &&
                            <ReactPaginate
                              previousLabel={''}
                              nextLabel={''}
                              pageCount={webResourcesTotalPages || 1}
                              activeClassName='active'
                              forcePage={webResourcesPageNumber !== 0 ? webResourcesPageNumber - 1 : 0}
                              onPageChange={page => handleWebResourcesPagination(page)}
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

                <TabPane tabId='6'>
                <div className="d-flex flex-column">
                        <div className="col-12 px-0">
                            {layoutStore.loading === true && <ComponentSpinner />}
                            {layoutStore.loading === false && inquiries.map((item, idx) => (
                                <InquiryCard key={idx} item={item} />
                            ))}
                        </div>
                        <div className='col-12'>
                        {inquiries.length > 0 &&
                            <ReactPaginate
                              previousLabel={''}
                              nextLabel={''}
                              pageCount={inquiriesTotalPages || 1}
                              activeClassName='active'
                              forcePage={inquiriesPageNumber !== 0 ? inquiriesPageNumber - 1 : 0}
                              onPageChange={page => handleInquiryPagination(page)}
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
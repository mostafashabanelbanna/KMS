import { useState, useEffect } from 'react'
import IndicatorHeader from './header'
import axios from '../../axios'
import { Link } from 'react-router-dom'
import {RiDatabase2Fill} from 'react-icons/ri'
import IndicatorList from './IindicatorList'
import { useIntl } from 'react-intl'
import Breadcrumbs from '@components/breadcrumbs'

import {tabEnum} from './tabEnum'

const periodicity = ({ props}) => {
    const [periodicities, setPeriodicities] = useState([])
    const [indicators, setIndicators] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const handlePagination = page => {
        setPageNumber(page.selected + 1)
    }
    
    const getPeridicities = async () => {
        await axios.get(`/Periodicity/GetPeriodicitiesWithIndicatorsCount`)
        .then(response => {
            setPeriodicities(response.data.data)
           })
           .catch(error => {
            setPeriodicities([])
        })
    }

    const getIndicators = async (id) => {
        const postObj = {
            name: "",
            periodicityId: id,
            sourceId: null,
            classificationId: null,
            classificationValueId: null,
            IsPeriodicityTab: true,
            pageNumber,
            rowsPerPage
        }
        await axios.post(`/Indicator/GetAdvancedSearchIndicators`, postObj)
        .then(response => {
            console.log(response.data.data)
            setIndicators(response.data.data)
           })
           .catch(error => {
            setIndicators([])
        })
    }
    let periodicityId
    const handlePeriodicityClick = (id) => {
        console.log(id)
        periodicityId = id
        getIndicators(id)
    }
    useEffect(() => {
        getPeridicities()
        getIndicators(null)
    }, [])
    useEffect(() => {
        getIndicators(periodicityId)
    }, [pageNumber])
  const intl = useIntl()

  return (
      <>
        <Breadcrumbs breadCrumbTitle={intl.formatMessage({id: "Search by periodicities"})}  breadCrumbParent2={intl.formatMessage({id: "Indicators And Datasets"})} breadCrumbParent={intl.formatMessage({id: "Researchers Services"})} breadCrumbActive={intl.formatMessage({id: "Search by periodicities"})} breadCrumbRoot={intl.formatMessage({id: "Homepage"})} />

      {/* {<IndicatorHeader  tabEnumValue={tabEnum.periodicity} /> } */}
      <div className='row'>
      {periodicities.length > 0 && periodicities.map((item, idx) => (
          <div className='col-md-2 my-3' key={idx}>
            <a className='d-flex rounded' style={{backgroundColor: '#fff'}} onClick={() => handlePeriodicityClick(item.id)}>
                <div style={{ width: '40px', backgroundColor: '#7367f0'}} className='rounded mr-1 d-inline-flex justify-content-center align-items-center'  >
                    <RiDatabase2Fill color='#fff'  fontSize={28}/>
                </div>
                <div >
                    <h4 className='mb-0' style={{fontWeight: 'bold', fontFamily: '30px'}}>{item.indicatorsCount}</h4>
                    <strong style={{textDecoration: 'underLine'}} className='mr-1 circle'>{item.name}</strong> 
                </div>
            </a>
          </div>
      ))}
      </div>
      <IndicatorList indicators={indicators.items} count={indicators.totalPages} pageNumber={pageNumber} handlePagination={handlePagination}/>

      </>
  )
}

export default periodicity
import { useState, useEffect } from 'react'
import IndicatorHeader from './header'
import axios from '../../axios'
import { Link } from 'react-router-dom'

import {tabEnum} from './tabEnum'

const periodicity = ({ props}) => {
    const [periodicities, setPeriodicities] = useState([])
    const [indicators, setIndicators] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)


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
    const handlePeriodicityClick = (id) => {
        console.log(id)
        getIndicators(id)
    }
    useEffect(() => {
        getPeridicities()
        getIndicators(null)
    }, [])

  return (
      <>
      {<IndicatorHeader  tabEnumValue={tabEnum.periodicity} /> }
      <div className='row'>
      {periodicities.length > 0 && periodicities.map((item, idx) => (
          <div className='col-md-3' key={idx}>
              <a onClick={() => handlePeriodicityClick(item.id)}>
                <span>{item.name}</span> <span>({item.indicatorsCount})</span>
              </a>
          </div>
      ))}
      </div>
      </>
  )
}

export default periodicity
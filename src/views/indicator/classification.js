import { useState, useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AlignJustify, Rss, Info, Image, Users, Edit } from 'react-feather'
import {RiDatabase2Fill} from 'react-icons/ri'
import { Link } from 'react-router-dom'
import IndicatorHeader from './header'
import axios from '../../axios'

import {tabEnum} from './tabEnum'
import IndicatorList from './IindicatorList'
import Badge from 'reactstrap/lib/Badge'

const classification = (props) => {
    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.researcherIndicators)

    const [ClassificationValues, setClassificationValues] = useState([])
    const [indicators, setIndicators] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)


    const handlePagination = page => {
        setPageNumber(page.selected + 1)
      }
    
    
    const getIndicators = async (classificationId, classificationValueId) => {
        const postObj = {
            name: "",
            periodicityId: null,
            sourceId: null,
            classificationId,
            classificationValueId,
            IsPeriodicityTab: false,
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
    const getClassificationValues = async (classificationId, parentId) => {
        if (classificationId) {
            parentId = parentId ? parentId : 0
            const Url = `/ClassificationValue/GetClassificationValuesWithIndicatorsCount/${classificationId}/${parentId}`
            await axios.get(Url)
            .then(response => {
                console.log(response.data.data)
                setClassificationValues(response.data.data)
                if (parentId > 0) {
                    getIndicators(classificationId, parentId)
                } else {
                    getIndicators(classificationId, null)
                }
               })
               .catch(error => {
                   setClassificationValues([])
               })
        }
    }
    useEffect(() => {
        if (!props.match.params.classificationId && store.classifications.length > 0) {
            getClassificationValues(store.classifications[0].id)
        }
    }, [store.classifications])

    useEffect(() => {
        if (props.match.params.classificationId) {
            getClassificationValues(props.match.params.classificationId, props.match.params.parentId)
        }
    }, [props.match.params])
    useEffect(() => {
        if (props.match.params.parentId) {
            getIndicators(props.match.params.classificationId, props.match.params.parentId)
        } else {
            getIndicators(props.match.params.classificationId, null)

        }
      }, [pageNumber])
  return (
      <>
      {<IndicatorHeader classificationId={props.match.params.classificationId} tabEnumValue={tabEnum.classification} /> }
      <div className='row'>
      {ClassificationValues.length > 0 && store.classifications && ClassificationValues.map((item, idx) => (
          <div className='col-md-2 my-3' key={idx}>
              <Link className='d-flex rounded' style={{backgroundColor: '#fff'}}  to={{pathname: `/indicator/classification/${props.match.params.classificationId ? props.match.params.classificationId : store.classifications[0].id}/${item.id}`}}>
                <div style={{ width: '40px', backgroundColor: '#7367f0'}} className='rounded mr-1 d-inline-flex justify-content-center align-items-center'  >
                    <RiDatabase2Fill color='#fff'  fontSize={28}/>
                </div>
                <div >
                    <h4 className='mb-0' style={{fontWeight: 'bold', fontFamily: '30px'}}>{item.indicatorsCount}</h4>
                    <strong style={{textDecoration: 'underLine'}} className='mr-1 circle'>{item.name}</strong> 
                </div>
              </Link>
          </div>
      ))}
      </div>
      <IndicatorList indicators={indicators.items} count={indicators.totalPages} pageNumber={pageNumber} handlePagination={handlePagination}/>
      </>
  )
}

export default classification
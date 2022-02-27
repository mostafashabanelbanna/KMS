import { useState, useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AlignJustify, Rss, Info, Image, Users, Edit } from 'react-feather'
import { Link } from 'react-router-dom'
import IndicatorHeader from './header'
import axios from '../../axios'

import {tabEnum} from './tabEnum'

const classification = (props) => {
    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.researcherIndicators)

    const [ClassificationValues, setClassificationValues] = useState([])
    const [indicators, setIndicators] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

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
            //console.log(response.data.data)
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

  return (
      <>
      {<IndicatorHeader classificationId={props.match.params.classificationId} tabEnumValue={tabEnum.classification} /> }
      <div className='row'>
      {ClassificationValues.length > 0 && store.classifications && ClassificationValues.map((item, idx) => (
          <div className='col-md-3' key={idx}>
              <Link to={{pathname: `/indicator/classification/${props.match.params.classificationId ? props.match.params.classificationId : store.classifications[0].id}/${item.id}`}}>
                <span>{item.name}</span> <span>({item.indicatorsCount})</span>
              </Link>
          </div>
      ))}
      </div>
      </>
  )
}

export default classification
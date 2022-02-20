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
    const [ClassificationId, setClassificationId] = useState()
    const [ParentId, setParentId] = useState()

    const getClassificationValues = async (classificationId, parentId) => {
        console.log(ClassificationId)
        console.log(parentId)

        if (classificationId) {
            parentId = parentId ? parentId : 0
            const Url = `/ClassificationValue/GetClassificationValuesWithIndicatorsCount/${classificationId}/${parentId}`
            console.log(Url)
            await axios.get(Url)
            .then(response => {
                console.log(response.data.data)
                setClassificationValues(response.data.data)
               })
               .catch(error => {
                   setClassificationValues([])
               })
        }
    }
    // console.log(props.match.params)
    // console.log(ParentId)
    // getClassificationValues(props.match.params.classificationId, props.match.params.parentId)

    // if (props.match.params.classificationId) {
    //     getClassificationValues(props.match.params.classificationId, props.match.params.parentId)
    // }

    // if (parseInt(props.match.params.classificationId) !== parseInt(ClassificationId) && parseInt(props.match.params.parentId) !== parseInt(ParentId)) {
    //     getClassificationValues(props.match.params.classificationId, props.match.params.parentId)
    //     setClassificationId(props.match.params.classificationId)
    //     setParentId(props.match.params.parentId)
    // } else if (parseInt(props.match.params.classificationId) !== parseInt(ClassificationId)) {
    //     getClassificationValues(props.match.params.classificationId, 0)
    //     setClassificationId(props.match.params.classificationId)
    // }
    useEffect(() => {
        if (!ClassificationId && store.classifications.length > 0) {
            getClassificationValues(store.classifications[0].id)
        }
    }, [store.classifications])
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
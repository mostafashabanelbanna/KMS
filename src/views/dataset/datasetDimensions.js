import { useEffect, useState, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
// ** Third Party Components
import Select from 'react-select'
import {Row, Col, Label} from 'reactstrap/lib'
import { useIntl, FormattedMessage } from 'react-intl'
import axios from '../../axios'

import { selectThemeColors } from '@utils'

import { FaTimes } from "react-icons/fa"


const DatasetDimensions = ({data, dimensions, handleDeleteDimensionLevel, id, orderLevel, type}) => {

   // ** Store Vars
   const dispatch = useDispatch()
   const store = useSelector(state => state.datasets)

   const [levelData, setLevelData] = useState(data)
   const [dimensionLevels, setDimensionLevels] = useState([])
   const [dimensionValues, setDimensionValues] = useState([])

     // useIntl
  const intl = useIntl()
  const getDimensionLevels = async (dimensionId) => {
      await axios.get(`/DimensionsLevel/GetDimensionLevelsByDimension/${dimensionId}`).then(response => {
          if (response) {
              setDimensionLevels(response.data.data)
          }
      }).catch(error => {
          setDimensionLevels([])
      })
  }
  const getDimensionValues = async (dimensionId, levelNumber) => {
    await axios.get(`/DimensionValue/GetDimensionValuesForDataset/${dimensionId}/${levelNumber}`).then(response => {
        if (response) {
            setDimensionValues(response.data.data)
        }
    }).catch(error => {
        setDimensionValues([])
    })
  }
  const handleDimensionChange = (e) => {
      if (type === 1) {
          const temp = store.vertical
          temp[orderLevel].dimensionId = e.id
          temp[orderLevel].levelNumber = 0
          temp[orderLevel].dimensionValues = []
          dispatch({type:"SET_DATASET_VERTICAL", vertical: temp})
      } else {
        const temp = store.horizontal
        temp[orderLevel].dimensionId = e.id
        temp[orderLevel].levelNumber = 0
        temp[orderLevel].dimensionValues = []
        dispatch({type:"SET_DATASET_HORIZONTAL", horizontal: temp})
      }
      setDimensionLevels(getDimensionLevels(e.id))
  }
  const handleDimensionLevelsChange = (e) => {
    if (e) {
        if (type === 1) {
            const temp = store.vertical
            temp[orderLevel].levelNumber = e.levelNumber
            temp[orderLevel].dimensionValues = []
            dispatch({type:"SET_DATASET_VERTICAL", vertical: temp})
        } else {
          const temp = store.horizontal
          temp[orderLevel].levelNumber = e.levelNumber
          temp[orderLevel].dimensionValues = []
          dispatch({type:"SET_DATASET_HORIZONTAL", horizontal: temp})
        }
        setDimensionValues(getDimensionValues(data.dimensionId, e.levelNumber))
    }
  }
  const handleDimensionValuesChange = (e) => {
      const list = e.map(obj => ({ ...obj, orderLevel: orderLevel + 1 }))
      if (type === 1) {
        const temp = store.vertical
        temp[orderLevel].dimensionValues = list
        dispatch({type:"SET_DATASET_VERTICAL", vertical: temp})
      } else {
        const temp = store.horizontal
        temp[orderLevel].dimensionValues = list
        dispatch({type:"SET_DATASET_HORIZONTAL", horizontal: temp})
      }
  }
  useEffect(() => {
        if (data.dimensionId > 0 && data.levelNumber > 0) {
            setDimensionLevels(getDimensionLevels(data.dimensionId))
            setDimensionValues(getDimensionValues(data.dimensionId, data.levelNumber))
        } else if (data.dimensionId > 0) {
            setDimensionValues([])
            setDimensionLevels(getDimensionLevels(data.dimensionId))
        } else {
            setDimensionValues([])
            setDimensionLevels([])
        }
    }, [levelData])

  useLayoutEffect(() => {
      setLevelData(data)
  })
    return (        
        <Row className="mb-2" >
            <Col md={3}>
                <Label>{intl.formatMessage({id: "Roles"})}</Label>
                <Select
                    isClearable={false}
                    theme={selectThemeColors}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    name='dimension'
                    id='dimension'
                    options={dimensions}
                    className='react-select'
                    classNamePrefix='select'
                    value={dimensions.find(x => x.id === data.dimensionId)}
                    onChange={e => handleDimensionChange(e) }
                />
            </Col>
            <Col md={3}>
                <Label>{intl.formatMessage({id: "Roles"})}</Label>
                <Select
                    isClearable={true}
                    theme={selectThemeColors}
                    getOptionLabel={(option) => option.name_A}
                    getOptionValue={(option) => option.levelNumber}
                    value={dimensionLevels && dimensionLevels.length > 0 ? dimensionLevels.find(x => x.levelNumber === data.levelNumber) : 0}
                    name='dimensionLevels'
                    id='dimensionLevels'
                    options={dimensionLevels}
                    className='react-select'
                    classNamePrefix='select'
                    onChange={e => handleDimensionLevelsChange(e) }
                />
            </Col>
            <Col md={5}>
                <Label>{intl.formatMessage({id: "Roles"})}</Label>
                <Select
                    isClearable={true}
                    theme={selectThemeColors}
                    getOptionLabel={(option) => option.name_A}
                    getOptionValue={(option) => option.id}
                    isMulti
                    name='dimensionValues'
                    id='dimensionValues'
                    options={dimensionValues}
                    className='react-select'
                    classNamePrefix='select'
                    value={data.dimensionValues}
                    onChange={e => handleDimensionValuesChange(e) }
                />
            </Col>
            <Col md={1} className="align-items-center col-md-1 d-flex">
                <FaTimes style={{ cursor:'pointer'}} onClick={handleDeleteDimensionLevel} size={20} data-idx={orderLevel} data-type={type}/>
            </Col>
        </Row>
    )
}

export default DatasetDimensions
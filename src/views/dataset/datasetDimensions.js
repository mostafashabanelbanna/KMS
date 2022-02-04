import { useEffect, useState, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
// ** Third Party Components
import Select from 'react-select'
import {Row, Col, Label} from 'reactstrap/lib'
import { useIntl, FormattedMessage } from 'react-intl'
import axios from '../../axios'
import { toast } from 'react-toastify'
import Toastr from '../../containers/toastr/Toastr'

import { selectThemeColors } from '@utils'

import { FaTimes } from "react-icons/fa"


const DatasetDimensions = ({data, handleDeleteDimensionLevel, id, orderLevel, type}) => {

   // ** Store Vars
   const dispatch = useDispatch()
   const store = useSelector(state => state.datasets)

   const [levelData, setLevelData] = useState(data)
   const [dimensionLevels, setDimensionLevels] = useState([])
   const [dimensionValues, setDimensionValues] = useState([])

   const SelectAllOption = {name_A: "أختيار الكل", id: 0}
     // useIntl
  const intl = useIntl()
  // Toastr notify function
  const notify = (type, message) => {
    return toast.success(
      <Toastr type={type} message={message} />,
      { 
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true 
      })
    }
  const validateDimensionLevel = (dimensionId, levelNumber) => {
      let isValidated = true
      for (let i = 0; i < store.vertical.length; i++) {
          if ((i !== orderLevel && type === 1) || type === 2) {
              if (store.vertical[i].dimensionId === dimensionId && store.vertical[i].levelNumber === levelNumber) {
                  isValidated = false
              }
          }
      }
      for (let i = 0; i < store.horizontal.length; i++) {
        if ((i !== orderLevel && type === 2) || type === 1) {
            if (store.horizontal[i].dimensionId === dimensionId && store.horizontal[i].levelNumber === levelNumber) {
                isValidated = false
            }
        }
      }
      if (!isValidated) {
          notify('error', "هذا البعد مستخدم من قبل")
          setDimensionLevels([])
          setDimensionValues([])
          if (type === 1) {
              const temp = store.vertical
              temp[orderLevel].dimensionId = 0
              temp[orderLevel].levelNumber = 0
              temp[orderLevel].dimensionValues = []
            dispatch({type:"SET_DATASET_VERTICAL", vertical: temp})

          } else {
            const temp = store.horizontal
            temp[orderLevel].dimensionId = 0
            temp[orderLevel].levelNumber = 0
            temp[orderLevel].dimensionValues = []
            dispatch({type:"SET_DATASET_HORIZONTAL", horizontal: temp})
          }
      }
      return isValidated
  }

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
            setDimensionValues([SelectAllOption, ...response.data.data])
        }
    }).catch(error => {
        setDimensionValues([])
    })
  }
  const handleDimensionChange = (e) => {
      if (e) {
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
        getDimensionLevels(e.id)
        setDimensionValues([])
      }   
  }
  const handleDimensionLevelsChange = (e) => {
    if (e) {
        const isValid = validateDimensionLevel(data.dimensionId, e.levelNumber)
        if (isValid) {
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
            getDimensionValues(data.dimensionId, e.levelNumber)
        }   
    }
  }
  const handleDimensionValuesChange = (e) => {
      let selectedValues = dimensionValues
      console.log(e.length)
      if (e.length === 0) {
          selectedValues = []
          setDimensionValues([SelectAllOption, ...dimensionValues])
      } else if (e.length >= 1) {
          if (e.find(x => x.id === 0)) {
              selectedValues.shift()
              setDimensionValues(selectedValues)
          } else {
              selectedValues = e
          }
      }
      const list = selectedValues.map(obj => ({ ...obj, orderLevel: orderLevel + 1 }))
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
            getDimensionLevels(data.dimensionId)
            getDimensionValues(data.dimensionId, data.levelNumber)
        } else if (data.dimensionId > 0) {
            setDimensionValues([])
            getDimensionLevels(data.dimensionId)
        } else {
            setDimensionValues([])
            setDimensionLevels([])
        }
    }, [levelData])

    useEffect(() => {
        if (dimensionLevels && dimensionLevels.length === 1) {
            const isValid = validateDimensionLevel(data.dimensionId, dimensionLevels[0].levelNumber)
            if (isValid) {
                if (type === 1) {
                    const temp = store.vertical
                    temp[orderLevel].levelNumber = dimensionLevels[0].levelNumber
                    dispatch({type:"SET_DATASET_VERTICAL", vertical: temp})
                } else {
                    const temp = store.horizontal
                    temp[orderLevel].levelNumber = dimensionLevels[0].levelNumber
                    dispatch({type:"SET_DATASET_HORIZONTAL", horizontal: temp})
                }
                getDimensionValues(data.dimensionId, dimensionLevels[0].levelNumber)
            }
        }
    }, [dimensionLevels])

  useLayoutEffect(() => {
      setLevelData(data)
  })
    return (        
        <Row className="mb-2" >
            <Col md={3}>
                <Label>البعد</Label>
                <Select
                    isClearable={false}
                    placeholder={intl.formatMessage({id: "Select"})}

                    theme={selectThemeColors}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    name='dimension'
                    id='dimension'
                    options={store.indicatorDimensions}
                    className='react-select'
                    classNamePrefix='select'
                    value={store.indicatorDimensions && store.indicatorDimensions.length > 0 && data.dimensionId > 0 ? store.indicatorDimensions.find(x => x.id === data.dimensionId) : 0}
                    onChange={e => handleDimensionChange(e) }
                />
            </Col>
            <Col md={3} className={dimensionLevels.length === 1 ? "d-none" : ""}>
                <Label>مستويات البعد</Label>
                <Select
                    isClearable={true}
                    placeholder={intl.formatMessage({id: "Select"})}

                    theme={selectThemeColors}
                    getOptionLabel={(option) => option.name_A}
                    getOptionValue={(option) => option.levelNumber}
                    value={dimensionLevels && dimensionLevels.length > 0 && data.levelNumber > 0 ? dimensionLevels.find(x => x.levelNumber === data.levelNumber) : 0}
                    name='dimensionLevels'
                    id='dimensionLevels'
                    options={dimensionLevels}
                    className='react-select'
                    classNamePrefix='select'
                    onChange={e => handleDimensionLevelsChange(e) }
                />
            </Col>
            <Col md={5}>
                <Label>قيم البعد</Label>
                <Select
                    isClearable={true}
                    placeholder={intl.formatMessage({id: "Select"})}
                    
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
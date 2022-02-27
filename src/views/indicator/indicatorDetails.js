import { useState, useEffect } from 'react'
import axios from '../../axios'
import {tabEnum} from './tabEnum'
import Dimensions from './dimensions'
import { Button } from 'reactstrap'

const IndicatorDetails = ({IndicatorSubDetails, IndicatorId}) => {
    const [indicatorData, setIndicatorData] = useState({})
    const [dimensionLevels, setDimensionLevels] = useState([])
    const [selectedDimensions, setSelectedDimensions] = useState([[]])

    const [values, setValues] = useState([[]])
    const [pageNumber, setPageNumber] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const getDimensionLevels = async  () => {
        await axios.get(`/DimensionsLevel/GetDimensionLevelsByDimension/0`)
        .then(response => {
            setDimensionLevels(response.data.data)
           })
           .catch(error => {
            setDimensionLevels([])
        })
    }
    const getIndicatorData = async () => {
        await axios.get(`/Indicator/GetIndicator/${IndicatorId}`)
        .then(response => {
            setIndicatorData(response.data.data)
           })
           .catch(error => {
            setIndicatorData({})
        })
    }
    const getDatasetValues = async () => {
        let DimensionsValues = []
        for (let i = 0; i < selectedDimensions.length; i++) {
            DimensionsValues = [...DimensionsValues, ...selectedDimensions[i]]
        }
        console.log(DimensionsValues)
        const postObj = {
            IndicatorId,
            SourceId: IndicatorSubDetails.sourceId,
            PeriodicityId: IndicatorSubDetails.periodicityId,
            DimensionsValues,
            pageNumber,
            rowsPerPage
        }
        await axios.post(`/Dataset/GetAllDatasetValuesWithPagination`, postObj)
        .then(response => {
            setValues(response.data.data)
           })
           .catch(error => {
            setValues([])
        })
    }
    const dimensionValuesStateHandler = (list, orderLevel) => {
        const values = []
        for (let i = 0; i < list.length; i++) {
            values.push(list[i].id)
        }
        selectedDimensions[orderLevel] = values
        setSelectedDimensions(selectedDimensions)
    }

    const addDimensionHandler = () => {
        setSelectedDimensions([...selectedDimensions, []])
    }
    
    useEffect(() => {
        getDimensionLevels()
        getIndicatorData()
    }, [])

    return (
        <>
          <h2>Details</h2>
          {selectedDimensions.map((item, idx) => (
              <Dimensions selectedDimensions={selectedDimensions[idx]} key={idx} addDimensionHandler={addDimensionHandler} dimensionValuesStateHandler={dimensionValuesStateHandler} orderLevel={idx} dimensionLevels={dimensionLevels}></Dimensions>
          ))}
           <Button.Ripple style={{position: 'absolute', left: '5%' }} color='primary' onClick={getDatasetValues} >
             بحث
          </Button.Ripple>
         
        </>
    )
}

export default IndicatorDetails
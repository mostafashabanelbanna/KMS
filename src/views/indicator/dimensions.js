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

import { FaPlus } from "react-icons/fa"

const Dimensions = ({dimensionLevels, dimensionValuesStateHandler, addDimensionHandler, orderLevel, selectedDimensions}) => {
    const [dimensionValues, setDimensionValues] = useState([])
    const [selectedDimensionValues, setSelectedDimensionValues] = useState([])
    const SelectAllOption = {name_A: "أختيار الكل", id: 0}
    const intl = useIntl()

    const getDimensionValues = async (dimensionId, levelNumber) => {
        await axios.get(`/DimensionValue/GetDimensionValuesForDataset/${dimensionId}/${levelNumber}`).then(response => {
            if (response) {
                setDimensionValues([SelectAllOption, ...response.data.data])
            }
        }).catch(error => {
            setDimensionValues([])
        })
    }
    const handleDimensionLevelsChange = (e) => {
        if (e) {
            getDimensionValues(e.dimensionId, e.levelNumber)
        }
      }

    const handleDimensionValuesChange = (e) => {
        let selectedValues = [...dimensionValues]
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
        setSelectedDimensionValues(selectedValues)
        dimensionValuesStateHandler(selectedValues, orderLevel)
    }
    return (        
        <Row className="mb-2" >
            <Col md={3} >
                <Label> البعد</Label>
                <Select
                    isClearable={true}
                    placeholder={intl.formatMessage({id: "Select"})}
                    theme={selectThemeColors}
                    getOptionLabel={(option) => option.name_A}
                    getOptionValue={(option) => option.levelNumber}
                    name='dimensionLevels'
                    id='dimensionLevels'
                    options={dimensionLevels}
                    className='react-select'
                    classNamePrefix='select'
                    onChange={e => handleDimensionLevelsChange(e) }
                />
            </Col>
            <Col md={8}>
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
                    value={selectedDimensionValues}
                    onChange={e => handleDimensionValuesChange(e) }
                />
            </Col>
            <Col md={1} className="align-items-center col-md-1 d-flex">
                <FaPlus style={{ cursor:'pointer', color: 'green'}} onClick={addDimensionHandler} size={20}/>
            </Col>
        </Row>
    )
}

export default Dimensions
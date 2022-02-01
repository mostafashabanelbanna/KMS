import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Select from 'react-select'
import { FormGroup, Label } from 'reactstrap'
import { useIntl } from 'react-intl'
import { selectThemeColors } from '@utils'

import { getAllClassifications, getClassificationValues, getIndicators } from "../store/action"

const ExportExcel = () => {
    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.datasets)

    // ** States
    const [classification, setClassification] = useState(null)
    const [classificationValue, setClassificationValue] = useState(null)

    useEffect(() => {
        dispatch(getAllClassifications()) 
    }, [])

    useEffect(() => {
        dispatch(getClassificationValues(classification)) 
    }, [classification])

    useEffect(() => {
        dispatch(getIndicators(classificationValue)) 
    }, [classificationValue])

    const handleClassificationsChange = (event) => {
        setClassification(event.id)
    }
    
    const handleClassificationValuesChange = (event) => {
        setClassificationValue(event.id)
    }
    // Import localization files
    const intl = useIntl()

    return (
        <div>
             <h1>
                ExportExcel
            </h1>
            <FormGroup>
              <Label>{intl.formatMessage({id: "Classifications"})}</Label>
              <Select
                isClearable={false}
                theme={selectThemeColors}
                name='classifications'
                id='classifications'
                options={store.classifications}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                className='react-select'
                classNamePrefix='select'
                onChange={e => handleClassificationsChange(e) }
              />
            </FormGroup>
            { classification ? <FormGroup>
              <Label>{intl.formatMessage({id: "classificationValues"})}</Label>
              <Select
                isClearable={false}
                theme={selectThemeColors}
                name='classificationValues'
                id='classificationValues'
                options={store.classificationValues}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                className='react-select'
                classNamePrefix='select'
                onChange={e => handleClassificationValuesChange(e) }
              />
            </FormGroup> : null}
            { classificationValue ? <FormGroup>
              <Label>{intl.formatMessage({id: "Indicators"})}</Label>
              <Select
                isClearable={false}
                theme={selectThemeColors}
                name='indicators'
                id='indicators'
                options={store.indicators}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                className='react-select'
                classNamePrefix='select'
                onChange={e => handleClassificationValuesChange(e) }
              />
            </FormGroup> : null}
        </div>   
    )
}

export default ExportExcel
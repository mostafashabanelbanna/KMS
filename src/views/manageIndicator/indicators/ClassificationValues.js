import { useState, useEffect } from "react"
import { Row, Col, FormGroup, Label } from 'reactstrap'
import Select from 'react-select'
import { useIntl } from "react-intl"
import { useDispatch, useSelector  } from 'react-redux'
import { selectThemeColors } from '@utils'

import axios from '../../../axios'

const ClassificationValues = ({index}) => {
        // ** Store Vars
        const dispatch = useDispatch()
        const store = useSelector(state => state.indicators)
      
    
    const [classificationValues, setClassificationValues] = useState([])
    const [allClassificationValues, setAllClassificationValues] = useState([])

    const [allClassifications, setAllClassifications] = useState([])
    const [classification, setClassification] = useState(null)
 
    const getAllClassifications = async () => {
     const response = await axios
       .get('Classification/GetClassifications')
       .catch((err) => console.log("Error", err)) //handle errors
 
       if (response && response.data) {
           setAllClassifications(response.data.data)
       }
    } 
  
 
     useEffect(() => {
         getAllClassifications()
     }, [])
 
 
    const handleClassificationsChange = event => {
      setClassification(event.id)
 
   }


    const getAllClassificationValues = async () => {
        const response = await axios
        .get(`/ClassificationValue/GetClassificationValues/${classification}`)
        .catch((err) => console.log("Error", err)) //handle errors

        if (response && response.data) {
            setAllClassificationValues(response.data.data)
        }
    }
    
        useEffect(() => {
            setClassificationValues([])
            getAllClassificationValues()
        }, [classification])
    
    
        const handleClassificationValuesChange = event => {
            setClassificationValues(event)
        }
    
    const intl = useIntl()
    
    // console.log(classificationValues)
    return (
        <Row className="mx-0">
            <Col sm='6' >
        <FormGroup>
            <Label for='name'>
                {intl.formatMessage({id: "Classifications"})}
            </Label>
            <Select
                placeholder="تحديد"
                isClearable={false}
                theme={selectThemeColors}
                name='classifications'
                id='classifications'
                options={allClassifications}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                className='react-select'
                classNamePrefix='select'
                onChange={e => handleClassificationsChange(e) }
            />
            </FormGroup>
            </Col>
            <Col sm='6' >
        <FormGroup>
           <Label>{intl.formatMessage({id: "Classification Values"})}</Label>
              <Select
                placeholder="تحديد"
                isClearable={false}
                theme={selectThemeColors}
                isMulti
                name='classificationValues'
                id='classificationValues'
                options={allClassificationValues}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                className='react-select'
                classNamePrefix='select'
                value={classificationValues}
                onChange={e => handleClassificationValuesChange(e) }
              />
         </FormGroup>
         
            </Col>
        </Row>
    )
}

export default ClassificationValues
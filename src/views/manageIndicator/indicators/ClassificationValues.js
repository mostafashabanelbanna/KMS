import { useState, useEffect } from "react"
import { Row, Col, FormGroup, Label } from 'reactstrap'
import Select from 'react-select'
import { useIntl } from "react-intl"
import { useDispatch, useSelector  } from 'react-redux'
import { selectThemeColors } from '@utils'
import { toast } from 'react-toastify'
import Toastr from '../../../containers/toastr/Toastr'
import axios from '../../../axios'

const ClassificationValues = ({selectedIndicator, index }) => {
    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.indicators)
    const notify = (type, message) => {
        return toast.success(
            <Toastr type={type} message={message} />,
            { 
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true 
            })
    }
    const [classification, setClassification] = useState(null)
    const [allClassificationValues, setAllClassificationValues] = useState([])

    const validateClassification = id => {
        let isValidated = true
        for (let i = 0; i < store.selectedClassificationValues.length; i++) {
            if (id === store.selectedClassificationValues[i].id && index !== i) {
                isValidated = false
            }
        }
        if (!isValidated) {
            notify('error', "هذا التصنيف مستخدم من قبل")
            // setClassification(null)
            setAllClassificationValues([])
            const temp = store.selectedClassificationValues
            temp[index].id = 0
            temp[index].name = ''
            temp[index].classificationValues = []
            dispatch({type:"SET_SELECTED_CLASSIFICATION_VALUES", selectedClassificationValues: temp})
        }
        return isValidated
    }
 
    const handleClassificationsChange = event => {
        const isValid = validateClassification(event.id)
        if (isValid) {
            if (event) {
                // setClassification(event)
                const temp = store.selectedClassificationValues
                temp[index].id = event.id
                temp[index].name = event.name
                temp[index].classificationValues = []
                dispatch({type:"SET_SELECTED_CLASSIFICATION_VALUES", selectedClassificationValues: temp})
            } 
        }
     
   }


    const getAllClassificationValues = async () => {
        if (store.selectedClassificationValues[index]) {
            const response = await axios
            .get(`/ClassificationValue/GetClassificationValues/${store.selectedClassificationValues[index].id}`)
            .catch((err) => console.log("Error", err)) //handle errors
    
            if (response && response.data) {
                setAllClassificationValues(response.data.data)
            }
        }
      
    }
    
    useEffect(() => {
        const temp = store.selectedClassificationValues
        // temp[index].classificationValues = []
        dispatch({type:"SET_SELECTED_CLASSIFICATION_VALUES", selectedClassificationValues: temp})
        getAllClassificationValues()
    }, [store.selectedClassificationValues[index].id])
    
    
    const handleClassificationValuesChange = event => {
        
        const temp = store.selectedClassificationValues
        temp[index].classificationValues = event
        dispatch({type:"SET_SELECTED_CLASSIFICATION_VALUES", selectedClassificationValues: temp})
    }
    
    const intl = useIntl()
    return (
        <Row className="mx-0">
            <Col sm='6' >
        <FormGroup>
            <Label for='name'>
                {intl.formatMessage({id: "Classifications"})}
            </Label>
            <Select
                value={store.selectedClassificationValues[index]}
                placeholder="تحديد"
                isClearable={false}
                theme={selectThemeColors}
                name='classifications'
                id='classifications'
                options={store.allClassifications}
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
                value={store.selectedClassificationValues[index].classificationValues}
                onChange={e => handleClassificationValuesChange(e) }
              />
         </FormGroup>
         
            </Col>
        </Row>
    )
}

export default ClassificationValues
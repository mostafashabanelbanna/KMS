import { useState, useEffect } from "react"
import { Row, Col, FormGroup, Label } from 'reactstrap'
import Select from 'react-select'
import { useIntl } from "react-intl"
import { useDispatch, useSelector  } from 'react-redux'
import { selectThemeColors } from '@utils'
import { toast } from 'react-toastify'
import Toastr from '../../../containers/toastr/Toastr'
import axios from '../../../axios'

const Units = ({ index }) => {
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
    const [unitLabel, setUnitLabel] = useState(null)
    const [allUnitMeasurs, setAllUnitMeasurs] = useState([])

    const validateUnitLabel = id => {
        let isValidated = true
        for (let i = 0; i < store.selectedUnits.length; i++) {
            if (id === store.selectedUnits[i].id && index !== i) {
                isValidated = false
            }
        }
        if (!isValidated) {
            notify('error', "وحدة قياس مستخدمة من قبل")
            // setUnitLabel(null)
            setAllUnitMeasurs([])
            const temp = store.selectedUnits
            temp[index].id = 0
            temp[index].name = ''
            temp[index].unitMeasures = []
            dispatch({type:"SET_SELECTED_UNITS", selectedUnits: temp})
        }
        return isValidated
    }
 
    const handleUnitLabelsChange = event => {
        const isValid = validateUnitLabel(event.id)
        if (isValid) {
            if (event) {
                // setUnitLabel(event)
                const temp = store.selectedUnits
                temp[index].id = event.id
                temp[index].name = event.name
                temp[index].unitMeasures = []
                dispatch({type:"SET_SELECTED_UNITS", selectedUnits: temp})
            } 
        }
     
   }


    const getAllUnitMeasurs = async () => {
        if (store.selectedUnits[index]) {
            const response = await axios
            .get('UnitMeasure/GetUnitMeasures')
            .catch((err) => console.log("Error", err)) //handle errors
            console.log(response)
            if (response && response.data) {
                setAllUnitMeasurs(response.data.data)
            }
        }
      
    }
    
    useEffect(() => {
        const temp = store.selectedUnits
        // temp[index].unitMeasures = []
        dispatch({type:"SET_SELECTED_UNITS", selectedUnits: temp})
        getAllUnitMeasurs()
    }, [store.selectedUnits[index].id])
    
    
    const handleUnitMeasursChange = event => {
        const temp = store.selectedUnits
        temp[index].unitMeasures = event
        dispatch({type:"SET_SELECTED_UNITS", selectedUnits: temp})
    }
    
    const intl = useIntl()
    
    return (
        <Row className="mx-0">
            <Col sm='6' >
        <FormGroup>
            <Label for='name'>
                {intl.formatMessage({id: "Unit Labels"})}
            </Label>
            <Select
                value={store.selectedUnits[index]}
                placeholder="تحديد"
                isClearable={false}
                theme={selectThemeColors}
                name='unitLabel'
                id='unitLabel'
                options={store.allUnitLabels}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                className='react-select'
                classNamePrefix='select'
                onChange={e => handleUnitLabelsChange(e) }
            />
            </FormGroup>
            </Col>
            <Col sm='6' >
        <FormGroup>
           <Label>{intl.formatMessage({id: "Unit Measures"})}</Label>
              <Select
                placeholder="تحديد"
                isClearable={false}
                theme={selectThemeColors}
                isMulti
                name='unitMeasures'
                id='unitMeasures'
                options={allUnitMeasurs}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                className='react-select'
                classNamePrefix='select'
                value={store.selectedUnits[index].unitMeasures}
                onChange={e => handleUnitMeasursChange(e) }
              />
         </FormGroup>
         
            </Col>
        </Row>
    )
}

export default Units
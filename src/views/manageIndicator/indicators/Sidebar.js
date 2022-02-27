// ** React Import
import { useState, useEffect } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'
import Toastr from '../../../containers/toastr/Toastr'

// ** Utils
import { isObjEmpty, getSelected, selectThemeColors, convertSelectArr } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import CustomInput from 'reactstrap/lib/CustomInput'
import { Button, FormGroup, Label, FormText, Form, Input } from 'reactstrap'
import Row from 'reactstrap/lib/Row'
import Col from 'reactstrap/lib/Col'
import { toast } from 'react-toastify'
import { useIntl } from 'react-intl'

// Axios
import axios from '../../../axios'


// ** Store & Actions
import { addIndicator, resetCreateResponse, updateIndicator, resetUpdateResponse } from './store/action'
import { useDispatch, useSelector  } from 'react-redux'
import ClassificationValues from './ClassificationValues'
import Units from './Units'
// import ClassificationValues from './ClassificationValues'

const SidebarNewIndicator = ({ open, toggleSidebar, selectedIndicator }) => {
    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.indicators)
  
   // ** States
   const [periodicities, setPeriodicities] = useState([])
   const [allPeriodicities, setAllPeriodicities] = useState([])

   const [sources, setSources] = useState([])
   const [allSources, setAllSources] = useState([])

   const [dimensionLevels, setDimenionLevels] = useState([])
   const [allDimensionLevels, setAllDimensionLevels] = useState([])

  // Import localization files
  const intl = useIntl()
  // Toastr notify function
  const notify = (type, message) => {
    return toast.success(
      <Toastr type={type} message={message} />,
      { position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true 
      })
  }

  // fetch all Periodicities options
  const getAllPeriodicities = async () => {
    const response = await axios
      .get('/Periodicity/GetPeriodicities')
      .catch((err) => console.log("Error", err)) //handle errors

      if (response && response.data) {
        setAllPeriodicities(response.data.data)
      }
    } 
console.log(periodicities)
  // fetch all Periodicities options
  const getAllSources = async () => {
    const response = await axios
      .get('Source/GetSources')
      .catch((err) => console.log("Error", err)) //handle errors

      if (response && response.data) {
        setAllSources(response.data.data)
      }
    } 
    const getAllClassifications = async () => {
      const response = await axios
        .get('Classification/GetClassifications')
        .catch((err) => console.log("Error", err)) //handle errors
  
        if (response && response.data) {
            dispatch({type: 'SET_ALL_CLASSIFICATIONS', allClassifications: response.data.data})
        }
     } 

  const getAllUnitLabels = async () => {
    const response = await axios
      .post(`/Lookups/GetLookupValues/`, {lookupName: "UnitLabel"})
      .catch((err) => console.log("Error", err)) //handle errors
     
      if (response && response.data) {
          dispatch({type: 'SET_ALL_UNIT_LABELS', allUnitLabels: response.data.data})
      }
  } 
  const getAllDimensionLevels = async () => {
    const response = await axios
      .get('DimensionsLevel/GetDimensionLevels')
      .catch((err) => console.log("Error", err)) //handle errors

      if (response && response.data) {
        setAllDimensionLevels(response.data.data)
      }
    } 
  useEffect(() => {
    getAllPeriodicities()
    getAllSources()
    getAllClassifications()
    getAllUnitLabels()
    getAllDimensionLevels()
  }, [])

  const addClassificationValue = () => {
    if (store.selectedClassificationValues.length < store.allClassifications.length) {
      const addedObj = {
        // id: null,
        classificationValues: []
      }
      dispatch({type: 'SET_SELECTED_CLASSIFICATION_VALUES', selectedClassificationValues: [...store.selectedClassificationValues, addedObj]})    
    }
  
  }

  const addUnit = () => {
    if (store.selectedUnits.length < store.allUnitLabels.length) {
      const addedObj = {
        // unitLabelId: 0,
        unitMeasures: []
      }
      dispatch({type: 'SET_SELECTED_UNITS', selectedUnits: [...store.selectedUnits, addedObj]})    
    }
  
  }

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

   // pass only role id to userRoles
   const handlePeriodicitiesChange = (event) => {
     const options = []
     event.map(opt => options.push(opt.id))
     setPeriodicities(options)
  }
    
  useEffect(() => {
    if (selectedIndicator.indicatorPeriodicities) {
      handlePeriodicitiesChange(selectedIndicator.indicatorPeriodicities)
    }
  }, [selectedIndicator])

  const handleSourcesChange = (event) => {
    const options = []
    event.map(opt => options.push(opt.id))
    setSources(options)
  }

  const handleDimensionLevelsChange = (event) => {
    setDimenionLevels(event)
  }
  
  // ** Function to handle form submit
  const onSubmit = async values => {
    const classificationValues = []
    for (let i = 0; i < store.selectedClassificationValues.length; i++) {
      store.selectedClassificationValues[i].classificationValues.map(item => {
        classificationValues.push(item.id)
      })
    }

    const units = []

    for (const selectedUnit of store.selectedUnits) {
     for (const unitMeasure of selectedUnit.unitMeasures) {
       units.push({unitLabelId : selectedUnit.id, unitMeasureId: unitMeasure.id})
      }      
    }

    const tempDimensionLevels = []
    for (const dimensionLevel of dimensionLevels) {
      tempDimensionLevels.push(dimensionLevel.id)
         
    }

    if (isObjEmpty(errors)) {
      if (!selectedIndicator.id) {
   
        await dispatch(
            addIndicator({
              name_A: values.name,
              name_E: values.nameE,
              description_A: values.descriptionA,
              description_E: values.descriptionE,
              acquisition_A: values.acquisitionA,
              acquisition_E: values.acquisitionE,
              calculation_A: values.calculationA,
              calculation_E: values.calculationE,
              url: values.url,
              sortIndex: values.sortIndex,
              focus: values.focus,
              active: values.active,
              periodicities,
              sources,
              classificationValues,
              units,
              indicatorDimensions:tempDimensionLevels
            })
          )
      } else {
        await dispatch(
          updateIndicator(
            {
              name_A: values.name,
              name_E: values.nameE,
              description_A: values.descriptionA,
              description_E: values.descriptionE,
              acquisition_A: values.acquisitionA,
              acquisition_E: values.acquisition_E,
              calculation_A: values.calculationA,
              calculation_E: values.calculation_E,
              url: values.url,
              sortIndex: values.sortIndex,
              focus: values.focus,
              active: values.active,
              periodicities,
              sources, 
              classificationValues,
              units,
              indicatorDimensions: tempDimensionLevels,
              id: selectedIndicator.id
            }
          )
        )
      }
     
    }
  }
  
  useEffect(() => {
    const code = store.createResponse.statusCode
    if (code !== 0) {
     
       if (code === 200) {
            notify('success', intl.formatMessage({id: "AddSuccess"}))
            toggleSidebar(1)
      } else if (code === 6) {
         notify('error', intl.formatMessage({id: store.createResponse.errors[0]}))

      } else if (code === 5) {
        notify('error', intl.formatMessage({id: "InvalidFileExtension"}))
      } else if (code === 1) {
        notify('error', `${intl.formatMessage({id: "CreationFialed"})} ${intl.formatMessage({id: "User"})}`)

      } else if (code === 500) {
        notify('error', `${intl.formatMessage({id: "InternalServerError"})} `)

      } 
      dispatch(resetCreateResponse())
    }
  }, [store.createResponse.statusCode])

  useEffect(() => {
    const code = store.updateResponse.statusCode
    if (code !== 0) {
       if (code === 200) {
            notify('success', intl.formatMessage({id: "UpdateSuccess"}))
            toggleSidebar(1)
      } else if (code === 6) {
        notify('error', intl.formatMessage({id: store.updateResponse.errors[0]}))
     } else if (code === 5) {
      notify('error', intl.formatMessage({id: "InvalidFileExtension"}))
     } else if (code === 3) {
       notify('error', `${intl.formatMessage({id: "UpdateFailed"})} ${intl.formatMessage({id: "Indicator"})}`)
     } else if (code === 500) {
       notify('error', `${intl.formatMessage({id: "InternalServerError"})} `)
     } 
     dispatch(resetUpdateResponse())
    }
  }, [store.updateResponse.statusCode])

  useEffect(() => {
   if (selectedIndicator.id) {
      dispatch({type:"SET_SELECTED_CLASSIFICATION_VALUES", selectedClassificationValues: selectedIndicator.indicatorClassifications})
      dispatch({type:"SET_SELECTED_UNITS", selectedUnits: selectedIndicator.indicatorUnitDTOs})
   }
  }, [selectedIndicator])

  
  const data = [
    {
      label: 'location',
      id: 999,
      options: [
          {id: '1,1', name: 'بلاد', did: 5},
          {id: '1,2', name: 'محافظات'}
      ]
    },
    {
      label: 'gender',
      id: 333,
  
        options: [
            {id: '2,1', name: 'male'},
            {id: '2,2', name: 'female'}
        ]
    }
  ]

 
  return (
    <Sidebar
      size='lg'
      open={open}
      title={selectedIndicator.id ? intl.formatMessage({id: "Edit"}) : intl.formatMessage({id: "Add"}) }
      className="bigger_modal"
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      // width={'}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="mx-0">
            <Col sm='6' >
        <FormGroup>
            <Label for='name'>
                {intl.formatMessage({id: "Dimensions"})}
            </Label>
            <Select
               defaultValue={selectedIndicator ? selectedIndicator.indicatorDimensions : []}
                isMulti
                placeholder="تحديد"
                isClearable={false}
                theme={selectThemeColors}
                name='dimensions'
                id='dimensions'
                options={allDimensionLevels}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                className='react-select'
                classNamePrefix='select'
                onChange={e => handleDimensionLevelsChange(e) }
            />
            </FormGroup>
            </Col>
          </Row>
            <div  className='my-2' style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={addUnit}>+ إضافة وحدات </div>
              {store.selectedUnits.map((item, index) => {
                return <Units selectedIndicator={selectedIndicator} index={index} key={index}/>
            })}
            {store.selectedUnits.length > 0 ? <div className='mx-auto my-2' style={{borderBottom: '1px solid', width: '80%'}}></div> : null}

            <div className='my-2' style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={addClassificationValue}>+ إضافة قيم التصنيف </div>
            {store.selectedClassificationValues.map((item, index) => {
              return <ClassificationValues selectedIndicator={selectedIndicator} index={index} key={index}/>
            })}
            {store.selectedClassificationValues.length > 0 ? <div className='mx-auto my-2' style={{borderBottom: '1px solid', width: '80%'}}></div> : null}
          <Row className="mx-0">
            <Col sm='6' >
        <FormGroup>
          <Label for='name'>
            <span className='text-danger'>*</span> {intl.formatMessage({id: "Name"})}
          </Label>
          <Input
            name='name'
            id='name'
            defaultValue={selectedIndicator ? selectedIndicator.name_A : ''}
            placeholder={intl.formatMessage({id: "Name"})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['name'] })}
          />
        </FormGroup>
        </Col>
        <Col sm='6' >
        <FormGroup>
          <Label for='nameE'>
            {intl.formatMessage({id: "Name In English"})}
          </Label>
          <Input
            name='nameE'
            id='nameE'
            defaultValue={selectedIndicator ? selectedIndicator.name_E : ''}
            placeholder={intl.formatMessage({id: "Name In English"})}
            innerRef={register({ required:  false})}
            className={classnames({ 'is-invalid': errors['nameE'] })}
          />
        </FormGroup>
        </Col>
        </Row>
        <Row className="mx-0">
            <Col sm='6' >
        <FormGroup>
          <Label for='descriptionA'>
           {intl.formatMessage({id: "Description"})}
          </Label>
          <Input
            name='descriptionA'
            id='descriptionA'
            defaultValue={selectedIndicator ? selectedIndicator.description_A : ''}
            placeholder={intl.formatMessage({id: "Description"})}
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['Description'] })}
          />
        </FormGroup>
        </Col>
        <Col sm='6' >
        <FormGroup>
          <Label for='descriptionE'>
            {intl.formatMessage({id: "descriptionE"})}
          </Label>
          <Input
            name='descriptionE'
            id='descriptionE'
            defaultValue={selectedIndicator ? selectedIndicator.description_E : ''}
            placeholder={intl.formatMessage({id: "descriptionE"})}
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['descriptionE'] })}
          />
        </FormGroup>
   
       
</Col>
        </Row>
        <Row className="mx-0">
            <Col sm='6' >
            <FormGroup>
          <Label for='acquisitionA'>
             {intl.formatMessage({id: "acquisitionA"})}
          </Label>
          <Input
            name='acquisitionA'
            id='acquisitionA'
            defaultValue={selectedIndicator ? selectedIndicator.acquisition_A : ''}
            placeholder={intl.formatMessage({id: "acquisitionA"})}
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['acquisitionA'] })}
          />
        </FormGroup>
            </Col>
            <Col sm='6' >
            <FormGroup>
          <Label for='acquisitionE'>
           {intl.formatMessage({id: "acquisitionE"})}
          </Label>
          <Input
            name='acquisitionE'
            id='acquisitionE'
            defaultValue={selectedIndicator ? selectedIndicator.acquisition_E : ''}
            placeholder={intl.formatMessage({id: "acquisitionE"})}
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['acquisitionE'] })}
          />
        </FormGroup>
            </Col>
        </Row>
        <Row className="mx-0">
            <Col sm='6' >
              <FormGroup>
          <Label for='calculationA'>
             {intl.formatMessage({id: "calculationA"})}
          </Label>
          <Input
            name='calculationA'
            id='calculationA'
            defaultValue={selectedIndicator ? selectedIndicator.calculation_A : ''}
            placeholder={intl.formatMessage({id: "calculationA"})}
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['calculationA'] })}
          />
        </FormGroup>
        </Col>
            <Col sm='6' >
            <FormGroup>
          <Label for='calculationE'>
           {intl.formatMessage({id: "calculationE"})}
          </Label>
          <Input
            name='calculationE'
            id='calculationE'
            defaultValue={selectedIndicator ? selectedIndicator.calculation_E : ''}
            placeholder={intl.formatMessage({id: "calculationE"})}
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['calculationE'] })}
          />
        </FormGroup>
            </Col>
        </Row>
        <Row className="mx-0">
            <Col sm='6' ><FormGroup>
          <Label for='url'>
           {intl.formatMessage({id: "url"})}
          </Label>
          <Input
            name='url'
            id='url'
            defaultValue={selectedIndicator ? selectedIndicator.url : ''}
            placeholder={intl.formatMessage({id: "url"})}
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['url'] })}
          />
        </FormGroup>
        </Col>
            <Col sm='6' >
            <FormGroup>
          <Label for='sortIndex'>
            <span className='text-danger'>*</span>{intl.formatMessage({id: "Sort Index"})}
          </Label>
          <Input
            type="number"
            name='sortIndex'
            id='sortIndex'
            defaultValue={selectedIndicator.sortIndex ? selectedIndicator.sortIndex : 0}
            placeholder={intl.formatMessage({id: "Sort Index"})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['sortIndex'] })}
          />
        </FormGroup>
            </Col>
        </Row>
        <Row className="mx-0">
            <Col sm='6' ><FormGroup>
              <Label>{intl.formatMessage({id: "Periodicities"})}</Label>
              <Select
                placeholder="تحديد"
                isClearable={false}
                theme={selectThemeColors}
                defaultValue={selectedIndicator ? selectedIndicator.indicatorPeriodicities : []}
                isMulti
                name='periodicities'
                id='periodicities'
                options={allPeriodicities}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                className='react-select'
                classNamePrefix='select'
                onChange={e => handlePeriodicitiesChange(e) }
              />
          </FormGroup></Col>
            <Col sm='6' >
               
          <FormGroup>
              <Label>{intl.formatMessage({id: "Sources"})}</Label>
              <Select
                placeholder="تحديد"
                isClearable={false}
                theme={selectThemeColors}
                defaultValue={selectedIndicator ? selectedIndicator.indicatorSources : []}
                isMulti
                name='sources'
                id='sources'
                options={allSources}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                className='react-select'
                classNamePrefix='select'
                onChange={e => handleSourcesChange(e) }
              />
          </FormGroup>
            </Col>
        </Row>
       
        <Row className="mx-0">
          <Col sm='6' >
            <FormGroup>
              <Input 
                type="checkbox" 
                placeholder="focus"  
                name="focus" 
                defaultChecked ={selectedIndicator ? selectedIndicator.focus : false}
                innerRef={register()} />
                  <Label for='focus'>
                {intl.formatMessage({id: "Focus"})}
              </Label>
            </FormGroup>
          </Col>
          <Col sm='6' >
            <FormGroup>
              <Input 
                type="checkbox" 
                placeholder="active"  
                name="active" 
                defaultChecked ={selectedIndicator ? selectedIndicator.active : false}
                innerRef={register()}
                />
                 <Label for='active'>
                  {intl.formatMessage({id: "Active"})}
                  
                  </Label>
            </FormGroup>
          </Col>
        </Row>

        <Button type='submit' className='mr-1' color='primary'>
          {intl.formatMessage({id: "Save"}) }
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          {intl.formatMessage({id: "Cancel"}) }
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewIndicator


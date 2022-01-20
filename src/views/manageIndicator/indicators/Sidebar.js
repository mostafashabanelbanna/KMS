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
import Select, { components } from 'react-select'
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

const SidebarNewIndicator = ({ open, toggleSidebar, selectedIndicator }) => {
   // ** States
   const [periodicities, setPeriodicities] = useState([])
   const [allPeriodicities, setAllPeriodicities] = useState([])

   const [sources, setSources] = useState([])
   const [allSources, setAllSources] = useState([])
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
      .post('Lookups/GetLookupValues', { lookupName: "periodicity" })
      .catch((err) => console.log("Error", err)) //handle errors

      if (response && response.data) {
        setAllPeriodicities(response.data.data)
      }
    } 

  // fetch all Periodicities options
  const getAllSources = async () => {
    const response = await axios
      .get('Source/GetSources')
      .catch((err) => console.log("Error", err)) //handle errors

      if (response && response.data) {
        setAllSources(response.data.data)
      }
    } 

  useEffect(() => {
    getAllPeriodicities()
    getAllSources()
  }, [])

 
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.indicators)

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

   // pass only role id to userRoles
   const handlePeriodicitiesChange = (event) => {
    const options = []
    event.map(opt => options.push(opt.value))
    setPeriodicities(options)
  }

  const handleSourcesChange = (event) => {
    const options = []
    event.map(opt => options.push(opt.value))
    setSources(options)
  }

  // ** Function to handle form submit
  const onSubmit = async values => {
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
              sources
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
     resetUpdateResponse() 
    }
  }, [store.updateResponse.statusCode])

  return (
    <Sidebar
      size='lg'
      open={open}
      title={intl.formatMessage({id: "Add"}) }
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
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
        <FormGroup>
          <Label for='descriptionA'>
           <span className='text-danger'>*</span> {intl.formatMessage({id: "Description"})}
          </Label>
          <Input
            name='descriptionA'
            id='descriptionA'
            defaultValue={selectedIndicator ? selectedIndicator.description_A : ''}
            placeholder={intl.formatMessage({id: "Description"})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['Description'] })}
          />
        </FormGroup>
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
        <FormGroup>
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
        <FormGroup>
          <Label for='sortIndex'>
            <span className='text-danger'>*</span>{intl.formatMessage({id: "Sort Index"})}
          </Label>
          <Input
            type="number"
            name='sortIndex'
            id='sortIndex'
            defaultValue={selectedIndicator ? selectedIndicator.sortIndex : 0}
            placeholder='0'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['sortIndex'] })}
          />
        </FormGroup>
        <FormGroup>
              <Label>{intl.formatMessage({id: "Periodicities"})}</Label>
              <Select
                isClearable={false}
                theme={selectThemeColors}
                defaultValue={selectedIndicator ? (selectedIndicator.indicatorPeriodicities ? convertSelectArr(selectedIndicator.indicatorPeriodicities) : null) : []}
                isMulti
                name='periodicities'
                id='periodicities'
                options={convertSelectArr(allPeriodicities)}
                className='react-select'
                classNamePrefix='select'
                onChange={e => handlePeriodicitiesChange(e) }
              />
          </FormGroup>
          <FormGroup>
              <Label>{intl.formatMessage({id: "Sources"})}</Label>
              <Select
                isClearable={false}
                theme={selectThemeColors}
                defaultValue={selectedIndicator ? (selectedIndicator.indicatorSources ? convertSelectArr(selectedIndicator.indicatorSources) : null) : []}
                isMulti
                name='sources'
                id='sources'
                options={convertSelectArr(allSources)}
                className='react-select'
                classNamePrefix='select'
                onChange={e => handleSourcesChange(e) }
              />
          </FormGroup>
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


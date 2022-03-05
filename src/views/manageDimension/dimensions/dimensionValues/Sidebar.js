// ** React Import
import { useState, useEffect } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'
import Toastr from '../../../../containers/toastr/Toastr'

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
import axios from '../../../../axios'


// ** Store & Actions
import { addDimensionValue, resetCreateResponse, updateDimensionValue, resetUpdateResponse } from './store/action'
import { useDispatch, useSelector  } from 'react-redux'

const SidebarNewDimensionValue = ({dimensionId, open, toggleSidebar, selectedDimensionValue }) => {
   
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.dimensionValues)
  
   // ** States
   const [parent, setParent] = useState({})
   const [allDimensionValues, setAllDimensionValues] = useState([])

    // fetch all Periodicities options
    const getAllDimensionValues = async () => {
      const response = await axios
      .get(`DimensionValue/GetDimensionValues/${dimensionId}`)
      .catch((err) => console.log("Error", err)) //handle errors
      if (response && response.data) {
        setAllDimensionValues(response.data.data)
      }
    } 

    
    useEffect(() => {
      getAllDimensionValues()
    }, [])

      //set parent value for udate
   useEffect(() => {
    setParent(selectedDimensionValue.parent)
  }, [selectedDimensionValue.parent])

    // pass only role id to userRoles
   const handleDimensionValuesChange = (event) => {
     console.log(event)
    setParent(event)
  }
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


  // ** Vars
  const { register, errors, handleSubmit } = useForm()


  // ** Function to handle form submit
  const onSubmit = async values => {
    if (isObjEmpty(errors)) {
      if (!selectedDimensionValue.id) {
        await dispatch(
            addDimensionValue({
              name_A: values.name,
              name_E: values.nameE,
              description_A: values.descriptionA,
              description_E: values.descriptionE,
              icon: values.icon,
              color: values.color,
              dimensionId,
              parentId: parent.id,
              sortIndex: values.sortIndex,
              focus: values.focus,
              active: values.active
            })
          )
      } else {
        await dispatch(
          updateDimensionValue(
            {
              name_A: values.name,
              name_E: values.nameE,
              description_A: values.descriptionA,
              description_E: values.descriptionE,
              icon: values.icon,
              color: values.color,
              dimensionId,
              parentId: parent.id,
              sortIndex: values.sortIndex,
              focus: values.focus,
              active: values.active,
              id: selectedDimensionValue.id
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
       notify('error', `${intl.formatMessage({id: "UpdateFailed"})} ${intl.formatMessage({id: "Dimension Value"})}`)
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
      title={selectedDimensionValue.id ? intl.formatMessage({id: "Edit"}) : intl.formatMessage({id: "Add"}) }
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
            defaultValue={selectedDimensionValue ? selectedDimensionValue.name_A : ''}
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
            defaultValue={selectedDimensionValue ? selectedDimensionValue.name_E : ''}
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
            defaultValue={selectedDimensionValue ? selectedDimensionValue.description_A : ''}
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
            defaultValue={selectedDimensionValue ? selectedDimensionValue.description_E : ''}
            placeholder={intl.formatMessage({id: "descriptionE"})}
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['descriptionE'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='icon'>
             {intl.formatMessage({id: "Icon"})}
          </Label>
          <Input
            name='icon'
            id='icon'
            defaultValue={selectedDimensionValue ? selectedDimensionValue.icon : ''}
            placeholder={intl.formatMessage({id: "Icon"})}
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['icon'] })}
          />
        </FormGroup>
   
       
        <FormGroup>
          <Label for='color'>
             {intl.formatMessage({id: "Color"})}
          </Label>
          <Input
            name='color'
            id='color'
            defaultValue={selectedDimensionValue ? selectedDimensionValue.color : ''}
            placeholder={intl.formatMessage({id: "Color"})}
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['color'] })}
          />
        </FormGroup>
        <FormGroup>
              <Label>{intl.formatMessage({id: "parentId"})}</Label>
              <Select
                isClearable={false}
                theme={selectThemeColors}
                // defaultValue={selectedDimensionValue ?  selectedDimensionValue.parent : null}
                value={ parent }
                name='parent'
                id='parent'
                options={allDimensionValues}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                className='react-select'
                classNamePrefix='select'
                onChange={e => handleDimensionValuesChange(e) }
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
            defaultValue={selectedDimensionValue ? selectedDimensionValue.sortIndex : 0}
            placeholder='0'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['sortIndex'] })}
          />
        </FormGroup>
        <Row className="mx-0">
          <Col sm='6' >
            <FormGroup>
              <Input 
                type="checkbox" 
                placeholder="focus"  
                name="focus" 
                defaultChecked ={selectedDimensionValue ? selectedDimensionValue.focus : false}
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
                defaultChecked ={selectedDimensionValue ? selectedDimensionValue.active : false}
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

export default SidebarNewDimensionValue


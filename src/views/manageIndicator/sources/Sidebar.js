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
import { addSource, resetCreateResponse, updateSource, resetUpdateResponse } from './store/action'
import { useDispatch, useSelector  } from 'react-redux'

const SidebarNewSource = ({ open, toggleSidebar, selectedSource }) => {

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

 
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.sources)
  
  // ** Vars
  const { register, errors, handleSubmit } = useForm()


  // ** Function to handle form submit
  const onSubmit = async values => {
    if (isObjEmpty(errors)) {
      if (!selectedSource.id) {
        await dispatch(
            addSource({
              name_A: values.name,
              name_E: values.nameE,
              description_A: values.descriptionA,
              description_E: values.descriptionE,
              color: values.color,
              sortIndex: values.sortIndex,
              isNational: JSON.parse(values.isNational),
              isDefault: JSON.parse(values.isDefault),
              focus: JSON.parse(values.focus),
              active: JSON.parse(values.active)
            })
          )
      } else {
        await dispatch(
          updateSource(
            {
              name_A: values.name,
              name_E: values.nameE,
              description_A: values.descriptionA,
              description_E: values.descriptionE,
              color: values.color,
              sortIndex: values.sortIndex,
              isNational: JSON.parse(values.isNational),
              isDefault: JSON.parse(values.isDefault),
              focus: JSON.parse(values.focus),
              active: JSON.parse(values.active),
              id: selectedSource.id
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
       notify('error', `${intl.formatMessage({id: "UpdateFailed"})} ${intl.formatMessage({id: "Source"})}`)
     } else if (code === 500) {
       notify('error', `${intl.formatMessage({id: "InternalServerError"})} `)
     } 
     dispatch(resetUpdateResponse()) 
    }
  }, [store.updateResponse.statusCode])

  return (
    <Sidebar
      size='lg'
      open={open}
      title={selectedSource.id ? intl.formatMessage({id: "Edit"}) : intl.formatMessage({id: "Add"}) }
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for='name'>
             {intl.formatMessage({id: "Name"})} <span className='text-danger'>*</span>
          </Label>
          <Input
            name='name'
            id='name'
            defaultValue={selectedSource.id ? selectedSource.name_A : ''}
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
            defaultValue={selectedSource.id ? selectedSource.name_E : ''}
            placeholder={intl.formatMessage({id: "Name In English"})}
            innerRef={register({ required:  false})}
            className={classnames({ 'is-invalid': errors['nameE'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='descriptionA'>
            {intl.formatMessage({id: "Description"})} <span className='text-danger'>*</span>
          </Label>
          <Input
            name='descriptionA'
            id='descriptionA'
            type="textarea"
            defaultValue={selectedSource.id ? selectedSource.description_A : ''}
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
            type="textarea"
            defaultValue={selectedSource.id ? selectedSource.description_E : ''}
            placeholder={intl.formatMessage({id: "descriptionE"})}
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['descriptionE'] })}
          />
        </FormGroup>
   
       
        <FormGroup>
          <Label for='color'>
             {intl.formatMessage({id: "Color"})}
          </Label>
          <Input
            name='color'
            id='color'
            defaultValue={selectedSource.id ? selectedSource.color : ''}
            type="color"
            placeholder={intl.formatMessage({id: "Color"})}
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['color'] })}
          />
        </FormGroup>
      
        <FormGroup>
          <Label for='sortIndex'>
            {intl.formatMessage({id: "Sort Index"})} <span className='text-danger'>*</span>
          </Label>
          <Input
            type="number"
            name='sortIndex'
            id='sortIndex'
            defaultValue={selectedSource.id ? selectedSource.sortIndex : 0}
            placeholder='0'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['sortIndex'] })}
          />
        </FormGroup>
        <Row className="mx-0">
        <Col sm='6' >
            <FormGroup>
              <Input 
                value="true"
                type="checkbox" 
                placeholder={intl.formatMessage({id: "National"})}
                name="isNational" 
                defaultChecked ={selectedSource.id ? selectedSource.isNational : false}
                innerRef={register()} />
                  <Label for='isNational'>
                {intl.formatMessage({id: "National"})}
              </Label>
            </FormGroup>
          </Col>

          <Col sm='6' >
            <FormGroup>
              <Input 
                value="true"
                type="checkbox" 
                placeholder={intl.formatMessage({id: "Default"})}
                name="isDefault" 
                defaultChecked ={selectedSource.id ? selectedSource.isDefault : false}
                innerRef={register()} />
                  <Label for='isDefault'>
                {intl.formatMessage({id: "Default"})}
              </Label>
            </FormGroup>
          </Col>
          <Col sm='6' >
            <FormGroup>
              <Input 
                value="true"
                type="checkbox" 
                placeholder="focus"  
                name="focus" 
                defaultChecked ={selectedSource.id ? selectedSource.focus : false}
                innerRef={register()} />
                  <Label for='focus'>
                {intl.formatMessage({id: "Focus"})}
              </Label>
            </FormGroup>
          </Col>
          <Col sm='6' >
            <FormGroup>
              <Input 
                value="true"
                type="checkbox" 
                placeholder="active"  
                name="active" 
                defaultChecked ={selectedSource.id ? selectedSource.active : true}
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

export default SidebarNewSource


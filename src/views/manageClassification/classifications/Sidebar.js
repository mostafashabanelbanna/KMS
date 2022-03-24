// ** React Import
import { useState, useEffect } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, Form, Input } from 'reactstrap'
import { toast } from 'react-toastify'
import Row from 'reactstrap/lib/Row'
import Col from 'reactstrap/lib/Col'
import Toastr from '../../../containers/toastr/Toastr'

// ** Store & Actions
import { addClassification, updateClassification } from './store/action'
import { useDispatch, useSelector  } from 'react-redux'
import CustomInput from 'reactstrap/lib/CustomInput'
import { useIntl } from 'react-intl'


const SidebarRole = ({ open, toggleSidebar, selectedClassification }) => {

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
  const store = useSelector(state => state.classifications)

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // ** Function to handle form submit
  const onSubmit = async values => {
    if (isObjEmpty(errors)) {
      console.log(selectedClassification)
      if (!selectedClassification.id) {
        await dispatch(
          addClassification({
            name_A: values.name,
            name_E: values.nameE,
            description_A: values.descriptionA,
            description_E: values.descriptionE,
            icon: values.icon,
            sortIndex: values.sortIndex,
            focus: values.focus,
            active: values.active
            })
          )
      } else {
        await dispatch(
          updateClassification({
            id: selectedClassification.id,
            name_A: values.name,
            name_E: values.nameE,
            description_A: values.descriptionA,
            description_E: values.descriptionE,
            icon: values.icon,
            sortIndex: values.sortIndex,
            focus: values.focus,
            active: values.active
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

      } else if (code === 1) {
        notify('error', `${intl.formatMessage({id: "CreationFialed"})} ${intl.formatMessage({id: "Classification"})}`)

      } else if (code === 500) {
        notify('error', `${intl.formatMessage({id: "InternalServerError"})} `)

      } 
      dispatch({type: "RESET_CLASSIFICATION_CREATE_RESPONSE"})
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

     } else if (code === 3) {
       notify('error', `${intl.formatMessage({id: "UpdateFialed"})} ${intl.formatMessage({id: "Role"})}`)
     } else if (code === 500) {
       notify('error', `${intl.formatMessage({id: "InternalServerError"})} `)
     } 
     dispatch({type: "RESET_CLASSIFICATION_UPDATE_RESPONSE"})

    }
  }, [store.updateResponse.statusCode])

  return (
    <Sidebar
      size='lg'
      open={open}
      title={selectedClassification.id ? intl.formatMessage({id: "Edit"}) : intl.formatMessage({id: "Add"}) }
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
            defaultValue={selectedClassification ? selectedClassification.name_A : ''}
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
            defaultValue={selectedClassification ? selectedClassification.name_E : ''}
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
            defaultValue={selectedClassification ? selectedClassification.description_A : ''}
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
            defaultValue={selectedClassification ? selectedClassification.description_E : ''}
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
            defaultValue={selectedClassification ? selectedClassification.icon : ''}
            placeholder={intl.formatMessage({id: "Icon"})}
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['icon'] })}
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
            defaultValue={selectedClassification ? selectedClassification.sortIndex : 0}
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
                placeholder="focus"  
                name="focus" 
                defaultChecked ={selectedClassification ? selectedClassification.focus : false}
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
                defaultChecked ={selectedClassification ? selectedClassification.active : false}
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

export default SidebarRole


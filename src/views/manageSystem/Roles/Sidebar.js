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

// ** Store & Actions
import { addRole, updateRole } from './store/action'
import { useDispatch, useSelector  } from 'react-redux'
import CustomInput from 'reactstrap/lib/CustomInput'
import { useIntl } from 'react-intl'
import Row from 'reactstrap/lib/Row'
import Col from 'reactstrap/lib/Col'
import Toastr from '../../../containers/toastr/Toastr'

const SidebarRole = ({ open, toggleSidebar, selectedRole }) => {

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
  const store = useSelector(state => state.roles)

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // ** Function to handle form submit
  const onSubmit = async values => {
    if (isObjEmpty(errors)) {
      if (!selectedRole.id) {
        await dispatch(
            addRole({
                name: values.name,
                description: document.getElementById("description").value,
                sortIndex: values.sortIndex,
                focus: values.focus,
                active: values.active
            })
          )
      } else {
        await dispatch(
          updateRole({
                id: selectedRole.id,
                name: values.name,
                description: document.getElementById("description").value,
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
        notify('error', `${intl.formatMessage({id: "CreationFialed"})} ${intl.formatMessage({id: "Role"})}`)

      } else if (code === 500) {
        notify('error', `${intl.formatMessage({id: "InternalServerError"})} `)

      } 
      dispatch({type: "RESET_ROLE_CREATE_RESPONSE"})
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
     dispatch({type: "RESET_ROLE_UPDATE_RESPONSE"})
    }
  }, [store.updateResponse.statusCode])

  return (
    <Sidebar
      size='lg'
      open={open}
      title={`${intl.formatMessage({id: "Add"})} ${intl.formatMessage({id: "Role"})}`}
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
            defaultValue={selectedRole ? selectedRole.name : ''}
            placeholder={intl.formatMessage({id: "Name"})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['name'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='Description'>
            {intl.formatMessage({id: "Description"})}
          </Label>
          <textarea placeholder={intl.formatMessage({id: "Description"})} defaultValue={selectedRole ? selectedRole.description : ''} className='form-control' name='description' id='description'></textarea>
        </FormGroup>
       
        <FormGroup>
          <Label for='sortIndex'>
          <span className='text-danger'>*</span> {intl.formatMessage({id: "Sort Index"})}
          </Label>
          <Input
            type="number"
            name='sortIndex'
            id='sortIndex'
            defaultValue={selectedRole ? selectedRole.sortIndex : ''}
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
                defaultChecked ={selectedRole ? selectedRole.focus : false}
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
                defaultChecked ={selectedRole ? selectedRole.active : false}
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


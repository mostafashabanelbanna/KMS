// ** React Import
import { useState, useEffect } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'
import Toastr from '../../../containers/toastr/Toastr'

// ** Utils
import { isObjEmpty, getSelected, convertToBoolean } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, FormText, Form, Input } from 'reactstrap'
import { useIntl } from 'react-intl'
import { toast } from 'react-toastify'

// ** Store & Actions
import { addLookup, updateLookup } from './store/action/Index'
import { useDispatch, useSelector } from 'react-redux'
import { event } from 'jquery'
import CustomInput from 'reactstrap/lib/CustomInput'

const SidebarLookup = ({ open, toggleSidebar, SelectedLookup}) => {

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
  const store = useSelector(state => state.lookups)
  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // ** Function to handle form submit
  const onSubmit = async values => {
    console.log(SelectedLookup)
    if (isObjEmpty(errors)) {
      if (!SelectedLookup.id) {
        await dispatch(
            addLookup({
               LookupName : store.lookupName,
               Name_A: values.nameA,
               Name_E: values.nameE,
               Description_A: values.descriptionA ? values.descriptionA : '',
               Description_E: values.descriptionE ? values.descriptionE : '',
               Color: '',
               SortIndex: parseInt(values.sortIndex),
               IsLocked: convertToBoolean(values.isLocked),
               Focus: convertToBoolean(values.focus),
               Active: convertToBoolean(values.active),
               IsDefault: convertToBoolean(values.isDefault),
               Id: 0
           })
         )
    } else {
        await dispatch(
            updateLookup({
               LookupName : store.lookupName,
               Name_A: values.nameA,
               Name_E: values.nameE,
               Description_A: values.descriptionA ? values.descriptionA : '',
               Description_E: values.descriptionE ? values.descriptionE : '',
               Color: '',
               SortIndex: parseInt(values.sortIndex),
               IsLocked: convertToBoolean(values.isLocked),
               Focus: convertToBoolean(values.focus),
               Active: convertToBoolean(values.active),
               IsDefault: convertToBoolean(values.isDefault),
               Id: SelectedLookup.id
           })
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
        notify('error', `${intl.formatMessage({id: "CreationFialed"})} ${intl.formatMessage({id: "Lookup"})}`)

      } else if (code === 500) {
        notify('error', `${intl.formatMessage({id: "InternalServerError"})} `)

      } else if (code === 401) {
        localStorage.clear()
        location.reload()
      }
      dispatch({type:"RESET_CREATE_LOOKUP_RESPONSE"}) 
    }
    //
  }, [store.createResponse.statusCode])

  useEffect(() => {
    // if (store.updateResponse.statusCode !== 0) {
    //     if (store.updateResponse.statusCode === 401) {
    //         localStorage.clear()
    //     } else if (store.updateResponse.statusCode === 200) {
    //         alert("updated Successfully")
    //         toggleSidebar(1)
    //     }
    //     dispatch({type:"RESET_UPDATE_LOOKU_RESPONSE"}) 
    // }
    const code = store.updateResponse.statusCode
    if (code !== 0) {
       if (code === 200) {
            notify('success', intl.formatMessage({id: "UpdateSuccess"}))
            toggleSidebar(1)
        } else if (code === 6) {
          notify('error', intl.formatMessage({id: store.updateResponse.errors[0]}))

        } else if (code === 3) {
          notify('error', `${intl.formatMessage({id: "UpdateFialed"})} ${intl.formatMessage({id: "Lookup"})}`)
        } else if (code === 500) {
          notify('error', `${intl.formatMessage({id: "InternalServerError"})} `)
        } 
        dispatch({type:"RESET_UPDATE_LOOKUP_RESPONSE"}) 
    }
  }, [store.updateResponse.statusCode])

  return (
    <Sidebar
      size='lg'
      open={open}
      title={SelectedLookup.id ? intl.formatMessage({id: "Edit"}) : intl.formatMessage({id: "Add"})}
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
            name='nameA'
            id='name'
            defaultValue={SelectedLookup ? SelectedLookup.name_A : ''}
            placeholder={intl.formatMessage({id: "Name"})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['name'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='nameE'>
           {intl.formatMessage({id: "Name In English"})} <span className='text-danger'>*</span>
          </Label>
          <Input
            name='nameE'
            id='nameE'
            placeholder={intl.formatMessage({id: "Name In English"})}
            defaultValue={SelectedLookup ? SelectedLookup.name_E : ''}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['nameE'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='DescriptionA'>
          {intl.formatMessage({id: "Description"})}  {intl.formatMessage({id: "Arabic"})} 
          </Label>
          <textarea placeholder={`${intl.formatMessage({id: "Description"})}  ${intl.formatMessage({id: "Arabic"})}`} defaultValue={SelectedLookup ? SelectedLookup.description_A : ''} className='form-control' name='descriptionA' id='descriptionA'></textarea>
        </FormGroup>
        <FormGroup>
          <Label for='DescriptionE'>
          {intl.formatMessage({id: "Description"})}  {intl.formatMessage({id: "English"})} 
          </Label>
          <textarea placeholder={`${intl.formatMessage({id: "Description"})}  ${intl.formatMessage({id: "English"})}`}  defaultValue={SelectedLookup ? SelectedLookup.description_E : ''} className='form-control' name='descriptionE' id='descriptionE'></textarea>
        </FormGroup>
        <FormGroup>
          <Label for='sortIndex'>
            {intl.formatMessage({id: "Sort Index"})} <span className='text-danger'>*</span>
          </Label>
          {SelectedLookup.id &&  <Input
            type="number"
            name='sortIndex'
            id='sortIndex'
            placeholder='0'
            defaultValue={SelectedLookup.sortIndex}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['sortIndex'] })}
          />
          }
          {!SelectedLookup.id &&  <Input
            type="number"
            name='sortIndex'
            id='sortIndex'
            placeholder='0'
            defaultValue={0}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['sortIndex'] })}
          />
          }
        </FormGroup>
        
        <div className='row mx-0'>
            <div className='col-sm-6'>
                <FormGroup>
                    {SelectedLookup.id &&  <Input type="checkbox" name="active" defaultChecked ={SelectedLookup.active} innerRef={register()}  /> }
                    {!SelectedLookup.id &&  <Input type="checkbox" name="active" defaultChecked ={true} innerRef={register()}  /> }
                    <Label for='active'>
                    {intl.formatMessage({id: "Active"})}
                    </Label>
                </FormGroup>
            </div>
            <div className='col-sm-6'>
                <FormGroup>
                    {SelectedLookup.id &&  <Input type="checkbox" name="focus" defaultChecked ={SelectedLookup.focus} innerRef={register()}  /> }
                    {!SelectedLookup.id &&  <Input type="checkbox" name="focus" defaultChecked ={false} innerRef={register()}  /> }
                    <Label for='focus'>
                         {intl.formatMessage({id: "Focus"})}
                    </Label>
                </FormGroup>
            </div>
            <div className='col-sm-6'>
                <FormGroup>
                    {SelectedLookup.id &&  <Input type="checkbox" name="isLocked" defaultChecked ={SelectedLookup.isLocked} innerRef={register()}  /> }
                    {!SelectedLookup.id &&  <Input type="checkbox" name="isLocked" defaultChecked ={false} innerRef={register()}  /> }
                    <Label for='isLocked'>
                          {intl.formatMessage({id: "Locked"})}
                    </Label>
                </FormGroup>
            </div>
            <div className='col-sm-6'>
                <FormGroup>
                    {SelectedLookup.id &&  <Input type="checkbox" name="isDefault" defaultChecked ={SelectedLookup.isDefault} innerRef={register()}  /> }
                    {!SelectedLookup.id &&  <Input type="checkbox" name="isDefault" defaultChecked ={false} innerRef={register()}  /> }
                  
                    <Label for='isDefault'>
                        {intl.formatMessage({id: "Default"})}
                    </Label>
                </FormGroup>
            </div>
        </div>

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

export default SidebarLookup

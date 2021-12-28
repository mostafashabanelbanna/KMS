// ** React Import
import { useState, useEffect } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { isObjEmpty, getSelected } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, FormText, Form, Input } from 'reactstrap'
import { useIntl } from 'react-intl'

// ** Store & Actions
import { addLookup, updateLookup } from './store/action/Index'
import { useDispatch, useSelector } from 'react-redux'
import { event } from 'jquery'
import CustomInput from 'reactstrap/lib/CustomInput'

const SidebarLookup = ({ open, toggleSidebar, SelectedLookup}) => {

  // Import localization files
  const intl = useIntl()

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
               IsLocked: values.isLocked,
               Focus: values.focus,
               Active: values.active,
               IsDefault: values.isDefault,
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
               IsLocked: values.isLocked,
               Focus: values.focus,
               Active: values.active,
               IsDefault: values.isDefault,
               Id: SelectedLookup.id
           })
         )
      }
     
    }
  }
  
  useEffect(() => {
    if (store.createresponse.statusCode !== 0) {
        if (store.createresponse.statusCode === 401) {
            localStorage.clear()
            location.reload()
        } else if (store.createresponse.statusCode === 200) {
            alert("Added Successfully")
            toggleSidebar(1)
        }        
        dispatch({type:"RESET_CREATE_RESPONSE"}) 
    }
  }, [store.createresponse.statusCode])

  useEffect(() => {
    if (store.updateResponse.statusCode !== 0) {
        if (store.updateResponse.statusCode === 401) {
            localStorage.clear()
        } else if (store.updateResponse.statusCode === 200) {
            alert("updated Successfully")
            toggleSidebar(1)
        }
        dispatch({type:"RESET_UPDATE_RESPONSE"}) 
    }
  }, [store.updateResponse.statusCode])

  return (
    <Sidebar
      size='lg'
      open={open}
      title={intl.formatMessage({id: "Add"})}
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
          <span className='text-danger'>*</span> {intl.formatMessage({id: "Name In English"})}
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
          <textarea placeholder='Description Arabic' defaultValue={SelectedLookup ? SelectedLookup.description_A : ''} className='form-control' name='descriptionA' id='descriptionA'></textarea>
        </FormGroup>
        <FormGroup>
          <Label for='DescriptionE'>
          {intl.formatMessage({id: "Description"})}  {intl.formatMessage({id: "English"})} 
          </Label>
          <textarea placeholder={`${intl.formatMessage({id: "Description"})}  ${intl.formatMessage({id: "English"})}`}  defaultValue={SelectedLookup ? SelectedLookup.description_E : ''} className='form-control' name='descriptionE' id='descriptionE'></textarea>
        </FormGroup>
        <FormGroup>
          <Label for='sortIndex'>
           <span className='text-danger'>*</span> {intl.formatMessage({id: "Sort Index"})}
          </Label>
          <Input
            type="number"
            name='sortIndex'
            id='sortIndex'
            placeholder='0'
            defaultValue={SelectedLookup ? SelectedLookup.sortIndex : 0}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['sortIndex'] })}
          />
        </FormGroup>
        
        <div className='row mx-0'>
            <div className='col-sm-6'>
                <FormGroup>
                    <Input type="checkbox" name="active" defaultChecked ={SelectedLookup ? SelectedLookup.active : false} innerRef={register()}  />
                    <Label for='active'>
                    {intl.formatMessage({id: "Active"})}
                    </Label>
                </FormGroup>
            </div>
            <div className='col-sm-6'>
                <FormGroup>
                    <Input type="checkbox" name="focus" defaultChecked={SelectedLookup ? SelectedLookup.focus : false} innerRef={register()}  />
                    <Label for='focus'>
                         {intl.formatMessage({id: "Focus"})}
                    </Label>
                </FormGroup>
            </div>
            <div className='col-sm-6'>
                <FormGroup>
                    <Input type="checkbox" name="isLocked" defaultChecked={SelectedLookup ? SelectedLookup.isLocked : false} innerRef={register()}  />
                    <Label for='isLocked'>
                          {intl.formatMessage({id: "Locked"})}
                    </Label>
                </FormGroup>
            </div>
            <div className='col-sm-6'>
                <FormGroup>
                    <Input type="checkbox" name="isDefault" defaultChecked={SelectedLookup ? SelectedLookup.isDefault : false} innerRef={register()}  />
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

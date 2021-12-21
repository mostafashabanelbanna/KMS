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


// ** Store & Actions
import { addLookup, resetResponse } from './store/action/Index'
import { useDispatch, useSelector } from 'react-redux'
import { event } from 'jquery'
import CustomInput from 'reactstrap/lib/CustomInput'

const SidebarLookup = ({ open, toggleSidebar }) => {

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.lookups)

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // ** Function to handle form submit
  const onSubmit = async values => {
    if (isObjEmpty(errors)) {
      await dispatch(
         addLookup({
            LookupName : store.lookupName,
            Name_A: values.nameA,
            Name_E: values.nameE,
            Description_A: values.descriptionA ? values.descriptionA : '',
            Description_E: values.descriptionE ? values.descriptionE : '',
            Color: '',
            SortIndex: values.sortIndex,
            IsLocked: values.isLocked,
            Focus: values.focus,
            Active: values.active,
            IsDefault: values.isDefault,
            Id: 0
        })
      )
    }
  }
  useEffect(() => {
    if (store.createresponse.statusCode !== 0) {
        alert("Saved Successfully")
        toggleSidebar(1)
        resetResponse()
    }
      
  }, [store.createresponse.statusCode])

  return (
    <Sidebar
      size='lg'
      open={open}
      title='Lookup'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for='name'>
            name (Arabic) <span className='text-danger'>*</span>
          </Label>
          <Input
            name='nameA'
            id='name'
            placeholder='Name (Arabic)'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['name'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='nameE'>
           Name (English)  <span className='text-danger'>*</span>
          </Label>
          <Input
            name='nameE'
            id='nameE'
            placeholder='Name English'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['nameE'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='DescriptionA'>
            Description (Arabic)
          </Label>
          <textarea placeholder='Description Arabic' className='form-control' name='descriptionA' id='descriptionA'></textarea>
        </FormGroup>
        <FormGroup>
          <Label for='DescriptionE'>
            Description (English)
          </Label>
          <textarea placeholder='Description English' className='form-control' name='descriptionE' id='descriptionE'></textarea>
        </FormGroup>
        <FormGroup>
          <Label for='sortIndex'>
          sortIndex <span className='text-danger'>*</span>
          </Label>
          <Input
            type="number"
            name='sortIndex'
            id='sortIndex'
            placeholder='0'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['sortIndex'] })}
          />
        </FormGroup>
        
        <div className='row'>
            <div className='col-3'>
                <FormGroup>
                    <Input type="checkbox" name="active" innerRef={register()}  />
                    <Label for='active'>
                        Active <span className='text-danger'>*</span>
                    </Label>
                </FormGroup>
            </div>
            <div className='col-3'>
                <FormGroup>
                    <Input type="checkbox" name="focus" innerRef={register()}  />
                    <Label for='focus'>
                        Focus <span className='text-danger'>*</span>
                    </Label>
                </FormGroup>
            </div>
            <div className='col-3'>
                <FormGroup>
                    <Input type="checkbox" name="isLocked" innerRef={register()}  />
                    <Label for='isLocked'>
                        Is Locked <span className='text-danger'>*</span>
                    </Label>
                </FormGroup>
            </div>
            <div className='col-3'>
                <FormGroup>
                    <Input type="checkbox" name="isDefault" innerRef={register()}  />
                    <Label for='isDefault'>
                        Is Default <span className='text-danger'>*</span>
                    </Label>
                </FormGroup>
            </div>
        </div>

        <Button type='submit' className='mr-1' color='primary'>
          Submit
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarLookup
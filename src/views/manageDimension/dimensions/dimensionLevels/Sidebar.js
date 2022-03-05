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
import { Button, FormGroup, Label, FormText, Form, Input } from 'reactstrap'
import Row from 'reactstrap/lib/Row'
import Col from 'reactstrap/lib/Col'
import { toast } from 'react-toastify'
import { useIntl } from 'react-intl'

// Axios
import axios from '../../../../axios'


// ** Store & Actions
import { addDimensionLevel, resetCreateResponse, updateDimensionLevel, resetUpdateResponse } from './store/action'
import { useDispatch, useSelector  } from 'react-redux'

const SidebarNewDimensionLevel = ({dimensionId, open, toggleSidebar, selectedDimensionLevel }) => {
   
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.dimensionLevels)

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
      if (selectedDimensionLevel.levelNumber)  {
        await dispatch(
          updateDimensionLevel(
            {
              name_A: values.name,
              name_E: values.nameE,
              dimensionId,
              levelNumber: selectedDimensionLevel.levelNumber
            }
          )
        )
      }
     
    }
  }
  
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
       notify('error', `${intl.formatMessage({id: "UpdateFailed"})} ${intl.formatMessage({id: "Dimension Level"})}`)
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
      title={intl.formatMessage({id: "Edit"})}
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
            defaultValue={selectedDimensionLevel ? selectedDimensionLevel.name_A : ''}
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
            defaultValue={selectedDimensionLevel ? selectedDimensionLevel.name_E : ''}
            placeholder={intl.formatMessage({id: "Name In English"})}
            innerRef={register({ required:  false})}
            className={classnames({ 'is-invalid': errors['nameE'] })}
          />
        </FormGroup>

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

export default SidebarNewDimensionLevel


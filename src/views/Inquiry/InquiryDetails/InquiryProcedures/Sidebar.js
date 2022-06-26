// ** React Import
import { useState, useEffect } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { isObjEmpty, getSelected, selectThemeColors, convertToBoolean } from '@utils'

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
import { addInquiryProcedure, resetCreateResponse, updateInquiryProcedure, resetUpdateResponse } from './store/action'
import { useDispatch, useSelector  } from 'react-redux'
import Toastr from '../../../../containers/toastr/Toastr'

const SidebarNewInquiryProcedure = ({ open, toggleSidebar, selectedInquiryProcedure, inquiryId }) => {
  const [departments, setDepartments] = useState([])
  const [providers, setProviders] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState({})
  const [selectedProvider, setSelectedProvider] = useState({})

  // Import localization files
  const intl = useIntl()
  // Toastr notify function
  const notify = (type, message) => {
    return toast.success(
      <Toastr type={type} message={message} />,
      { 
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true 
      })
    }

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.inquiryProcedures)

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  const getDepartments = async () => {
    await axios.post(`/Lookups/GetLookupValues`, {lookupName: 'Department'})
    .then(response => {
        setDepartments(response.data.data)
       })
       .catch(error => {
    })
  }
  const getProviders = async () => {
    await axios.get(`/Provider/GetProviders`)
    .then(response => {
        setProviders(response.data.data)
       })
       .catch(error => {})
  }

  // ** Function to handle form submit
  const onSubmit = async values => {
    if (isObjEmpty(errors)) {
      if (!selectedInquiryProcedure.id) {
        await dispatch(
            addInquiryProcedure({
              name: values.name,
              description: values.description,
              attachment: values.attachment,
              providerId: selectedProvider && selectedProvider.id ? selectedProvider.id : "",
              departmentId: selectedDepartment && selectedDepartment.id ? selectedDepartment.id : "",
              inquiryId,
              active: true
            })
          )
          
      } else {
        await dispatch(
          updateInquiryProcedure(
            {
              name: values.name,
              description: values.description,
              attachment: values.attachment,
              providerId: selectedProvider && selectedProvider.id ? selectedProvider.id : "",
              departmentId: selectedDepartment && selectedDepartment.id ? selectedDepartment.id : "",
              inquiryId,
              active: true,
              id: selectedInquiryProcedure.id
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
            setSelectedProvider({})
            setSelectedDepartment({})
            toggleSidebar(1)
      } else if (code === 6) {
         notify('error', intl.formatMessage({id: store.createResponse.errors[0]}))

      } else if (code === 5) {
        notify('error', intl.formatMessage({id: "InvalidFileExtension"}))
      } else if (code === 1) {
        notify('error', `${intl.formatMessage({id: "CreationFialed"})} ${intl.formatMessage({id: "inquiryProcedure"})}`)

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
       notify('error', `${intl.formatMessage({id: "UpdateFailed"})} ${intl.formatMessage({id: "inquiryProcedure"})}`)
     } else if (code === 500) {
       notify('error', `${intl.formatMessage({id: "InternalServerError"})} `)
     } 
     dispatch(resetUpdateResponse())
    }
  }, [store.updateResponse.statusCode])

  useEffect(() => {
    getDepartments()
    getProviders()

  }, [])

  const handleProviderChange = (e) => {
    setSelectedProvider(e)
  }
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e)
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title={selectedInquiryProcedure.id ? intl.formatMessage({id: "Edit"}) : intl.formatMessage({id: "Add"})}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      width={600}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className='mx-0'>
          <Col md={12}>
            <FormGroup>
              <Label for='name'>
              {intl.formatMessage({id: "Name"})} <span className='text-danger'>*</span> 
              </Label>
              <Input
                name='name'
                id='name'
                defaultValue={selectedInquiryProcedure ? selectedInquiryProcedure.name : ''}
                placeholder={intl.formatMessage({id: "Name"})}
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors['name'] })}
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label for='description'>
              {intl.formatMessage({id: "Description"})}
              </Label>
              <Input
                name='description'
                id='description'
                type="textarea"
                defaultValue={selectedInquiryProcedure ? selectedInquiryProcedure.description : ''}
                placeholder={intl.formatMessage({id: "Description"})}
                innerRef={register({ required: false })}
                className={classnames({ 'is-invalid': errors['Description'] })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className='mx-0'>
          <Col md={12}>
            <FormGroup>
              <Label for='attachment'>{intl.formatMessage({id: "attachment"})}</Label>
              <CustomInput
                style={{zIndex: -1000}}
                type='file' 
                id='attachment'
                name='attachment' 
                label={intl.formatMessage({id: "Choose File"})}
                innerRef={register({ required: false })}
                className={classnames({ 'is-invalid': errors['attachment'] })}/>
            </FormGroup>
          </Col>
        </Row>
        <Row className='mx-0'>
          <Col md={6}>
          <FormGroup>
                <Label>{intl.formatMessage({id: "Department"})}</Label>
                <Select
                  isClearable={false}
                  placeholder="تحديد"
                  theme={selectThemeColors}
                  value={selectedDepartment.id ? selectedDepartment : []}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  name='departmentId'
                  id='departmentId'
                  options={departments}
                  className='react-select'
                  classNamePrefix='select'
                  onChange={e => handleDepartmentChange(e)}
                />
            </FormGroup>
          </Col>
          <Col md={6}>
              <FormGroup>
                  <Label>{intl.formatMessage({id: "Provider"})}</Label>
                  <Select style={{zIndex: 1000}}
                    isClearable={false}
                    placeholder="تحديد"
                    theme={selectThemeColors}
                    value={selectedProvider.id ? selectedProvider : []}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    name='providerId'
                    id='providerId'
                    options={providers}
                    className='react-select'
                    classNamePrefix='select'
                    onChange={e => handleProviderChange(e)}
                  />
              </FormGroup>
          </Col>
        </Row>
      
          
          <Row className="mx-0">
            <Col md={12}>
              <Button type='submit' className='mr-1' color='primary'>
                {intl.formatMessage({id: "Save"}) }
              </Button>
              <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
                {intl.formatMessage({id: "Cancel"}) }
              </Button>
            </Col>
          </Row>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewInquiryProcedure


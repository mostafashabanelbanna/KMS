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
import axios from '../../axios'

// ** Store & Actions
import { addInquiry, resetCreateResponse, updateInquiry, resetUpdateResponse } from '../manageInquiry/Inquiry/store/action'
import { useDispatch, useSelector  } from 'react-redux'
import Toastr from '../../containers/toastr/Toastr'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"
import moment from "moment"
import "moment/locale/ar"
import zIndex from '@material-ui/core/styles/zIndex'

const SidebarNewInquiry = ({ open, toggleSidebar, selectedInquiry, departments }) => {
  // ** States
  const [selectedDepartment, setSelectedDepartment] = useState({})
  const [selectedInquiryUsage, setSelectedInquiryUsage] = useState({})
  const [inquiryUsage, setInquiryUsage] = useState([])

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
  const store = useSelector(state => state.inquiries)

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // ** Function to handle form submit
  const onSubmit = async values => {
    if (isObjEmpty(errors)) {
      if (!selectedInquiry.id) {
        await dispatch(
            addInquiry({
              name: values.name,
              description: values.description,
              milestoneName: values.milestoneName,
              purpose: values.purpose,
              attachment: "",
              expectedPeriod: values.expectedPeriod ? values.expectedPeriod : "",
              referenceNo: "",
              startDate : "",
              plannedEndDate: "",
              actualEndDate: "",
              providerId:"",
              departmentId: selectedDepartment ? selectedDepartment.id : "",
              usageId: selectedInquiryUsage ? selectedInquiryUsage.id : "",
              userId: "",
              statusId: "",
              sortIndex: 0,
              focus: false,
              active: true,
              classificationValues: []
            })
          )
      }
    }
  }

  const getInquiryUsage = async () => {
    await axios.post(`/Lookups/GetLookupValues`, {lookupName: 'InquiryUsage'})
    .then(response => {
        setInquiryUsage(response.data.data)
       })
       .catch(error => {
    })
  }
  

  useEffect(() => {
    setSelectedDepartment(selectedInquiry.department)
  }, [selectedInquiry.department])
  
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
        notify('error', `${intl.formatMessage({id: "CreationFialed"})} ${intl.formatMessage({id: "Inquiry"})}`)

      } else if (code === 500) {
        notify('error', `${intl.formatMessage({id: "InternalServerError"})} `)

      } 
      dispatch(resetCreateResponse())
    }
  }, [store.createResponse.statusCode])
  
  useEffect(() => {
    getInquiryUsage()
  }, [])
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e)
  }
  const handleUsageChange = (e) => {
    setSelectedInquiryUsage(e)
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title={selectedInquiry.id ? intl.formatMessage({id: "Edit"}) : intl.formatMessage({id: "Add"})}
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
              {intl.formatMessage({id: "Name"})}  <span className='text-danger'>*</span> 
              </Label>
              <Input
                name='name'
                id='name'
                defaultValue={selectedInquiry ? selectedInquiry.name : ''}
                placeholder={intl.formatMessage({id: "Name"})}
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors['name'] })}
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label for='milestoneName'>
               اسم المستخرج الذى سيستخدم به البيانات المطلوبة <span className='text-danger'>*</span> 
              </Label>
              <Input
                name='milestoneName'
                id='milestoneName'
                defaultValue={selectedInquiry ? selectedInquiry.milestoneName : ''}
                placeholder='اسم المستخرج الذى سيستخدم به البيانات المطلوبة'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors['milestoneName'] })}
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label for='purpose'>
               الغرض من البيانات المطلوبة <span className='text-danger'>*</span> 
              </Label>
              <Input
                name='purpose'
                id='purpose'
                defaultValue={selectedInquiry ? selectedInquiry.purpose : ''}
                placeholder='الغرض من البيانات المطلوبة'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors['purpose'] })}
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
                <Label>استخدام البيانات</Label>
                <Select
                  isClearable={false}
                  placeholder="تحديد"
                  theme={selectThemeColors}
                  value={selectedInquiryUsage.id ? selectedInquiryUsage : []}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  name='usageId'
                  id='usageId'
                  options={inquiryUsage}
                  className='react-select'
                  classNamePrefix='select'
                  onChange={e => handleUsageChange(e)}
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
                defaultValue={selectedInquiry ? selectedInquiry.description : ''}
                placeholder={intl.formatMessage({id: "Description"})}
                innerRef={register({ required: false })}
                className={classnames({ 'is-invalid': errors['Description'] })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="mx-0">
          <Col md={6}>
            <FormGroup>
                <Label>{intl.formatMessage({id: "Department"})}</Label>
                <Select
                  isClearable={false}
                  placeholder="تحديد"
                  theme={selectThemeColors}
                  value={selectedDepartment}
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
          <Col md={3}>
              <FormGroup>
                <Label for='expectedPeriod'>
                  {intl.formatMessage({id: "expectedPeriod"})}
                </Label>
                <div className="d-flex">
                  <Input
                    type="number"
                    name='expectedPeriod'
                    id='expectedPeriod'
                    defaultValue={selectedInquiry ? selectedInquiry.expectedPeriod : 0}
                    placeholder='0'
                    innerRef={register({ required: false })}
                    className={classnames({ 'is-invalid': errors['expectedPeriod'] })}
                  />
                  <span>&nbsp;</span>
                  <span>يوم</span>
                </div>
                
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

export default SidebarNewInquiry


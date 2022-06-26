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
import axios from '../../../axios'
import ClassificationValues from './ClassificationValues'

// ** Store & Actions
import { addInquiry, resetCreateResponse, updateInquiry, resetUpdateResponse } from './store/action'
import { useDispatch, useSelector  } from 'react-redux'
import Toastr from '../../../containers/toastr/Toastr'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"
import moment from "moment"
import "moment/locale/ar"
import zIndex from '@material-ui/core/styles/zIndex'

const SidebarNewInquiry = ({ open, toggleSidebar, selectedInquiry, departments, providers, classifications, users, status }) => {
  // ** States
  const [selectedDepartment, setSelectedDepartment] = useState({})
  const [selectedProvider, setSelectedProvider] = useState({})
  const [selectedUser, setSelectedUser] = useState({})
  const [selectedStatus, setSelectedStatus] = useState({})
  const [startDate, setStartDate] = useState(new Date())
  const [plannedEndDate, setPlannedEndDate] = useState(new Date())
  const [actualEndDate, setActualEndDate] = useState(new Date())

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
    const classificationValues = []
    for (let i = 0; i < store.selectedClassificationValues.length; i++) {
      store.selectedClassificationValues[i].classificationValues.map(item => {
        classificationValues.push(item.id)
      })
    }

    if (isObjEmpty(errors)) {
      if (!selectedInquiry.id) {
        await dispatch(
            addInquiry({
              name: values.name,
              description: values.description,
              attachment: values.attachment,
              expectedPeriod: values.expectedPeriod ? values.expectedPeriod : "",
              referenceNo: values.referenceNo,
              startDate,
              plannedEndDate,
              actualEndDate,
              providerId: selectedProvider ? selectedProvider.id : "",
              departmentId: selectedDepartment ? selectedDepartment.id : "",
              userId: selectedUser ? selectedUser.id : "",
              statusId: selectedStatus ? selectedStatus.id : "",
              sortIndex: values.sortIndex,
              focus: convertToBoolean(values.focus),
              active: convertToBoolean(values.active),
              classificationValues
            })
          )
      } else {
        await dispatch(
          updateInquiry(
            {
              name: values.name,
              description: values.description,
              attachment: values.attachment,
              expectedPeriod: values.expectedPeriod ? values.expectedPeriod : "",
              referenceNo: values.referenceNo,
              startDate,
              plannedEndDate,
              actualEndDate,
              providerId: selectedProvider ? selectedProvider.id : "",
              departmentId: selectedDepartment ? selectedDepartment.id : "",
              userId: selectedUser ? selectedUser.id : "",
              statusId: selectedStatus ? selectedStatus.id : "",
              sortIndex: values.sortIndex,
              focus: convertToBoolean(values.focus),
              active: convertToBoolean(values.active),
              classificationValues,
              id: selectedInquiry.id,
              classificationValues
            }
          )
        )
      }
    }
  }
  const getAllClassifications = async () => {
    const response = await axios
      .post('Classification/GetClassifications', {focus: null})
      .catch((err) => console.log("Error", err)) //handle errors

      if (response && response.data) {
          dispatch({type: 'SET_INQUIRY_ALL_CLASSIFICATIONS', allClassifications: response.data.data})
      }
  } 

  useEffect(() => {
    setSelectedProvider(selectedInquiry.provider)
  }, [selectedInquiry.provider])

  useEffect(() => {
    setSelectedDepartment(selectedInquiry.department)
  }, [selectedInquiry.department])

  useEffect(() => {
    setSelectedStatus(selectedInquiry.status)
  }, [selectedInquiry.status])

  useEffect(() => {
    setSelectedUser(selectedInquiry.user)
  }, [selectedInquiry.user])

  useEffect(() => {
    if (selectedInquiry.id) {
       dispatch({type:"SET_INQUIRY_SELECTED_CLASSIFICATION_VALUES", selectedClassificationValues: selectedInquiry.inquiryClassifications})
    }
   }, [selectedInquiry])
  
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
       notify('error', `${intl.formatMessage({id: "UpdateFailed"})} ${intl.formatMessage({id: "Inquiry"})}`)
     } else if (code === 500) {
       notify('error', `${intl.formatMessage({id: "InternalServerError"})} `)
     } 
     dispatch(resetUpdateResponse())
    }
  }, [store.updateResponse.statusCode])

  useEffect(() => {
    getAllClassifications()

    if (!selectedInquiry.startDate) {
      setStartDate(moment(new Date().toLocaleDateString(), "MM-DD-YYYY")
      .format("YYYY-MM-DD")
      .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    } else {
      setStartDate(selectedInquiry.startDate)
    }

    if (!selectedInquiry.plannedEndDate) {
      setPlannedEndDate(moment(new Date().toLocaleDateString(), "MM-DD-YYYY")
      .format("YYYY-MM-DD")
      .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    } else {
      setPlannedEndDate(selectedInquiry.plannedEndDate)
    }

    if (!selectedInquiry.actualEndDate) {
      setActualEndDate(moment(new Date().toLocaleDateString(), "MM-DD-YYYY")
      .format("YYYY-MM-DD")
      .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    } else {
      setActualEndDate(selectedInquiry.actualEndDate)
    }
   
  }, [])

  useEffect(() => {
    if (!selectedInquiry.startDate) {
      setStartDate(moment(new Date().toLocaleDateString(), "MM-DD-YYYY")
      .format("YYYY-MM-DD")
      .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    } else {
      setStartDate(selectedInquiry.startDate)
    }
  }, [selectedInquiry.startDate])

  useEffect(() => {
    if (!selectedInquiry.plannedEndDate) {
      setPlannedEndDate(moment(new Date().toLocaleDateString(), "MM-DD-YYYY")
      .format("YYYY-MM-DD")
      .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    } else {
      setPlannedEndDate(selectedInquiry.plannedEndDate)
    }
  }, [selectedInquiry.plannedEndDate])

  useEffect(() => {
    if (!selectedInquiry.actualEndDate) {
      setActualEndDate(moment(new Date().toLocaleDateString(), "MM-DD-YYYY")
      .format("YYYY-MM-DD")
      .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    } else {
      setActualEndDate(selectedInquiry.actualEndDate)
    }
  }, [selectedInquiry.actualEndDate])

  const handleStartDate = (event) => {
    setStartDate(moment(new Date(event._d).toLocaleDateString(), "MM-DD-YYYY")
    .format("YYYY-MM-DD")
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)))
  }

  const handlePlannedEndDate = (event) => {
    setPlannedEndDate(moment(new Date(event._d).toLocaleDateString(), "MM-DD-YYYY")
    .format("YYYY-MM-DD")
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)))
  }

  const handleActualEndDate = (event) => {
    setActualEndDate(moment(new Date(event._d).toLocaleDateString(), "MM-DD-YYYY")
    .format("YYYY-MM-DD")
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)))
  }

  const handleProviderChange = (e) => {
    setSelectedProvider(e)
  }
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e)
  }

  const handleStatusChange = (e) => {
    setSelectedStatus(e)
  }

  const handleUserChange = (e) => {
    setSelectedUser(e)
  }


  const addClassificationValue = () => {
    if (store.selectedClassificationValues.length < store.allClassifications.length) {
      const addedObj = {
        classificationValues: []
      }
      dispatch({type: 'SET_INQUIRY_SELECTED_CLASSIFICATION_VALUES', selectedClassificationValues: [...store.selectedClassificationValues, addedObj]})    
    }
  
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
              {intl.formatMessage({id: "Name"})} <span className='text-danger'>*</span> 
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
        
        <Row className='mx-0'>
          <Col md={6} className=" mb-2" >
            <Label for='hf-picker'>{intl.formatMessage({id: "startDate"})}</Label>
                <br/>
                <MuiPickersUtilsProvider
                  libInstance={moment}
                  utils={MomentUtils}
                  locale={"sw"}
                  className="bg-danger"
                >
                  <KeyboardDatePicker
                    okLabel="تحديد"
                    cancelLabel="الغاء"
                    format="L"
                    value={startDate}
                    inputVariant="outlined"
                    variant="dialog"
                    maxDateMessage=""
                    mask="__-__-____"
                    placeholder="يوم/شهر/سنة"
                    onChange={e => handleStartDate(e) }
                    views={["year", "month", "date"]}
                  />
                </MuiPickersUtilsProvider>
          </Col>
          <Col md={6} className=" mb-2" >
            <Label for='hf-picker'>{intl.formatMessage({id: "plannedEndDate"})}</Label>
                <br/>
                <MuiPickersUtilsProvider
                  libInstance={moment}
                  utils={MomentUtils}
                  locale={"sw"}
                  className="bg-danger"
                >
                  <KeyboardDatePicker
                    okLabel="تحديد"
                    cancelLabel="الغاء"
                    format="L"
                    value={plannedEndDate}
                    inputVariant="outlined"
                    variant="dialog"
                    maxDateMessage=""
                    mask="__-__-____"
                    placeholder="يوم/شهر/سنة"
                    onChange={e => handlePlannedEndDate(e) }
                    views={["year", "month", "date"]}
                  />
                </MuiPickersUtilsProvider>
          </Col>
        </Row>
        <Row className='mx-0'>
          <Col md={6} className=" mb-2" >
            <Label for='hf-picker'>{intl.formatMessage({id: "actualEndDate"})}</Label>
                <br/>
                <MuiPickersUtilsProvider
                  libInstance={moment}
                  utils={MomentUtils}
                  locale={"sw"}
                  className="bg-danger"
                >
                  <KeyboardDatePicker
                    okLabel="تحديد"
                    cancelLabel="الغاء"
                    format="L"
                    value={actualEndDate}
                    inputVariant="outlined"
                    variant="dialog"
                    maxDateMessage=""
                    mask="__-__-____"
                    placeholder="يوم/شهر/سنة"
                    onChange={e => handleActualEndDate(e) }
                    views={["year", "month", "date"]}
                  />
                </MuiPickersUtilsProvider>
          </Col>
          <Col md={6}>
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
                <Label for='referenceNo'>
                 {intl.formatMessage({id: "referenceNo"})}
                </Label>
                <Input
                  name='referenceNo'
                  id='referenceNo'
                  defaultValue={selectedInquiry ? selectedInquiry.referenceNo : ''}
                  placeholder={intl.formatMessage({id: "referenceNo"})}
                  innerRef={register({ required: false })}
                  className={classnames({ 'is-invalid': errors['referenceNo'] })}
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
                    value={selectedProvider}
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
            <Col md={6}>
              <FormGroup>
                  <Label>المستخدم</Label>
                  <Select style={{zIndex: 1000}}
                    isClearable={false}
                    placeholder="تحديد"
                    theme={selectThemeColors}
                    value={selectedUser}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    name='userId'
                    id='userId'
                    options={users}
                    className='react-select'
                    classNamePrefix='select'
                    onChange={e => handleUserChange(e)}
                  />
              </FormGroup>
            </Col> 
            <Col md={6}>
              <FormGroup>
                  <Label>الحالة</Label>
                  <Select style={{zIndex: 1000}}
                    isClearable={false}
                    placeholder="تحديد"
                    theme={selectThemeColors}
                    value={selectedStatus}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    name='statusId'
                    id='statusId'
                    options={status}
                    className='react-select'
                    classNamePrefix='select'
                    onChange={e => handleStatusChange(e)}
                  />
              </FormGroup>
            </Col> 
        </Row>
        <Row className="mx-0">
            <Col md={6}>
              <FormGroup>
                <Label for='sortIndex'>
                {intl.formatMessage({id: "Sort Index"})} <span className='text-danger'>*</span>
                </Label>
                {selectedInquiry.id && <Input
                  type="number"
                  name='sortIndex'
                  id='sortIndex'
                  defaultValue={selectedInquiry.sortIndex}
                  placeholder='0'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['sortIndex'] })}
                />
                }
                {!selectedInquiry.id && <Input
                  type="number"
                  name='sortIndex'
                  id='sortIndex'
                  defaultValue={0}
                  placeholder='0'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['sortIndex'] })}
                />
                }
                
              </FormGroup>
            </Col>
            <Col sm='3' className="mt-3" >
            <FormGroup>
              {selectedInquiry.id && <Input 
                type="checkbox" 
                placeholder="focus"  
                name="focus" 
                defaultChecked ={selectedInquiry.focus}
                innerRef={register()} />
              }
              {!selectedInquiry.id && <Input 
                type="checkbox" 
                placeholder="focus"  
                name="focus" 
                defaultChecked ={false}
                innerRef={register()} />
              }
                  <Label for='focus'>
                {intl.formatMessage({id: "Focus"})}
              </Label>
            </FormGroup>
            </Col>
            <Col sm='3' className="mt-3">
            <FormGroup>
              {selectedInquiry.id && <Input 
                type="checkbox" 
                placeholder="active"  
                name="active" 
                defaultChecked ={selectedInquiry.active}
                innerRef={register()}
                />
              }
               {!selectedInquiry.id && <Input 
                type="checkbox" 
                placeholder="active"  
                name="active" 
                defaultChecked ={true}
                innerRef={register()}
                />
              }
                 <Label for='active'>
                    {intl.formatMessage({id: "Active"})}
                  </Label>
            </FormGroup>
              </Col>
        </Row>
          
          <div className='mx-auto mb-1' style={{borderBottom: '1px solid #d8d6de', width: '50%'}}></div>
          <div className='my-2' style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={addClassificationValue}>+ إضافة قيم التصنيف </div>
            {store.selectedClassificationValues && store.selectedClassificationValues.map((item, index) => {
              return <ClassificationValues selectedInquiry={selectedInquiry} index={index} key={index}/>
            })}
            {store.selectedClassificationValues && store.selectedClassificationValues.length > 0 ? <div className='mx-auto mb-1' style={{borderBottom: '1px solid #d8d6de', width: '50%'}}></div> : null}
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


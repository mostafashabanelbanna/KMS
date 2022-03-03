// ** React Import
import { useState, useEffect, createElement} from 'react'

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
import { addPeriodicity, resetCreateResponse, updatePeriodicity, resetUpdateResponse } from './store/action'
import { useDispatch, useSelector  } from 'react-redux'
import Intervals from './Intervals'


const SidebarNewPeriodicity = ({ open, toggleSidebar, selectedPeriodicity }) => {
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
  // radio-button values
  const [dailyValue, setDailyValue] = useState()
  const [weeklyValue, setWeeklyValue] = useState()
  const [monthlyValue, setMonthlyValue] = useState()
 
 const radioButtonValues = (value) => {
   switch (value) {
     case 'daily' :
       setDailyValue(true)
       setWeeklyValue(false)
       setMonthlyValue(false)
       return
      case 'weekly' : 
      setDailyValue(false)
      setWeeklyValue(true)
      setMonthlyValue(false)
      return
      case 'monthly' :
        setDailyValue(false)
        setWeeklyValue(false)
        setMonthlyValue(true)
     return
      default : 
      setDailyValue(false)
      setWeeklyValue(false)
      setMonthlyValue(false)
      
   } 
   
 }
 

 //console.log(dailyValue, weeklyValue, monthlyValue)

 //days in month function
 const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
 const [monthValue, setMonthValue] = useState()
 //console.log(monthValue)
 
 function daysInMonth (month) {
  const currentYear = new Date().getFullYear() 
  return new Date(currentYear, month, 0).getDate() 
  
}
//console.log(daysInMonth(monthValue))

const daysArr = []
for (let i = 1; i <= daysInMonth(monthValue); i++) {
  daysArr.push(i)
  
}

// target periodicity interval 
const [interval, setInterval] = useState([])
const [day, setDay] = useState()
const [month, setMonth] = useState()

const monthHandler = (month) => {
  setMonth(month)
}
const addInterval = () => {
  setInterval([...interval, {id:Math.random(), day:"1", month:"1"}])
  
}

//console.log(interval)
//console.log(day)
//console.log(month)

//remove period function
const removePeriod = (id) => {

  setInterval(interval.filter((period, i) => period.id !== id))
  
  }
const removeInterval = (id) => {
  setInterval(interval.filter((interval, i) => interval.id !== id))
}
// ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.periodicities)
  
  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // ** Function to handle form submit
  const onSubmit = async values => {
    if (isObjEmpty(errors)) {
      if (!selectedPeriodicity.id) {
        await dispatch(
            addPeriodicity({
              name_A: values.name,
              name_E: values.nameE,
              description_A: values.descriptionA,
              description_E: values.descriptionE,
              color: values.color,
              sortIndex: values.sortIndex,
              isDefault: values.isDefault,
              focus: values.focus,
              active: values.active,
              isDaily : dailyValue,
             isMontly : monthlyValue,
             isWeekly : weeklyValue,
             intervals : interval
           
            })
           
          )
      } else {
        await dispatch(
          updatePeriodicity(
            {
              name_A: values.name,
              name_E: values.nameE,
              description_A: values.descriptionA,
              description_E: values.descriptionE,
              color: values.color,
              sortIndex: values.sortIndex,
              isDefault: values.isDefault,
              focus: values.focus,
              active: values.active,
              id: selectedPeriodicity.id,
              isDaily : dailyValue,
              isMontly :monthlyValue,
              isWeekly : weeklyValue,
              intervals : interval
              
            
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

  useEffect(() => {
   
    if (store.selectedPeriodicity.periodicityIntervals) {
//console.log(store.selectedPeriodicity.periodicityIntervals)
      setInterval(store.selectedPeriodicity.periodicityIntervals)
    }
    }, [store.selectedPeriodicity])

  return (
    <Sidebar
      size='lg'
      open={open}
      //title={selectedPeriodicity.id ? intl.formatMessage({id: "Edit"}) : intl.formatMessage({id: "Add"}) }
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
            defaultValue={selectedPeriodicity ? selectedPeriodicity.name_A : ''}
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
            defaultValue={selectedPeriodicity ? selectedPeriodicity.name_E : ''}
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
            defaultValue={selectedPeriodicity ? selectedPeriodicity.description_A : ''}
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
            defaultValue={selectedPeriodicity ? selectedPeriodicity.description_E : ''}
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
            defaultValue={selectedPeriodicity ? selectedPeriodicity.color : ''}
            placeholder={intl.formatMessage({id: "Color"})}
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['color'] })}
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
            defaultValue={selectedPeriodicity ? selectedPeriodicity.sortIndex : 0}
            placeholder='0'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['sortIndex'] })}
          />
        </FormGroup>

        <Row className="mx-0">
          <Col sm='4' >
            <FormGroup>
              <Input
                className = "daily"
                type="radio" 
                placeholder={intl.formatMessage({id: "isDaily"})}
                name="radioButton" 
                value = "daily" 
                defaultChecked ={selectedPeriodicity ? selectedPeriodicity.isDaily : false}
                onChange = {(e) => radioButtonValues(e.target.value)}
                innerRef={register()} />
                  <Label for='isDaily'>
                {intl.formatMessage({id: "isDaily"})}
              </Label>
            </FormGroup>
          </Col>
          <Col sm='4' >
            <FormGroup>
              <Input
                className = "weekly"
                type="radio" 
                placeholder={intl.formatMessage({id: "isWeekly"})}  
                name="radioButton" 
                value="weekly"
                onChange = {(e) => radioButtonValues(e.target.value)}
                defaultChecked ={selectedPeriodicity ? selectedPeriodicity.isWeekly : false}
                innerRef={register()} />
                  <Label for='focus'>
                {intl.formatMessage({id: "isWeekly"})}
              </Label>
            </FormGroup>
          </Col>
          <Col sm='4' >
            <FormGroup>
              <Input 
               className = "monthly"
                type="radio" 
                placeholder={intl.formatMessage({id: "isMonthly"})}  
                name="radioButton" 
                value = "monthly"
                defaultChecked ={selectedPeriodicity ? selectedPeriodicity.isMontly : false}
                onChange = {(e) => radioButtonValues(e.target.value)}
                innerRef={register()}
               
                />
                 <Label for='isMonthly'>
                  {intl.formatMessage({id: "isMonthly"})}
                  
                  </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row className="mx-0">

          <Col sm='4' >
            <FormGroup>
              <Input 
                type="checkbox" 
                placeholder={intl.formatMessage({id: "Default"})}
                name="isDefault" 
                defaultChecked ={selectedPeriodicity ? selectedPeriodicity.isDefault : false}
                innerRef={register()} />
                  <Label for='isDefault'>
                {intl.formatMessage({id: "Default"})}
              </Label>
            </FormGroup>
          </Col>
          <Col sm='4' >
            <FormGroup>
              <Input 
                type="checkbox" 
                placeholder="focus"  
                name="focus" 
                defaultChecked ={selectedPeriodicity ? selectedPeriodicity.focus : false}
                innerRef={register()} />
                  <Label for='focus'>
                {intl.formatMessage({id: "Focus"})}
              </Label>
            </FormGroup>
          </Col>
          <Col sm='4' >
            <FormGroup>
              <Input 
                type="checkbox" 
                placeholder="active"  
                name="active" 
                defaultChecked ={selectedPeriodicity ? selectedPeriodicity.active : false}
                innerRef={register()}
                />
                 <Label for='active'>
                  {intl.formatMessage({id: "Active"})}
                  
                  </Label>
            </FormGroup>
          </Col>
        </Row>
      
        <div className='add-intervals mb-1'>
         <span style={{cursor:"pointer"}} onClick={addInterval}>
          + اضافة فترة
         </span>
        </div>
        {interval.map((item, index) => (
          <Intervals monthHandler={monthHandler} selectedPeriodicity={selectedPeriodicity} index={index} item={item} intervals={interval} setDay={setDay} setMonth={setMonth} removeInterval={removeInterval} key={item.id} />
        ))}
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

export default SidebarNewPeriodicity


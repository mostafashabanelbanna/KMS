import { useState, useEffect } from "react"
import Row from "reactstrap/lib/Row"
import Col from "reactstrap/lib/Col"
import Label from "reactstrap/lib/Label"
import Select from 'react-select'
import { useIntl } from 'react-intl'
import { selectThemeColors } from '@utils'
import { useDispatch, useSelector  } from 'react-redux'


const Intervals = ({index}) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.periodicities)

  const intl = useIntl()
  const monthsArray = [{value :1, label:intl.formatMessage({id: "January"})}, {value:2,  label:intl.formatMessage({id: "February"})}, {value:3,  label:intl.formatMessage({id: "March"})}, {value:4, label:intl.formatMessage({id: "April"})}, { value:5,  label:intl.formatMessage({id: "May"})}, {value:6,  label:intl.formatMessage({id: "June"})}, {value:7,  label:intl.formatMessage({id: "July"})}, {value:8,  label:intl.formatMessage({id: "August"})}, {value:9,  label:intl.formatMessage({id: "September"})}, {value:10,  label:intl.formatMessage({id: "October"})}, {value:11,  label:intl.formatMessage({id: "November"})}, {value:12,  label:intl.formatMessage({id: "December"})}]
  const [daysArray, setDaysArray] = useState([])
  
 
  function daysInMonth (month = 1) {
    const currentYear = new Date().getFullYear() 
    return new Date(currentYear, month, 0).getDate() 
  }

  const handleMonthChange = event => {
    const temp = store.seletctedIntervals
    temp[index].month = event
    dispatch({type:"SET_SELECTED_INTERVALS", seletctedIntervals: temp})
    const tempDays = []
    for (let i = 1; i <= daysInMonth(store.seletctedIntervals[index].month.value); i++) {
      tempDays.push({value: i, label: i})  
    }
    setDaysArray(tempDays)
  }

  const handleDayChange = event => {
    const temp = store.seletctedIntervals
    temp[index].day = event
    dispatch({type:"SET_SELECTED_INTERVALS", seletctedIntervals: temp})
  }

  useEffect(() => {
    const temp = store.seletctedIntervals
    dispatch({type:"SET_SELECTED_INTERVALS", seletctedIntervals: temp})
    const tempDays = []
    if (store.seletctedIntervals[index].month) {
      for (let i = 1; i <= daysInMonth(store.seletctedIntervals[index].month.value); i++) {
        tempDays.push({value: i, label: i})
        
      }
      setDaysArray(tempDays)
    }
  
 
  }, [store.seletctedIntervals[index].id])

    return (
        <div className="add-inteval">
          <Row  className="align-items-center mb-1 "> 
            <Col sm={6}  >
              <Label for='name'>
                {intl.formatMessage({id: "Month"})}
              </Label>
              <Select 
                value={store.seletctedIntervals[index].month}
                // getOptionLabel={(option) => option.month}
                // getOptionValue={(option) => option.month}
                placeholder="تحديد"
                isClearable={false}
                name='month'
                id='month'
                className='react-select'
                classNamePrefix='select'
                onChange = {(e) => handleMonthChange(e)}
                options = {monthsArray}
                theme={selectThemeColors}
              />
           
            </Col>
            <Col sm={6} >
              <Label for='name'>
                {intl.formatMessage({id: "Day"})}
              </Label>
              <Select
                  value={store.seletctedIntervals[index].day}
                  // getOptionLabel={(option) => option.day}
                  // getOptionValue={(option) => option.day}
                  isClearable={false}
                  name='day'
                  id='day'
                  className='react-select'
                  classNamePrefix='select'
                  onChange = {(e) =>  handleDayChange((e)) }
                  options = {daysArray}
                  placeholder = 'تحديد'
                  theme={selectThemeColors}
                />
            </Col>
            {/* <Col sm={2}  >
              <div className='remove-butoon' style={{cursor:"pointer", color:"#6e6b7b", fontSize:"16px", fontWeight:"bold"}} onClick={() => props.removeInterval(id)} >x</div>
            </Col> */}
          </Row>
        </div>
    )
}
export default Intervals
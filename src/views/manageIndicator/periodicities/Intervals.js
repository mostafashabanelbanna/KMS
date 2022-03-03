import { useState } from "react"
import Row from "reactstrap/lib/Row"
import Col from "reactstrap/lib/Col"
import Select from 'react-select'
import { useIntl } from 'react-intl'
import { selectThemeColors } from '@utils'

const Intervals = (props) => {
  const intl = useIntl()
// console.log('item : ', props.item[props.index].day)
//days in month function
 const monthsArray = [{value :1, label:intl.formatMessage({id: "January"})}, {value:2,  label:intl.formatMessage({id: "February"})}, {value:3,  label:intl.formatMessage({id: "March"})}, {value:4, label:intl.formatMessage({id: "April"})}, { value:5,  label:intl.formatMessage({id: "May"})}, {value:6,  label:intl.formatMessage({id: "June"})}, {value:7,  label:intl.formatMessage({id: "July"})}, {value:8,  label:intl.formatMessage({id: "August"})}, {value:9,  label:intl.formatMessage({id: "Septemper"})}, {value:10,  label:intl.formatMessage({id: "October"})}, {value:11,  label:intl.formatMessage({id: "November"})}, {value:12,  label:intl.formatMessage({id: "December"})}]
 const [monthValue, setMonthValue] = useState()
 //console.log(monthValue)
 
 function daysInMonth (month = 1) {
  const currentYear = new Date().getFullYear() 
  return new Date(currentYear, month, 0).getDate() 
  
}
//console.log(daysInMonth(monthValue))

const daysArr = []
for (let i = 1; i <= daysInMonth(monthValue); i++) {
  daysArr.push(i)
  
}

const temp = props.item
const id = props.item.id

const handelMonthValue = (e) => {
  console.log(e)
  setMonthValue(e.value)
 temp.month = e.value
 props.setMonth(temp.month)
}

//remove interval


    return (
        <div className="add-inteval">
          <Row key={props.key} className="align-items-center mb-1 "> 
            <Col sm={5}   >
              <Select 
                className='react-select'
                classNamePrefix='select'
                defaultValue = {{label:props.item.month, value :props.item.month}} 
                onChange = {(e) => {
                  
                handelMonthValue((e))
                }}
                options = {monthsArray}
                placeholder = ''
                theme={selectThemeColors}
              />
{/*<select defaultValue={props.item.month} style={{width:"100%", padding: " 3px", color:"#6e6b7b", border: "1px solid #6e6b7b", borderRadius: "0.357rem", backgroundColor: "transparent " }} onChange={(e) => {
 setMonthValue(e.target.value)
 temp.month = e.target.value
 props.setMonth(temp.month)

} } > 
{monthsArray.map((month, index) => (

<option value={index + 1}>{month}</option>

))}
</select>*/}

</Col>
<Col sm={5} >
<select defaultValue={props.item.day} style={{width:"100%", padding: " 3px", color:"#6e6b7b", border: "1px solid #6e6b7b", borderRadius: "0.357rem", backgroundColor: "transparent " }}
 onChange = {(e) => {
     temp.day = e.target.value
     props.setDay(temp.day)
     
 }}>
{daysArr.map(day => (
<option value={day}>{day}</option>
  ))}
 </select>
 </Col>

<Col sm={2}  >

  <div className='remove-butoon' style={{cursor:"pointer", color:"#6e6b7b", fontSize:"16px", fontWeight:"bold"}} onClick={() => props.removeInterval(id)} >x</div>

</Col>
</Row>

        </div>
    )
}
export default Intervals
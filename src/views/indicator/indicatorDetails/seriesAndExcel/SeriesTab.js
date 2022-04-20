import {  useState } from 'react'
import {Row, Col, Label, Button, FormGroup, FormText, Form, Input } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import { useIntl } from 'react-intl'
import Select from 'react-select'
import { selectThemeColors } from '@utils'

const SeriesTab = () => {
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const intl = useIntl()

  const handleDimensionChange = () => {

  }

  const onSubmit = () => {
    console.log(fromDate)
  }
  
  return (
    <Form onSubmit={onSubmit}>
      <Row className="mx-0">
        <Col sm='3' >
          <FormGroup>
            <Label for='name'>
              {intl.formatMessage({id: "From"})} 
            </Label>
            <Flatpickr className='form-control short_date_picker' value={fromDate} onChange={date => setFromDate(date)} id='from-picker' />
          </FormGroup>
        </Col>
        <Col sm='3' >
          <FormGroup>
            <Label for='name'>
              {intl.formatMessage({id: "From"})} 
            </Label>
            <Flatpickr className='form-control short_date_picker' value={toDate} onChange={date => setToDate(date)} id='to-picker' />
          </FormGroup>
        </Col>
      </Row>
      <Row className="mx-0">
        <Col sm='3' >
          <Select
            placeholder="تحديد"
            isClearable={false}
            theme={selectThemeColors}
            // defaultValue={selectedUser ?  selectedUser.roles : []}
            // getOptionLabel={(option) => option.name}
            // getOptionValue={(option) => option.id}
            isMulti
            name='dimension'
            id='dimension'
            // options={allRoles}
            className='react-select'
            classNamePrefix='select'
            onChange={e => handleDimensionChange(e) }
          />
        </Col>
      </Row>

    </Form>
  )
}

export default SeriesTab

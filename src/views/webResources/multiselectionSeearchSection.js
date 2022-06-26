import { Col, FormGroup, Input, Label, Row } from "reactstrap"
import Select from 'react-select'
import { selectThemeColors } from '@utils'

const MultiselectionSection = ({title, options, handleValueChange, values}) => {
  return <div className="d-flex flex-column px-2 pb-1">
    <div className="d-flex">
      <p className="col-6 mb-0">{title}</p>
    </div>
    <Row className="mx-0">
      <Col sm='12' >
        <FormGroup>
          <Select
            isMulti
            placeholder="تحديد"
            isClearable={false}
            theme={selectThemeColors}
            name='dimensions'
            id='dimensions'
            value={values}
            options={options}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            className='react-select'
            classNamePrefix='select'
            onChange={e => handleValueChange(e)}
          />
        </FormGroup>
      </Col>
    </Row>
  </div>
}

export default MultiselectionSection
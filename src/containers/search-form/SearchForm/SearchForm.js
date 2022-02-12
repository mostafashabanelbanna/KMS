import React from 'react'
import {Input, FormGroup, Label} from 'reactstrap'
import CreatableSelect from 'react-select/creatable'
import Col from 'reactstrap/lib/Col'
import Row from 'reactstrap/lib/Row'
import Form from 'reactstrap/lib/Form'
import Button from 'reactstrap/lib/Button'


const SearchForm = (props) => {

  const formItems = props.formConfig.map((item, index) => {
        switch (item.fieldType) {
            case 'text':
                return  <Col key={index} className='my-2' lg={item.colSizeLg}><Input  type={item.fieldType}   placeholder={item.label} onChange={(e) => props.searchHandler(e.target.value, item.attr)} /></Col> 
            case 'select':
                return (<Col  key={index} className='my-2' lg="4"> <CreatableSelect options={item.dropdownArr} placeholder="تحديد" className='react-select' classNamePrefix='select' multiple={item.multiple} onChange={(e) => props.searchHandler(e.value, item.attr)} /></Col>)
            case 'checkbox':
                return  (<Col  key={index} className='my-2' lg={item.colSizeLg}><FormGroup check inline>
                    <Input type='checkbox' defaultChecked={false} id={item.attr} onChange={(e) => props.searchHandler(e.target.checked, item.attr)}/>
                    <Label for={item.attr} check>
                        {item.label}
                    </Label>
                 </FormGroup></Col>)
            case 'radio':
                return (<Col lg={item.colSizeLg} className="d-flex align-items-center my-2" >   
                        { item.radioArr.map((radioItem, index) => {
                            return (
                                    <FormGroup  key={index} check inline>
                                        <Label check>
                                           <Input type='radio' name='ex1' defaultChecked={ index === 0 } id={index} onChange={(e) => props.searchHandler(radioItem, item.label)}  />  
                                            {radioItem}
                                        </Label>
                                    </FormGroup>
                                    ) 
                        })} </Col>
                    )
        }
    })

    return (
        <Row className="m-2">
            {formItems}
            {/* {console.log(formItems.length)} */}
            <Col lg={props.display === 'inline' ? 4 : 12}  className={`d-flex my-2  align-items-center ${props.display === 'inline' ? "justify-content-start" : "justify-content-end"}`}><Button color='success' onClick={props.submitHandler}>{props.btnText}</Button></Col>
        </Row>
    )
}


export default SearchForm
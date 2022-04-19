import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Col, FormGroup, Input, Label, Row } from "reactstrap"
import Select from 'react-select'
import { isObjEmpty, getSelected, selectThemeColors, convertToBoolean } from '@utils'

const MultiselectionSection = ({title}) => {
    // const [openSection, setOpenSection] = useState(false)
    // const [plusIcon, setPlusIcon] = useState(faPlus)

    return <div className="d-flex flex-column px-2 pb-1">
        <div className="d-flex">
            <p className="col-6 mb-0">{title}</p>
            {/* <div className="col-5">
                <div className="text-white d-flex align-items-center justify-content-center" style={{backgroundColor: "#dca627", height: 30, width: 30, borderRadius: "50%"}}>
                    1
                </div>
            </div>
            <FontAwesomeIcon icon={plusIcon} color={"#47cdbf"} style={{cursor:"pointer"}} className={"col d-flex flex-column align-self-center"} onClick={() => {
                setOpenSection(!openSection)
                setPlusIcon(plusIcon === faPlus ? faMinus : faPlus)
            }}/> */}
        </div>
        <Row className="mx-0">
            <Col sm='12' >
        <FormGroup>
            {/* <Label for='name'>
              
                {intl.formatMessage({id: "Dimensions"})}
            </Label> */}
            {/* {selectedIndicator.indicatorDimensionsDtos &&   */}
            <Select
                    // defaultValue={selectedIndicator ? selectedIndicator.indicatorDimensionsDtos : []}
                    isMulti
                    placeholder="تحديد"
                    isClearable={false}
                    theme={selectThemeColors}
                    name='dimensions'
                    id='dimensions'
                    // options={allDimensionLevels}
                    // getOptionLabel={(option) => option.name}
                    // getOptionValue={(option) => option.id}
                    className='react-select'
                    classNamePrefix='select'
                    onChange={e => handleDimensionLevelsChange(e) }
                  />
                  {/* } */}
                   {/* {!selectedIndicator.indicatorDimensionsDtos &&  <Select
                    defaultValue={selectedIndicator ? selectedIndicator.indicatorDimensionsDtos : []}
                    isMulti
                    placeholder="تحديد"
                    isClearable={false}
                    theme={selectThemeColors}
                    name='dimensions'
                    id='dimensions'
                    options={allDimensionLevels}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    className='react-select'
                    classNamePrefix='select'
                    onChange={e => handleDimensionLevelsChange(e) }
                  />} */}
     
            </FormGroup>
            </Col>
            
      </Row>
        {/* {openSection && <div className="d-flex flex-column mt-1 px-2">
        <div className='mx-0 d-flex align-items-center'>
        <Col sm='6' >
              <FormGroup>
                <Input 
                  value="true"
                  type="checkbox" 
                  placeholder="admin" 
                  name="admin" 
                  defaultChecked ={false}
                  style={{width: 16, height: 16}}
                //   innerRef={register()}  
                  />
                  <Label for='admin' style={{fontSize: 18}} className="mx-1">
                    Lol
                  </Label>
              </FormGroup>
            </Col>
        </div>
        <div className='mx-0 d-flex align-items-center pl-3'>
        <Col>
              <FormGroup>
                <Input 
                  value="true"
                  type="checkbox" 
                  placeholder="admin" 
                  name="admin" 
                  defaultChecked ={false}
                  style={{width: 16, height: 16}}
                //   innerRef={register()}  
                  />
                  <Label for='admin' style={{fontSize: 18}} className="mx-1">
                    Lol child 1
                  </Label>
              </FormGroup>
              <FormGroup>
                <Input 
                  value="true"
                  type="checkbox" 
                  placeholder="admin" 
                  name="admin" 
                  defaultChecked ={false}
                  style={{width: 16, height: 16}}
                //   innerRef={register()}  
                  />
                  <Label for='admin' style={{fontSize: 18}} className="mx-1">
                    Lol child 2
                  </Label>
              </FormGroup>
            </Col>
        </div>
        <div className='mx-0 d-flex align-items-center pl-5'>
        <Col>
              <FormGroup>
                <Input 
                  value="true"
                  type="checkbox" 
                  placeholder="admin" 
                  name="admin" 
                  defaultChecked ={false}
                  style={{width: 16, height: 16}}
                //   innerRef={register()}  
                  />
                  <Label for='admin' style={{fontSize: 18}} className="mx-1">
                    Lol grand child 1 
                  </Label>
              </FormGroup>
              <FormGroup>
                <Input 
                  value="true"
                  type="checkbox" 
                  placeholder="admin" 
                  name="admin" 
                  defaultChecked ={false}
                  style={{width: 16, height: 16}}
                //   innerRef={register()}  
                  />
                  <Label for='admin' style={{fontSize: 18}} className="mx-1">
                    Lol grand child 2
                  </Label>
              </FormGroup>
            </Col>
        </div>
        </div>} */}
    </div>
}

export default MultiselectionSection
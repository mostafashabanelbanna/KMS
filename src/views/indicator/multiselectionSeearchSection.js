import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Col, FormGroup, Input, Label } from "reactstrap"

const MultiselectionSection = ({title}) => {
    const [openSection, setOpenSection] = useState(false)
    const [plusIcon, setPlusIcon] = useState(faPlus)

    return <div className="d-flex flex-column px-2 pb-1">
        <div className="d-flex">
            <p className="col-6 mb-0">{title}</p>
            <div className="col-5">
                <div className="text-white d-flex align-items-center justify-content-center" style={{backgroundColor: "#dca627", height: 30, width: 30, borderRadius: "50%"}}>
                    1
                </div>
            </div>
            <FontAwesomeIcon icon={plusIcon} color={"#47cdbf"} style={{cursor:"pointer"}} className={"col d-flex flex-column align-self-center"} onClick={() => {
                setOpenSection(!openSection)
                setPlusIcon(plusIcon === faPlus ? faMinus : faPlus)
            }}/>
        </div>
        {openSection && <div className="d-flex flex-column mt-1 px-2">
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
                    {/* {intl.formatMessage({id: ""})} */}
                  </Label>
              </FormGroup>
            </Col>
        </div>
        <div className='mx-0 d-flex align-items-center px-3'>
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
                    Lol child 1
                    {/* {intl.formatMessage({id: ""})} */}
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
                    {/* {intl.formatMessage({id: ""})} */}
                  </Label>
              </FormGroup>
            </Col>
        </div>
        <div className='mx-0 d-flex align-items-center px-5'>
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
                    Lol grand child 1 
                    {/* {intl.formatMessage({id: ""})} */}
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
                    {/* {intl.formatMessage({id: ""})} */}
                  </Label>
              </FormGroup>
            </Col>
        </div>
        </div>}
    </div>
}

export default MultiselectionSection
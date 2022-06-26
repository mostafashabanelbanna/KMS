import {useState, useEffect} from 'react'

// ** Third Party Components
import { useForm } from 'react-hook-form'
import { Lock } from 'react-feather'
import { Row, Col, Button, Form, Table, CustomInput } from 'reactstrap'
import { useDispatch  } from 'react-redux'
import { FormattedMessage } from 'react-intl'

// ** Utils
import { isObjEmpty } from '@utils'
import { setRolePermission } from '../store/action'


const PermissionsForm = ({roleId, storePerm, currentObjectFunctions, currentObject}) => {

   // ** Store Vars
   const dispatch = useDispatch()
  //  const store = useSelector(state => state.roles)
  
  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  const [removdDeuplicates, setRemovdDeuplicates] = useState([])
  // const removDeuplicates = (arr1, arr2) => {
          // const arr1DiffRef = [...arr1]
          // const arr2DiffRef = [...arr2]

          // for (let i = 0, len = arr1DiffRef.length; i < len; i++) { 
          //     for (let j = 0, len2 = arr2DiffRef.length; j < len2; j++) { 
          //         if (arr1DiffRef[i].functionName === arr2DiffRef[j].functionName) {
          //             arr2DiffRef.splice(j, 1)
          //             len2 = arr2DiffRef.length
          //         }
          //     }
          //   }
          //   setRemovdDeuplicates([...arr1DiffRef, ...arr2DiffRef])   
  // }   

  const removDeuplicates = (arr1, arr2) => {
    console.table(arr1)
    console.table(arr2)
      
    const isSameFunction = (arr1, arr2) => arr1.functionName === arr2.functionName

    // Get items that only occur in the left array,
    // using the compareFunction to determine equality.
    const onlyInLeft = (left, right, compareFunction) =>  (
      left.filter(leftValue => !right.some(rightValue => compareFunction(leftValue, rightValue)))
    )

    // const onlyInA = onlyInLeft(arr1, arr2, isSameFunction)
    const onlyInB = onlyInLeft(arr2, arr1, isSameFunction)
    for (let i = 0; i < onlyInB.length; i++) {
      onlyInB[i].permissionValue = 0
    }
    setRemovdDeuplicates([...arr1, ...onlyInB])
  
  }  
  
  useEffect(() => {
    removDeuplicates(storePerm, currentObjectFunctions)
  }, [storePerm])

  const  handhange = (e, itemFunctionName) => {
    const diffRef = [...removdDeuplicates]
    for (let i = 0; i < diffRef.length; i++) {
      if (diffRef[i].functionName === itemFunctionName) {
        diffRef[i].permissionValue =   parseInt(e.target.value)
      }

      setRemovdDeuplicates(diffRef)
    }

  }

   // ** Function to handle form submit
   const onSubmit = async values => {
    if (isObjEmpty(errors)) {
      await dispatch(
        setRolePermission({
          roleId,
          objectName : currentObject.ObjectName,
          permissions : removdDeuplicates
        })
      )
    }
  }

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm='12'>
            <div className='permissions border mt-1'>
              <h6 className='py-1 mx-1 mb-0 font-medium-2'>
                <Lock size={18} className='mr-25' />
                <span className='align-middle'><FormattedMessage id={currentObject.DisplayName} /></span>
              </h6>
              <Table borderless striped responsive>
                <thead className='thead-light'>
                  <tr>
                    <th>
                      <FormattedMessage id={'Functions'} />
                    </th>
                    <th><FormattedMessage id={'Inherit'} /></th>
                    <th><FormattedMessage id={'Allow'} /></th>
                    <th><FormattedMessage id={'Deny'} /></th>
                  </tr>
                </thead>
                <tbody>
                 {removdDeuplicates.map((item, index) => {
                   // console.log(item.permissionValue)
                      return (
                        <tr key={`${currentObject}${item.functionName}${index}`}>
                          <td><FormattedMessage id={item.functionName} /></td>
                          <td>
                            <CustomInput onChange={ (e) => handhange(e, item.functionName) } checked={item.permissionValue === 0 } type='radio' id={`${currentObject}${item.functionName}0`} name={`${item.functionName}`} value={0 } inline  />
                         </td> 
                          <td>
                            <CustomInput  onChange={ (e) => handhange(e, item.functionName) } checked={ item.permissionValue === 1 } type='radio' id={`${currentObject}${item.functionName}1`} name={`${item.functionName}`} value={1 } inline className='custom-control-success' /> 
                           </td>
                          <td>
                            <CustomInput  onChange={ (e) => handhange(e, item.functionName) } checked= { item.permissionValue === 2 }  type='radio' id={`${currentObject}${item.functionName}2`} name={`${item.functionName}`} value={2 } inline className='custom-control-danger' />
                          </td>
                        </tr>
                      )
                      })
                 }
                </tbody>
              </Table>
            </div>
          </Col>
          <Col className='d-flex flex-sm-row justify-content-end flex-column mt-2' sm='12'>
            <Button.Ripple className='mb-1 mb-sm-0 mr-0 mr-sm-1' type='submit' color='primary'>
              <FormattedMessage id='Save' />
            </Button.Ripple>
          </Col>
        </Row>
      </Form>
    )
}

export default PermissionsForm
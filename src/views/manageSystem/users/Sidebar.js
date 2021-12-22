// ** React Import
import { useState, useEffect } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { isObjEmpty, getSelected, selectThemeColors } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, FormText, Form, Input } from 'reactstrap'
import Select, { components } from 'react-select'

import axios from '../../../axios'


// ** Store & Actions
import { addUser, resetCreateResponse, updateUser, resetUpdateResponse } from './store/action'
import { useDispatch, useSelector  } from 'react-redux'
import { event } from 'jquery'
import CustomInput from 'reactstrap/lib/CustomInput'
import { useIntl } from 'react-intl'
import Row from 'reactstrap/lib/Row'
import Col from 'reactstrap/lib/Col'

const SidebarNewUsers = ({ open, toggleSidebar, selectedUser }) => {
  // ** States
  const [userRoles, setUserRoles] = useState([])
  const [allRoles, setAllRoles] = useState([])

  // fetch all user roles options
  const getAllRoles = async () => {
    const response = await axios
      .get('/Role/GetRoles')
      .catch((err) => console.log("Error", err)) //handle errors

      if (response && response.data) {
        setAllRoles(response.data.data)
      }
    } 

  useEffect(() => {
    getAllRoles()
  }, [])

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.users)

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // pass only role id to userRoles
  const handleRolesChange = (event) => {
    const options = []
    event.map(opt => options.push(opt.value))
    setUserRoles(options)
  }
  
  // Convert user roles array to make objects keys compatible with react select
  const convertRolesArr = (originArr) => {
    const newArr = []
    originArr.map(option => {
      const newObject = {}
      delete Object.assign(newObject,  {['value']: option['id'] }, {['label']: option['name'] })[option]
      newArr.push(newObject)
    })
    return newArr
  }

  // ** Function to handle form submit
  const onSubmit = async values => {
  console.log(selectedUser)

    if (isObjEmpty(errors)) {
      if (!selectedUser.id) {
        await dispatch(
            addUser({
              name: values.name,
              nameE: values.nameE,
              jobTitle: values.jobTitle,
              photo: values.photo,
              password: values.password,
              userName: values.userName,
              email: values.email,
              phoneNumber: values.phoneNumber,
              admin: values.admin,
              sortIndex: values.sortIndex,
              locked: values.locked,
              focus: values.focus,
              active: values.active,
              userRoles
            })
          )
      } else {
        await dispatch(
          updateUser(
            {
              name: values.name,
              nameE: values.nameE,
              jobTitle: values.jobTitle,
              photo: values.photo,
              password: values.password,
              userName: values.userName,
              email: values.email,
              phoneNumber: values.phoneNumber,
              admin: values.admin,
              sortIndex: values.sortIndex,
              locked: values.locked,
              focus: values.focus,
              active: values.active,
              userRoles,
              id: selectedUser.id
            }
          )
        )
      }
     
    }
  }
  
  useEffect(() => {
    if (store.createResponse.statusCode !== 0) {
        if (store.createResponse.statusCode === 401) {
            localStorage.clear()
            location.reload()
        } else if (store.createResponse.statusCode === 200) {
            alert("Added Successfully")
            toggleSidebar(1)
        }     
        resetCreateResponse()
    }
  }, [store.createResponse.statusCode])

  useEffect(() => {
    if (store.updateResponse.statusCode !== 0) {
        if (store.updateResponse.statusCode === 401) {
            localStorage.clear()
        } else if (store.updateResponse.statusCode === 200) {
            alert("updated Successfully")
            toggleSidebar(1)
        }
        resetUpdateResponse() 
    }
  }, [store.updateResponse.statusCode])
  
  const intl = useIntl()

  return (
    <Sidebar
      size='lg'
      open={open}
      title={intl.formatMessage({id: "Add User"})}
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
            defaultValue={selectedUser ? selectedUser.name : ''}
            placeholder={intl.formatMessage({id: "Name"})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['name'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='nameE'>
          <span className='text-danger'>*</span> {intl.formatMessage({id: "Name In English"})}
          </Label>
          <Input
            name='nameE'
            id='nameE'
            defaultValue={selectedUser ? selectedUser.nameE : ''}
            placeholder={intl.formatMessage({id: "Name In English"})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['nameE'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='jobTitle'>
             <span className='text-danger'>*</span> {intl.formatMessage({id: "Job Title"})}
          </Label>
          <Input
            name='jobTitle'
            id='jobTitle'
            defaultValue={selectedUser ? selectedUser.jobTitle : ''}
            placeholder={intl.formatMessage({id: "Job Title"})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['jobTitle'] })}
          />
        </FormGroup>
        <FormGroup>
              <Label for='photo'>{intl.formatMessage({id: "Photo"})}</Label>
              <CustomInput
                type='file' 
                id='photo'
                name='photo' 
                label={intl.formatMessage({id: "Chose Photo"})}
                
                innerRef={register()}
                className={classnames({ 'is-invalid': errors['photo'] })}/>
            </FormGroup>
     
        <FormGroup>
          <Label for='password'>
           <span className='text-danger'>*</span> {intl.formatMessage({id: "Password"})}
          </Label>
          <Input
            type='password'
            name='password'
            id='password'
            // defaultValue={selectedUser ? selectedUser.password : ''}
            placeholder={intl.formatMessage({id: "Password"})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['password'] })}
          />
          {/* <FormText color='muted'>You can use letters, numbers & periods</FormText> */}
        </FormGroup>
        <FormGroup>
          <Label for='userName'>
           <span className='text-danger'>*</span> {intl.formatMessage({id: "User Name"})}
          </Label>
          <Input
            name='userName'
            id='userName'
            defaultValue={selectedUser ? selectedUser.userName : ''}
            placeholder={intl.formatMessage({id: "User Name"})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['userName'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='email'>
           <span className='text-danger'>*</span> {intl.formatMessage({id: "Email"})}
          </Label>
          <Input
            // type='email'
            name='email'
            id='email'
            defaultValue={selectedUser ? selectedUser.email : ''}
            placeholder={intl.formatMessage({id: "Email"})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['email'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='phoneNumber'>
          <span className='text-danger'>*</span> {intl.formatMessage({id: "Phone Number"})}
          </Label>
          <Input
            name='phoneNumber'
            id='phoneNumber'
            defaultValue={selectedUser ? selectedUser.phoneNumber : ''}
            placeholder='(397) 294-5153'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['phoneNumber'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='sortIndex'>
          <span className='text-danger'>*</span> {intl.formatMessage({id: "Sort Index"})}
          </Label>
          <Input
            type="number"
            name='sortIndex'
            id='sortIndex'
            defaultValue={selectedUser ? selectedUser.sortIndex : ''}
            placeholder='0'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['sortIndex'] })}
          />
        </FormGroup>
        <FormGroup>
              <Label>{intl.formatMessage({id: "Roles"})}</Label>
              <Select
                isClearable={false}
                theme={selectThemeColors}
                defaultValue={selectedUser ? (selectedUser.roles ? convertRolesArr(selectedUser.roles) : null) : []}
                isMulti
                name='userRoles'
                id='userRoles'
                options={ convertRolesArr(allRoles)}
                className='react-select'
                classNamePrefix='select'
                onChange={e => handleRolesChange(e) }
              />
          </FormGroup>
          <Row className="mx-0">
            <Col sm='6' >
              <FormGroup>
                <Input 
                  type="checkbox" 
                  placeholder="admin" 
                  name="admin" 
                  defaultChecked ={selectedUser ? selectedUser.admin : false}
                  innerRef={register()}  />

                  <Label for='admin'>
                    {intl.formatMessage({id: "Admin"})}
                  </Label>
                
              </FormGroup>
            </Col>
            <Col sm='6' >
              <FormGroup>
                <Input 
                  type="checkbox"
                  placeholder="locked"
                  name="locked" 
                  defaultChecked ={selectedUser ? selectedUser.locked : false}
                  innerRef={register()} />
                  <Label for='locked'>
                  {intl.formatMessage({id: "Locked"})}
                </Label>
              </FormGroup>
            </Col>
            <Col sm='6' >
            <FormGroup>
            
              <Input 
                type="checkbox" 
                placeholder="focus"  
                name="focus" 
                defaultChecked ={selectedUser ? selectedUser.focus : false}
                innerRef={register()} />
                  <Label for='focus'>
                {intl.formatMessage({id: "Focus"})}
              </Label>
            </FormGroup>
            </Col>
            <Col sm='6' >
            <FormGroup>
             
              <Input 
                type="checkbox" 
                placeholder="active"  
                name="active" 
                defaultChecked ={selectedUser ? selectedUser.active : false}
                innerRef={register()}
                />
                 <Label for='active'>
                  {intl.formatMessage({id: "Active"})}
                  
                  </Label>
            </FormGroup>
              </Col>
          </Row>

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

export default SidebarNewUsers


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

import axios from '../../../../axios'


// ** Store & Actions
import { addUser, resetResponse } from '../store/action'
import { useDispatch, useSelector  } from 'react-redux'
import { event } from 'jquery'
import CustomInput from 'reactstrap/lib/CustomInput'

const SidebarNewUsers = ({ open, toggleSidebar, closeSidebar }) => {
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
  const convertRolesArr = () => {
    const newArr = []
    allRoles.map(option => {
      const newObject = {}
      delete Object.assign(newObject,  {['value']: option['id'] }, {['label']: option['name'] })[option]
      newArr.push(newObject)
    })
    return newArr
  }

  // ** Function to handle form submit
  const onSubmit = values => {
    if (isObjEmpty(errors)) {
      dispatch(
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
    }
  }

  useEffect(() => {
    if (store.createresponse.statusCode !== 0) {
        alert("Saved Successfully")
        toggleSidebar(1)
        resetResponse()
    }
      
  }, [store.createresponse.statusCode])

  return (
    <Sidebar
      size='lg'
      open={open}
      title='New User'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for='name'>
            name <span className='text-danger'>*</span>
          </Label>
          <Input
            name='name'
            id='name'
            placeholder='John Doe'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['name'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='nameE'>
          nameE <span className='text-danger'>*</span>
          </Label>
          <Input
            name='nameE'
            id='nameE'
            placeholder='John Doe'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['nameE'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='jobTitle'>
          jobTitle <span className='text-danger'>*</span>
          </Label>
          <Input
            name='jobTitle'
            id='jobTitle'
            placeholder='johnDoe99'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['jobTitle'] })}
          />
        </FormGroup>
        <FormGroup>
              <Label for='photo'>photo</Label>
              <CustomInput
                type='file' 
                id='photo'
                name='photo'  
                innerRef={register()}
                className={classnames({ 'is-invalid': errors['photo'] })}/>
            </FormGroup>
        {/* <FormGroup>
          <Label for='photo'>
          photo <span className='text-danger'>*</span>
          </Label>
          <Input
            name='photo'
            id='photo'
            placeholder='photo'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['photo'] })}
          />
        </FormGroup> */}
        <FormGroup>
          <Label for='email'>
          password <span className='text-danger'>*</span>
          </Label>
          <Input
            type='password'
            name='password'
            id='password'
            placeholder='john.doe@example.com'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['password'] })}
          />
          {/* <FormText color='muted'>You can use letters, numbers & periods</FormText> */}
        </FormGroup>
        <FormGroup>
          <Label for='userName'>
          userName <span className='text-danger'>*</span>
          </Label>
          <Input
            name='userName'
            id='userName'
            placeholder='userName'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['userName'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='email'>
          email <span className='text-danger'>*</span>
          </Label>
          <Input
            // type='email'
            name='email'
            id='email'
            placeholder='email'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['email'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='phoneNumber'>
          phoneNumber <span className='text-danger'>*</span>
          </Label>
          <Input
            name='phoneNumber'
            id='phoneNumber'
            placeholder='(397) 294-5153'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['phoneNumber'] })}
          />
        </FormGroup>
        
        <FormGroup>
          <Label for='admin'>
           admin <span className='text-danger'>*</span>
          </Label>
          <Input className="mx-3" type="checkbox" placeholder="admin" name="admin" innerRef={register()}  />
        </FormGroup>

        <FormGroup>
          <Label for='sortIndex'>
          sortIndex <span className='text-danger'>*</span>
          </Label>
          <Input
            type="number"
            name='sortIndex'
            id='sortIndex'
            placeholder='0'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['sortIndex'] })}
          />
        </FormGroup>

        <FormGroup>
          <Label for='locked'>
          locked <span className='text-danger'>*</span>
          </Label>
          <Input className="mx-3" type="checkbox" placeholder="locked"  name="locked" innerRef={register()} />
        </FormGroup>

        <FormGroup>
          <Label for='focus'>
           focus <span className='text-danger'>*</span>
          </Label>
          <Input className="mx-3" type="checkbox" placeholder="focus"  name="focus" innerRef={register()} />
        </FormGroup>

        <FormGroup>
          <Label for='active'>
           active <span className='text-danger'>*</span>
          </Label>
          <Input className="mx-3" type="checkbox" placeholder="active"  name="active" innerRef={register()}   />
        </FormGroup>

        {/* <FormGroup>
          <Label for='user-role'>userRoles</Label>
          <Input multiple type='select' id='userRoles' name='userRoles' onChange={e => setUserRoles(getSelected(e)) }>
            <option value=''></option>
            { allRoles.map((opt) => <option key={opt.id} value={opt.id}>{opt.name}</option>) }
          
          </Input>
        </FormGroup> */}
        <FormGroup>
              <Label>Multi Select</Label>
              <Select
                isClearable={false}
                theme={selectThemeColors}
                // defaultValue={[colorOptions[2], colorOptions[3]]}
                isMulti
                name='userRoles'
                id='userRoles'
                options={ convertRolesArr()}
                className='react-select'
                classNamePrefix='select'
                onChange={e => handleRolesChange(e) }
              />
          </FormGroup>
        <Button type='submit' className='mr-1' color='primary'>
          Submit
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers


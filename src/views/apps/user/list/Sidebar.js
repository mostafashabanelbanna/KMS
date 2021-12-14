// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { isObjEmpty, getSelected } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Button, FormGroup, Label, FormText, Form, Input } from 'reactstrap'

// ** Store & Actions
import { addUser } from '../store/action'
import { useDispatch } from 'react-redux'
import { event } from 'jquery'
import CustomInput from 'reactstrap/lib/CustomInput'

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [userRoles, setUserRoles] = useState([])

  // ** Store Vars
  const dispatch = useDispatch()

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // ** Function to handle form submit
  const onSubmit = values => {
    if (isObjEmpty(errors)) {
      toggleSidebar()
      dispatch(
        addUser({
          Name: values.name,
          NameE: values.nameE,
          JobTitle: values.jobTitle,
          Photo: values.photo,
          Password: values.password,
          UserName: values.userName,
          Email: values.email,
          PhoneNumber: values.phoneNumber,
          Admin: values.admin,
          SortIndex: 0,
          Locked: values.locked,
          Focus: values.focus,
          Active: values.active,
          UserRoles : userRoles
        })
      )
    }
  }

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
            placeholder='(397) 294-5153'
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

        <FormGroup>
          <Label for='user-role'>userRoles</Label>
          <Input multiple type='select' id='userRoles' name='userRoles' onChange={e => setUserRoles(getSelected(e)) }>
            <option value='subscriber'>Subscriber</option>
            <option value='editor'>Editor</option>
            <option value='maintainer'>Maintainer</option>
            <option value='author'>Author</option>
            <option value='admin'>Admin</option>
          </Input>
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

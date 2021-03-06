// ** React Import
import { useState, useEffect } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { isObjEmpty, getSelected, selectThemeColors, convertToBoolean } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import Select, { components } from 'react-select'
import CustomInput from 'reactstrap/lib/CustomInput'
import { Button, FormGroup, Label, FormText, Form, Input } from 'reactstrap'
import Row from 'reactstrap/lib/Row'
import Col from 'reactstrap/lib/Col'
import { toast } from 'react-toastify'
import { useIntl } from 'react-intl'

// Axios
import axios from '../../../axios'


// ** Store & Actions
import { add, resetCreateResponse, updateItem, resetUpdateResponse } from './store/action'
import { useDispatch, useSelector  } from 'react-redux'
import Toastr from '../../../containers/toastr/Toastr'

const SidebarNew = ({ open, toggleSidebar, selectedProvider }) => {
  // ** States
  const [providerCategory, setProviderCategory] = useState(null)
  const [allProviderCategories, setAllProviderCategories] = useState([])
  const [selectMessage, setSelectMessage] = useState(null)

  // Import localization files
  const intl = useIntl()
  // Toastr notify function
  const notify = (type, message) => {
    return toast.success(
      <Toastr type={type} message={message} />,
      { 
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true 
      })
    }

  // fetch all Provider Categories options
  const getProviderCategories = async () => {
    const response = await axios
      .post('/Lookups/GetLookupValues/', {lookupName : "providerCategory"})
      .catch((err) => console.log("Error", err)) //handle errors

    if (response && response.data) {
      setAllProviderCategories(response.data.data)
    }
  } 

  useEffect(() => {
    getProviderCategories()
  }, [])

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.providers)

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  
  const handleProviderCategoriesChange = (event) => {
   
    setProviderCategory(event)
    setSelectMessage(null)
  }

  useEffect(() => {
    if (selectedProvider.providerCategory) {
      handleProviderCategoriesChange(selectedProvider.providerCategory)
    }
  }, [selectedProvider])
  
  // ** Function to handle form submit
  const onSubmit = async values => {
    if (!providerCategory) {
      setSelectMessage('field requird')
    } else {
      if (isObjEmpty(errors)) {
        if (!selectedProvider.id) {
          await dispatch(
              add({
                name_A: values.name_A,
                name_E: values.name_E,
                description_A: values.description_A,
                description_E: values.description_E,
                address_A: values.address_A,
                address_E: values.address_E,
                phone: values.phone,
                fax: values.fax,
                email: values.email,
                url: values.url,
                providerCategoryId: providerCategory?.id,
                sortIndex: values.sortIndex,
                focus: convertToBoolean(values.focus),
                active: convertToBoolean(values.active)
              })
            )
        } else {
          console.log(values)
          await dispatch(
            updateItem(
              {
                name_A: values.name_A,
                name_E: values.name_E,
                description_A: values.description_A,
                description_E: values.description_E,
                address_A: values.address_A,
                address_E: values.address_E,
                phone: values.phone,
                fax: values.fax,
                email: values.email,
                url: values.url,
                providerCategoryId: providerCategory?.id,
                sortIndex: values.sortIndex,
                focus: convertToBoolean(values.focus),
                active: convertToBoolean(values.active),
                id: selectedProvider.id
              }
            )
          )
        }
       
      }
    }
    
  }
  
  useEffect(() => {
    const code = store.createResponse.statusCode
    if (code !== 0) {
     
       if (code === 200) {
            notify('success', intl.formatMessage({id: "AddSuccess"}))
            toggleSidebar(1)
      } else if (code === 6) {
         notify('error', intl.formatMessage({id: store.createResponse.errors[0]}))

      } else if (code === 5) {
        notify('error', intl.formatMessage({id: "InvalidFileExtension"}))
      } else if (code === 1) {
        notify('error', `${intl.formatMessage({id: "CreationFialed"})} ${intl.formatMessage({id: "Provider"})}`)

      } else if (code === 500) {
        notify('error', `${intl.formatMessage({id: "InternalServerError"})} `)

      } 
      dispatch(resetCreateResponse())
    }
  }, [store.createResponse.statusCode])

  useEffect(() => {
    const code = store.updateResponse.statusCode
    if (code !== 0) {
       if (code === 200) {
            notify('success', intl.formatMessage({id: "UpdateSuccess"}))
            toggleSidebar(1)
      } else if (code === 6) {
        notify('error', intl.formatMessage({id: store.updateResponse.errors[0]}))
     } else if (code === 5) {
      notify('error', intl.formatMessage({id: "InvalidFileExtension"}))
     } else if (code === 3) {
       notify('error', `${intl.formatMessage({id: "UpdateFailed"})} ${intl.formatMessage({id: "Provider"})}`)
     } else if (code === 500) {
       notify('error', `${intl.formatMessage({id: "InternalServerError"})} `)
     } 
     dispatch(resetUpdateResponse())
    }
  }, [store.updateResponse.statusCode])

  const customStyles = {
    control: (provided) => ({
      ...provided,
      '&': {
        border: '1px solid #ff8b67'
      }
    })
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      // title={selectedProvider.id ? intl.formatMessage({id: "Edit"}) : intl.formatMessage({id: "Add"})}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for='name_A'>
           {intl.formatMessage({id: "Name"})} <span className='text-danger'>*</span>
          </Label>
          <Input
            name='name_A'
            id='name_A'
            defaultValue={selectedProvider ? selectedProvider.name_A : ''}
            placeholder={intl.formatMessage({id: "Name"})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['name'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='name_E'>
           {intl.formatMessage({id: "Name In English"})} <span className='text-danger'>*</span>
          </Label>
          <Input
            name='name_E'
            id='name_E'
            defaultValue={selectedProvider ? selectedProvider.name_E : ''}
            placeholder={intl.formatMessage({id: "Name In English"})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['nameE'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='description_A'>
           {intl.formatMessage({id: "Description"})}
          </Label>
          <Input
            name='description_A'
            id='description_A'
            type="textarea"
            defaultValue={selectedProvider ? selectedProvider.description_A : ''}
            placeholder={intl.formatMessage({id: "Description"})}
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['Description'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='description_E'>
           {intl.formatMessage({id: "Description"})}
          </Label>
          <Input
            name='description_E'
            id='description_E'
            type="textarea"
            defaultValue={selectedProvider ? selectedProvider.description_E : ''}
            placeholder={intl.formatMessage({id: "Description"})}
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['Description'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='address_A'>
            {intl.formatMessage({id: "TitleA"})} <span className='text-danger'>*</span>
          </Label>
          <Input
            name='address_A'
            id='address_A'
            defaultValue={selectedProvider ? selectedProvider.address_A : ''}
            placeholder={intl.formatMessage({id: "TitleA"})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['Address'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='address_E'>
            {intl.formatMessage({id: "TitleE"})} <span className='text-danger'>*</span>
          </Label>
          <Input
            name='address_E'
            id='address_E'
            defaultValue={selectedProvider ? selectedProvider.address_E : ''}
            placeholder={intl.formatMessage({id: "TitleE"})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['Address In English'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='phone'>
           {intl.formatMessage({id: "Phone Number"})}
          </Label>
          <Input
            name='phone'
            id='phone'
            defaultValue={selectedProvider ? selectedProvider.phone : ''}
            placeholder='(397) 294-5153'
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['phone'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='fax'>
           {intl.formatMessage({id: "Fax"})}
          </Label>
          <Input
            name='fax'
            id='fax'
            defaultValue={selectedProvider ? selectedProvider.fax : ''}
            placeholder='Fax'
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['fax'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='email'>
            {intl.formatMessage({id: "Email"})} <span className='text-danger'>*</span>
          </Label>
          <Input
            // type='email'
            name='email'
            id='email'
            defaultValue={selectedProvider ? selectedProvider.email : ''}
            placeholder={intl.formatMessage({id: "Email"})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['email'] })}
          />
        </FormGroup>
       
        <FormGroup>
          <Label for='url'>
            {intl.formatMessage({id: "url"})}
          </Label>
          <Input
            name='url'
            id='url'
            defaultValue={selectedProvider ? selectedProvider.url : ''}
            placeholder={intl.formatMessage({id: "url"})}
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['url'] })}
          />
        </FormGroup>
        <FormGroup>
              <Label>{intl.formatMessage({id: "Provider Category"})}</Label>
              {  !selectedProvider.providerCategory &&
                <>
                  <Select
                    styles={selectMessage ? customStyles : ''}
                    isClearable={false}
                    theme={selectThemeColors}
                    defaultValue={selectedProvider ?  selectedProvider.providerCategory : []}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    name='providerCategory'
                    id='providerCategory'
                    options={allProviderCategories}
                    className='react-select'
                    classNamePrefix='select'
                    placeholder="??????????"
                    onChange={e => handleProviderCategoriesChange(e)}
                  />
                 <span className='text-danger'>{selectMessage}</span>
                </>
              }
              {  selectedProvider.providerCategory &&
                <Select
                isClearable={false}
                theme={selectThemeColors}
                defaultValue={selectedProvider ?  selectedProvider.providerCategory : []}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                name='providerCategory'
                id='providerCategory'
                options={allProviderCategories}
                className='react-select'
                classNamePrefix='select'
                placeholder="??????????"
                onChange={e => handleProviderCategoriesChange(e)}
              />
              }
        </FormGroup>

        <FormGroup>
          <Label for='sortIndex'>
           {intl.formatMessage({id: "Sort Index"})} <span className='text-danger'>*</span>
          </Label>
          {
            selectedProvider.id && <Input
            type="number"
            name='sortIndex'
            id='sortIndex'
            defaultValue={selectedProvider.sortIndex}
            placeholder='0'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['sortIndex'] })}
          />
          }
          {
            !selectedProvider.id && <Input
            type="number"
            name='sortIndex'
            id='sortIndex'
            defaultValue={0}
            placeholder='0'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['sortIndex'] })}
          />
          }
          
        </FormGroup>
        
        
          <Row className="mx-0">
            <Col sm='6' >
            <FormGroup>
              {selectedProvider.id && <Input 
                type="checkbox" 
                placeholder="focus"  
                name="focus" 
                defaultChecked ={selectedProvider.focus}
                innerRef={register()} />
              }
              {!selectedProvider.id && <Input 
                type="checkbox" 
                placeholder="focus"  
                name="focus" 
                defaultChecked ={false}
                innerRef={register()} />
              }
              
                  <Label for='focus'>
                {intl.formatMessage({id: "Focus"})}
              </Label>
            </FormGroup>
            </Col>
            <Col sm='6' >
            <FormGroup>
             {selectedProvider.id && <Input 
                type="checkbox" 
                placeholder="active"  
                name="active" 
                defaultChecked ={selectedProvider.active}
                innerRef={register()}
                />
             }
            {!selectedProvider.id && <Input 
                type="checkbox" 
                placeholder="active"  
                name="active" 
                defaultChecked ={true}
                innerRef={register()}
                />
            }
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

export default SidebarNew


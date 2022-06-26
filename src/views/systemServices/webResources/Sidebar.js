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

const SidebarNew = ({ open, toggleSidebar, selectedWebResource }) => {
  // ** States
  const [indicators, setIndicators] = useState([])
  const [allIndicators, setAllIndicators] = useState([])

  const [alltWebResourceCategories, setAlltWebResourceCategories] = useState([])
  const [webResourceCategory, setWebResourceCategory] = useState(null)

  const getAllWebResourceCategories = async () => {
    const response = await axios
      .post("/Lookups/GetLookupValues", { lookupName: "webResourceCategory" })
      .catch((err) => console.log("Error", err)) //handle errors

     
      if (response && response.data)  console.log(response)
      if (response && response.data) setAlltWebResourceCategories(response.data.data)
  }

  useEffect(() => {
    getAllWebResourceCategories()
  }, [])

  const handleWebResourceCategoryChange = (event) => {
    console.log(event)
    setWebResourceCategory(event)
  }


  const getAllIndicators = async () => {
    const response = await axios
      .get('/Indicator/GetIndicators/0')
      .catch((err) => console.log("Error", err)) //handle errors

      if (response && response.data) {
        setAllIndicators(response.data.data)
      }
    } 
  useEffect(() => {
    getAllIndicators()
  }, [])

  const handleIndicatorsChange = (event) => {
    console.log(event)
    const options = []
    event.map(opt => options.push(opt.id))
    setIndicators(options)
  }

  useEffect(() => {
    if (selectedWebResource.indicators) {
      handleIndicatorsChange(selectedWebResource.indicators)
    }
  }, [selectedWebResource])

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


  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.webResources)

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  useEffect(() => {
    if (selectedWebResource.webResourceCategory) {
      handleWebResourceCategoryChange(selectedWebResource.webResourceCategory)
    }
  }, [selectedWebResource])
  

  // ** Function to handle form submit
  const onSubmit = async values => {
    if (isObjEmpty(errors)) {
      if (!selectedWebResource.id) {
        await dispatch(
            add({
              name_A: values.name_A,
              name_E: values.name_E,
              description_A: values.description_A,
              description_E: values.description_E,
              url: values.url,
              logo: values.logo,
              login: values.login,
              password: values.password,
              webResourceCategoryId: webResourceCategory ? webResourceCategory.id : "",
              sortIndex: values.sortIndex,
              focus: convertToBoolean(values.focus),
              active: convertToBoolean(values.active),
              indicators
            })
          )
      } else {
        await dispatch(
          updateItem(
            {
              name_A: values.name_A,
              name_E: values.name_E,
              description_A: values.description_A,
              description_E: values.description_E,
              url: values.url,
              logo: values.logo,
              login: values.login,
              password: values.password,
              webResourceCategoryId: webResourceCategory ? webResourceCategory.id : "",
              sortIndex: values.sortIndex,
              focus: convertToBoolean(values.focus),
              active: convertToBoolean(values.active),
              indicators,
              id: selectedWebResource.id
            }
          )
        )
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
        notify('error', `${intl.formatMessage({id: "CreationFialed"})} ${intl.formatMessage({id: "WebResource"})}`)

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
       notify('error', `${intl.formatMessage({id: "UpdateFailed"})} ${intl.formatMessage({id: "WebResource"})}`)
     } else if (code === 500) {
       notify('error', `${intl.formatMessage({id: "InternalServerError"})} `)
     } 
     dispatch(resetUpdateResponse())
    }
  }, [store.updateResponse.statusCode])
  return (
    <Sidebar
      size='lg'
      open={open}
      // title={selectedWebResource.id ? intl.formatMessage({id: "Edit"}) : intl.formatMessage({id: "Add"})}
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
            defaultValue={selectedWebResource ? selectedWebResource.name_A : ''}
            placeholder={intl.formatMessage({id: "Name"})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['name'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='name_E'>
           {intl.formatMessage({id: "Name In English"})}
          </Label>
          <Input
            name='name_E'
            id='name_E'
            defaultValue={selectedWebResource ? selectedWebResource.name_E : ''}
            placeholder={intl.formatMessage({id: "Name In English"})}
            innerRef={register({ required: false })}
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
            defaultValue={selectedWebResource ? selectedWebResource.description_A : ''}
            placeholder={intl.formatMessage({id: "Description"})}
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['description_A'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='description_E'>
            {intl.formatMessage({id: "descriptionE"})} 
          </Label>
          <Input
            name='description_E'
            id='description_E'
            type="textarea"
            defaultValue={selectedWebResource ? selectedWebResource.description_E : ''}
            placeholder={intl.formatMessage({id: "descriptionE"})}
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['description_E'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='url'>
            {intl.formatMessage({id: "url"})} <span className='text-danger'>*</span>
          </Label>
          <Input
            name='url'
            id='url'
            defaultValue={selectedWebResource ? selectedWebResource.url : ''}
            placeholder={intl.formatMessage({id: "url"})}
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['url'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='logo'>{intl.formatMessage({id: "Icon"})}</Label>
          <CustomInput
            type='file' 
            id='logo'
            name='logo' 
            label={intl.formatMessage({id: "Chose Photo"})}
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['logo'] })}/>
        </FormGroup>
        <FormGroup>
          <Label for='login'>
            {intl.formatMessage({id: "Username"})}
          </Label>
          <Input
            name='login'
            id='login'
            defaultValue={selectedWebResource ? selectedWebResource.login : ''}
            placeholder={intl.formatMessage({id: "Username"})}
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['Login'] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='password'>
            {intl.formatMessage({id: "Password"})}
          </Label>
          <Input
            name='password'
            id='password'
            defaultValue={selectedWebResource ? selectedWebResource.password : ''}
            placeholder={intl.formatMessage({id: "Password"})}
            innerRef={register({ required: false })}
            className={classnames({ 'is-invalid': errors['password'] })}
          />
        </FormGroup>
        <FormGroup>
            <Label for='webResourceCategory'>
                {intl.formatMessage({id: "Category"})}
            </Label>
            {selectedWebResource.webResourceCategory &&
                 <Select
                 defaultValue={selectedWebResource ? selectedWebResource.webResourceCategory : ''}
                 placeholder="تحديد"
                 isClearable={false}
                 theme={selectThemeColors}
                 name='webResourceCategory'
                 id='webResourceCategory'
                 options={alltWebResourceCategories}
                 getOptionLabel={(option) => option.name}
                 getOptionValue={(option) => option.id}
                 className='react-select'
                 classNamePrefix='select'
                 onChange={e => handleWebResourceCategoryChange(e) }
               />
            }
            {!selectedWebResource.webResourceCategory &&
                 <Select
                 defaultValue={selectedWebResource ? selectedWebResource.webResourceCategory : ''}
                 placeholder="تحديد"
                 isClearable={false}
                 theme={selectThemeColors}
                 name='webResourceCategory'
                 id='webResourceCategory'
                 options={alltWebResourceCategories}
                 getOptionLabel={(option) => option.name}
                 getOptionValue={(option) => option.id}
                 className='react-select'
                 classNamePrefix='select'
                 onChange={e => handleWebResourceCategoryChange(e) }
               />
            }
        </FormGroup>
     
        <FormGroup>
          <Label for='indicators'>
              {intl.formatMessage({id: "Indicators"})}
          </Label>
          {selectedWebResource.indicatorWebResources &&  <Select
                  defaultValue={selectedWebResource ? selectedWebResource.indicatorWebResources : []}
                  isMulti
                  placeholder="تحديد"
                  isClearable={false}
                  theme={selectThemeColors}
                  name='indicators'
                  id='indicators'
                  options={allIndicators}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  className='react-select'
                  classNamePrefix='select'
                  onChange={e => handleIndicatorsChange(e) }
                />}
                  {!selectedWebResource.indicatorWebResources &&  <Select
                  defaultValue={selectedWebResource ? selectedWebResource.indicatorWebResources : []}
                  isMulti
                  placeholder="تحديد"
                  isClearable={false}
                  theme={selectThemeColors}
                  name='indicators'
                  id='indicators'
                  options={allIndicators}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  className='react-select'
                  classNamePrefix='select'
                  onChange={e => handleIndicatorsChange(e) }
                />}
     
        </FormGroup>
       
     
        <FormGroup>
          <Label for='sortIndex'>
          <span className='text-danger'>*</span> {intl.formatMessage({id: "Sort Index"})}
          </Label>
          {selectedWebResource.id && <Input
            type="number"
            name='sortIndex'
            id='sortIndex'
            defaultValue={selectedWebResource.sortIndex}
            placeholder='0'
            innerRef={register({ required: true })}
            className={classnames({ 'is-invalid': errors['sortIndex'] })}
          />
          }
          {!selectedWebResource.id && <Input
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
              {selectedWebResource.id && <Input 

                type="checkbox" 
                placeholder="focus"  
                name="focus" 
                defaultChecked ={selectedWebResource.focus}
                innerRef={register()} />
              }
              {!selectedWebResource.id && <Input 

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
              {selectedWebResource.id && <Input 

                type="checkbox" 
                placeholder="active"  
                name="active" 
                defaultChecked ={selectedWebResource.active}
                innerRef={register()}
                /> 
              }
              {!selectedWebResource.id && <Input 

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
// ** React Import
import { useState, useEffect } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { isObjEmpty, getSelected, selectThemeColors } from '@utils'

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
import ClassificationValues from './ClassificationValues'

// ** Store & Actions
import { addDocumentIssue, resetCreateResponse, updateDocumentIssue, resetUpdateResponse } from './store/action'
import { useDispatch, useSelector  } from 'react-redux'
import Toastr from '../../../containers/toastr/Toastr'

const SidebarNewDocumentIssue = ({ open, toggleSidebar, selectedDocumentIssue, periodicities, sources, classifications }) => {
  // ** States
  const [selectedPeriodicity, setSelectedPeriodicity] = useState({})
  const [selectedSource, setSelectedSource] = useState({})


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
  const store = useSelector(state => state.documentIssues)

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // ** Function to handle form submit
  const onSubmit = async values => {
    const classificationValues = []
    for (let i = 0; i < store.selectedClassificationValues.length; i++) {
      store.selectedClassificationValues[i].classificationValues.map(item => {
        classificationValues.push(item.id)
      })
    }

    if (isObjEmpty(errors)) {
      if (!selectedDocumentIssue.id) {
        await dispatch(
            addDocumentIssue({
              nameA: values.nameA,
              nameE: values.nameE,
              descriptionA: values.descriptionA,
              descriptionE: values.descriptionE,
              photoA: values.photoA,
              photoE: values.photoE,
              periodicityId: selectedPeriodicity ? selectedPeriodicity.id : "",
              sourceId: selectedSource ? selectedSource.id : "",
              sortIndex: values.sortIndex ? value.sortIndex : 0,
              focus: values.focus,
              active: values.active,
              classificationValues
            })
          )
      } else {
        await dispatch(
          updateDocumentIssue(
            {
              nameA: values.nameA,
              nameE: values.nameE,
              descriptionA: values.descriptionA,
              descriptionE: values.descriptionE,
              photoA: values.photoA,
              photoE: values.photoE,
              periodicityId: selectedPeriodicity ? selectedPeriodicity.id : "",
              sourceId: selectedSource ? selectedSource.id : "",
              sortIndex: values.sortIndex ? value.sortIndex : 0,
              focus: values.focus,
              active: values.active,
              id: selectedDocumentIssue.id,
              classificationValues
            }
          )
        )
      }
    }
  }
  const getAllClassifications = async () => {
    const response = await axios
      .post('Classification/GetClassifications', {focus: null})
      .catch((err) => console.log("Error", err)) //handle errors

      if (response && response.data) {
          dispatch({type: 'SET_DOCUMENTISSUE_ALL_CLASSIFICATIONS', allClassifications: response.data.data})
      }
  } 
  useEffect(() => {
    getAllClassifications()
  }, [])

  useEffect(() => {
    setSelectedSource(selectedDocumentIssue.source)
  }, [selectedDocumentIssue.source])

  useEffect(() => {
    setSelectedPeriodicity(selectedDocumentIssue.periodicity)
  }, [selectedDocumentIssue.periodicity])

  useEffect(() => {
    if (selectedDocumentIssue.id) {
       dispatch({type:"SET_DOCUMENTISSUE_SELECTED_CLASSIFICATION_VALUES", selectedClassificationValues: selectedDocumentIssue.documentIssueClassifications})
    }
   }, [selectedDocumentIssue])
  
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
        notify('error', `${intl.formatMessage({id: "CreationFialed"})} ${intl.formatMessage({id: "DocumentIssue"})}`)

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
       notify('error', `${intl.formatMessage({id: "UpdateFailed"})} ${intl.formatMessage({id: "DocumentIssue"})}`)
     } else if (code === 500) {
       notify('error', `${intl.formatMessage({id: "InternalServerError"})} `)
     } 
     dispatch(resetUpdateResponse())
    }
  }, [store.updateResponse.statusCode])

  const handlePeriodicityChange = (e) => {
    setSelectedPeriodicity(e)
  }
  const handleSourceChange = (e) => {
    setSelectedSource(e)
  }

  const addClassificationValue = () => {
    if (store.selectedClassificationValues.length < store.allClassifications.length) {
      const addedObj = {
        classificationValues: []
      }
      dispatch({type: 'SET_DOCUMENTISSUE_SELECTED_CLASSIFICATION_VALUES', selectedClassificationValues: [...store.selectedClassificationValues, addedObj]})    
    }
  
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title={selectedDocumentIssue.id ? intl.formatMessage({id: "Edit"}) : intl.formatMessage({id: "Add"})}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      width={600}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className='mx-0'>
          <Col md={6}>
            <FormGroup>
              <Label for='nameA'>
               {intl.formatMessage({id: "NameA"})} <span className='text-danger'>*</span> 
              </Label>
              <Input
                name='nameA'
                id='nameA'
                defaultValue={selectedDocumentIssue ? selectedDocumentIssue.name_A : ''}
                placeholder={intl.formatMessage({id: "Name"})}
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors['name'] })}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for='nameE'>
              {intl.formatMessage({id: "NameE"})}
              </Label>
              <Input
                name='nameE'
                id='nameE'
                defaultValue={selectedDocumentIssue ? selectedDocumentIssue.name_E : ''}
                placeholder={intl.formatMessage({id: "NameE"})}
                innerRef={register({ required: false })}
                className={classnames({ 'is-invalid': errors['nameE'] })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="mx-0">
          <Col md={6}>
            <FormGroup>
              <Label for='photoA'>{intl.formatMessage({id: "PhotoA"})}</Label>
              <CustomInput
                type='file' 
                id='photoA'
                name='photoA' 
                label={intl.formatMessage({id: "Choose Photo"})}
                innerRef={register({ required: false })}
                className={classnames({ 'is-invalid': errors['photoA'] })}/>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for='photoE'>{intl.formatMessage({id: "PhotoE"})}</Label>
              <CustomInput
                type='file' 
                id='photoE'
                name='photoE' 
                label={intl.formatMessage({id: "Choose Photo"})}
                innerRef={register({ required: false })}
                className={classnames({ 'is-invalid': errors['photoE'] })}/>
            </FormGroup>
          </Col>
        </Row>
        <Row className="mx-0">
          <Col md={6}>
            <FormGroup>
                <Label>{intl.formatMessage({id: "Periodicity"})}</Label>
                <Select
                  isClearable={false}
                  placeholder="تحديد"
                  theme={selectThemeColors}
                  value={selectedPeriodicity}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  name='periodicityId'
                  id='periodicityId'
                  options={periodicities}
                  className='react-select'
                  classNamePrefix='select'
                  onChange={e => handlePeriodicityChange(e)}
                />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
                <Label>{intl.formatMessage({id: "Source"})}</Label>
                <Select
                  isClearable={false}
                  theme={selectThemeColors}
                  placeholder="تحديد"
                  value={selectedSource}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  name='sourceId'
                  id='sourceId'
                  options={sources}
                  className='react-select'
                  classNamePrefix='select'
                  onChange={e => handleSourceChange(e)}
                />
            </FormGroup>
          </Col>
        </Row>
        <Row className="mx-0">
          <Col md={12}>
            <FormGroup>
              <Label for='descriptionA'>
              {intl.formatMessage({id: "Description"})}
              </Label>
              <Input
                name='descriptionA'
                id='descriptionA'
                type="textarea"
                defaultValue={selectedDocumentIssue ? selectedDocumentIssue.description_A : ''}
                placeholder={intl.formatMessage({id: "Description"})}
                innerRef={register({ required: false })}
                className={classnames({ 'is-invalid': errors['Description'] })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="mx-0">
          <Col md={12}>
            <FormGroup>
              <Label for='descriptionE'>
              {intl.formatMessage({id: "descriptionE"})}
              </Label>
              <Input
                name='descriptionE'
                id='descriptionE'
                type="textarea"
                defaultValue={selectedDocumentIssue ? selectedDocumentIssue.description_E : ''}
                placeholder={intl.formatMessage({id: "descriptionE"})}
                innerRef={register({ required: false })}
                className={classnames({ 'is-invalid': errors['descriptionE'] })}
              />
            </FormGroup>
          </Col>
        </Row>
        
          <Row className="mx-0">
            <Col md={6}>
              <FormGroup>
                <Label for='sortIndex'>
                {intl.formatMessage({id: "Sort Index"})} <span className='text-danger'>*</span>
                </Label>
                <Input
                  type="number"
                  name='sortIndex'
                  id='sortIndex'
                  defaultValue={selectedDocumentIssue ? selectedDocumentIssue.sortIndex : 0}
                  placeholder='0'
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['sortIndex'] })}
                />
              </FormGroup>
            </Col>
            <Col sm='3' className="mt-3" >
            <FormGroup>
              <Input 
                type="checkbox" 
                placeholder="focus"  
                name="focus" 
                defaultChecked ={selectedDocumentIssue ? selectedDocumentIssue.focus : false}
                innerRef={register()} />
                  <Label for='focus'>
                {intl.formatMessage({id: "Focus"})}
              </Label>
            </FormGroup>
            </Col>
            <Col sm='3' className="mt-3">
            <FormGroup>
              <Input 
                type="checkbox" 
                placeholder="active"  
                name="active" 
                defaultChecked ={selectedDocumentIssue ? selectedDocumentIssue.active : false}
                innerRef={register()}
                />
                 <Label for='active'>
                    {intl.formatMessage({id: "Active"})}
                  </Label>
            </FormGroup>
              </Col>
          </Row>
          
          <div className='mx-auto mb-1' style={{borderBottom: '1px solid #d8d6de', width: '50%'}}></div>
          <div className='my-2' style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={addClassificationValue}>+ إضافة قيم التصنيف </div>
            {store.selectedClassificationValues.map((item, index) => {
              return <ClassificationValues selectedDocumentIssue={selectedDocumentIssue} index={index} key={index}/>
            })}
            {store.selectedClassificationValues.length > 0 ? <div className='mx-auto mb-1' style={{borderBottom: '1px solid #d8d6de', width: '50%'}}></div> : null}
          <Row className="mx-0">
            <Col md={12}>
              <Button type='submit' className='mr-1' color='primary'>
                {intl.formatMessage({id: "Save"}) }
              </Button>
              <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
                {intl.formatMessage({id: "Cancel"}) }
              </Button>
            </Col>
          </Row>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewDocumentIssue


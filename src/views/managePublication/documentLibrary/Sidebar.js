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
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"
import moment from "moment"
import "moment/locale/ar"

// Axios
import axios from '../../../axios'


// ** Store & Actions
import { addDocumentLibrary, resetCreateResponse, updateDocumentLibrary, resetUpdateResponse } from './store/action'
import { useDispatch, useSelector  } from 'react-redux'
import Toastr from '../../../containers/toastr/Toastr'

const SidebarNewDocumentLibrary = ({ open, toggleSidebar, selectedDocumentLibrary, documentIssueId }) => {
  const [publishDate, setPublishDate] = useState(new Date())

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
  const store = useSelector(state => state.documentLibraries)

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // ** Function to handle form submit
  const onSubmit = async values => {
    if (isObjEmpty(errors)) {
      if (!selectedDocumentLibrary.id) {
        await dispatch(
            addDocumentLibrary({
              titleA: values.titleA,
              titleE: values.titleE,
              contentA: values.contentA,
              contentE: values.contentE,
              photoA: values.photoA,
              photoE: values.photoE,
              coverPhotoA: values.coverPhotoA,
              coverPhotoE: values.coverPhotoE,
              attachmentA: values.attachmentA,
              attachmentE: values.attachmentE,
              documentIssueId,
              publishDate,
              sortIndex: values.sortIndex,
              focus: values.focus,
              active: values.active
            })
          )
      } else {
        await dispatch(
          updateDocumentLibrary(
            {
              titleA: values.titleA,
              titleE: values.titleE,
              contentA: values.contentA,
              contentE: values.contentE,
              photoA: values.photoA,
              photoE: values.photoE,
              coverPhotoA: values.coverPhotoA,
              coverPhotoE: values.coverPhotoE,
              attachmentA: values.attachmentA,
              attachmentE: values.attachmentE,
              documentIssueId,
              publishDate,
              sortIndex: values.sortIndex,
              focus: values.focus,
              active: values.active,
              id: selectedDocumentLibrary.id
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
        notify('error', `${intl.formatMessage({id: "CreationFialed"})} ${intl.formatMessage({id: "Attachment"})}`)

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
       notify('error', `${intl.formatMessage({id: "UpdateFailed"})} ${intl.formatMessage({id: "Attachment"})}`)
     } else if (code === 500) {
       notify('error', `${intl.formatMessage({id: "InternalServerError"})} `)
     } 
     dispatch(resetUpdateResponse())
    }
  }, [store.updateResponse.statusCode])

  useEffect(() => {
    if (!selectedDocumentLibrary.publishDate) {
      setPublishDate(moment(new Date().toLocaleDateString(), "MM-DD-YYYY")
      .format("YYYY-MM-DD")
      .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    } else {
      setPublishDate(selectedDocumentLibrary.publishDate)
    }
   
  }, [])

  useEffect(() => {
    if (!selectedDocumentLibrary.publishDate) {
      setPublishDate(moment(new Date().toLocaleDateString(), "MM-DD-YYYY")
      .format("YYYY-MM-DD")
      .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    } else {
      setPublishDate(selectedDocumentLibrary.publishDate)
    }
   
  }, [selectedDocumentLibrary.publishDate])

  const handlePublishDate = (event) => {
    setPublishDate(moment(new Date(event._d).toLocaleDateString(), "MM-DD-YYYY")
    .format("YYYY-MM-DD")
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)))
  }
  return (
    <Sidebar
      size='lg'
      open={open}
      title={selectedDocumentLibrary.id ? intl.formatMessage({id: "Edit"}) : intl.formatMessage({id: "Add"})}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      width={600}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className='mx-0'>
          <Col md={6}>
            <FormGroup>
              <Label for='titleA'>
              <span className='text-danger'>*</span> {intl.formatMessage({id: "TitleA"})}
              </Label>
              <Input
                name='titleA'
                id='titleA'
                defaultValue={selectedDocumentLibrary ? selectedDocumentLibrary.title_A : ''}
                placeholder={intl.formatMessage({id: "TitleA"})}
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors['titleA'] })}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for='titleE'>
              {intl.formatMessage({id: "TitleE"})}
              </Label>
              <Input
                name='titleE'
                id='titleE'
                defaultValue={selectedDocumentLibrary ? selectedDocumentLibrary.title_E : ''}
                placeholder={intl.formatMessage({id: "TitleE"})}
                innerRef={register({ required: false })}
                className={classnames({ 'is-invalid': errors['titleE'] })}
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
              <Label for='coverPhotoA'>{intl.formatMessage({id: "coverPhotoA"})}</Label>
              <CustomInput
                type='file' 
                id='coverPhotoA'
                name='coverPhotoA' 
                label={intl.formatMessage({id: "Choose Photo"})}
                innerRef={register({ required: false })}
                className={classnames({ 'is-invalid': errors['coverPhotoA'] })}/>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for='coverPhotoE'>{intl.formatMessage({id: "coverPhotoE"})}</Label>
              <CustomInput
                type='file' 
                id='coverPhotoE'
                name='coverPhotoE' 
                label={intl.formatMessage({id: "Choose Photo"})}
                innerRef={register({ required: false })}
                className={classnames({ 'is-invalid': errors['coverPhotoE'] })}/>
            </FormGroup>
          </Col>
        </Row>

        <Row className="mx-0">
          <Col md={6}>
            <FormGroup>
              <Label for='attachmentA'>{intl.formatMessage({id: "attachmentA"})}</Label>
              <CustomInput
                type='file' 
                id='attachmentA'
                name='attachmentA' 
                label={intl.formatMessage({id: "Choose File"})}
                innerRef={register({ required: false })}
                className={classnames({ 'is-invalid': errors['attachmentA'] })}/>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for='attachmentE'>{intl.formatMessage({id: "attachmentE"})}</Label>
              <CustomInput
                type='file' 
                id='attachmentE'
                name='attachmentE' 
                label={intl.formatMessage({id: "Choose File"})}
                innerRef={register({ required: false })}
                className={classnames({ 'is-invalid': errors['attachmentE'] })}/>
            </FormGroup>
          </Col>
        </Row>
        <Row className='mx-0'>
            <Col md={6} className=" mb-2" >
                <Label for='hf-picker'>{intl.formatMessage({id: "PublishDate"})}</Label>
                <br/>
                <MuiPickersUtilsProvider
                  libInstance={moment}
                  utils={MomentUtils}
                  locale={"sw"}
                  className="bg-danger"
                >
                  <KeyboardDatePicker
                    okLabel="تحديد"
                    cancelLabel="الغاء"
                    format="L"
                    value={publishDate}
                    inputVariant="outlined"
                    variant="dialog"
                    maxDateMessage=""
                    mask="__-__-____"
                    placeholder="يوم/شهر/سنة"
                    onChange={e => handlePublishDate(e) }
                    views={["year", "month", "date"]}
                  />
                </MuiPickersUtilsProvider>
            </Col>
        </Row>
        <Row className="mx-0">
          <Col md={12}>
            <FormGroup>
              <Label for='contentA'>
              {intl.formatMessage({id: "contentA"})}
              </Label>
              <Input
                name='contentA'
                id='contentA'
                type="textarea"
                defaultValue={selectedDocumentLibrary ? selectedDocumentLibrary.content_A : ''}
                placeholder={intl.formatMessage({id: "contentA"})}
                innerRef={register({ required: false })}
                className={classnames({ 'is-invalid': errors['contentA'] })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="mx-0">
          <Col md={12}>
            <FormGroup>
              <Label for='contentE'>
              {intl.formatMessage({id: "contentE"})}
              </Label>
              <Input
                name='contentE'
                id='contentE'
                type="textarea"
                defaultValue={selectedDocumentLibrary ? selectedDocumentLibrary.content_E : ''}
                placeholder={intl.formatMessage({id: "contentE"})}
                innerRef={register({ required: false })}
                className={classnames({ 'is-invalid': errors['contentE'] })}
              />
            </FormGroup>
          </Col>
        </Row>
        
          <Row className="mx-0">
            <Col md={6}>
              <FormGroup>
                <Label for='sortIndex'>
                <span className='text-danger'>*</span> {intl.formatMessage({id: "Sort Index"})}
                </Label>
                <Input
                  type="number"
                  name='sortIndex'
                  id='sortIndex'
                  defaultValue={selectedDocumentLibrary ? selectedDocumentLibrary.sortIndex : 0}
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
                defaultChecked ={selectedDocumentLibrary ? selectedDocumentLibrary.focus : false}
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
                defaultChecked ={selectedDocumentLibrary ? selectedDocumentLibrary.active : false}
                innerRef={register()}
                />
                 <Label for='active'>
                    {intl.formatMessage({id: "Active"})}
                  </Label>
            </FormGroup>
              </Col>
          </Row>
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

export default SidebarNewDocumentLibrary


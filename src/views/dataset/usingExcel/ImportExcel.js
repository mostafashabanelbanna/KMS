
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Button, Input, CustomInput, Row, Col } from 'reactstrap'
import { toast } from 'react-toastify'
import { useIntl } from 'react-intl'

import { importFile } from '../store/action'
import Select from 'react-select'
import { isObjEmpty, getSelected, selectThemeColors, convertToBoolean } from '@utils'

import Toastr from '../../../containers/toastr/Toastr'
import axios from '../../../axios'

const ImportExcel = () => {

  
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.datasets)

  // state
  const [file, setFile] = useState()
  const [dataQuality, setDataQuality] = useState([])
  const [datasetAttachments, setDatasetAttachments] = useState()
  const [description_A, setDescriptionA] = useState()
  const [description_E, setDescriptionE] = useState()
  const [dataQualityId, setDataQualityId] = useState()

  const getDataQuality = async () => {
    const response = await axios
      .post(`/Lookups/GetLookupValues/`, {lookupName: "DataQuality"})
      .catch((err) => console.log("Error", err)) //handle errors
     
      if (response && response.data) {
          setDataQuality(response.data.data)
      }
  } 
  const handleFinleInput = (e) => {
      setFile(e.target.files)
  }
  const handleDatasetAttachments = (e) => {
    setDatasetAttachments(e.target.files)
  }
  const handleDescriptionAChange = (e) => {
    setDescriptionA(e.target.value)
  }
  const handleDescriptionEChange = (e) => {
    setDescriptionE(e.target.value)
  }
  const handleDataQualityChange = (e) => {
    setDataQualityId(e.id)
  }
  const handleSubmit = () => {
    dispatch(importFile({file, description_A, description_E, dataQualityId, datasetAttachments}))
  }

  // Import localization files
  const intl = useIntl()
 // Toastr notify function
 const notify = (type, message) => {
  return toast.success(
    <Toastr type={type} message={message} />,
    { position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true 
    })
}
  // handle Errors
  
  useEffect(() => {
    getDataQuality()
  }, [])
  useEffect(() => {
    const code = store.importResponse.statusCode
    if (code !== 0) {
      if (code === 200) {
            notify('success', intl.formatMessage({id: "Saved Success"}))
      } else if (code === 6) {
            notify('error', intl.formatMessage({id: store.importResponse.errors[0]}))
      } else if (code === 5) {
        notify('error', intl.formatMessage({id: "InvalidFileExtension"}))
      } else if (code === 500) {
        notify('error', `${intl.formatMessage({id: "InternalServerError"})} `)

      } 
      dispatch({type: 'RESET_DATASET_IMPORT_RESPONSE'})
    }
  }, [store.importResponse.statusCode])

    return (
      <>
        <Card>
            <CardHeader>
             <CardTitle tag='h4'> إستيراد ملف </CardTitle>
            </CardHeader>
            <CardBody>
            <FormGroup>
                <Label>
                  ملف البيانات
                </Label>
               <CustomInput onChange={(e) => handleFinleInput(e)}  type='file' id='exampleCustomFileBrowser' name='customFile' />
             </FormGroup>
            <FormGroup>
                <Label>
                   الملفات المرفقة
                </Label>
               <CustomInput onChange={(e) => handleDatasetAttachments(e)}  type='file' id='datasetAttachments' name='datasetAttachments' />
             </FormGroup>
              <FormGroup>
                <Label for='descriptionA'>
                {intl.formatMessage({id: "Description"})}
                </Label>
                <Input
                  name='descriptionA'
                  id='descriptionA'
                  type="textarea"
                  defaultValue=''
                  placeholder={intl.formatMessage({id: "Description"})}
                  onChange={(e) => handleDescriptionAChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label for='descriptionE'>
                {intl.formatMessage({id: "descriptionE"})}
                </Label>
                <Input
                  name='descriptionE'
                  id='descriptionE'
                  type="textarea"
                  defaultValue=''
                  placeholder={intl.formatMessage({id: "descriptionE"})}
                  onChange={(e) => handleDescriptionEChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <Label>
                   جودة البيانات
                </Label>
                <Select
                  placeholder="تحديد"
                  isClearable={false}
                  theme={selectThemeColors}
                  name='dataQuality'
                  id='dataQuality'
                  options={dataQuality}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                  className='react-select'
                  classNamePrefix='select'
                  onChange={e => handleDataQualityChange(e) }
                />
              </FormGroup>
            </CardBody>
        </Card>
        <Col className="text-left d-flex justify-content-end" md={12} >
          <Button.Ripple color='primary' onClick={handleSubmit} >
            إرسال
          </Button.Ripple>
        </Col>
      </>
    )
}

export default ImportExcel
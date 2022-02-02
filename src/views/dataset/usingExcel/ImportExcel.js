
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Button, CustomInput, Row, Col } from 'reactstrap'
import { toast } from 'react-toastify'
import { useIntl } from 'react-intl'

import { importFile } from '../store/action'

import Toastr from '../../../containers/toastr/Toastr'

const ImportExcel = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.datasets)

  // state
  const [file, setFile] = useState()

  const handleFinleInput = (e) => {
      setFile(e.target.files)
  }
  const handleSubmit = () => {
    dispatch(importFile(file))
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
               <CustomInput onChange={(e) => handleFinleInput(e)}  type='file' id='exampleCustomFileBrowser' name='customFile' />
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
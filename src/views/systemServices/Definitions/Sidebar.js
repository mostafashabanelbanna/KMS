// ** React Import
import { useState, useEffect } from "react"

// ** Custom Components
import Sidebar from "@components/sidebar"

// ** Utils
import {
  isObjEmpty,
  getSelected,
  selectThemeColors,
  convertToBoolean
} from "@utils"

// ** Third Party Components
import classnames from "classnames"
import { useForm } from "react-hook-form"
import Select, { components } from "react-select"
import CustomInput from "reactstrap/lib/CustomInput"
import { Button, FormGroup, Label, FormText, Form, Input } from "reactstrap"
import Row from "reactstrap/lib/Row"
import Col from "reactstrap/lib/Col"
import { toast } from "react-toastify"
import { useIntl } from "react-intl"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"
import moment from "moment"
import "moment/locale/ar"

// Axios
import axios from "../../../axios"

// ** Store & Actions
import {
  addDefinition,
  resetCreateResponse,
  updateDefinition,
  resetUpdateResponse
} from "./store/action"
import { useDispatch, useSelector } from "react-redux"
import Toastr from "../../../containers/toastr/Toastr"

const SidebarNewDefinition = ({ open, toggleSidebar, selectedDefinition, sources }) => {
    // ** States
    const [selectedSource, setSelectedSource] = useState({})
  // Import localization files
  const intl = useIntl()
  // Toastr notify function
  const notify = (type, message) => {
    return toast.success(<Toastr type={type} message={message} />, {
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true
    })
  }

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector((state) => state.definitions)

  // ** Vars
  const { register, errors, handleSubmit } = useForm()

  // ** Function to handle form submit
  const onSubmit = async (values) => {
    if (isObjEmpty(errors)) {
      if (!selectedDefinition.id) {
        await dispatch(
          addDefinition({
            name_A: values.name_A,
            name_E: values.name_E,
            description_A: values.description_A,
            description_E: values.description_E,
            attachment: values.attachment,
            url: values.url,
            sourceId: selectedSource ? selectedSource.id : "",
            sortIndex: values.sortIndex,
            focus: convertToBoolean(values.focus),
            active: convertToBoolean(values.active)
          })
        )
      } else {
        await dispatch(
          updateDefinition({
            name_A: values.name_A,
            name_E: values.name_E,
            description_A: values.description_A,
            description_E: values.description_E,
            attachment: values.attachment,
            url: values.url,
            sourceId: selectedSource ? selectedSource.id : "",
            sortIndex: values.sortIndex,
            focus: convertToBoolean(values.focus),
            active: convertToBoolean(values.active),
            id: selectedDefinition.id
          })
        )
      }
    }
  }

  useEffect(() => {
    setSelectedSource(selectedDefinition.source)
  }, [selectedDefinition.source])
  useEffect(() => {
    const code = store.createResponse.statusCode
    if (code !== 0) {
      if (code === 200) {
        notify("success", intl.formatMessage({ id: "AddSuccess" }))
        toggleSidebar(1)
      } else if (code === 6) {
        notify(
          "error",
          intl.formatMessage({ id: store.createResponse.errors[0] })
        )
      } else if (code === 5) {
        notify("error", intl.formatMessage({ id: "InvalidFileExtension" }))
      } else if (code === 1) {
        notify(
          "error",
          `${intl.formatMessage({ id: "CreationFialed" })} ${intl.formatMessage(
            { id: "Attachment" }
          )}`
        )
      } else if (code === 500) {
        notify(
          "error",
          `${intl.formatMessage({ id: "InternalServerError" })} `
        )
      }
      dispatch(resetCreateResponse())
    }
  }, [store.createResponse.statusCode])

  useEffect(() => {
    const code = store.updateResponse.statusCode
    if (code !== 0) {
      if (code === 200) {
        notify("success", intl.formatMessage({ id: "UpdateSuccess" }))
        toggleSidebar(1)
      } else if (code === 6) {
        notify(
          "error",
          intl.formatMessage({ id: store.updateResponse.errors[0] })
        )
      } else if (code === 5) {
        notify("error", intl.formatMessage({ id: "InvalidFileExtension" }))
      } else if (code === 3) {
        notify(
          "error",
          `${intl.formatMessage({ id: "UpdateFailed" })} ${intl.formatMessage({
            id: "Attachment"
          })}`
        )
      } else if (code === 500) {
        notify(
          "error",
          `${intl.formatMessage({ id: "InternalServerError" })} `
        )
      }
      dispatch(resetUpdateResponse())
    }
  }, [store.updateResponse.statusCode])

  const handleSourceChange = (e) => {
    setSelectedSource(e)
  }

  return (
    <Sidebar
      size="lg"
      open={open}
      title={
        selectedDefinition.id ? intl.formatMessage({ id: "Edit" }) : intl.formatMessage({ id: "Add" })
      }
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      width={600}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mx-0">
          <Col md={12}>
            <FormGroup>
              <Label for="name_A">
                {intl.formatMessage({ id: "NameA" })}{" "}
                <span className="text-danger">*</span>
              </Label>
              <Input
                name="name_A"
                id="name_A"
                defaultValue={
                  selectedDefinition ? selectedDefinition.name_A : ""
                }
                placeholder={intl.formatMessage({ id: "NameA" })}
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["NameA"] })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="mx-0">
          <Col md={12}>
            <FormGroup>
              <Label for="name_E">{intl.formatMessage({ id: "NameE" })}</Label>
              <Input
                name="name_E"
                id="name_E"
                defaultValue={
                  selectedDefinition ? selectedDefinition.name_E : ""
                }
                placeholder={intl.formatMessage({ id: "NameE" })}
                innerRef={register({ required: false })}
                className={classnames({ "is-invalid": errors["NameE"] })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="mx-0">
          <Col md={12}>
            <FormGroup>
              <Label for="description_A">
                {intl.formatMessage({ id: "description_A" })}
              </Label>
              <Input
                name="description_A"
                id="description_A"
                type="textarea"
                defaultValue={
                  selectedDefinition ? selectedDefinition.description_A : ""
                }
                placeholder={intl.formatMessage({ id: "DescriptionA" })}
                innerRef={register({ required: false })}
                className={classnames({ "is-invalid": errors["DescriptionA"] })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="mx-0">
          <Col md={12}>
            <FormGroup>
              <Label for="description_E">
                {intl.formatMessage({ id: "DescriptionE" })}
              </Label>
              <Input
                name="description_E"
                id="description_E"
                type="textarea"
                defaultValue={
                  selectedDefinition ? selectedDefinition.description_E : ""
                }
                placeholder={intl.formatMessage({ id: "DescriptionE" })}
                innerRef={register({ required: false })}
                className={classnames({ "is-invalid": errors["DescriptionE"] })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="mx-0">
          <Col md={6}>
            <FormGroup>
              <Label for="attachment">
                {intl.formatMessage({ id: "attachment" })}
              </Label>
              <CustomInput
                type="file"
                id="attachment"
                name="attachment"
                label={intl.formatMessage({ id: "Choose File" })}
                innerRef={register({ required: false })}
                className={classnames({ "is-invalid": errors["attachment"] })}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
                <Label>{intl.formatMessage({id: "Source"})} </Label>
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
              <Label for="url">{intl.formatMessage({ id: "url" })}</Label>
              <Input
                name="url"
                id="url"
                defaultValue={
                  selectedDefinition ? selectedDefinition.url : ""
                }
                placeholder={intl.formatMessage({ id: "url" })}
                innerRef={register({ required: false })}
                className={classnames({ "is-invalid": errors["url"] })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="mx-0">
          <Col md={6}>
            <FormGroup>
              <Label for="sortIndex">
                <span className="text-danger">*</span>{" "}
                {intl.formatMessage({ id: "Sort Index" })}
              </Label>
              {selectedDefinition.id && (
                <Input
                  type="number"
                  name="sortIndex"
                  id="sortIndex"
                  defaultValue={selectedDefinition.sortIndex}
                  placeholder="0"
                  innerRef={register({ required: true })}
                  className={classnames({ "is-invalid": errors["sortIndex"] })}
                />
              )}
              {!selectedDefinition.id && (
                <Input
                  type="number"
                  name="sortIndex"
                  id="sortIndex"
                  defaultValue={0}
                  placeholder="0"
                  innerRef={register({ required: true })}
                  className={classnames({ "is-invalid": errors["sortIndex"] })}
                />
              )}
            </FormGroup>
          </Col>
          <Col sm="3" className="mt-3">
            <FormGroup>
              {selectedDefinition.id && (
                <Input
                  type="checkbox"
                  placeholder="focus"
                  name="focus"
                  defaultChecked={selectedDefinition.focus}
                  innerRef={register()}
                />
              )}
              {!selectedDefinition.id && (
                <Input
                  type="checkbox"
                  placeholder="focus"
                  name="focus"
                  defaultChecked={false}
                  innerRef={register()}
                />
              )}
              <Label for="focus">{intl.formatMessage({ id: "Focus" })}</Label>
            </FormGroup>
          </Col>
          <Col sm="3" className="mt-3">
            <FormGroup>
              {selectedDefinition.id && (
                <Input
                  type="checkbox"
                  placeholder="active"
                  name="active"
                  defaultChecked={selectedDefinition.active}
                  innerRef={register()}
                />
              )}
              {!selectedDefinition.id && (
                <Input
                  type="checkbox"
                  placeholder="active"
                  name="active"
                  defaultChecked={true}
                  innerRef={register()}
                />
              )}
              <Label for="active">{intl.formatMessage({ id: "Active" })}</Label>
            </FormGroup>
          </Col>
        </Row>
        <Row className="mx-0">
          <Col md={12}>
            <Button type="submit" className="mr-1" color="primary">
              {intl.formatMessage({ id: "Save" })}
            </Button>
            <Button
              type="reset"
              color="secondary"
              outline
              onClick={toggleSidebar}
            >
              {intl.formatMessage({ id: "Cancel" })}
            </Button>
          </Col>
        </Row>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewDefinition
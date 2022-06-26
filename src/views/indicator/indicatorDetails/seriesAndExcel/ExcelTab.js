import {  useState, useContext, useEffect } from 'react'
import {Row, Col, Label, Button, FormGroup, FormText, Form, Input } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import { useIntl } from 'react-intl'
import Select from 'react-select'
import { selectThemeColors, notify } from '@utils'
import { Plus, ArrowUpLeft } from 'react-feather'

import { Arabic } from 'flatpickr/dist/l10n/ar.js'
// ** Internationalization Context
import { IntlContext } from '@src/utility/context/Internationalization'
import { setPickerLanguage } from '../../../../utility/Utils'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../../../axios'
import {exportFile} from '../store/action/index'
import SeriesTable from './seriesTable'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"
import moment from "moment"
import "moment/locale/ar"
import { ArrowsIcon, SignalIcon, StatsIcon } from "../../indicatorList/icons"

const ExcelTab = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.indicatorDetails)
  const [dimensionValues, setDimensionValues] = useState([])
  const [selectedDimension, setSelectedDimension] = useState({})
  const [selectedDimensionValues, setSelectedDimensionValues] = useState([])
  const [indicatorUnits, setIndicatorUnits] = useState([])
  const intl = useIntl()
  

  const intlContext = useContext(IntlContext)

  const getDimensionValues = async (dimensionId, levelNumber) => {
    console.log(dimensionId, levelNumber)
    await axios.get(`/DimensionValue/GetDimensionValuesForDataset/${dimensionId}/${levelNumber}`).then(response => {
        if (response) {
            console.log(response.data.data)
            setDimensionValues(response.data.data)
        }
    }).catch(error => {
        setDimensionValues([])
    })
  }

  const GetIndicatorUnits = async () => {
    await axios.get(`/Indicator/GetIndicatorForDataset/${store.indicatorDetails.id}`).then(response => {
       setIndicatorUnits(response.data.data.indicatorUnits)
      })
  }
  const handleDimensionChange = (e) => {
    getDimensionValues(e.id.split('::')[0], e.id.split('::')[1])
    setSelectedDimension(e)
  }
  const handleDimensionValueChange = (e) => {
    setSelectedDimensionValues(e)
  }
  const handleUnitChange = (e) => {
      dispatch({type: "SET_INDICATOR_DETAILS_UNIT", unit: e})
  }

  const addToSelectedDimensions = () => {

    if (!selectedDimension.id) {
      notify("error", "يُرجى أختيار البعد اولا")
      return
    }
    if (selectedDimensionValues.length < 1) {
      notify("error", "يُرجى أختيار قيم البعد اولا")
      return
    }
    const dimId = parseInt(selectedDimension.id.split('::')[0])
    const levelNumber = parseInt(selectedDimension.id.split('::')[1])

    if (store.excelDimensions.findIndex(e => e.dimensionId === dimId && e.levelNumber === levelNumber) !== -1) {
      notify("error", "لقد تم اختيار هذ البعد")
      return
    }
    if (store.excelDimensions.length > 0) {
        const lastEle = store.excelDimensions[store.excelDimensions.length - 1]
        if (lastEle.dimensionId === dimId && lastEle.levelNumber > levelNumber) {
            notify("error", "يُرجى أختيار الابعاد تعبا بترتيب المستوى")
            return   
        }
    }
    const list = selectedDimensionValues.map(obj => ({ ...obj, orderLevel: store.excelDimensions.length + 1}))
    const newElement = {
        dimensionId : dimId,
        levelNumber,
        dimensionValues: list
    }
    dispatch({type: "SET_INDICATOR_DETAILS_EXCEL_DIMENSIONS", excelDimensions: [...store.excelDimensions, newElement]})
    setSelectedDimension({})
    setSelectedDimensionValues([])
  }
  const ExportFile = () => {
      dispatch(exportFile())
  }
  const handleExcelDateChange = (event) => {
    dispatch({type: "SET_INDICATOR_DETAILS_EXCEL_DATE", date: moment(new Date(event._d).toLocaleDateString(), "MM-DD-YYYY").format("YYYY-MM-DD").replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)) })
  }
  useEffect(() => {
      if (store.exportExcelErrorCode !== 200) {
          notify("error", "حدث خطأ ما او التاريخ الذى تم أختياره لا يتلائم مع دورية عنصر البيان")
      }
  }, [store.exportExcelErrorCode])

  useEffect(() => {
    GetIndicatorUnits()
  }, [store.indicatorDetails])
  return (
    <>
      <div>
        <Row className="mx-0">
          <Col sm='3' >
            <FormGroup>
              <Label for='name'>
                التاريخ
              </Label>
              <MuiPickersUtilsProvider
                libInstance={moment}
                utils={MomentUtils}
                locale={"sw"}
                className="bg-danger"
              >
                <KeyboardDatePicker
                className="w-100"
                okLabel="تحديد"
                cancelLabel="الغاء"
                format="L"
                value={store.excelDate} 
                inputVariant="outlined"
                variant="dialog"
                maxDateMessage=""
                mask="__-__-____"
                placeholder="يوم/شهر/سنة"
                onChange={date => handleExcelDateChange(date)} 
                views={["year", "month", "date"]}
              />
            </MuiPickersUtilsProvider>
            </FormGroup>
          </Col>
          <Col sm='3' >
            <FormGroup>
              <Label for='name'>
                الوحدة
              </Label>
              <Select
                placeholder="تحديد"
                isClearable={false}
                theme={selectThemeColors}
                options={indicatorUnits}
                value={store.selectedUnit.id ? store.selectedUnit : []}
                getOptionLabel={(option) => option.unitMeasureName}
                getOptionValue={(option) => option.id}
                name='unit'
                id='unit'
                className='react-select'
                classNamePrefix='select'
                onChange={e => handleUnitChange(e) }
            />
            </FormGroup>
          </Col>
        </Row>
        <Row className="mx-0">
          <Col sm='3' >
            <Label for='name'>
              {intl.formatMessage({id: "Dimension"})} 
            </Label>
            <Select
              placeholder="تحديد"
              isClearable={false}
              theme={selectThemeColors}
              options={store.indicatorDetails.indicatorDimensionsDtos}
              value={selectedDimension.id ? selectedDimension : []}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              name='dimension'
              id='dimension'
              className='react-select'
              classNamePrefix='select'
              onChange={e => handleDimensionChange(e) }
            />
          </Col>
          <Col sm='3' >
            <Label for='name'>
              {intl.formatMessage({id: "DimensionValues"})} 
            </Label>
            <Select
              placeholder="تحديد"
              isClearable={false}
              theme={selectThemeColors}
              options={dimensionValues}
              value={selectedDimensionValues}
              getOptionLabel={(option) => option.name_A}
              getOptionValue={(option) => option.id}
              isMulti
              name='dimension'
              id='dimension'
              className='react-select'
              classNamePrefix='select'
              onChange={e => handleDimensionValueChange(e) }
            />
          </Col>
          <Col md={2} className="mt-2">
              <Button.Ripple color='primary' size='sm' onClick={addToSelectedDimensions}>
                    <Plus /> أضافة
              </Button.Ripple>
          </Col>
        </Row>
        
        {store.excelDimensions.length > 0 &&
          <>
            <Row className='mx-0'>
            <Col md={12} className='card mt-2 p-1'>
                {store.excelDimensions.map((item, idx) => (
                <div key={idx} className='dark-layout mb-2 d-flex align-items-center px-2'
                >
                    <div> <ArrowsIcon className='mr-1'/> 
                    {store.indicatorDetails.indicatorDimensionsDtos.find(e => parseInt(e.id.split("::")[0]) === item.dimensionId && parseInt(e.id.split("::")[1]) === item.levelNumber).name} 
                    </div>
                    {
                    item.dimensionValues.map((innerItem, idx) => (
                    <div
                        key={idx}
                        className="ml-2 px-2 d-flex align-items-center"
                        style={{
                            backgroundColor: "lightGray",
                            padding: "0.5rem",
                            borderRadius: 16
                        }}>
                    <p className="mb-0 mx-1 text-white">{innerItem.name_A}</p>
                    </div>
                    ))
                }
                <hr/>
                </div>
                ))}
            </Col>
            </Row>
            <Row className='mx-0'>
            <Col md={12} className='text-right'>
                <Button.Ripple color='primary' size='sm' onClick={ExportFile}>
                    أنشاء ملف أكسيل
                </Button.Ripple>
            </Col>
          </Row>
          </>
          
        }
        
      </div>
    </>
   
  )
}

export default ExcelTab

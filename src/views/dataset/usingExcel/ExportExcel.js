import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Select from 'react-select'
import { FormGroup, Label, Row, Col, Button } from 'reactstrap'
import { useIntl } from 'react-intl'
import { selectThemeColors } from '@utils'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"
import moment from "moment"
import "moment/locale/ar"
import { Link, Redirect} from 'react-router-dom'


import { getAllClassifications, getClassificationValues, getIndicatorBasedLists, getIndicators } from "../store/action"


const ExportExcel = () => {
    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.datasets)

    // ** States
    const [classification, setClassification] = useState(null)
    const [classificationValue, setClassificationValue] = useState(null)
    const [indicator, setIndicator] = useState(null)
    const [periodicity, setPeriodicity] = useState(null)
    const [indicatorUnit, setIndicatorUnit] = useState(null)
    const [source, setSource] = useState(null)  
    const [insertionDate, setInsertionDate] = useState(new Date())
    const [disableNext, setDisableNext] = useState(true)
    

    useEffect(() => {
        dispatch(getAllClassifications()) 
        dispatch(getIndicators(0))
        setClassification(store.classification)
        setClassificationValue(store.classificationValueId)
        setIndicator(store.indicatorId)
        setPeriodicity(store.periodicityId)
        setIndicatorUnit(store.indicatorUnitId)
        setSource(store.sourceId)
        setInsertionDate(store.insertionDate)
    }, [])

    useEffect(() => {
        dispatch(getClassificationValues(classification)) 
    }, [classification])

    useEffect(() => {
        dispatch(getIndicators(classificationValue)) 
    }, [classificationValue])

    useEffect(() => {
      dispatch(getIndicatorBasedLists(indicator)) 
  }, [indicator])

    const handleClassificationsChange = (event) => {
        setClassificationValue(null)
        setIndicator(null)
        setPeriodicity(null)
        setIndicatorUnit(null)
        setSource(null)
        setInsertionDate(new Date())
        dispatch({type: "RESET_CLASSIFICATION_BASED_LISTS"})
        //dispatch({type: "RESET_DATASET_INDICATORS_BASED_DATA"})
        setClassification(event.id)
    }
    
    const handleClassificationValuesChange = (event) => {
      setIndicator(null)
      setPeriodicity(null)
      setIndicatorUnit(null)
      setSource(null)
      setInsertionDate(new Date())
      setClassificationValue(event.id)
    }

    const handleIndicatorsChange = (event) => {
      setPeriodicity(null)
      setIndicatorUnit(null)
      setSource(null)
      setInsertionDate(new Date())
      setIndicator(event.id)
    }

    const handlePeriodicitiesChange = (event) => {
      setPeriodicity(event.id)
     }

     const handleIndicatorUnitsChange = (event) => {
      setIndicatorUnit(event.id)
     }

     const handleSourcesChange = (event) => {
      setSource(event.id)
     }

     const handleInsertionDate = (event) => {
      setInsertionDate(moment(new Date(event._d).toLocaleDateString(), "MM-DD-YYYY")
       .format("YYYY-MM-DD")
       .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)))

     }
    // Import localization files
    const intl = useIntl()

    //require all fields
    const isEmptyValue = () => {
        (
         
          indicator 
          && periodicity 
          && indicatorUnit
          && source
          && insertionDate
        ) ? setDisableNext(true) : setDisableNext(false)

    }
    useEffect(() => { 
      isEmptyValue()
    }, [
        classification,
        classificationValue,
        indicator, 
        periodicity,
        indicatorUnit,
        source,
        insertionDate
    ])

    const setSelectedMetaData = () => {
      dispatch({type: "SET_DATASET_VERTICAL", vertical:[]})
      dispatch({type: "SET_DATASET_HORIZONTAL", horizontal:[]})
      dispatch({
        type: 'SET_DATASET_SELECTED_META_DATA',
        classification,
        classificationValueId: classificationValue,
        indicatorId: indicator, 
        sourceId: source, 
        periodicityId: periodicity,
        indicatorUnitId: indicatorUnit, 
        insertionDate
      })
    }
    
    return (
        <div>
             <h1>
              إستخراج ملف إكسيل
            </h1>
            <Row className="mx-0">
            <Col sm='12' className="px-1 mb-2">
            <FormGroup>
              <Label>{intl.formatMessage({id: "Classifications"})}</Label>
              <Select
                placeholder={intl.formatMessage({id: "Select"})}
                isClearable={false}
                theme={selectThemeColors}
                name='classifications'
                id='classifications'
                options={store.classifications}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                value={classification ? store.classifications.find(x => x.id === classification) : 0}
                className='react-select'
                classNamePrefix='select'
                onChange={e => handleClassificationsChange(e) }
              />
            </FormGroup>
            </Col>
            </Row>
            <Row className="mx-0">
            {<Col sm='6' className=" mb-2">
                <FormGroup>
                  <Label>{intl.formatMessage({id: "Classification Values"})}</Label>
                  <Select
                    isClearable={false}
                    placeholder={intl.formatMessage({id: "Select"})}
                    theme={selectThemeColors}
                    name='classificationValues'
                    id='classificationValues'
                    options={store.classificationValues}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    value={classificationValue ? store.classificationValues.find(x => x.id === classificationValue) : 0}
                    className='react-select'
                    classNamePrefix='select'
                    onChange={e => handleClassificationValuesChange(e) }
                  />
                </FormGroup>
               </Col>}
            { <Col sm='6'  className=" mb-2">
           <FormGroup>
              <Label>{intl.formatMessage({id: "Indicators"})}</Label>
              <Select
                isClearable={false}
                placeholder={intl.formatMessage({id: "Select"})}
                theme={selectThemeColors}
                name='indicators'
                id='indicators'
                options={store.indicators}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                value={indicator ? store.indicators.find(x => x.id === indicator) : 0}
                className='react-select'
                classNamePrefix='select'
                onChange={e => handleIndicatorsChange(e) }
              />
            </FormGroup>
            </Col>}
            </Row>
            { indicator ? <Row className="mx-0">
            <Col sm='3' className=" mb-2" >
            <FormGroup>
              <Label>{intl.formatMessage({id: "Periodicities"})}</Label>
              <Select
                isClearable={false}
                placeholder={intl.formatMessage({id: "Select"})}
                theme={selectThemeColors}
                name='periodicities'
                id='periodicities'
                options={store.periodicities}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                value={periodicity ? store.periodicities.find(x => x.id === periodicity) : 0}
                className='react-select'
                classNamePrefix='select'
                onChange={e => handlePeriodicitiesChange(e) }
              />
            </FormGroup> 
            </Col>
            <Col sm='3' className=" mb-2" >
             <FormGroup>
               <Label>{intl.formatMessage({id: "Units"})}</Label>
              <Select
                isClearable={false}
                placeholder={intl.formatMessage({id: "Select"})}
                theme={selectThemeColors}
                name='indicatorUnits'
                id='indicatorUnits'
                options={store.indicatorUnits}
                getOptionLabel={(option) => option.unitMeasureName}
                getOptionValue={(option) => option.id}
                value={indicatorUnit ? store.indicatorUnits.find(x => x.id === indicatorUnit) : 0}
                className='react-select'
                classNamePrefix='select'
                onChange={e => handleIndicatorUnitsChange(e) }
              />
                 </FormGroup> 
            </Col>
            <Col sm='3' className=" mb-2" >
             <FormGroup>
              <Label>{intl.formatMessage({id: "Sources"})}</Label>
              <Select
                isClearable={false}
                placeholder={intl.formatMessage({id: "Select"})}
                theme={selectThemeColors}
                name='sources'
                id='sources'
                options={store.sources}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                value={source ? store.sources.find(x => x.id === source) : 0}
                className='react-select'
                classNamePrefix='select'
                onChange={e => handleSourcesChange(e) }
              />
                </FormGroup> 
            </Col>
            <Col sm='3' className=" mb-2" >
                <Label for='hf-picker'>{intl.formatMessage({id: "Insertion Date"})}</Label>
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
                    value={insertionDate}
                    inputVariant="outlined"
                    variant="dialog"
                    maxDateMessage=""
                    mask="__-__-____"
                    placeholder="يوم/شهر/سنة"
                    onChange={e => handleInsertionDate(e) }
                    views={["year", "month", "date"]}
                  />
                </MuiPickersUtilsProvider>
             </Col>
            </Row> : null}
            {disableNext ? <Col className="my-4" md={12} >
                              <Link to="/indicatorDimensions" onClick={setSelectedMetaData}>
                                <Button.Ripple   color='primary' >
                                {intl.formatMessage({id: "Next"})}
                                </Button.Ripple>
                              </Link>
                          </Col> : null
            }
          
        </div>   
    )
}

export default ExportExcel
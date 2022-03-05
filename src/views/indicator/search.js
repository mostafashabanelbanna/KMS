import { useState, useEffect } from 'react'
import IndicatorHeader from './header'
import {convertSelectArr} from '../../utility/Utils'
import SearchForm from '../../containers/search-form/SearchForm/SearchForm'
import axios from '../../axios'
import IndicatorList from './IindicatorList'

import {tabEnum} from './tabEnum'

const search = ({ props }) => {
    const [sources, setSources] = useState([])
    const [unitLabels, setUnitLabels] = useState([])
    const [periodicities, setPeriodicities] = useState([])
    const [classifications, setClassifications] = useState([])
    const [classificationValues, setClassificationValues] = useState([])
    const [searchData, setSearchData] = useState({classificationId: null, classificationValueId: null, UnitLabelId: null, name: '', periodicityId: null, sourceId: null, IsPeriodicityTab: false, pageNumber: 1, rowsPerPage: 10})
    const [response, setResponse] = useState(false)
    const [indicators, setIndicators] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const handlePagination = page => {
        setPageNumber(page.selected + 1)
    }
    const getAllDropDowns = async () => {
        await axios.get(`/Indicator/GetSearchDropdownListsForIndicator`)
        .then(response => {
            const result = response.data.data
            console.log(result)
            setSources(result.sources)
            setUnitLabels(result.units)
            setPeriodicities(result.periodicities)
            setClassifications(result.classifications)
            console.log(result)
            setResponse(true)
           })
           .catch(error => {
        })
    }
    const getClassificationValues = async (classificationId) => {
        await axios.get(`/ClassificationValue/GetClassificationValues/${classificationId}`)
        .then(response => {
            setClassificationValues(response.data.data)
           })
           .catch(error => {
            setIndicators([])
        })
    }
    const handleSearch = (value, attrName) => {
        setSearchData({...searchData, [attrName] : value })
        if (attrName ===  'classificationId') {
            getClassificationValues(value)
        }
    } 
    
    const getIndicators = async () => {
        await axios.post(`/Indicator/GetAdvancedSearchIndicators`, searchData)
        .then(response => {
            console.log(response.data.data)
            setIndicators(response.data.data)
           })
           .catch(error => {
            setIndicators([])
        })
    }

    const handlSubmit = async () => {
        await getIndicators()
    }
    const formItems =  [
        {
          fieldType: 'text',
          label: `الاسم`, 
          colSizeLg: 4,
          attr: "name",
          dropdownArr: [], 
          multiple: true, 
          radioArr: [] 
        },
        {
          fieldType: 'select',
          label: `المصدر`, 
          colSizeLg: 4, 
          attr: "sourceId", 
          dropdownArr: convertSelectArr(sources),
          multiple: true,
          radioArr: [] 
        },
        {
            fieldType: 'select',
            label: `الوحدة`, 
            colSizeLg: 4, 
            attr: "UnitLabelId", 
            dropdownArr: convertSelectArr(unitLabels),
            multiple: true,
            radioArr: [] 
        },
        {
            fieldType: 'select',
            label: `الدورية`, 
            colSizeLg: 4, 
            attr: "periodicityId", 
            dropdownArr: convertSelectArr(periodicities),
            multiple: true,
            radioArr: [] 
        },
        {
            fieldType: 'select',
            label: `التصنيف`, 
            colSizeLg: 4, 
            attr: "classificationId", 
            dropdownArr: convertSelectArr(classifications),
            multiple: true,
            radioArr: [] 
        },
        {
            fieldType: 'select',
            label: `نوع التصنيف`, 
            colSizeLg: 4, 
            attr: "classificationValueId", 
            dropdownArr: convertSelectArr(classificationValues),
            multiple: true,
            radioArr: [] 
        }
    ]
    useEffect(() => {
        getAllDropDowns()
        getIndicators()
    }, [])
    useEffect(() => {
        getIndicators()
    }, [pageNumber])
  return (
      <>
      {/* {<IndicatorHeader tabEnumValue={tabEnum.search} /> } */}
      {response && <SearchForm display='inline' searchHandler={handleSearch} submitHandler={handlSubmit} formConfig={formItems} btnText='بحث'/>}
      <IndicatorList indicators={indicators.items} count={indicators.totalPages} pageNumber={pageNumber} handlePagination={handlePagination}/>
      
      </>
  )
}

export default search
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { Row } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'


import { getData } from './store/action'

import Breadcrumbs from '@components/breadcrumbs'
import ListingVertical from '../../containers/listing-vertical/listingVertical'
import axios from '../../axios'
import SearchForm from '../../containers/search-form/SearchForm/SearchForm'
import { convertSelectArr } from '../../utility/Utils'
import Col from 'reactstrap/lib/Col'

const LandingPage = () => {
    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.documentLibrary)
    const intl = useIntl()

    const [response, setResponse] = useState(false)
    const [sources, setSources] = useState([])
    const [unitLabels, setUnitLabels] = useState([])
    const [periodicities, setPeriodicities] = useState([])
    const [classifications, setClassifications] = useState([])
    const [classificationValues, setClassificationValues] = useState([])

    const [searchData, setSearchData] = useState({
                                                    classificationId: null, 
                                                    classificationValueId: null, 
                                                    UnitLabelId: null, 
                                                    name: '', 
                                                    periodicityId: null, 
                                                    sourceId: null, 
                                                    IsPeriodicityTab: false, 
                                                    pageNumber: 1, 
                                                    rowsPerPage: 10
                                                })


    const getAllDropDowns = async () => {
        await axios.get(`/Indicator/GetSearchDropdownListsForIndicator`)
        .then(response => {
            const result = response.data.data
            console.log(result)
            setSources(result.sources)
            setUnitLabels(result.units)
            setPeriodicities(result.periodicities)
            setClassifications(result.classifications)
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
  
    const handlSubmit = async () => {
       
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
        dispatch(getData())  
        getAllDropDowns()
    }, [])

    return (
        <div className='app-user-list'>
            <Breadcrumbs breadCrumbTitle={intl.formatMessage({id: "Document Library"})} breadCrumbParent={intl.formatMessage({id: 'Researchers Services'})} breadCrumbActive={intl.formatMessage({id: "Document Library"})} breadCrumbRoot={intl.formatMessage({id: "Homepage"})} />
            <Row>
                <Col xs={12} className="my-1 rounded">
                    {response && <SearchForm display='inline' searchHandler={handleSearch} submitHandler={handlSubmit} formConfig={formItems} btnText='بحث'/>}
                </Col>
                {store.data.map((item, index) => {
                    return (<ListingVertical key={item.id} item={item} />)
                })}
            </Row>
        </div>
    )
}

export default LandingPage
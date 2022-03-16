import React, { useEffect, useState } from 'react'
import Row from 'reactstrap/lib/Row'
import Col from 'reactstrap/lib/Col'
import { useIntl, FormattedMessage } from 'react-intl'

const ExpandedRowDetails = ({rowData, columns}) => {
    const [detailsData, setDetailsData] = useState([])
    const filterData = () => {
        // create array of table columns selectors 
        const columnsKeysArr = []
        columns.map((item) => {
            for (const [key, value] of Object.entries(item)) {
                if (key === 'selector') {
                    columnsKeysArr.push(value)
                }
            }
        }, [])

        // convert row data object into array of objects 
        const rowDataArr = []
        for (const [key, value] of Object.entries(rowData)) {
            rowDataArr.push({[key] : value})
        }       
        
        //filter used columns from row data arry to get new array of objects to rendner
        const filterArray = rowDataArr.filter(item => {
            console.log(Object.keys(item)[0])
        
            return columnsKeysArr.indexOf(Object.keys(item)[0]) === -1
        })

        setDetailsData(filterArray)
    }

    useEffect(() => {
        filterData()
    }, [])
     // useIntl
     const intl = useIntl()

     console.log(detailsData)
    return (
        <div className='p-2 border-bottom bg-' style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'}}>
            <div className='p-1 ' style={{backgroundColor: '#f3f2f7'}}>
                <Row>
                    {detailsData.map((item, index) => (
                        <Col key={index} className='my-1' md={6}>
                            <span style={{color: '#7367f0'}}>{intl.formatMessage({id: Object.keys(item)[0]})} :</span>
                            <span className='px-1'>{item[Object.keys(item)[0]]}</span>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
    
}

export default ExpandedRowDetails
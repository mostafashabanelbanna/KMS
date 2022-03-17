import React, { useEffect, useState } from 'react'
import Row from 'reactstrap/lib/Row'
import Col from 'reactstrap/lib/Col'
import { useIntl, FormattedMessage } from 'react-intl'

const ExpandedRowDetails = ({data, columns}) => {
    console.log(data)
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
        for (const [key, value] of Object.entries(data)) {
            rowDataArr.push({[key] : value})
        }       
        
        //filter used columns from row data arry to get new array of objects to rendner
        const filterArray = rowDataArr.filter(item => {
                    return columnsKeysArr.indexOf(Object.keys(item)[0]) === -1
        })

        setDetailsData(filterArray)
    }

    useEffect(() => {
        filterData()
    }, [])

    // useIntl
    const intl = useIntl()

    /*
    // check if detailsData has boolean value 
    //   if it has return yes or no beased on boolean value
    //   if it hasn't retun the original value
    */
    const checkBoolean = (itemValue) => {
        return  typeof itemValue === 'boolean' ? itemValue ? intl.formatMessage({id:'Yes'}) :  intl.formatMessage({id:'No'}) : itemValue  
    }

    return (
         data ? (
        
                <div className='p-2 border-bottom bg-' style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'}}>
                    <div className='p-1 ' style={{backgroundColor: '#f3f2f7'}}>
                        <Row>
                            {detailsData.map((item, index) => {
                                const keyName = Object.keys(item)[0]
                                return ( 
                                    <Col key={index} className='my-1' md={6}>
                                        <span style={{color: '#7367f0'}}>{intl.formatMessage({id: keyName})} :</span>
                                        <span className='px-1'>{checkBoolean(item[keyName])}</span>
                                    
                                    </Col>
                                )
                                })}
                        </Row>
                    </div>
                </div>
             ) : null
        
    )
}

export default ExpandedRowDetails
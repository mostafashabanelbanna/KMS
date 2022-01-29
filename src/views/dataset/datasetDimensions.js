import { useState } from 'react'
// ** Third Party Components
import Select from 'react-select'
import {Row, Col, Label} from 'reactstrap/lib'
import { useIntl, FormattedMessage } from 'react-intl'

import { selectThemeColors } from '@utils'

import { FaTimes } from "react-icons/fa"


const DatasetDimensions = ({dimensions, handleDeleteDimensionLevel}) => {
   const [dimensionLevels, setDimensionLevels] = useState([])
   const [dimensionValues, setDimensionValues] = useState([])

     // useIntl
  const intl = useIntl()


    return (        
        <Row>
            <Col>
                <Label>{intl.formatMessage({id: "Roles"})}</Label>
                <Select
                    isClearable={false}
                    theme={selectThemeColors}
                    getOptionLabel={(option) => option.dimensionName}
                    getOptionValue={(option) => option.dimensionId}
                    name='dimension'
                    id='dimension'
                    options={dimensions}
                    className='react-select'
                    classNamePrefix='select'
                    onChange={e => handleDimensionChange(e) }
                />
            </Col>
            <Col>
                <Label>{intl.formatMessage({id: "Roles"})}</Label>
                <Select
                    isClearable={false}
                    theme={selectThemeColors}
                    getOptionLabel={(option) => option.name_A}
                    getOptionValue={(option) => option.levelNumber}
   
                    name='dimensionLevels'
                    id='dimensionLevels'
                    options={dimensionLevels}
                    className='react-select'
                    classNamePrefix='select'
                    onChange={e => handleDimensionLevelsChange(e) }
                />
            </Col>
            <Col>
                <Label>{intl.formatMessage({id: "Roles"})}</Label>
                <Select
                    isClearable={false}
                    theme={selectThemeColors}
                    getOptionLabel={(option) => option.name_A}
                    getOptionValue={(option) => option.id}
                    isMulti
                    name='dimensionValues'
                    id='dimensionValues'
                    options={dimensionValues}
                    className='react-select'
                    classNamePrefix='select'
                    onChange={e => handleDimensionValuesChange(e) }
                />
            </Col>
            <Col>
                <FaTimes onClick={handleDeleteDimensionLevel} size={20}/>
            </Col>
        </Row>
    )
}

export default DatasetDimensions
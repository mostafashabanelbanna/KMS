import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DatasetDimensions from "./datasetDimensions"
import { getIndicatorDimensions, getIndicatorBasedLists, exportFile } from "./store/action"
import {Row, Col, Label} from 'reactstrap/lib'
import { useIntl, FormattedMessage } from 'react-intl'
import { toast } from 'react-toastify'
import Toastr from '../../containers/toastr/Toastr'
import { Button } from 'reactstrap'

// import state from "sweetalert/typings/modules/state"

const IndicatorDimension = () => {

  // useIntl
  const intl = useIntl()
  // Toastr notify function
  const notify = (type, message) => {
    return toast.success(
      <Toastr type={type} message={message} />,
      { 
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true 
      })
    }

    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.datasets)

   const deleteDimensionLevelHandler = (e) => {
       const idx = parseInt(e.target.dataset.idx)
       const type = parseInt(e.target.dataset.type)
       if (idx >= 0) {
           if (type === 1) {
               store.vertical.splice(idx, 1)
               dispatch({type:"SET_DATASET_VERTICAL", vertical: store.vertical})
            } else {
                store.horizontal.splice(idx, 1)
                dispatch({type:"SET_DATASET_HORIZONTAL", horizontal: store.horizontal})
            }
        }
    }

    const addVerticalDimensionLevel = () => {
        const addedObj = {
            dimensionId: 0,
            levelNumber: 0,
            dimensionValues: []
        }
        dispatch({type:"SET_DATASET_VERTICAL", vertical: [...store.vertical, addedObj]})
    }

    
    const addHorizontalDimensionLevel = () => {
        const addedObj = {
            dimensionId: 0,
            levelNumber: 0,
            dimensionValues: []
        }
        dispatch({type:"SET_DATASET_HORIZONTAL", horizontal: [...store.horizontal, addedObj]})
    }

    const validateDimensionsBeforeExport = () => {
        const isValidted = true
        return isValidted
    }
    const handleExportFile = () => {
        if (validateDimensionsBeforeExport()) {
            dispatch(exportFile())
        }
    }

    useEffect(() => {
        if (store.exportResponse.errorCode !== 0) {
            if (store.exportResponse.errorCode === 500 || store.exportResponse.errorCode === 400) {
                notify('error', `${intl.formatMessage({id: "InternalServerError"})}`)
            }
            dispatch({type: "RESET_DATASET_EXPORT_RESPONSE"})
        }
    }, [store.exportResponse.errorCode])
    useEffect(() => {
        dispatch(
            getIndicatorBasedLists(store.indicatorId)
        )
      }, [dispatch])

    return (
        <>
            <Row>
                <Col className="mb-4" md={12}>
                    <h3 className="text-center">عمودى</h3>
                    <button className="bg-success btn" onClick={addVerticalDimensionLevel}>أضافة</button>
                    <div>
                        {store.vertical.map((ele, idx) => (
                           <DatasetDimensions data={ele} type={1} key={idx} orderLevel={idx} handleDeleteDimensionLevel={(e) => deleteDimensionLevelHandler(e)} />
                        ))}
                    </div>
                </Col>
                <Col md={12}>
                    <h3 className="text-center">افقى</h3>
                    <button className="bg-success btn" onClick={addHorizontalDimensionLevel}>أضافة</button>
                    <div>
                        {store.horizontal.map((ele, idx) => (
                           <DatasetDimensions data={ele} type={2} key={idx} orderLevel={idx} handleDeleteDimensionLevel={(e) => deleteDimensionLevelHandler(e)} />
                        ))}
                    </div>
                </Col>
                <Col className="text-left" md={12} style={{position: 'absolute', bottom: 0, right: '85%' }}>
                    <Button.Ripple color='primary' onClick={handleExportFile} >
                        ملف الاكسيل
                    </Button.Ripple>
                </Col>
            </Row>
        </>
    )
}

export default IndicatorDimension
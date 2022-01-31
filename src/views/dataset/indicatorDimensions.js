import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DatasetDimensions from "./datasetDimensions"
import { getIndicatorDimensions, getIndicatorBasedLists } from "./store/action"
import {Row, Col, Label} from 'reactstrap/lib'

// import state from "sweetalert/typings/modules/state"

const IndicatorDimension = () => {
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
                           <DatasetDimensions data={ele} type={1} key={idx} orderLevel={idx} dimensions={store ? store.indicatorDimensions : []} handleDeleteDimensionLevel={(e) => deleteDimensionLevelHandler(e)} />
                        ))}
                    </div>
                </Col>
                <Col md={12}>
                    <h3 className="text-center">افقى</h3>
                    <button className="bg-success btn" onClick={addHorizontalDimensionLevel}>أضافة</button>
                    <div>
                        {store.horizontal.map((ele, idx) => (
                           <DatasetDimensions data={ele} type={2} key={idx} orderLevel={idx} dimensions={store ? store.indicatorDimensions : []} handleDeleteDimensionLevel={(e) => deleteDimensionLevelHandler(e)} />
                        ))}
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default IndicatorDimension
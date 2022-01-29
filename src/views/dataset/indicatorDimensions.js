import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DatasetDimensions from "./datasetDimensions"
import { getIndicatorDimensions } from "./store/action"
import {Row, Col, Label} from 'reactstrap/lib'

const IndicatorDimension = () => {
    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.datasets)
    const [vertical, setVertical] = useState([])
    const [horizontal, setHorizontal] = useState([])

   const deleteDimensionLevelHandler = (e) => {
       const id = e.target.id
       const type = e.target.dataset.type
       if (parseInt(type) === 1) {
        setVertical(vertical.filter(x => x !== parseInt(id)))
       } else {
           setHorizontal(horizontal.filter(x => x !== parseInt(id)))
       }
    }

    const addVerticalDimensionLevel = () => {
        if (vertical.length <= 0) {
            setVertical([...vertical, 1])
        } else {
            setVertical([...vertical, vertical.length + 1])
        }
    }

    
    const addHorizontalDimensionLevel = () => {
        if (horizontal.length <= 0) {
            setHorizontal([...horizontal, 1])
        } else {
            setHorizontal([...horizontal, horizontal.length + 1])

        }
    }

    useEffect(() => {
        dispatch(
            getIndicatorDimensions(store.indicatorId)
        )
      }, [dispatch])

    return (
        <>
            <Row>
                <Col md={6}>
                    <h3 className="text-center">عمودى</h3>
                    <button className="bg-success btn" onClick={addVerticalDimensionLevel}>أضافة</button>
                    <div>
                        {vertical.map((ele, idx) => (
                           <DatasetDimensions id={ele} type={1} key={idx} orderLevel={idx} dimensions={store ? store.indicatorDimensions : []} handleDeleteDimensionLevel={(e) => deleteDimensionLevelHandler(e)} />
                        ))}
                    </div>
                </Col>
                <Col md={6}>
                    <h3 className="text-center">افقى</h3>
                    <button className="bg-success btn" onClick={addHorizontalDimensionLevel}>أضافة</button>
                    <div>
                        {horizontal.map((ele, idx) => (
                           <DatasetDimensions id={ele} type={2} key={idx} orderLevel={idx} dimensions={store ? store.indicatorDimensions : []} handleDeleteDimensionLevel={(e) => deleteDimensionLevelHandler(e)} />
                        ))}
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default IndicatorDimension
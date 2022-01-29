import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DatasetDimensions from "./datasetDimensions"
import { getIndicatorDimensions } from "./store/action"


const IndicatorDimension = () => {
    // ** Store Vars
    const dispatch = useDispatch()
    const store = useSelector(state => state.datasets)
    const [vertical, setVertical] = useState([])
    const [horizontal, setHorizontal] = useState([])

   const deleteDimensionLevelHandler = (e) => {
    console.log(e)
    }

    const addVerticalDimensionLevel = () => {
        if (tempVertical.length <= 0) {
            setVertical([...vertical, 1])
        } else {
            setVertical([...vertical, vertical.length + 1])

        }
    }

    
    const addHorizontalDimensionLevel = () => {
        if (tempVertical.length <= 0) {
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
            <DatasetDimensions dimensions={store ? store.indicatorDimensions : []} handleDeleteDimensionLevel={(e) => deleteDimensionLevelHandler(e)} />
            <DatasetDimensions dimensions={store ? store.indicatorDimensions : []} handleDeleteDimensionLevel={(e) => deleteDimensionLevelHandler(e)} />
        </>
    )
}

export default IndicatorDimension
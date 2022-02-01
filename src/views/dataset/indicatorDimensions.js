import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DatasetDimensions from "./datasetDimensions"
import { getIndicatorDimensions, getIndicatorBasedLists } from "./store/action"
import {Row, Col, Label,  TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap/lib'
import { Button }  from 'reactstrap'
// import state from "sweetalert/typings/modules/state"

const IndicatorDimension = () => {
    const [active, setActive] = useState('1')

    const toggle = tab => {
      if (active !== tab) {
        setActive(tab)
      }
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

    useEffect(() => {
        dispatch(
            getIndicatorBasedLists(store.indicatorId)
        )
      }, [dispatch])

    return (
        <>
      <Nav tabs>
        <NavItem>
          <NavLink
            active={active === '1'}
            onClick={() => {
              toggle('1')
            }}
          >
            عمودى
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '2'}
            onClick={() => {
              toggle('2')
            }}
          >
              افقى
          </NavLink>
        </NavItem>
        
      </Nav>
      <TabContent className='py-50' activeTab={active}>
        <TabPane tabId='1'>
            <h3 className="my-2">عمودى</h3>
            <Button.Ripple className="mb-2" color='primary'  onClick={addVerticalDimensionLevel}>إضافة</Button.Ripple>
            <div>
                {store.vertical.map((ele, idx) => (
                    <DatasetDimensions data={ele} type={1} key={idx} orderLevel={idx} dimensions={store ? store.indicatorDimensions : []} handleDeleteDimensionLevel={(e) => deleteDimensionLevelHandler(e)} />
                ))}
            </div>

        </TabPane>
        <TabPane tabId='2'>
             <h3 className="my-2">افقى</h3>
            <Button.Ripple className="mb-2" color='primary'  onClick={addHorizontalDimensionLevel}>إضافة</Button.Ripple>
            <div>
                {store.horizontal.map((ele, idx) => (
                    <DatasetDimensions data={ele} type={2} key={idx} orderLevel={idx} dimensions={store ? store.indicatorDimensions : []} handleDeleteDimensionLevel={(e) => deleteDimensionLevelHandler(e)} />
                ))}
            </div>
        </TabPane>
      </TabContent>
            
        </>
    )
}

export default IndicatorDimension
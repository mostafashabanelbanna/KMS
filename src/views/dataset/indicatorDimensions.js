import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import DatasetDimensions from "./datasetDimensions"
import { getIndicatorDimensions, getIndicatorBasedLists, exportFile } from "./store/action"
import {Row, Col, Label, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap/lib'
import { useIntl, FormattedMessage } from 'react-intl'
import { toast } from 'react-toastify'
import Toastr from '../../containers/toastr/Toastr'
import { Button } from 'reactstrap'

// import state from "sweetalert/typings/modules/state"

const IndicatorDimension = () => {
    const [active, setActive] = useState('1')

    const toggle = tab => {
      if (active !== tab) {
        setActive(tab)
      }
    }
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
            <Button.Ripple className="mb-2" color='primary'  onClick={addVerticalDimensionLevel}>إضافة</Button.Ripple>
            <div>
                 {store.vertical.map((ele, idx) => (
                           <DatasetDimensions data={ele} type={1} key={idx} orderLevel={idx} handleDeleteDimensionLevel={(e) => deleteDimensionLevelHandler(e)} />
                        ))}
            </div>

        </TabPane>
        <TabPane tabId='2'>
            <Button.Ripple className="mb-2" color='primary'  onClick={addHorizontalDimensionLevel}>إضافة</Button.Ripple>
            <div>
            {store.horizontal.map((ele, idx) => (
                           <DatasetDimensions data={ele} type={2} key={idx} orderLevel={idx} handleDeleteDimensionLevel={(e) => deleteDimensionLevelHandler(e)} />
                        ))}
            </div>
        </TabPane>
      </TabContent>
     
          <Button.Ripple style={{position: 'absolute', bottom: 0, left: '2%' }} color='primary' onClick={handleExportFile} >
              ملف الاكسيل
          </Button.Ripple>
        </>
    )
}

export default IndicatorDimension
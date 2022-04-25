import { useState } from "react"
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap/lib'

import '@styles/react/libs/flatpickr/flatpickr.scss'

import PickerDefault from "../PickerDefault"
import SeriesTab from "./SeriesTab"
import ExcelTab from "./ExcelTab"


const Tabs = () => {
    const [active, setActive] = useState('1')

    const toggle = tab => {
      if (active !== tab) {
        setActive(tab)
      }
    }
  return (
    <>

    <Nav tabs className="indicator_Details_tabs">
      <NavItem>
        <NavLink
          active={active === '1'}
          onClick={() => {
            toggle('1')
          }}
        >
            <h4 className='mb-0'>عرض السلسلة الزمنية</h4> 
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          active={active === '2'}
          onClick={() => {
            toggle('2')
          }}
        >
            <h4 className='mb-0'>إنشاء توزيع إحصائي</h4>
            
        </NavLink>
      </NavItem>
      
    </Nav>
    <TabContent className='py-50' activeTab={active}>
      <TabPane tabId='1'>
        <SeriesTab/>
      </TabPane>
      <TabPane tabId='2'>
        <ExcelTab/>
      </TabPane>
    </TabContent>
    </>
  )
}

export default Tabs
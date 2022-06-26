import { useState } from "react"
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap/lib'

import '@styles/react/libs/flatpickr/flatpickr.scss'

import PickerDefault from "../PickerDefault"
import SeriesTab from "./SeriesTab"
import ExcelTab from "./ExcelTab"
import DashboardList from "./DashboardList"
import LineChart from "./lineChart"

const Tabs = ({id, toggleSearchHandler}) => {
    const [active, setActive] = useState('1')
    const [ID, setID] = useState()
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
            toggleSearchHandler(true)
          }}
        >
            <h4 className='mb-0'>السلسلة الزمنية</h4> 
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          active={active === '2'}
          onClick={() => {
            toggle('2')
            toggleSearchHandler(true)
          }}
        >
            <h4 className='mb-0'>رسم بياني</h4>
            
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={active === '3'}
          onClick={() => {
            setID(id)
            toggle('3')
            toggleSearchHandler(false)
          }}
        >
            <h4 className='mb-0'> لوحات معلوماتية</h4>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          active={active === '4'}
          onClick={() => {
            setID(id)
            toggle('4')
            toggleSearchHandler(false)
          }}
        >
            <h4 className='mb-0'>مصادر على الويب</h4>
        </NavLink>
      </NavItem>
    </Nav>
    <TabContent className='py-50' activeTab={active}>
      <TabPane tabId='1'>
        <SeriesTab indicatorId={id}/>
      </TabPane>
      <TabPane tabId='2'>
          <LineChart/>
      </TabPane>
      <TabPane tabId='3'>
        <DashboardList id={id} />
      </TabPane>
      <TabPane tabId='4'>
        {/* <WebResources id={id} /> */}
      </TabPane>
    </TabContent>
    </>
  )
}
export default Tabs
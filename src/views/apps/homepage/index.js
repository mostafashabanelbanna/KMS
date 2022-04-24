
// ** Styles
import '@styles/react/apps/app-email.scss'
import { useState } from 'react'
import CategoryCard from './categoryCard'
import HomeCard from './homePageCard'
import DashboardSlider from './dashboardSlider'
import ResourcesSlider from './resourcesSlider'

const Homepage = () => {
  
  return (
    <div style={{overflowY: "auto"}}>
      <h4>الصفحة الرئيسية</h4>
      <CategoryCard />
      <HomeCard title={"إضيف حديثا"} addedLatelyComp={true}/>
      <DashboardSlider/>
      <HomeCard title={"المفضلة"} favorite={true}/>
      <ResourcesSlider/>
    </div>
  )
}

export default Homepage


// ** Styles
import '@styles/react/apps/app-email.scss'
import HomeCard from './homePageCard'
import Slider from './slider'

const Homepage = () => {
 
  return (
    <div style={{overflowY: "auto"}}>
      <h4>الصفحة الرئيسية</h4>
      <HomeCard title={"إضيف حديثا"} addedLatelyComp={true}/>
      <HomeCard title={"المفضلة"}/>
      <Slider title={"لوحات معلوماتية"}  dashboard={true}/>
      <Slider title={"مصادر مميزة على الإنترنت"}/>
    </div>
  )
}

export default Homepage

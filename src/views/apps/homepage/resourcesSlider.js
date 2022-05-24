import SwiperCore, {
  Navigation,
  Pagination,
  EffectFade,
  EffectCube,
  EffectCoverflow,
  Autoplay,
  Lazy,
  Virtual
} from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import { Play, DollarSign, HelpCircle, FileText, Archive } from "react-feather"
import "./style.css"
import "@styles/react/libs/swiper/swiper.scss"
import SliderB1 from "@src/assets/images/icons/SliderB1.png"
import SliderB2 from "@src/assets/images/icons/SliderB2.png"
import axios from "../../../axios"
import { useEffect, useState } from 'react'

SwiperCore.use([
  Navigation,
  Pagination,
  EffectFade,
  EffectCube,
  EffectCoverflow,
  Autoplay,
  Lazy,
  Virtual
])

const ResourcesSlider = () => {
  const [webResources, setWebResources] = useState([])

  const params = {
    className: "swiper-centered-slides p-1",
    slidesPerView: "auto",
    spaceBetween: 30,
    centeredSlides: true,
    navigation: true,
    slideToClickedSlide: true,
    centeredSlides: false,
    autoplay: true

  }

  const getWebResources = async () => {
    await axios.post(`/Home/GetHomeWebResources`, { webResourceCategoryId: null })
      .then(response => {
        const result = response.data.data
        setWebResources(result)
      })
      .catch(error => {
      })
  }

  useEffect(() => {
    getWebResources()
  }, [])

  
  return (
    <Card className="bg-transparent shadow-none">
      <CardHeader className="pt-0">
        <div className="d-flex w-100 align-items-center">
          <CardTitle tag="h4">مصادر مميزة على الإنترنت</CardTitle>
          <hr className="col bg-gray my-0 ml-2" />
        </div>
      </CardHeader>
      <CardBody>
        <Swiper className="" {...params}>
          {/* </Swiper>style={{width: dashboard ? 400 : "auto"}}> */}
          {webResources.map((item, index) => {
            const imgUrl = `${process.env.REACT_APP_MAINPATH}/WebResource/Logo/${item.id}/${item.logo}`

            return (
              <SwiperSlide
                key={index}
                className="rounded swiper-shadow p-1 resourcesSlider"
              >
                <img src={imgUrl} width="40%" height="50%" className="mb-2" />
                <a
                  href={item.url}
                  target="_blank"
                  className="d-flex text-center text-muted swiper-text align-middle pt-md-1 pt-sm-50 mb-0"
                >
                  {item.name_A}
                </a>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </CardBody>
    </Card>
  )
}

export default ResourcesSlider

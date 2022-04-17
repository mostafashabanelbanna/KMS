import SwiperCore, {
  Navigation,
  Pagination,
  EffectFade,
  EffectCube,
  EffectCoverflow,
  Autoplay,
  Lazy,
  Virtual
} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { Play, DollarSign, HelpCircle, FileText, Archive } from 'react-feather'
import "./style.css"
import '@styles/react/libs/swiper/swiper.scss'

SwiperCore.use([Navigation, Pagination, EffectFade, EffectCube, EffectCoverflow, Autoplay, Lazy, Virtual])

const Slider = ({title, dashboard, containerClassName, containerStyle, className, style, isRtl}) => {
    const params = {
        className: 'swiper-centered-slides p-1',
        slidesPerView: 'auto',
        spaceBetween: 30,
        centeredSlides: true,
        navigation: true,
        slideToClickedSlide: true
    }

    return (
    <Card className='bg-transparent shadow-none'>
        <CardHeader>
            <div className='d-flex w-100 align-items-center'>
                <CardTitle tag='h4'>{title}</CardTitle>
                <hr className="col bg-gray my-0 ml-2" />
            </div>
        </CardHeader>
        <CardBody>
        <Swiper {...params}>
            <SwiperSlide className={`rounded swiper-shadow ${dashboard ? "dashboardSlider" : ""}`}>
            <Play size={28} className="mb-3"/>
            <p className='d-flex text-center swiper-text align-middle pt-md-1 pt-sm-50 mb-0'>Getting Started</p>
            </SwiperSlide>
            <SwiperSlide className={`rounded swiper-shadow ${dashboard ? "dashboardSlider" : ""}`}>
            <DollarSign size={28} className="mb-3" />
            <p className='swiper-text align-middle pt-md-1 pt-sm-50 mb-0'>Pricing & Plans</p>
            </SwiperSlide>
            <SwiperSlide className={`rounded swiper-shadow ${dashboard ? "dashboardSlider" : ""}`}>
            <HelpCircle size={28} className="mb-3" />
            <p className='swiper-text align-middle pt-md-1 pt-sm-50 mb-0'>Sales Questions</p>
            </SwiperSlide>
            <SwiperSlide className={`rounded swiper-shadow ${dashboard ? "dashboardSlider" : ""}`}>
            <FileText size={28} className="mb-3" />
            <p className='swiper-text align-middle pt-md-1 pt-sm-50 mb-0'>User Guides</p>
            </SwiperSlide>
            <SwiperSlide className={`rounded swiper-shadow ${dashboard ? "dashboardSlider" : ""}`}>
            <Archive size={28} className="mb-3" />
            <p className='swiper-text align-middle pt-md-1 pt-sm-50 mb-0'>General Guides</p>
            </SwiperSlide>
            <SwiperSlide className={`rounded swiper-shadow ${dashboard ? "dashboardSlider" : ""}`}>
            <Archive size={28} className="mb-3" />
            <p className='swiper-text align-middle pt-md-1 pt-sm-50 mb-0'>General Guides</p>
            </SwiperSlide>
            <SwiperSlide className={`rounded swiper-shadow ${dashboard ? "dashboardSlider" : ""}`}>
            <Archive size={28} className="mb-3" />
            <p className='swiper-text align-middle pt-md-1 pt-sm-50 mb-0'>General Guides</p>
            </SwiperSlide>
        </Swiper>
        </CardBody>
    </Card>
    )
}

export default Slider

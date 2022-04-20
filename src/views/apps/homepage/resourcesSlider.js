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
import SliderB1 from '@src/assets/images/icons/SliderB1.png'
import SliderB2 from '@src/assets/images/icons/SliderB2.png'

SwiperCore.use([Navigation, Pagination, EffectFade, EffectCube, EffectCoverflow, Autoplay, Lazy, Virtual])

const ResourcesSlider = () => {
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
        <CardHeader className="pt-0">
            <div className='d-flex w-100 align-items-center'>
                <CardTitle tag='h4'>مصادر مميزة على الإنترنت</CardTitle>
                <hr className="col bg-gray my-0 ml-2" />
            </div>
        </CardHeader>
        <CardBody>
        <Swiper className='' {...params}>
            {/* </Swiper>style={{width: dashboard ? 400 : "auto"}}> */}
            <SwiperSlide className="rounded swiper-shadow p-1 resourcesSlider"> 
                    <img src={SliderB1} width="40%" height="50%" className='mb-2'/>
                    <p className='d-flex text-center swiper-text align-middle pt-md-1 pt-sm-50 mb-0'>مجلس الوزراء</p>
            </SwiperSlide>
            <SwiperSlide className="rounded swiper-shadow p-1 resourcesSlider"> 
                    <img src={SliderB2} width="40%" height="50%" className='mb-2'/>
                    <p className='d-flex text-center swiper-text align-middle pt-md-1 pt-sm-50 mb-0'>وزارة الزراعة</p>
            </SwiperSlide>
            <SwiperSlide className="rounded swiper-shadow p-1 resourcesSlider"> 
                    <img src={SliderB1} width="40%" height="50%" className='mb-2'/>
                    <p className='d-flex text-center swiper-text align-middle pt-md-1 pt-sm-50 mb-0'>مركز المعلومات ودعم إتخاذ القرار</p>
            </SwiperSlide>
            <SwiperSlide className="rounded swiper-shadow p-1 resourcesSlider"> 
                    <img src={SliderB1} width="40%" height="50%" className='mb-2'/>
                    <p className='d-flex text-center swiper-text align-middle pt-md-1 pt-sm-50 mb-0'>مجلس الوزراء</p>
            </SwiperSlide>
            <SwiperSlide className="rounded swiper-shadow p-1 resourcesSlider"> 
                    <img src={SliderB1} width="40%" height="50%" className='mb-2'/>
                    <p className='d-flex text-center swiper-text align-middle pt-md-1 pt-sm-50 mb-0'>مجلس الوزراء</p>
            </SwiperSlide>
            <SwiperSlide className="rounded swiper-shadow p-1 resourcesSlider"> 
                    <img src={SliderB1} width="40%" height="50%" className='mb-2'/>
                    <p className='d-flex text-center swiper-text align-middle pt-md-1 pt-sm-50 mb-0'>مجلس الوزراء</p>
            </SwiperSlide>
            <SwiperSlide className="rounded swiper-shadow p-1 resourcesSlider"> 
                    <img src={SliderB1} width="40%" height="50%" className='mb-2'/>
                    <p className='d-flex text-center swiper-text align-middle pt-md-1 pt-sm-50 mb-0'>مجلس الوزراء</p>
            </SwiperSlide>
        </Swiper>
        </CardBody>
    </Card>
    )
}

export default ResourcesSlider

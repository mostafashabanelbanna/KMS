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
import { Card, CardHeader, CardTitle, CardBody, Button } from 'reactstrap'
import { Play, DollarSign, HelpCircle, FileText, Archive } from 'react-feather'
import "./style.css"
import '@styles/react/libs/swiper/swiper.scss'
import SliderT from '@src/assets/images/icons/SliderT.png'

SwiperCore.use([Navigation, Pagination, EffectFade, EffectCube, EffectCoverflow, Autoplay, Lazy, Virtual])

const DashboardSlider = () => {
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
                <CardTitle tag='h4'>لوحات معلوماتية</CardTitle>
                <hr className="col bg-gray my-0 ml-2" />
            </div>
        </CardHeader>
        <CardBody>
        <Swiper className='' {...params}>
            {/* </Swiper>style={{width: dashboard ? 400 : "auto"}}> */}
            <SwiperSlide className="rounded swiper-shadow p-1 dashboardSlider"> 
                    <div className='mb-1' style={{fontSize: 22}}>اللوحة المعلوماتية لميزان المدفوعات</div>
                    <img src={SliderT} width="100%"/>
                    <p className='d-flex swiper-text align-middle pt-md-1 pt-sm-50 mb-0 text-left text-muted' style={{fontSize: 18}}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة. لقد تم توليد هذا النص من مولد النص العربي حيث يمكن أن تولد مثل هذا النص. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة. لقد تم توليد هذا النص من مولد النص العربي حيث يمكن أن تولد مثل هذا النص.</p>
                    <hr className="col-11 bg-gray"/>
                    <div className='d-flex'>
                        <p className='mb-0' style={{fontSize:16}}>إجمالي عناصر البيانات المستخدمة</p>
                        <p className='mb-0 px-2' style={{fontSize:16}}>3344</p>
                        <a href={"#"} className="text_green" style={{fontSize:18, fontWeight:"bold"}}>تفاصيل</a>
                    </div>
            </SwiperSlide>
            <SwiperSlide className="rounded swiper-shadow p-1 dashboardSlider"> 
                    <div className='mb-1' style={{fontSize: 22}}>اللوحة المعلوماتية لميزان المدفوعات</div>
                    <img src={SliderT} width="100%"/>
                    <p className='d-flex swiper-text align-middle pt-md-1 pt-sm-50 mb-0 text-left text-muted' style={{fontSize: 18}}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة. لقد تم توليد هذا النص من مولد النص العربي حيث يمكن أن تولد مثل هذا النص. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة. لقد تم توليد هذا النص من مولد النص العربي حيث يمكن أن تولد مثل هذا النص.</p>
                    <hr className="col-11 bg-gray"/>
                    <div className='d-flex'>
                        <p className='mb-0' style={{fontSize:16}}>إجمالي عناصر البيانات المستخدمة</p>
                        <p className='mb-0 px-2' style={{fontSize:16}}>3344</p>
                        <a href={"#"} className="text_green" style={{fontSize:18, fontWeight:"bold"}}>تفاصيل</a>
                    </div>
            </SwiperSlide>
            <SwiperSlide className="rounded swiper-shadow p-1 dashboardSlider"> 
                    <div className='mb-1' style={{fontSize: 22}}>اللوحة المعلوماتية لميزان المدفوعات</div>
                    <img src={SliderT} width="100%"/>
                    <p className='d-flex swiper-text align-middle pt-md-1 pt-sm-50 mb-0 text-left text-muted' style={{fontSize: 18}}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة. لقد تم توليد هذا النص من مولد النص العربي حيث يمكن أن تولد مثل هذا النص. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة. لقد تم توليد هذا النص من مولد النص العربي حيث يمكن أن تولد مثل هذا النص.</p>
                    <hr className="col-11 bg-gray"/>
                    <div className='d-flex'>
                        <p className='mb-0' style={{fontSize:16}}>إجمالي عناصر البيانات المستخدمة</p>
                        <p className='mb-0 px-2' style={{fontSize:16}}>3344</p>
                        <a href={"#"} className="text_green" style={{fontSize:18, fontWeight:"bold"}}>تفاصيل</a>
                    </div>
            </SwiperSlide>
            <SwiperSlide className="rounded swiper-shadow p-1 dashboardSlider"> 
                    <div className='mb-1' style={{fontSize: 22}}>اللوحة المعلوماتية لميزان المدفوعات</div>
                    <img src={SliderT} width="100%"/>
                    <p className='d-flex swiper-text align-middle pt-md-1 pt-sm-50 mb-0 text-left text-muted' style={{fontSize: 18}}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة. لقد تم توليد هذا النص من مولد النص العربي حيث يمكن أن تولد مثل هذا النص. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة. لقد تم توليد هذا النص من مولد النص العربي حيث يمكن أن تولد مثل هذا النص.</p>
                    <hr className="col-11 bg-gray"/>
                    <div className='d-flex'>
                        <p className='mb-0' style={{fontSize:16}}>إجمالي عناصر البيانات المستخدمة</p>
                        <p className='mb-0 px-2' style={{fontSize:16}}>3344</p>
                        <a href={"#"} className="text_green" style={{fontSize:18, fontWeight:"bold"}}>تفاصيل</a>
                    </div>
            </SwiperSlide>
            <SwiperSlide className="rounded swiper-shadow p-1 dashboardSlider"> 
                    <div className='mb-1' style={{fontSize: 22}}>اللوحة المعلوماتية لميزان المدفوعات</div>
                    <img src={SliderT} width="100%"/>
                    <p className='d-flex swiper-text align-middle pt-md-1 pt-sm-50 mb-0 text-left text-muted' style={{fontSize: 18}}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة. لقد تم توليد هذا النص من مولد النص العربي حيث يمكن أن تولد مثل هذا النص. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة. لقد تم توليد هذا النص من مولد النص العربي حيث يمكن أن تولد مثل هذا النص.</p>
                    <hr className="col-11 bg-gray"/>
                    <div className='d-flex'>
                        <p className='mb-0' style={{fontSize:16}}>إجمالي عناصر البيانات المستخدمة</p>
                        <p className='mb-0 px-2' style={{fontSize:16}}>3344</p>
                        <a href={"#"} className="text_green" style={{fontSize:18, fontWeight:"bold"}}>تفاصيل</a>
                    </div>
            </SwiperSlide>
            <SwiperSlide className="rounded swiper-shadow p-1 dashboardSlider"> 
                    <div className='mb-1' style={{fontSize: 22}}>اللوحة المعلوماتية لميزان المدفوعات</div>
                    <img src={SliderT} width="100%"/>
                    <p className='d-flex swiper-text align-middle pt-md-1 pt-sm-50 mb-0 text-left text-muted' style={{fontSize: 18}}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة. لقد تم توليد هذا النص من مولد النص العربي حيث يمكن أن تولد مثل هذا النص. هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة. لقد تم توليد هذا النص من مولد النص العربي حيث يمكن أن تولد مثل هذا النص.</p>
                    <hr className="col-11 bg-gray"/>
                    <div className='d-flex'>
                        <p className='mb-0' style={{fontSize:16}}>إجمالي عناصر البيانات المستخدمة</p>
                        <p className='mb-0 px-2' style={{fontSize:16}}>3344</p>
                        <a href={"#"} className="text_green" style={{fontSize:18, fontWeight:"bold"}}>تفاصيل</a>
                    </div>
            </SwiperSlide>
        </Swiper>
        <div className='mt-2 mb-1 d-flex justify-content-end col-12 px-0'>
            <div  className="col-xl-3 col-sm-4 col-6 px-2">
                <Button type='submit' className="w-100" color='green' style={{fontSize: 18}} onClick={() => {}}>عرض الكل</Button>
            </div>
        </div>
        </CardBody>
    </Card>
    )
}

export default DashboardSlider

import fiBrChartPieAlt from '@src/assets/images/icons/fiBrChartPieAlt.png'
import { useEffect, useState } from 'react'
import { Button } from 'reactstrap'
import {isNotLightSkin} from '../../../utility/Utils'

const CategoryCard = () => {
    const [activeCard, setActiveCard] = useState("A2")
    return (
    <div className="p-2">
        <div className="d-flex flex-column card p-2 mt-2" style={{borderRadius: 20}}>
            
            <div className='d-flex justify-content-center align-items-center mb-2' style={{height: 30}}>
                <div className={`${activeCard !== "A1" ? "" : "align-self-start"}`}><p className={`mb-0 ${activeCard !== "A1" ? "text-muted" : ""}`} style={{fontSize: 18, borderBottom: activeCard === "A1" ? "1px solid" : "unset", cursor:"pointer"}} onClick={() => {
                    setActiveCard("A1")
                }}>الدوريات</p></div>
                <div className={`${activeCard !== "A2" ? "" : "align-self-start"}`}><p className={`mb-0 mx-2 ${activeCard !== "A2" ? "text-muted" : ""}`} style={{fontSize: 18, borderBottom: activeCard === "A2" ? "1px solid" : "unset", cursor:"pointer"}} onClick={() => {
                    setActiveCard("A2")
                }}>التصنيفات</p></div>
                <div className={`${activeCard !== "A3" ? "" : "align-self-start"}`}><p className={`mb-0 ${activeCard !== "A3" ? "text-muted" : ""}`} style={{fontSize: 18, borderBottom: activeCard === "A3" ? "1px solid" : "unset", cursor:"pointer"}} onClick={() => {
                    setActiveCard("A3")
                }}>القطاعات</p></div>
            </div>

            {activeCard === "A2" && <>
            <div className='d-flex justify-content-center'>
                <p>إجمالي عناصر البيانات</p>
                <p className='mx-1' style={{color: "#3D5484"}}>3000</p>
            </div>
                <div className="d-flex flex-wrap">
                    {/* "#161d31" */}
                    <div className='col-xl-2 col-md-4 col-6 px-2 py-xl-0 py-2'>
                        <div className="d-flex justify-content-center align-items-center flex-column py-1" style={{backgroundColor: "#eaeaeb", borderRadius: 20}}>
                            <div><img src={fiBrChartPieAlt} /></div>
                            <div className='py-1 text-center' style={{fontSize: 18}}>البيانات الإقتصادية</div>
                            <div style={{color: "#3D5484", fontSize: 18}}>205</div>
                        </div>
                    </div>
                    <div className='col-xl-2 col-md-4 col-6 px-2 py-xl-0 py-2'>
                        <div className="d-flex justify-content-center align-items-center flex-column py-1" style={{backgroundColor: "#eaeaeb", borderRadius: 20}}>
                            <div><img src={fiBrChartPieAlt} /></div>
                            <div className='py-1 text-center' style={{fontSize: 18}}>البيانات الإقتصادية</div>
                            <div style={{color: "#3D5484", fontSize: 18}}>205</div>
                        </div>
                    </div>
                    <div className='col-xl-2 col-md-4 col-6 px-2 py-xl-0 py-2'>
                        <div className="d-flex justify-content-center align-items-center flex-column py-1" style={{backgroundColor: "#eaeaeb", borderRadius: 20}}>
                            <div><img src={fiBrChartPieAlt} /></div>
                            <div className='py-1 text-center' style={{fontSize: 18}}>البيانات الإقتصادية</div>
                            <div style={{color: "#3D5484", fontSize: 18}}>205</div>
                        </div>
                    </div>
                    <div className='col-xl-2 col-md-4 col-6 px-2 py-xl-0 py-2'>
                        <div className="d-flex justify-content-center align-items-center flex-column py-1" style={{backgroundColor: "#eaeaeb", borderRadius: 20}}>
                            <div><img src={fiBrChartPieAlt} /></div>
                            <div className='py-1 text-center' style={{fontSize: 18}}>البيانات الإقتصادية</div>
                            <div style={{color: "#3D5484", fontSize: 18}}>205</div>
                        </div>
                    </div>
                    <div className='col-xl-2 col-md-4 col-6 px-2 py-xl-0 py-2'>
                        <div className="d-flex justify-content-center align-items-center flex-column py-1" style={{backgroundColor: "#eaeaeb", borderRadius: 20}}>
                            <div><img src={fiBrChartPieAlt} /></div>
                            <div className='py-1 text-center' style={{fontSize: 18}}>البيانات الإقتصادية</div>
                            <div style={{color: "#3D5484", fontSize: 18}}>205</div>
                        </div>
                    </div>
                    <div className='col-xl-2 col-md-4 col-6 px-2 py-xl-0 py-2'>
                        <div className="d-flex justify-content-center align-items-center flex-column py-1" style={{backgroundColor: "#eaeaeb", borderRadius: 20}}>
                            <div><img src={fiBrChartPieAlt} /></div>
                            <div className='py-1 text-center' style={{fontSize: 18}}>البيانات الإقتصادية</div>
                            <div style={{color: "#3D5484", fontSize: 18}}>205</div>
                        </div>
                    </div>
                </div>
                <Button type='submit' className='mr-1 mt-2 mb-1 align-self-end' color='green' style={{width: "fit-content"}} onClick={() => {}}>عرض الكل</Button>
            </>}
        
        </div>
    </div>)
}

export default CategoryCard
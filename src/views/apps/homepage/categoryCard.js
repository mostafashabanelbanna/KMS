import fiBrChartPieAlt from '@src/assets/images/icons/fiBrChartPieAlt.png'
import subTitles from '@src/assets/images/icons/subTitles.png'
import { useEffect, useState } from 'react'
import { Button } from 'reactstrap'
import {isNotLightSkin} from '../../../utility/Utils'

const CategoryCard = () => {
    const [activeCard, setActiveCard] = useState("A2")
    return (
    <div className="pb-2 px-2">
        <div className="d-flex flex-column card p-2 mt-2" style={{borderRadius: 20}}>
            
            <div className='d-flex justify-content-center align-items-center mb-2' style={{height: 30}}>
                <div className={`${activeCard !== "A1" ? "" : "align-self-start"}`}><p className={`mb-0 ${activeCard !== "A1" ? "text-muted" : ""}`} style={{fontSize: 18, borderBottom: activeCard === "A1" ? "1px solid" : "unset", cursor:"pointer"}} onClick={() => {
                    setActiveCard("A1")
                }}>القطاعات</p></div>
                <div className={`${activeCard !== "A2" ? "" : "align-self-start"}`}><p className={`mb-0 mx-2 ${activeCard !== "A2" ? "text-muted" : ""}`} style={{fontSize: 18, borderBottom: activeCard === "A2" ? "1px solid" : "unset", cursor:"pointer"}} onClick={() => {
                    setActiveCard("A2")
                }}>التصنيفات</p></div>
                <div className={`${activeCard !== "A3" ? "" : "align-self-start"}`}><p className={`mb-0 ${activeCard !== "A3" ? "text-muted" : ""}`} style={{fontSize: 18, borderBottom: activeCard === "A3" ? "1px solid" : "unset", cursor:"pointer"}} onClick={() => {
                    setActiveCard("A3")
                }}>الدوريات</p></div>
            </div>

            {activeCard === "A1" && <>
            <div className='d-flex justify-content-start px-2'>
                <p style={{fontSize: 16}}>إجمالي عناصر البيانات</p>
            </div>
                <div className="d-flex flex-wrap">
                    {/* "#161d31" */}
                    <div className='col-xl-3 col-lg-6 col-12 px-2 py-xl-0 py-2'>
                        <div className="d-flex justify-content-center align-items-center flex-column py-1" style={{backgroundColor: "#eaeaeb", borderRadius: 20}}>
                            <div className='d-flex flex-wrap col-12 pb-1'>
                                <div className='text-center col-xl-2 col-lg-12 col-2'><img src={fiBrChartPieAlt} width="22px"/></div>
                                <div className='text-center col-xl-7 col-lg-12 col-7' style={{fontSize: 22, fontWeight: "bold"}}>البيانات الإقتصادية</div>
                                <div className='text-center col-xl-3 col-lg-12 col-3' style={{color: "#3D5484", fontSize: 22}}>205</div>
                            </div>
                            <div className='d-flex flex-column col-12'>
                                <div className='d-flex col-12 pb-1 px-2'>
                                    <div><img src={subTitles} width="15px"/></div>
                                    <div className='col-11' style={{fontSize: 18}}>البيانات الإقتصادية</div>
                                </div>
                                <div className='d-flex col-12 pb-1 px-2'>
                                    <div><img src={subTitles} width="15px"/></div>
                                    <div className='col-11' style={{fontSize: 18}}>البيانات الإقتصادية</div>
                                </div>
                                <div className='d-flex col-12 pb-1 px-2'>
                                    <div><img src={subTitles} width="15px"/></div>
                                    <div className='col-11' style={{fontSize: 18}}>البيانات الإقتصادية</div>
                                </div>
                                <div className='d-flex col-12 pb-1 px-2'>
                                    <div><img src={subTitles} width="15px"/></div>
                                    <div className='col-11' style={{fontSize: 18}}>البيانات الإقتصادية</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='col-xl-3 col-lg-6 col-12 px-2 py-xl-0 py-2'>
                        <div className="d-flex justify-content-center align-items-center flex-column py-1" style={{backgroundColor: "#eaeaeb", borderRadius: 20}}>
                            <div className='d-flex flex-wrap col-12 pb-1'>
                                <div className='text-center col-xl-2 col-lg-12 col-2'><img src={fiBrChartPieAlt} width="22px"/></div>
                                <div className='text-center col-xl-7 col-lg-12 col-7' style={{fontSize: 22, fontWeight: "bold"}}>البيانات الإقتصادية</div>
                                <div className='text-center col-xl-3 col-lg-12 col-3' style={{color: "#3D5484", fontSize: 22}}>205</div>
                            </div>
                            <div className='d-flex flex-column col-12'>
                                <div className='d-flex col-12 pb-1 px-2'>
                                    <div><img src={subTitles} width="15px"/></div>
                                    <div className='col-11' style={{fontSize: 18}}>البيانات الإقتصادية</div>
                                </div>
                                <div className='d-flex col-12 pb-1 px-2'>
                                    <div><img src={subTitles} width="15px"/></div>
                                    <div className='col-11' style={{fontSize: 18}}>البيانات الإقتصادية</div>
                                </div>
                                <div className='d-flex col-12 pb-1 px-2'>
                                    <div><img src={subTitles} width="15px"/></div>
                                    <div className='col-11' style={{fontSize: 18}}>البيانات الإقتصادية</div>
                                </div>
                                <div className='d-flex col-12 pb-1 px-2'>
                                    <div><img src={subTitles} width="15px"/></div>
                                    <div className='col-11' style={{fontSize: 18}}>البيانات الإقتصادية</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-xl-3 col-lg-6 col-12 px-2 py-xl-0 py-2'>
                        <div className="d-flex justify-content-center align-items-center flex-column py-1" style={{backgroundColor: "#eaeaeb", borderRadius: 20}}>
                            <div className='d-flex flex-wrap col-12 pb-1'>
                                <div className='text-center col-xl-2 col-lg-12 col-2'><img src={fiBrChartPieAlt} width="22px"/></div>
                                <div className='text-center col-xl-7 col-lg-12 col-7' style={{fontSize: 22, fontWeight: "bold"}}>البيانات الإقتصادية</div>
                                <div className='text-center col-xl-3 col-lg-12 col-3' style={{color: "#3D5484", fontSize: 22}}>205</div>
                            </div>
                            <div className='d-flex flex-column col-12'>
                                <div className='d-flex col-12 pb-1 px-2'>
                                    <div><img src={subTitles} width="15px"/></div>
                                    <div className='col-11' style={{fontSize: 18}}>البيانات الإقتصادية</div>
                                </div>
                                <div className='d-flex col-12 pb-1 px-2'>
                                    <div><img src={subTitles} width="15px"/></div>
                                    <div className='col-11' style={{fontSize: 18}}>البيانات الإقتصادية</div>
                                </div>
                                <div className='d-flex col-12 pb-1 px-2'>
                                    <div><img src={subTitles} width="15px"/></div>
                                    <div className='col-11' style={{fontSize: 18}}>البيانات الإقتصادية</div>
                                </div>
                                <div className='d-flex col-12 pb-1 px-2'>
                                    <div><img src={subTitles} width="15px"/></div>
                                    <div className='col-11' style={{fontSize: 18}}>البيانات الإقتصادية</div>
                                </div>
                                <div className='d-flex col-12 pb-1 px-2'>
                                    <div><img src={subTitles} width="15px"/></div>
                                    <div className='col-11' style={{fontSize: 18}}>البيانات الإقتصادية</div>
                                </div>
                                <div className='d-flex col-12 pb-1 px-2'>
                                    <div><img src={subTitles} width="15px"/></div>
                                    <div className='col-11' style={{fontSize: 18}}>البيانات الإقتصادية</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='d-flex flex-column col-xl-3 col-lg-6 col-12 px-2 py-xl-0 py-2'>
                        <div className="d-flex justify-content-center align-items-center flex-column py-1 mb-1" style={{backgroundColor: "#eaeaeb", borderRadius: 20}}>
                            <div className='d-flex col-12'>
                                <div className='col-2'><img src={fiBrChartPieAlt} width="22px"/></div>
                                <div className='text-center col-7' style={{fontSize: 22, fontWeight: "bold"}}>البيانات الإقتصادية</div>
                                <div className='col-3' style={{color: "#3D5484", fontSize: 22}}>205</div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center align-items-center flex-column py-1 mb-1" style={{backgroundColor: "#eaeaeb", borderRadius: 20}}>
                            <div className='d-flex col-12'>
                                <div className='col-2'><img src={fiBrChartPieAlt} width="22px"/></div>
                                <div className='text-center col-7' style={{fontSize: 22, fontWeight: "bold"}}>البيانات الإقتصادية</div>
                                <div className='col-3' style={{color: "#3D5484", fontSize: 22}}>205</div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center align-items-center flex-column py-1 mb-1" style={{backgroundColor: "#eaeaeb", borderRadius: 20}}>
                            <div className='d-flex col-12'>
                                <div className='col-2'><img src={fiBrChartPieAlt} width="22px"/></div>
                                <div className='text-center col-7' style={{fontSize: 22, fontWeight: "bold"}}>البيانات الإقتصادية</div>
                                <div className='col-3' style={{color: "#3D5484", fontSize: 22}}>205</div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center align-items-center flex-column py-1 mb-1" style={{backgroundColor: "#eaeaeb", borderRadius: 20}}>
                            <div className='d-flex col-12'>
                                <div className='col-2'><img src={fiBrChartPieAlt} width="22px"/></div>
                                <div className='text-center col-7' style={{fontSize: 22, fontWeight: "bold"}}>البيانات الإقتصادية</div>
                                <div className='col-3' style={{color: "#3D5484", fontSize: 22}}>205</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-2 mb-1 d-flex justify-content-end col-12 px-0'>
                    <div  className="col-xl-3 col-sm-4 col-6 px-2">
                        <Button type='submit' className="w-100" color='green' style={{fontSize: 18}} onClick={() => {}}>عرض الكل</Button>
                    </div>
                </div>
            </>}

            {activeCard === "A2" && <>
            <div className='d-flex justify-content-center'>
                <p style={{fontSize: 16}}>إجمالي عناصر البيانات</p>
                <p className='mx-1' style={{color: "#3D5484", fontSize: 16}}>3000</p>
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
                <div className='mt-2 mb-1 d-flex justify-content-end col-12 px-0'>
                    <div  className="col-xl-2 col-sm-4 col-6 px-2">
                        <Button type='submit' className="w-100" color='green' style={{fontSize: 18}} onClick={() => {}}>عرض الكل</Button>
                    </div>
                </div>
            </>}
        
        </div>
    </div>)
}

export default CategoryCard
import { CardTitle } from "reactstrap"
import { faEye } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import download from '@src/assets/images/icons/download.png'

const HomeCard = ({title, addedLatelyComp}) => {
    return <div className="d-flex flex-column pb-2 px-2">
        <div className='d-flex w-100 align-items-center'>
            <CardTitle tag='h4' className="mb-0">{title}</CardTitle>
            <hr className="col bg-gray my-0 ml-2" />
        </div>
        <div className="d-flex flex-column card p-2 mt-2" style={{borderRadius: 20}}>
            <div className="d-flex">
                <div className="d-flex justify-content-center align-items-center" style={{width: 35, height: 35, borderRadius: "50%", backgroundColor: "#f4f4f5"}}>
                    <div style={{width: 22, height: 22, borderRadius: "50%", backgroundColor: "#dca627"}}></div>
                </div>
                <div className="col-11 px-2">
                    <div className="d-flex flex-column">
                        <h2 className="mb-1">عناصر البيانات</h2>
                        <div className="d-flex flex-wrap align-items-start col-12">
                            <div className="col-xl-5 col-12 p-0 mb-xl-0 mb-1">
                                <p className="mb-0" style={{fontSize: 18, fontWeight: "bold"}}>إجمالي عدد المدارس اليابانيةبالفصول المصرية</p>
                            </div>
                            <div className="col-xl-5 col-md-8 col-12 p-0 mb-xl-0 mb-1">
                                <p className="mb-0 text-muted" style={{fontSize: 17}}>إجمالي عدد المدارس اليابانيةبالفصول المصرية</p>
                            </div>
                            {addedLatelyComp && <div className="col-xl-2 col-md-4 col-12 d-flex align-items-center justify-content-end">
                                <p className="px-1 mb-0">منذ 30 دقيقة</p>
                                <FontAwesomeIcon icon={faEye} color={"#08a291"} size={"lg"}/>
                            </div>}
                        </div>
                        <hr className="col-12 bg-gray"/>
                        <div className="d-flex flex-wrap align-items-start col-12">
                            <div className="col-xl-5 col-12 p-0 mb-xl-0 mb-1">
                                <p className="mb-0" style={{fontSize: 18, fontWeight: "bold"}}>إجمالي عدد المدارس اليابانيةبالفصول المصرية</p>
                            </div>
                            <div className="col-xl-5 col-md-8 col-12 p-0 mb-xl-0 mb-1">
                                <p className="mb-0 text-muted" style={{fontSize: 17}}>إجمالي عدد المدارس اليابانيةبالفصول المصرية</p>
                            </div>
                            {addedLatelyComp && <div className="col-xl-2 col-md-4 col-12 d-flex align-items-center justify-content-end">
                                <p className="px-1 mb-0">منذ 30 دقيقة</p>
                                <FontAwesomeIcon icon={faEye} color={"#08a291"} size={"lg"}/>
                            </div>}
                        </div>
                        <hr className="col-12 bg-gray"/>
                        <div className="d-flex flex-wrap align-items-start col-12">
                            <div className="col-xl-5 col-12 p-0 mb-xl-0 mb-1">
                                <p className="mb-0" style={{fontSize: 18, fontWeight: "bold"}}>إجمالي عدد المدارس اليابانيةبالفصول المصرية</p>
                            </div>
                            <div className="col-xl-5 col-md-8 col-12 p-0 mb-xl-0 mb-1">
                                <p className="mb-0 text-muted" style={{fontSize: 17}}>إجمالي عدد المدارس اليابانيةبالفصول المصرية</p>
                            </div>
                            {addedLatelyComp && <div className="col-xl-2 col-md-4 col-12 d-flex align-items-center justify-content-end">
                                <p className="px-1 mb-0">منذ 30 دقيقة</p>
                                <FontAwesomeIcon icon={faEye} color={"#08a291"} size={"lg"}/>
                            </div>}
                        </div>
                    </div>
                </div>    
            </div>
            <hr className="col-11 bg-gray ml-3"/>
            <div className="d-flex mt-2">
                <div className="d-flex justify-content-center align-items-center" style={{width: 35, height: 35, borderRadius: "50%", backgroundColor: "#f4f4f5"}}>
                    <div style={{width: 21, height: 21, borderRadius: "50%", backgroundColor: "#dca627"}}></div>
                </div>
                <div className="col-11 px-2">
                    <div className="d-flex flex-column">
                        <h3 className="mb-1">إصدارات</h3>
                        <div className="d-flex flex-wrap align-items-start col-12">
                            <div className="col-xl-5 col-12 p-0 mb-xl-0 mb-1">
                                <p className="mb-0" style={{fontSize: 18, fontWeight: "bold"}}>إجمالي عدد المدارس اليابانيةبالفصول المصرية</p>
                            </div>
                            <div className="col-xl-5 col-md-8 col-12 p-0 mb-xl-0 mb-1">
                                <p className="mb-0 text-muted" style={{fontSize: 17}}>إجمالي عدد المدارس اليابانيةبالفصول المصرية</p>
                            </div>
                            {addedLatelyComp && <div className="col-xl-2 col-md-4 col-12 d-flex align-items-center justify-content-end">
                                <p className="px-1 mb-0">منذ 30 دقيقة</p>
                                <a download={"#"}><img src={download} /></a>
                            </div>}
                        </div>
                        <hr className="col-12 bg-gray"/>
                        <div className="d-flex flex-wrap align-items-start col-12">
                            <div className="col-xl-5 col-12 p-0 mb-xl-0 mb-1">
                                <p className="mb-0" style={{fontSize: 18, fontWeight: "bold"}}>إجمالي عدد المدارس اليابانيةبالفصول المصرية</p>
                            </div>
                            <div className="col-xl-5 col-md-8 col-12 p-0 mb-xl-0 mb-1">
                                <p className="mb-0 text-muted" style={{fontSize: 17}}>إجمالي عدد المدارس اليابانيةبالفصول المصرية</p>
                            </div>
                            {addedLatelyComp && <div className="col-xl-2 col-md-4 col-12 d-flex align-items-center justify-content-end">
                                <p className="px-1 mb-0">منذ 30 دقيقة</p>
                                <a download={"#"}><img src={download} /></a>
                            </div>}
                        </div>
                        <hr className="col-12 bg-gray"/>
                        <div className="d-flex flex-wrap align-items-start col-12">
                            <div className="col-xl-5 col-12 p-0 mb-xl-0 mb-1">
                                <p className="mb-0" style={{fontSize: 18, fontWeight: "bold"}}>إجمالي عدد المدارس اليابانيةبالفصول المصرية</p>
                            </div>
                            <div className="col-xl-5 col-md-8 col-12 p-0 mb-xl-0 mb-1">
                                <p className="mb-0 text-muted" style={{fontSize: 17}}>إجمالي عدد المدارس اليابانيةبالفصول المصرية</p>
                            </div>
                            {addedLatelyComp && <div className="col-xl-2 col-md-4 col-12 d-flex align-items-center justify-content-end">
                                <p className="px-1 mb-0">منذ 30 دقيقة</p>
                                <a download={"#"}><img src={download} /></a>
                            </div>}
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    </div>
}

export default HomeCard
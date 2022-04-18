import { CardTitle } from "reactstrap"
import { faEye } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const HomeCard = ({title, addedLatelyComp}) => {
    return <div className="d-flex flex-column p-2">
        <div className='d-flex w-100 align-items-center'>
            <CardTitle tag='h4' className="mb-0">{title}</CardTitle>
            <hr className="col bg-gray my-0 ml-2" />
        </div>
        <div className="d-flex flex-column bg-white p-2 mt-2" style={{borderRadius: 20}}>
            <div className="d-flex">
                <div className="d-flex justify-content-center align-items-center" style={{width: 35, height: 35, borderRadius: "50%", backgroundColor: "#f4f4f5"}}>
                    <div style={{width: 22, height: 22, borderRadius: "50%", backgroundColor: "#dca627"}}></div>
                </div>
                <div className="col-11 px-2">
                    <div className="d-flex flex-column">
                        <h3 className="mb-1">عناصر البيانات</h3>
                        <div className="d-flex align-items-start col-12">
                            <div className="col-9 p-0">
                                <p className="mb-0">إجمالي عدد المدارس اليابانيةبالفصول المصرية</p>
                            </div>
                            {addedLatelyComp && <div className="col-3 d-flex align-items-center justify-content-end">
                                <p className="px-1 mb-0">منذ 30 دقيقة</p>
                                <FontAwesomeIcon icon={faEye} color={"#08a291"} size={"lg"}/>
                            </div>}
                        </div>
                        <div className="d-flex align-items-start col-12 mt-1">
                            <div className="col-9 p-0">
                                <p className="mb-0">إجمالي عدد المدارس اليابانيةبالفصول المصرية</p>
                            </div>
                            {addedLatelyComp && <div className="col-3 d-flex align-items-center justify-content-end">
                                <p className="px-1 mb-0">منذ 30 دقيقة</p>
                                <FontAwesomeIcon icon={faEye} color={"#08a291"} size={"lg"}/>
                            </div>}
                        </div>
                    </div>
                </div>    
            </div>
            <hr className="col-11 bg-gray ml-3"/>
            <div className="d-flex">
                <div className="d-flex justify-content-center align-items-center" style={{width: 35, height: 35, borderRadius: "50%", backgroundColor: "#f4f4f5"}}>
                    <div style={{width: 22, height: 22, borderRadius: "50%", backgroundColor: "#dca627"}}></div>
                </div>
                <div className="col-11 px-2">
                    <div className="d-flex flex-column">
                        <h3 className="mb-1">إصدارات</h3>
                        <div className="d-flex align-items-start col-12">
                            <div className="col-9 p-0">
                                <p className="mb-0">إجمالي عدد المدارس اليابانيةبالفصول المصرية</p>
                            </div>
                            {addedLatelyComp && <div className="col-3 d-flex align-items-center justify-content-end">
                                <p className="px-1 mb-0">منذ 30 دقيقة</p>
                                <FontAwesomeIcon icon={faEye} color={"#08a291"} size={"lg"}/>
                            </div>}
                        </div>
                        <div className="d-flex align-items-start col-12 mt-1">
                            <div className="col-9 p-0">
                                <p className="mb-0">إجمالي عدد المدارس اليابانيةبالفصول المصرية</p>
                            </div>
                            {addedLatelyComp && <div className="col-3 d-flex align-items-center justify-content-end">
                                <p className="px-1 mb-0">منذ 30 دقيقة</p>
                                <FontAwesomeIcon icon={faEye} color={"#08a291"} size={"lg"}/>
                            </div>}
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    </div>
}

export default HomeCard
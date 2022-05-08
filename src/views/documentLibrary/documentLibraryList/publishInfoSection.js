import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import SliderB1 from "@src/assets/images/icons/SliderB1.png"

const PublishInformation = ({setShowSection, showSection}) => {
    return (
        <div className="col-xl-2 col-lg-3 col-12 card d-flex flex-column">
            <div className="d-flex mt-2 align-items-center">
                <p className="mb-0 col-11 p-0" style={{fontSize: 18, color: "#3d5484"}}>بيانات الإصدارة</p>
                <div className="col d-flex align-self-center justify-content-end">
                    <FontAwesomeIcon icon={faTimes} style={{cursor: "pointer"}} onClick={() => {
                    setShowSection(!showSection)
                    }}/>
                </div>
            </div>
            <hr className="w-100"/>
            <div>
                <p style={{fontSize: 18}}>تم اخر تحديث في مايو 2022</p>
            </div>
            <div className="my-1 d-flex justify-content-center">
                <img src={SliderB1} width="150" height="150" />
            </div>
            <div>
                <p style={{fontSize: 18, color: "#3d5484"}}>الوصف</p>
            </div>
            <div>
                <p style={{fontSize: 17, lineHeight: 1.5, textAlign: "justify"}}>سلسلة دورية يشارك في إعدادها نخبة من المفكرين والباحثين. تقدم رؤى وتحليلات لأهم القضاياالمطروحة.</p>
            </div>
            <div>
                <p style={{fontSize: 18, color: "#3d5484"}}>الدوريات</p>
            </div>
            <div className="d-flex flex-wrap">
                <div
                    className="mb-1 mr-1 px-1 d-flex align-items-center"
                    style={{
                        padding: "0.5rem",
                        borderRadius: 16,
                        border: "1px solid gray",
                        width: "fit-content"
                    }}>
                    <p className="mb-0 mx-1">ربع سنوية</p>
                </div>
            </div>
            <div>
                <p style={{fontSize: 18, color: "#3d5484"}}>المصادر</p>
            </div>
            <div className="d-flex flex-wrap">
                <div
                    className="mb-1 mr-1 px-1 d-flex align-items-center"
                    style={{
                        padding: "0.5rem",
                        borderRadius: 16,
                        border: "1px solid gray",
                        width: "fit-content",
                        backgroundColor: "#F8F8F8"
                    }}>
                    <p className="mb-0 mx-1">مركز المعلومات ودعم إتخاذ القرار</p>
                </div>
            </div>
            <div>
                <p style={{fontSize: 18, color: "#3d5484"}}>القطاعات</p>
            </div>
            <div className="d-flex flex-wrap">
                <div
                    className="mb-1 mr-1 px-1 d-flex align-items-center"
                    style={{
                        padding: "0.5rem",
                        borderRadius: 16,
                        border: "1px solid gray",
                        width: "fit-content",
                        backgroundColor: "#d8dce7"
                    }}>
                    <p className="mb-0 mx-1">الصحة</p>
                </div>
            </div>
        </div>
    )
}

export default PublishInformation
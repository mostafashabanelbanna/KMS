import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import SliderB1 from "@src/assets/images/icons/SliderB1.png"

const PublishInformation = ({ details }) => {
    if (details) {
        return (
            <div className="col-lg-3 col-12 card d-flex flex-column">
                <div className="d-flex mt-2 align-items-center">
                    <p className="mb-0 col-12 p-0" style={{ fontSize: 16, color: "#3d5484" }}>بيانات الإصدارة</p>
                </div>
                <hr className="w-100" />
                {/* <div>
                    <p style={{ fontSize: 16 }}>{details?.date ? `تم اخر تحديث في ${details?.date}` : "تم اخر تحديث في مايو 2022"}</p> 
                    
                </div>
                <div className="my-1 d-flex justify-content-center">
                    <img src={SliderB1} width="150" height="150" /> 
                </div> */}
                {details?.description && 
                <>
                <div>
                    <p style={{ fontSize: 16, color: "#3d5484" }}>الوصف</p>
                </div>
                <div>
                    <p style={{ fontSize: 17, lineHeight: 1.5, textAlign: "justify" }}>{details?.description}</p>
                </div>
                </>}
                {details?.periodicityName && <>
                <div>
                    <p style={{ fontSize: 16, color: "#3d5484" }}>الدوريات</p>
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
                        <p className="mb-0 mx-1">{details?.periodicityName}</p>
                    </div>
                </div>
                </>}
                {details?.sourceName && <><div>
                    <p style={{ fontSize: 16, color: "#3d5484" }}>المصادر</p>
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
                        <p className="mb-0 mx-1">{details?.sourceName}</p>
                    </div>
                </div></>}
                {details?.documentIssuesClassifications?.length && details?.documentIssuesClassifications?.map((item, index) => {
                    return (
                        <div key={item.id}>
                            <div>
                                <p style={{ fontSize: 16, color: "#3d5484" }}>{item.name}</p>
                            </div>
                            {item.classificationValues.length && item.classificationValues.map((val, index) => {
                                return (
                                    <div key={val.id} className="d-flex flex-wrap">
                                        <div
                                            className="mb-1 mr-1 px-1 d-flex align-items-center"
                                            style={{
                                                padding: "0.5rem",
                                                borderRadius: 16,
                                                border: "1px solid gray",
                                                width: "fit-content",
                                                backgroundColor: "#d8dce7"
                                            }}>
                                            <p className="mb-0 mx-1">{val.name}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    } else {
        return <></>
    }
}

export default PublishInformation
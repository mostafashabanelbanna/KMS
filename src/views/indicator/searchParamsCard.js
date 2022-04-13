import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

const SearchParamsCard = ({setShowSearchParams, showSearchParams}) => {
    return (
    <div className="d-flex flex-column p-1 w-100" style={{backgroundColor: "#f0f1f5", height: "fit-content", borderRadius: 6}}>
        <div className="d-flex mb-1">
            <p className="mb-0 col-11" style={{color: "#47cdbf", cursor: "pointer"}}>عناصر البحث</p>
            <div className="col d-flex align-self-center justify-content-end">
                <FontAwesomeIcon icon={faTimes} color="red" style={{cursor: "pointer"}} onClick={() => {
                setShowSearchParams(!showSearchParams)
            }}/>
            </div>
        </div>
        <div className="dark-layout mb-2 d-flex align-items-center px-2">
        <div>التاريخ</div>
            <div
            className="ml-2 px-2"
            >
            من 2015
            </div>
            <div
            className="ml-2"
            >
            إلى 2017
            </div>
        </div>
        <div className="dark-layout mb-2 d-flex align-items-center px-2">
            <div>الدوريات</div>
            <div
            className="ml-2 px-2"
            style={{
                backgroundColor: "white",
                padding: "0.5rem",
                borderRadius: 16
            }}
            >
            ربع سنوية
            </div>
        </div>
        <div className="dark-layout mb-2 d-flex align-items-center px-2">
        <div>المصادر</div>
        <div
          className="ml-2"
          style={{
            backgroundColor: "#dcefeb",
            padding: "0.5rem",
            borderRadius: 4
          }}
        >
          وزارة التربية والتعليم
        </div>
        </div>
        <div className="dark-layout mb-2 d-flex align-items-center px-2">
        <div>القطاعات</div>
        <div
          className="ml-2 px-2"
          style={{
            backgroundColor: "#cfd4e1",
            padding: "0.5rem",
            borderRadius: 16
          }}
        >
          قطاع التعليم
        </div>
        </div>
    </div>)
}

export default SearchParamsCard
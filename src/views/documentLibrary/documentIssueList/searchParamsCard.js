import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from 'react-redux'
import * as moment from "moment"
import "moment/locale/ar"

const SearchParamsCard = ({setShowSearchParams, showSearchParams}) => {

    const store = useSelector(state => state.FrontDocumentIssues)
    return (
    <div className="d-flex flex-column p-1 w-100" style={{backgroundColor: "#f0f1f5", height: "fit-content", borderRadius: 6}}>
        <div className="d-flex mb-1">
            <p className="mb-0 col-11 text_green" >عناصر البحث</p>
            <div className="col d-flex align-self-center justify-content-end">
                <FontAwesomeIcon icon={faTimes} color="red" style={{cursor: "pointer"}} onClick={() => {
                setShowSearchParams(!showSearchParams)
            }}/>
            </div>
        </div>
        {/* <div className="dark-layout mb-2 d-flex align-items-center px-2">
        <div>التاريخ</div>
            <div
            className="ml-2 px-2"
            >
            {store.dateFrom ? `من  ${moment(store.dateFrom).locale("ar").format("LL")}` : ''}
            </div>
            <div
            className="ml-2"
            >
            {store.dateTo ? `إلى  ${moment(store.dateTo).locale("ar").format("LL")}` : ''}
            </div>
        </div> */}
        <div className="dark-layout mb-2 d-flex align-items-center px-2">
            {store.periodicities.length > 0 &&
              <>
               <div>الدوريات</div> 
               {
                 store.periodicities.map((item, idx) => (
                  <div
                    key={idx}
                    className="ml-2 px-2 d-flex align-items-center"
                    style={{
                        backgroundColor: "white",
                        padding: "0.5rem",
                        borderRadius: 16
                    }}>
                <p className="mb-0 mx-1">{item.name}</p>
                {/* <FontAwesomeIcon icon={faCircleXmark} size="lg"/> */}
                </div>
    
                ))
               }
              </>
            }
            
        </div>
        <div className="dark-layout mb-2 d-flex align-items-center px-2">
          {store.sources.length > 0 &&
              <>
               <div>المصادر</div> 
               {
                 store.sources.map((item, idx) => (
                  <div
                    key={idx}
                    className="ml-2 px-2 d-flex align-items-center"
                    style={{
                        backgroundColor: "white",
                        padding: "0.5rem",
                        borderRadius: 16
                    }}>
                <p className="mb-0 mx-1">{item.name}</p>
                {/* <FontAwesomeIcon icon={faCircleXmark} size="lg"/> */}
                </div>
    
                ))
               }
              </>
            }
        </div>
        <div className="dark-layout mb-2 d-flex align-items-center px-2">
        {store.sectors.length > 0 &&
              <>
               <div>القطاعات</div> 
               {
                 store.sectors.map((item, idx) => (
                  <div
                    key={idx}
                    className="ml-2 px-2 d-flex align-items-center"
                    style={{
                        backgroundColor: "white",
                        padding: "0.5rem",
                        borderRadius: 16
                    }}>
                <p className="mb-0 mx-1">{item.name}</p>
                {/* <FontAwesomeIcon icon={faCircleXmark} size="lg"/> */}
                </div>
    
                ))
               }
              </>
            }
        </div>
        <div className="dark-layout mb-2 d-flex align-items-center px-2">
        {store.categories.length > 0 &&
              <>
               <div>التصنيفات</div> 
               {
                 store.categories.map((item, idx) => (
                  <div
                    key={idx}
                    className="ml-2 px-2 d-flex align-items-center"
                    style={{
                        backgroundColor: "white",
                        padding: "0.5rem",
                        borderRadius: 16
                    }}>
                <p className="mb-0 mx-1">{item.name}</p>
                {/* <FontAwesomeIcon icon={faCircleXmark} size="lg"/> */}
                </div>
    
                ))
               }
              </>
            }
        </div>
    </div>)
}

export default SearchParamsCard
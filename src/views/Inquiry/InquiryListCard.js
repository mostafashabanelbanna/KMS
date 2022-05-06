import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect} from 'react-router-dom'
import { Download } from 'react-feather'
import * as moment from "moment"
import "moment/locale/ar"

const InquiryCard = (item) => {
  const [heart, setHeart] = useState(faHeart) // change initial state from api
  // redux states
  const dispatch = useDispatch()

  const layoutStore = useSelector(state => state.layout)

  return (
    <div
      className="card d-flex flex-column py-1 mb-2"
      style={{
        borderRadius: 6,
        height: "max-content"
      }}
    >
      <div className="d-flex">
        <div className="dark-layout mb-1 px-2 col-8" style={{ fontSize: 20 }}>
          <Link className="d-block" style={{width: "fit-content"}} to={{ pathname: `/Researcher/Inquiry/InquiryDetails/${item.item.id}`, state: { id : item.item.id}}}>
            {item.item.name}
          </Link>
        </div>
        <div className="d-flex col-4">
          <div className="col-9 d-flex justify-content-end">
            كود {item.item.id}
          </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center flex-md-row">
        {item.item.attachment && 
          <div className="d-flex flex-row col-md-4 px-5">
           <p className="mb-0" style={{ fontSize: 15, color: "gray" }}> الملف المرفق : </p>
           <div className="d-flex">
           <p className="mx-1 mb-0">{item.item.attachment}</p>
             <Download
               style={{ cursor: "pointer"}}
               className="text-success"
             />
           </div>
          </div>
        }
       
        <div className="d-flex flex-wrap justify-content-end col-md-8 px-2">
          {item.item.startDate !== null && (
            <div className="d-flex align-items-center col-md-4 col-12">
              <p
                className="mb-0 w-100 text-center"
                style={{
                  padding: "0.5rem",
                  backgroundColor: "#edeff6",
                  borderRadius: 8
                }}
              >
                <h5>تاريخ البدء</h5>
                <span>{moment(item.item.startDate).locale("ar").format("L")}</span>
              </p>
            </div>
          )}
          {item.item.status !== null && (
            <div className="d-flex align-items-center col-md-4 col-12">
              <p
                className="mb-0 w-100 text-center"
                style={{
                  padding: "0.5rem",
                  backgroundColor: "#edeff6",
                  borderRadius: 8
                }}
              >
                {item.item.status}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InquiryCard

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect} from 'react-router-dom'
import { Download } from 'react-feather'
import * as moment from "moment"
import "moment/locale/ar"
import { addToFavorit, notify, removeFromFavorit } from '../../utility/Utils'

const InquiryCard = (item) => {
  const [heart, setHeart] = useState(faHeart)
  // redux states
  const dispatch = useDispatch()
  const store = useSelector(state => state.inquiries)
  const layoutStore = useSelector(state => state.layout)

  const AddIndicatorToFavorite = async (id) => {
    console.log(id)
    const result = await addToFavorit("Inquiry", id) //webResource, definition
    if (result) {
      if (store.frontData && store.frontData.length > 0) {
        const ele = store.frontData.find(x => x.id === id)
        ele.isFavorit = true
        dispatch({type: "GET_INQUIRY_FRONT_DATA", data: [...store.frontData], totalPages: store.totalPages, totalCount: store.totalCount })
      }
    }
  }

  const RemoveIndicatorFromFavorite = async (id) => {  
    const result = await removeFromFavorit("Inquiry", id)
    if (result) {
      if (store.frontData && store.frontData.length > 0) {
        const ele = store.frontData.find(x => x.id === id)
        ele.isFavorit = false
        dispatch({type: "GET_INQUIRY_FRONT_DATA", data: [...store.frontData], totalPages: store.totalPages, totalCount: store.totalCount })
      }
    }
  }

  return (
    <div
      className="card d-flex flex-column py-1 mb-2"
      style={{
        borderRadius: 6,
        height: "max-content"
      }}
    >
      <div className="d-flex">
        <div className="dark-layout mb-1 px-2 col-11 font-18">
          <Link className="d-block" style={{width: "fit-content"}} to={{ pathname: `/Researcher/Inquiry/InquiryDetails/${item.item.id}`, state: { id : item.item.id}}}>
            {item.item.name}
          </Link>
        </div>
        <div className="d-flex">
            {/* <div className="col-9 d-flex justify-content-end">كود {item.item.id}</div> */}

            {item.item.isFavorit && <FontAwesomeIcon
              icon={solidHeart}
              color="#08a291"
              className="col"
              width={20}
              style={{ cursor: "pointer" }}
              onClick={() => RemoveIndicatorFromFavorite(item.item.id)}
            />
            }
            {!item.item.isFavorit && <FontAwesomeIcon
              icon={faHeart}
              color="#08a291"
              className="col"
              width={20}
              style={{ cursor: "pointer" }}
              onClick={() => AddIndicatorToFavorite(item.item.id)}
            />
            }
          </div>
      </div>
      <div className="d-flex flex-column align-items-center flex-md-row">
        {item.item.attachment && 
          <div className="d-flex flex-row col-md-5 col-12 pl-2">
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

        <div className={`d-flex ${item.item.attachment ? "col-md-7 col-12" : "col-12 align-items-end"} flex-column`}>
          <div className="d-flex flex-wrap justify-content-end col-12 px-2">
            {item.item.startDate !== null && (
              <div className={`d-flex align-items-center ${item.item.attachment ? "col-md-6" : "col-md-3"} col-12`}>
                <div
                  className="mb-0 w-100 text-center d-flex justify-content-center align-items-center"
                  style={{
                    padding: "0.5rem",
                    backgroundColor: "#edeff6",
                    borderRadius: 8,
                    width: "fit-content"
                  }}
                >
                  <p className="mb-0">تاريخ البدء : &nbsp;</p>
                  <p className="mb-0">{moment(item.item.startDate).locale("ar").format("L")}</p>
                </div>
              </div>
            )}
            {item.item.status !== null && (
              <div className={`d-flex align-items-center ${item.item.attachment ? "col-md-6" : "col-md-3"} col-12`}>
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
    </div>
  )
}

export default InquiryCard

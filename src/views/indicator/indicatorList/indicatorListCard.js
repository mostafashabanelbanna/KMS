import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { ArrowsIcon, SignalIcon, StatsIcon } from "./icons"
import { addToFavorit, notify, removeFromFavorit } from '../../../utility/Utils'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect} from 'react-router-dom'

const IndicatorCard = (item) => {
  const [heart, setHeart] = useState(faHeart) // change initial state from api
  // redux states
  const dispatch = useDispatch()
  const store = useSelector(state => state.frontIndicators)
  const layoutStore = useSelector(state => state.layout)

  const AddIndicatorToFavorite = async (id) => {  
    const result = await addToFavorit("Indicator", id)
    if (result) {
      const ele = store.data.find(x => x.id === id)
      ele.isFavorit = true
      dispatch({type: "GET_FRONT_INDICATOR_DATA", data: [...store.data], totalPages: store.totalPages, totalCount: store.totalCount })
    }
  }

  const RemoveIndicatorFromFavorite = async (id) => {  
    const result = await removeFromFavorit("Indicator", id)
    if (result) {
      const ele = store.data.find(x => x.id === id)
      ele.isFavorit = false
      dispatch({type: "GET_FRONT_INDICATOR_DATA", data: [...store.data], totalPages: store.totalPages, totalCount: store.totalCount })
    }
  }

  return (
    <Link to={{ pathname: `/indicator/indicatorDetails/${item.item.id}`, state: { Id : item.item.id}}}>
      <div
        className="card d-flex flex-column py-2 mb-2"
        style={{
          borderRadius: 6,
          height: "max-content",
          boxShadow: "2px 1px 6px gray"
        }}
      >
        <div className="d-flex">
          <div className="dark-layout mb-2 px-2 col-8" style={{fontSize: 20}}> {item.item.name}</div>
          <div className="d-flex col-4">
            <div className="col-9 d-flex justify-content-end">كود {item.item.id}</div>

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
          <div className="d-flex flex-wrap justify-content-start col-md-4 px-5">
            <div className="text-center">
              <p style={{fontSize: 24, fontWeight: "bold"}}>{item.item.lastValueInRepublic}</p>
              <p>مليون نسمة</p>
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content-end col-md-8 px-2">
            {item.item.periodicities && 
              <div className="d-flex align-items-center col-md-4 col-12">
                <p className="mb-0 w-100 text-center" style={{ padding: "0.5rem", backgroundColor: "#edeff6", borderRadius: 8 }}>
                  {item.item.periodicities}
                </p>
              </div>
            }
            <div className="d-flex align-items-center col-md-4 col-12">
              <div className="d-flex align-items-center justify-content-center w-100" style={{ padding: "0.5rem", backgroundColor: "#edeff6", borderRadius: 8 }}>
                <ArrowsIcon />
                <p className="mb-0" style={{ paddingRight: "0.5rem"}}>
                  ({item.item.dimensionsNumber})  ابعاد
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center col-md-4 col-12">
              <p className="mb-0 w-100 text-center" style={{ padding: "0.5rem", backgroundColor: "#edeff6", borderRadius: 8 }}>
                من {item.fromYear} الي {item.toYear}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
    
  )
}

export default IndicatorCard

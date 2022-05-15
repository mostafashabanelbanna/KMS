import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { ArrowsIcon, SignalIcon, StatsIcon } from "./icons"
import { addToFavorit, notify, removeFromFavorit } from '../../../utility/Utils'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect} from 'react-router-dom'
import { Download } from 'react-feather'

const DocumentIssueCard = (item) => {
  const [heart, setHeart] = useState(faHeart) // change initial state from api
  // redux states
  const dispatch = useDispatch()
  const store = useSelector(state => state.FrontDocumentIssues)
  const layoutStore = useSelector(state => state.layout)

  const AddToFavorite = async (id) => {  
    const result = await addToFavorit("DocumentIssue", id)
    if (result) {
      if (store.data && store.data.length > 0) {
        const ele = store.data.find(x => x.id === id)
        ele.isFavorite = true
        dispatch({type: "GET_FRONT_DOCUMENTISSUE_DATA", data: [...store.data], totalPages: store.totalPages, totalCount: store.totalCount })
      }
    }
  }

  const RemoveFromFavorite = async (id) => {  
    const result = await removeFromFavorit("DocumentIssue", id)
    if (result) {
      if (store.data && store.data.length) {
        const ele = store.data.find(x => x.id === id)
        ele.isFavorite = false
        dispatch({type: "GET_FRONT_DOCUMENTISSUE_DATA", data: [...store.data], totalPages: store.totalPages, totalCount: store.totalCount })
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
        <div className="dark-layout mb-1 px-2 col-8 font-18">
          <Link
            className="d-block"
            style={{width: "fit-content"}}
            to={{
              pathname: `/document/details/${item.item.id}`,
              state: { Id: item.item.id }
            }}
            >
            {item.item.name}
          </Link>
        </div>
        <div className="d-flex col-4">
          <div className="col-9 d-flex justify-content-end">
            كود {item.item.id}
          </div>

          {item.item.isFavorite && (
            <FontAwesomeIcon
              icon={solidHeart}
              color="#08a291"
              className="col"
              width={20}
              style={{ cursor: "pointer" }}
              onClick={() => RemoveFromFavorite(item.item.id)}
            />
          )}
          {!item.item.isFavorite && (
            <FontAwesomeIcon
              icon={faHeart}
              color="#08a291"
              className="col"
              width={20}
              style={{ cursor: "pointer" }}
              onClick={() => AddToFavorite(item.item.id)}
            />
          )}
        </div>
      </div>
      <div className="d-flex flex-column align-items-center flex-md-row">
        <div className="d-flex flex-row p-0 pl-2 col">
          <p className="mb-0" style={{ fontSize: 13, color: "gray" }}>اخر وثيقة : </p>
          <div className="d-flex">
          <p className="mx-1 mb-0" style={{ fontSize: 13, color: "gray" }}>{item.item.lastDocument.title_A}</p>
            <Download
              style={{ cursor: "pointer"}}
              className="text-success"
            />
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-end col-md-8 px-2">
          {item.item.periodicityName !== null && (
            <div className="d-flex align-items-center col-md-4 col-12">
              <p
                className="mb-0 w-100 text-center"
                style={{
                  padding: "0.5rem",
                  backgroundColor: "#edeff6",
                  borderRadius: 8
                }}
              >
                {item.item.periodicityName}
              </p>
            </div>
          )}
          {item.item.sourceName !== null && (
            <div className="d-flex align-items-center col-md col-12">
              <p
                className="mb-0 w-100 text-center"
                style={{
                  padding: "0.5rem",
                  backgroundColor: "#edeff6",
                  borderRadius: 8
                }}
              >
                {item.item.sourceName}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DocumentIssueCard

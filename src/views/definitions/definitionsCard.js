import { Link } from 'react-router-dom'
import { Download } from 'react-feather'
import * as moment from "moment"
import "moment/locale/ar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { addToFavorit, notify, removeFromFavorit } from '../../utility/Utils'
import { useDispatch, useSelector } from 'react-redux'

const DefinitionsCard = (item) => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.FrontDefinitions)
  const layoutStore = useSelector(state => state.layout)

  console.log(store)

  const AddIndicatorToFavorite = async (id) => {  
    const result = await addToFavorit("definition", id)
    if (result) {
      if (store.definitions && store.definitions.length > 0) {
        const ele = store.definitions.find(x => x.id === id)
        ele.isFavorite = true
        dispatch({type: "GET_FRONT_DEFINITIONS_DATA", data: [...store.definitions], totalPages: store.totalPages, totalCount: store.totalCount })
      }
    }
  }

  const RemoveIndicatorFromFavorite = async (id) => {  
    const result = await removeFromFavorit("definition", id)
    if (result) {
      if (store.definitions && store.definitions.length > 0) {
        const ele = store.definitions.find(x => x.id === id)
        ele.isFavorite = false
        dispatch({type: "GET_FRONT_DEFINITIONS_DATA", data: [...store.definitions], totalPages: store.totalPages, totalCount: store.totalCount })
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
        <div className="d-flex align-items-center dark-layout mb-1 px-2 col-11 font-18">
          <div className="d-block" style={{width: "fit-content"}}>
            {item.item.name}
          </div>
        </div>
        <div className="d-flex">
          {/* <div className="col-9 d-flex justify-content-end">كود {item.item.id}</div> */}

          {item.item.isFavorite && <FontAwesomeIcon
            icon={solidHeart}
            color="#08a291"
            className="col"
            width={20}
            style={{ cursor: "pointer" }}
            onClick={() => RemoveIndicatorFromFavorite(item.item.id)}
          />
          }
          {!item.item.isFavorite && <FontAwesomeIcon
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
          <div className="d-flex flex-column col-md-8 col-12 px-2">
            {item.item.description && <p className="mx-1 mb-0" style={{wordBreak: "break-word"}}>{item.item.description}</p>}
            {item.item.url && <a className="mx-1 mb-0" style={{wordBreak: "break-word"}} href={item.item.url} target="_blank">الرابط : &nbsp;&nbsp;{item.item.url}</a>}
          </div>
       
       {item.item.description ? <div className="d-flex flex-wrap justify-content-end col-md-4 col-12 px-2">
          {item.item.sourceName && (
            <div className="d-flex align-items-center col-12">
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
          </div> : <div className="d-flex flex-wrap justify-content-end col-12 px-2">
            {item.item.sourceName && (
              <div className="d-flex align-items-center col-md-4 col-12">
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
        }
      </div>
    </div>
  )
}

export default DefinitionsCard

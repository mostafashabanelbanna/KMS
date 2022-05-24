import { Link } from 'react-router-dom'
import { Download } from 'react-feather'
import * as moment from "moment"
import "moment/locale/ar"
import { Fragment, useState } from "react"
import { Button, Tooltip } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"
import { addToFavorit, notify, removeFromFavorit } from '../../utility/Utils'
import { useDispatch, useSelector } from 'react-redux'

const WebResourcesCard = (item) => {
  const store = useSelector(state => state.FrontWebResources)
  const dispatch = useDispatch()

  console.log(store)

  const AddIndicatorToFavorite = async (id) => {  
    const result = await addToFavorit("webResource", id)
    if (result) {
      if (store.webResources && store.webResources.length > 0) {
        const ele = store.webResources.find(x => x.id === id)
        ele.isFavorit = true
        dispatch({type: "GET_FRONT_WEB_RESOURCES_DATA", data: [...store.webResources], totalPages: store.totalPages, totalCount: store.totalCount })
      }
    }
  }

  const RemoveIndicatorFromFavorite = async (id) => {  
    const result = await removeFromFavorit("webResource", id)
    if (result) {
      if (store.webResources && store.webResources.length > 0) {
        const ele = store.webResources.find(x => x.id === id)
        ele.isFavorit = false
        dispatch({type: "GET_FRONT_WEB_RESOURCES_DATA", data: [...store.webResources], totalPages: store.totalPages, totalCount: store.totalCount })
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
        <div className="d-flex align-items-center align-items-center dark-layout mb-1 px-2 col-11 font-18">
          <div
            className='mr-1'
            style={{
              backgroundImage: `url('${process.env.REACT_APP_MAINPATH}/WebResource/Logo/${item.item.id}/${item.item.logo}')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: 30,
              width: 30
            }}
            >
          </div>
          <a className="d-block" style={{width: "fit-content"}} href={item.item.url} target="_blank">
            {item.item.name}
          </a>
        </div>
        {/* <div className="d-flex col-2">
          <div className="col-9 d-flex justify-content-end">
            كود {item.item.id}
          </div>
        </div> */}
        <div className="d-flex">
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
        {item.item.description && 
          <div className="d-flex col-md-8 col-12 px-2">
            <p className="mx-1 mb-0" style={{wordBreak: "break-word"}}>{item.item.description}</p>
          </div>
        }
       
       {item.item.description ? <div className="d-flex flex-wrap justify-content-end col-md-4 col-12 px-2">
          {item.item.webResourceCategoryName !== null && (
            <div className="d-flex align-items-center col-12">
              <p
                className="mb-0 w-100 text-center"
                style={{
                  padding: "0.5rem",
                  backgroundColor: "#edeff6",
                  borderRadius: 8
                }}
              >
                {item.item.webResourceCategoryName}
              </p>
            </div>
          )}
          </div> : <div className="d-flex flex-wrap justify-content-end col-12 px-2">
            {item.item.webResourceCategoryName !== null && (
              <div className="d-flex align-items-center col-md-4 col-12">
                <p
                  className="mb-0 w-100 text-center"
                  style={{
                    padding: "0.5rem",
                    backgroundColor: "#edeff6",
                    borderRadius: 8
                  }}
                >
                  {item.item.webResourceCategoryName}
                </p>
              </div>
            )}
          </div> 
        }
      </div>
    </div>
  )
}

export default WebResourcesCard
